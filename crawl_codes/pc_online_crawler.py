import pprint
import re

from crawl_codes.HTML_Downloader import HTMLDownloader
from bs4 import BeautifulSoup


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
            if ignore and price == "概念产品":
                continue
            item['price'] = price
            title = row.find('a', class_="item-title-name")
            item['name'] = title.getText().strip()
            item_url = "https:" + title['href']
            item['pic_link'] = "https:" + \
                               BeautifulSoup(
                                   HTMLDownloader.get_page_content(item_url)['html'], features="html.parser").find(
                                   'div', class_="big-pic").find('img')['src']
            item_spec_url = item_url.replace(".html", "_detail.html")
            specs = self._parse_item(item_spec_url)
            item.update(specs)
            result.append(item)
        return result

    def _parse_item(self, url) -> dict:
        specs = dict()
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
                        if value.find("办公"):
                            real_value = "办公"
                        if value.find("轻薄"):
                            real_value = "轻薄"
                        if value.find("影音"):
                            real_value = "影音"
                        if value.find("游戏"):
                            real_value = "游戏"
                        if value.find("工作站"):
                            real_value = "工作站"
                    if real_key == "mem_type":
                        real_value = re.findall(r"DDR\d", value)[0]
                    if real_key == "has_cd_driver":
                        real_value = False if value.find("无") > -1 else True
                    specs[real_key] = real_value
        except Exception as e:
            print(url)
            print(e)
        return specs


if __name__ == '__main__':
    test = TaiPingYangCrawler().get_laptop_list(pages_limit=2)
    pprint.pprint(test)
