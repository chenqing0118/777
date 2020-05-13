import pprint
import re

from bs4 import BeautifulSoup

from crawl_codes.HTML_Downloader import HTMLDownloader


class TaiPingYangCrawler:
    LENOVO = "lenovo"
    ACER = "acer"
    ASUS = "asus"
    APPLE = "apple"
    DELL = "dell"
    HASEE = "hasee"
    ROG = "rog"
    HP = "hp"
    RAZER = "razer"
    HUAWEI = "huawei"

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
        for i in range(1, pages_limit):
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
            pic_div = BeautifulSoup(
                HTMLDownloader.get_page_content(item_url)['html'], features="html.parser").find(
                'div', class_="big-pic")
            if pic_div:
                item['pic_link'] = "https:" + pic_div.find('img')['src']
            else:
                item['pic_link'] = None
            item_spec_url = item_url.replace(".html", "_detail.html")
            specs = self._parse_item(item_spec_url)
            item.update(specs)
            result.append(item)
        print('|')
        return result

    def _parse_item(self, url):
        specs = {"model": None}
        html = HTMLDownloader.get_page_content(url)['html']
        soup = BeautifulSoup(html, features="html.parser")
        frame = soup.find('div', class_="area area-detailparams")
        for i in frame.find_all('div', class_='tips'):
            i.decompose()
        rows = []
        for i in frame.find_all('tbody'):
            rows.extend(i.find_all("tr"))
        # 准备工作完成
        mapping = {"型号别称": "model",
                   "产品定位": "type",
                   "产品分类": "type",
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
                   "电池类型": "battery",
                   "续航时间": "work_time",
                   "摄像头": "camera",
                   "无线网卡": "net_wireless",
                   "网卡": "net_wired",
                   "USB": "usb_settings",
                   "其它接口": "other_ports",
                   "厚度": "thickness",
                   "重量": "weight",
                   "外壳材质": "shell_material"
                   }
        for i in mapping.values():
            specs[i] = None
        try:
            for row in rows:
                key = row.th.getText().strip()
                value = row.td.getText().strip()
                real_key = mapping.get(key)
                if real_key:
                    real_value = value
                    #  数据预处理
                    if real_key == "model" or key == "cpu_name":
                        real_value = re.sub(r"\(.*\)", "", value)
                    if real_key == "type":
                        real_value = "其他"
                        if value.find("办公") >= 0:
                            real_value = "办公"
                        if value.find("轻薄") >= 0:
                            real_value = "轻薄"
                        if value.find("影音") >= 0:
                            real_value = "影音"
                        if value.find("游戏") >= 0:
                            real_value = "游戏"
                        if value.find("工作站") >= 0:
                            real_value = "工作站"
                    if real_key == "mem_type":
                        real_value = re.findall(r"L?DDP?R\d", value)[0]
                    if real_key == "has_cd_driver":
                        real_value = False if value.find("无") > -1 else True
                    specs[real_key] = real_value
        except Exception as e:
            print(url)
            print(e.with_traceback())
        print('.', end='')
        return specs
        pass

    @staticmethod
    def unify_items(item_list: list) -> list:
        for item in item_list:
            # 解析存储
            json = {"ssd": 0, "hdd": 0}
            if item['storage']:
                disks = item['storage'].split(',')
                for disk in disks:
                    volume = int(re.findall(r"\d+", disk)[0]) if disk.find("TB") < 0 else int(float(
                        re.findall(r"\d+", disk)[0]) * 1024)
                    if disk.find("SSD") >= 0:
                        json["ssd"] += volume
                    elif disk.find("HDD") >= 0:
                        json["hdd"] += volume
                if json['ssd'] == 0:
                    json["ssd"] = None
                if json['hdd'] == 0:
                    json["hdd"] = None
                item['storage'] = json
            # 价格格式化
            item['price'] = re.sub("￥", "", item['price'])
            # 内存类型格式化
            if item.get("mem_type") and item['mem_type'] == "LDDPR4":
                item['mem_type'] = "DDR4"
            # USB格式化，只存数量（usb2，usb3,type-c)
            usb = [0, 0, 0]
            if item.get("usb_settings"):
                settings = re.sub(r"\(.*\)", '', item['usb_settings']).split(",")
                for sett in settings:
                    pattern = [r"USB\s?2.\d", r"USB\s?3.\d", "[Tt]ype-?[cC]"]
                    for j in range(3):
                        if len(re.findall(pattern[j], sett)) > 0:
                            sett = re.sub(pattern[j], "", sett)
                            num = re.findall("\d+", sett)
                            num = 1 if len(num) == 0 else int(num[0])
                            usb[j] += num
                            break
                item['usb_settings'] = usb
            # 其他接口，直接写接口名字
            if item.get("other_ports"):
                ports_unified = set()
                ports = item['other_ports']
                if ports.find("HDMI") >= 0:
                    ports_unified.add("HDMI")
                if ports.find("DisplayPort") >= 0 or ports.find("DP") >= 0:
                    ports_unified.add("DisplayPort")
                if ports.find("耳机") >= 0:
                    ports_unified.add("headphone")
                if ports.find("Thunderbolt") >= 0:
                    ports_unified.add("Thunderbolt")
                if ports.find("RJ45") >= 0:
                    ports_unified.add("RJ45")
                item['other_ports'] = ports_unified if len(ports_unified) > 0 else None
            # 发售时间格式化
            # 发售时间一共3种格式：年；年-月；年-季。
            # 故统一转化为以下格式：yyyy_0;yyyy_mm;yyyy_[ABCD]对应春夏秋冬
            if item.get("sale_date"):
                if item["sale_date"].find("季") >= 0:
                    year_str = item["sale_date"].replace("春季", "A").replace(
                        "夏季", "B").replace("秋季", "C").replace("冬季", "D")
                    year_str = year_str.replace("年", "_")
                elif item["sale_date"].find("月") >= 0:
                    year_str = "_".join(re.findall(r"\d+", item["sale_date"]))
                else:
                    year_str = re.findall(r"\d+", item["sale_date"])[0] + "_0"
                item['sale_date'] = year_str
                # 电池字段过于杂乱，没有参考意义，丢弃
                # item.pop("battery", "404")
                # 屏幕属性一样很杂，但是有些用，暂时不动
                pass
                # 核显和集成几乎没有跑分数据，不好处理，所以单独列出
                if item['gpu_type'] and item['gpu_type'].find("独立") < 0:
                    item['gpu_mem'] = None
                # 续航时间，也不太靠谱
                if item.get('work_time'):
                    numbers = re.findall(r"\d+", item['work_time'])
                    if len(numbers) > 0:
                        item['work_time'] = numbers[-1]
                    else:
                        item['work_time'] = None  # 没有参考价值
                # 重量统一为Kg，只留数字
                if item.get('weight'):
                    numbers = re.findall(r"\d.\d+|\D\d[^.\d]", item['weight'])[-1]
                # 厚度检查后缀是否为mm，否则无效
                if item.get('thickness'):
                    if not item['thickness'].endswith("mm"):
                        item['thickness'] = None
        return item_list


if __name__ == '__main__':
    test = TaiPingYangCrawler().get_laptop_list(pages_limit=10)
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
