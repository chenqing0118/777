import pprint
import re
import time
from datetime import datetime

from bs4 import BeautifulSoup

from crawl_codes.HTML_Downloader import HTMLDownloader


class TaiPingYangCrawler:
    BRANDS = [
        "lenovo",
        "asus",
        "dell",
        "hp",
        "acer",
        "apple",
        "huawei",
        'Thinkpad',
        "honor",
        "rog",
        "hasee",
        "razer",
        "msi",
        "samsung",
        "microsoft",
        "thunderobot",
        "terrans_force",
        "machenike",
        "mechrevo"
    ]

    def __init__(self):
        pass

    def get_laptop_list(self, brand: str = None, pages_limit: int = 5, ignore_invalid: bool = True) -> list:
        # 返回项
        result = []
        # 每一页url集合
        effective_urls = []
        base_url = "https://product.pconline.com.cn/notebook/"
        if brand is None:
            url_suffix = "s10.shtml"
            effective_urls.append(base_url + url_suffix)
        else:
            base_url += brand + "/"
            url_suffix = "s1.shtml"
            effective_urls.append(base_url)
        html = HTMLDownloader.get_page_content(base_url)['html']
        soup = BeautifulSoup(html, features="lxml")
        max_page = int(soup.find('div', id="Jpager").find('em').i.getText())
        for i in range(1, min(max_page, pages_limit)):
            effective_urls.append(base_url + str(i * 25) + url_suffix)
        for url in effective_urls:
            print(url)
            result.extend(self._parse_list(url, ignore_invalid))
        return result
        pass

    def _parse_list(self, url: str, ignore: bool) -> list:
        result = []
        html = HTMLDownloader.get_page_content(url)['html']
        soup = BeautifulSoup(html, features="lxml")
        table = soup.find('ul', id='JlistItems')
        rows = table.find_all('li', class_="item")
        for row in rows:
            if len(row.attrs['class']) > 1:
                continue
            item = dict()
            price = row.find('div', class_="price").getText().strip()
            if ignore and price.find(r"￥") < 0:
                continue
            item['price'] = price
            title = row.find('a', class_="item-title-name")
            item['name'] = title.getText().strip()
            item_url = "https:" + title['href']
            try:
                pic_page = HTMLDownloader.get_page_content(item_url)['html']
                pic_div = BeautifulSoup(
                    pic_page, features="html.parser").find(
                    'div', class_="big-pic")
                if pic_div:
                    item['pic_link'] = "https:" + pic_div.find('img')['src']
                else:
                    item['pic_link'] = None
            except Exception as e:
                item['pic_link'] = None
            item_spec_url = item_url.replace(".html", "_detail.html")
            specs = self._parse_item(item_spec_url)
            item.update(specs)
            result.append(item)
        print('|')
        return result

    def _parse_item(self, url):
        specs = {}
        try:
            html = HTMLDownloader.get_page_content(url)['html']
        except UserWarning as e:
            print("Exception: failed to fetch:" + url)
            return
        soup = BeautifulSoup(html, features="html.parser")
        frame = soup.find('div', class_="area area-detailparams")
        for i in frame.find_all('div', class_='tips'):
            i.decompose()
        rows = []
        for i in frame.find_all('tbody'):
            rows.extend(i.find_all("tr"))
        # 准备工作完成
        # 字段名准备
        mapping = {"型号别称": "model",
                   "产品定位": "type",
                   #  "产品分类": "type",
                   "上市时间": "sale_date",
                   "处理器": "cpu_name",
                   "内存容量": "mem_size",
                   "内存类型": "mem_type",
                   "硬盘容量": "storage",
                   "光驱类型": "has_cd_driver",
                   "屏幕尺寸": "screen_size",
                   "分辨率": "screen_resolution",
                   "显示屏描述": "screen_type",
                   "显卡类型": "gpu_type",
                   "显卡芯片": "gpu_name",
                   "显存容量": "gpu_mem",
                   # "电池类型": "battery",
                   "续航时间": "work_time",
                   "摄像头": "camera",
                   "无线网卡": "net_wireless",
                   "网卡": "net_wired",
                   "USB": "usb_settings",
                   "其它接口": "other_ports",
                   "厚度": "thickness",
                   "重量": "weight",
                   "外壳材质": "shell_material",
                   "#1": "mem_speed"
                   }
        for i in mapping.values():
            specs[i] = None
        for row in rows:
            key = row.th.getText().strip()
            value = row.td.getText().strip()
            real_key = mapping.get(key)
            if real_key:
                real_value = value
                #  数据预处理
                if real_key == "model" or key == "cpu_name":
                    real_value = re.sub(r"\(.*\)", "", value)
                # if real_key == "type":
                #     real_value = "其他"
                #     if value.find("办公") >= 0:
                #         real_value = "办公"
                #     if value.find("轻薄") >= 0:
                #         real_value = "轻薄"
                #     if value.find("影音") >= 0:
                #         real_value = "影音"
                #     if value.find("游戏") >= 0:
                #         real_value = "游戏"
                #     if value.find("工作站") >= 0:
                #         real_value = "工作站"
                if real_key == "mem_type":
                    real_value = re.findall(r"L?DDP?R\d", value)[0]
                    specs['mem_speed'] = None if len(re.findall(r"\d\d\d\d", value)) <= 0 else \
                        re.findall(r"\d\d\d\d", value)[0]
                if real_key == "has_cd_driver":
                    real_value = False if value.find("无") > -1 else True
                specs[real_key] = real_value
        print('.', end='')
        return specs
        pass

    @staticmethod
    def unify_items(item_list: list) -> list:
        result = list()
        for origin in item_list:
            try:
                laptop = dict()
                # CPU
                if origin.get('cpu_name'):
                    laptop['cpu'] = re.sub(r"\(.*\)", "", origin['cpu_name'])
                    laptop['cpu'] = " ".join(re.sub("-", " ", re.sub("锐龙", " Ryzen ", laptop["cpu"])).split())
                else:
                    continue
                # GPU
                if origin.get('gpu_name') or origin.get("gpu_type"):
                    if origin.get("gpu_type") and origin['gpu_type'].find("独立") < 0:
                        # 集显核显
                        laptop['gpu'] = "#intergrated"
                    else:
                        # 独显，获取型号
                        laptop['gpu'] = origin['gpu_name']
                else:
                    continue
                # 无需修改的信息：
                # 笔记本名字（含配置），必有
                laptop['name'] = origin['name']
                # 笔记本类型
                laptop['type'] = origin['type']
                # 价格，必有
                laptop['price'] = re.sub("￥", "", origin['price'])
                laptop['pic_link'] = origin['pic_link']
                laptop['shell_material'] = origin['shell_material']
                laptop['model'] = origin['model']
                laptop['net_wired'] = origin['net_wired']
                laptop['net_wireless'] = origin['net_wireless']
                laptop['model'] = origin['model']

                # 发售时间
                # 发售时间格式化
                laptop['releaseTime'] = 0
                if origin.get("sale_date"):
                    year = int(re.findall(r"\d{4}", origin['sale_date'])[0])
                    month = 6
                    if origin["sale_date"].find("季") >= 0:
                        if origin['sale_date'].find("春") >= 0:
                            month = 2
                        elif origin['sale_date'].find("夏") >= 0:
                            month = 5
                        elif origin['sale_date'].find("秋") >= 0:
                            month = 8
                        elif origin['sale_date'].find("冬") >= 0:
                            month = 11
                    elif origin["sale_date"].find("月") >= 0:
                        month = int(re.findall(r"\d{1,2}", origin["sale_date"])[-1])
                    laptop['releaseTime'] = datetime(year, month, day=1).timestamp()
                else:
                    laptop['releaseTime'] = 0

                # 内存
                laptop['memorySize'] = int(re.findall(r"\d+", origin['mem_size'])[0])
                if origin.get("mem_type") and origin['mem_type'] == "LDDPR4":
                    origin['mem_type'] = "DDR4"
                laptop['memoryGen'] = origin['mem_type']
                laptop['memoryRate'] = origin['mem_speed']
                # 存储
                json = {"ssd": 0, "hdd": 0}
                if origin['storage']:
                    disks = origin['storage'].split(',')
                    for disk in disks:
                        volume = int(re.findall(r"\d+", disk)[0]) if disk.find("TB") < 0 else int(float(
                            re.findall(r"\d+", disk)[0]) * 1024)
                        if disk.find("SSD") >= 0:
                            json["ssd"] += volume
                        elif disk.find("HDD") >= 0:
                            json["hdd"] += volume
                laptop['storage'] = json
                # 屏幕
                if origin['screen_size']:
                    laptop['screenSize'] = float(re.findall(r"\d+\.\d+|\d+", origin['screen_size'])[0])
                else:
                    laptop['screenSize'] = None
                if origin['screen_resolution']:
                    laptop['resolution'] = origin['screen_resolution']
                else:
                    laptop['resolution'] = None
                # 屏幕细节
                if origin['screen_type']:
                    # 刷新率解析
                    fresh_rate = re.findall(r"(\d{2,3})[Hh][Zz]", origin['screen_type'])
                    laptop['refresh'] = fresh_rate[0] if fresh_rate else None
                    # 色域,强匹配
                    color = re.findall(r"(\d{2,})%(?!.{0,3}屏占)", origin['screen_type'])
                    if color and int(color[0]) > 80:
                        laptop['gamut'] = color[0] + "%sRGB"
                    elif color and int(color[0]) < 80:
                        laptop['gamut'] = color[0] + "%NTSC"
                    else:
                        laptop['gamut'] = None
                else:
                    laptop['refresh'], laptop['gamut'] = None, None
                # 续航时间，也不太靠谱
                laptop['work_time'] = 0
                if origin.get('work_time'):
                    numbers = re.findall(r"(\d+)\s*小时", origin['work_time'])
                    if len(numbers) > 0:
                        laptop['work_time'] = numbers[-1]
                    else:
                        laptop['work_time'] = 0  # 没有参考价值
                # 接口
                # USB格式化
                ports = dict()
                usb = [0, 0, 0]
                if origin.get("usb_settings"):
                    settings = re.sub(r"\(.*\)", '', origin['usb_settings']).split(",")
                    pattern = [r"USB\s?2.\d", r"USB\s?3.\d", "[Tt]ype-?[cC]"]
                    for sett in settings:
                        for j in range(3):
                            if len(re.findall(pattern[j], sett)) > 0:
                                sett = re.sub(pattern[j], "", sett)
                                num = re.findall("\d+", sett)
                                num = 1 if len(num) == 0 else int(num[0])
                                usb[j] += num
                                break
                ports['usb2'], ports['usb3'], ports['type-c'] = usb
                # 其他接口，直接写接口名字
                ports['display'] = []
                if origin.get("other_ports"):
                    other_port = origin['other_ports']
                    if other_port.find("HDMI") >= 0:
                        ports['display'].append("HDMI")
                    if other_port.find("DisplayPort") >= 0 or other_port.find("DP") >= 0:
                        ports['display'].append("DisplayPort")
                    ports['headphone'] = other_port.find("耳机") >= 0
                    ports['thunderbolt'] = other_port.find("Thunderbolt") >= 0
                    ports['internet'] = other_port.find("RJ45") >= 0
                    ports['cd_driver'] = origin['has_cd_driver']
                laptop['interface'] = ports
                # 重量统一为Kg，只留数字
                laptop['weight'] = None
                if origin.get('weight'):
                    numbers = re.findall(r"\d+\.\d+|\d+", origin['weight'])[-1]
                    # 数值超过8的一般都是错误数据
                    laptop['weight'] = float(numbers) if float(numbers) < 8 else None
                laptop['thickness'] = None
                # 厚度检查后缀是否为mm，否则无效
                if origin.get('thickness'):
                    if origin['thickness'].endswith("mm"):
                        numbers = float(re.findall(r"\d+\.\d+|\d+", origin['thickness'])[-1])
                        while numbers > 90:
                            numbers = numbers / 10.0
                        laptop['thickness'] = numbers
                result.append(laptop)
            except Exception as e:
                print(e)
                print(origin)
                continue
        return result


if __name__ == '__main__':
    test = TaiPingYangCrawler().get_laptop_list(pages_limit=15)
    print(len(test))
    pprint.pprint(test)
    print("\n\n")
    test = TaiPingYangCrawler.unify_items(test)
    pprint.pprint(test)
    # 所有字段出现过的值汇总：
    status = dict.fromkeys(test[0].keys())
    for key, value in status.items():
        status[key] = set()
    for item in test:
        for key, value in item.items():
            status[key].add(str(value))
    print("\n\n")
    status.pop("pic_link")
    status.pop('name')
    status.pop('model')
    status.pop('price')
    pprint.pprint(status)
    with open('crawled_data/test', "w", encoding="utf-8") as file:
        file.write(pprint.pformat(test))
        file.write('\n----------------------------------------\n字段值情况：\n')
        file.write(pprint.pformat(status))
