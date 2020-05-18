import json
import pprint
import re
from crawl_codes.HTML_Downloader import HTMLDownloader

from bs4 import BeautifulSoup
from crawl_codes.mysqlconnector import MysqlConnector
from crawl_codes.pc_online_crawler import TaiPingYangCrawler


class Benchmark(object):

    def __init__(self):
        self.cpu_bench = None
        self.gpu_bench = None

    def _get_gpu_mem(self):
        result = dict()
        html = HTMLDownloader.get_page_content("http://www.mydrivers.com/zhuanti/tianti/gpu/index_amd.html")[
            'html']
        soup = BeautifulSoup(html, features="html.parser")
        rows = soup.find('div', class_="main").table.find_all('tr', class_=None)
        for row in rows:
            if len(row.find_all('td')) < 4:
                continue
            name = "AMD Radeon " + re.sub('Radeon ', " ", row.find('td').getText().strip())
            mem = re.findall(r"\d+[MG]B", "#".join(row.stripped_strings))
            if mem:
                if mem[-1].endswith("MB"):
                    mem = float(mem[-1][:-2]) / 1024
                else:
                    mem = float(mem[-1][:-2])
                result[name] = mem
        html = HTMLDownloader.get_page_content("http://www.mydrivers.com/zhuanti/tianti/gpu/index_nvidia.html")[
            'html']
        soup = BeautifulSoup(html, features="html.parser")
        rows = soup.find('div', class_="main").table.find_all('tr', class_=None)
        for row in rows:
            name = "NVIDIA Geforce " + row.find('td').getText().strip()
            mem = re.findall(r"\d+[MG]B", "#".join(row.stripped_strings))
            if mem:
                if mem[-1].endswith("MB"):
                    mem = float(mem[-1][:-2]) / 1024
                else:
                    mem = float(mem[-1][:-2])
                result[name] = mem
        html = HTMLDownloader.get_page_content("http://www.mydrivers.com/zhuanti/tianti/gpum/index_nvidia_m.html")[
            'html']
        soup = BeautifulSoup(html, features="html.parser")
        rows = soup.find('div', class_="main").table.find_all('tr', class_=None)
        for row in rows:
            name = "NVIDIA Geforce " + row.find('td').getText().strip()
            mem = re.findall(r"\d+[MG]B", "#".join(row.stripped_strings))
            if mem:
                if mem[-1].endswith("MB"):
                    mem = float(mem[-1][:-2]) / 1024
                else:
                    mem = float(mem[-1][:-2])
                result[name] = mem
        html = HTMLDownloader.get_page_content("http://www.mydrivers.com/zhuanti/tianti/gpum/index_amd_m.html")[
            'html']
        soup = BeautifulSoup(html, features="html.parser")
        rows = soup.find('div', class_="main").table.find_all('tr', class_=None)
        for row in rows:
            name = re.sub('Radeon ', " ", row.find('td').getText().strip())
            if len(name) < 7:
                name = "AMD Radeon HD " + name
            else:
                name = 'AMD Radeon ' + name
            mem = re.findall(r"\d+[MG]B", "#".join(row.stripped_strings))
            if mem:
                if mem[-1].endswith("MB"):
                    mem = float(mem[-1][:-2]) / 1024
                else:
                    mem = float(mem[-1][:-2])
                result[name] = mem
        return result

    def _get_stats(self):
        if self.gpu_bench is not None:
            return self.gpu_bench
        else:
            # html = HTMLDownloader.get_page_content("https://benchmarks-zh.onelink-translations.com/compare/best-cpus")[
            #     'html']
            # soup = BeautifulSoup(html, features="html.parser")
            # rows = soup.find("table", class_="navigationtable").tbody.find_all('tr')
            # cpu_ranks = dict()
            # for row in rows:
            #     cpu_name = row.find('a').getText().strip()
            #     cpu_name = re.sub(' Processor', '', cpu_name)
            #     score = row.find('span', class_="bar-score").getText().strip()
            #     cpu_ranks[cpu_name] = score
            html = HTMLDownloader.get_page_content("https://benchmarks-zh.onelink-translations.com/compare/best-gpus")[
                'html']
            soup = BeautifulSoup(html, features="html.parser")
            rows = soup.find("table", class_="navigationtable").tbody.find_all('tr')
            mems = self._get_gpu_mem()
            gpu_stats = []
            for row in rows:
                gpu_item = dict()
                gpu_name = row.find('a').getText().strip()
                gpu_item['name'] = gpu_name
                score1 = row.find('span', class_="bar-score").getText().strip()
                try:
                    score1 = int(score1)
                except Exception as e:
                    gpu_item['score'] = 0
                else:
                    gpu_item['score'] = score1
                if mems.get(gpu_name):
                    gpu_item['memory'] = mems[gpu_name]
                else:
                    gpu_item['memory'] = 0

                gpu_stats.append(gpu_item)
            self.gpu_bench = gpu_stats
            return gpu_stats

    def _get_cinebench(self):
        """
                        从以下网址获取cpu跑分情况
                        :return:
                        """
        if self.cpu_bench is not None:
            return self.cpu_bench
        else:
            html = HTMLDownloader.get_page_content(
                "https://www.notebookcheck.net/Mobile-Processors-Benchmark-List.2436.0.html" +
                "?type=&sort=&archive=1&or=0&3dmark06cpu=1&cinebench_r15_single=1&cinebench_r15_multi=1&cinebench_r20_multi=1" +
                "&cpu_fullname=1&mhz=1&turbo_mhz=1&cores=1&threads=1")['html']
            soup = BeautifulSoup(html, features="lxml")
            rows = soup.find("table", id="sortierbare_tabelle").find_all('tr', class_=re.compile(r"even|odd"))
            cpu_ranks = list()
            for row in rows:
                for i in row.find_all('sup'):
                    i.decompose()
                item = {}
                pivot = row.find("td", class_="specs").next_sibling
                # cpu基本信息获取
                cpu_name = pivot.getText().strip()
                cpu_name = re.sub("-", " ", " ".join(cpu_name.split()))
                # 预选cpu : AMD 只要 Ryzen 系列
                # Intel留Xeon，Celeron，奔腾，酷睿 7XXX以上
                if cpu_name.startswith("AMD"):
                    if cpu_name.find("Ryzen") < 0:
                        continue
                elif cpu_name.startswith("Intel"):
                    if cpu_name.find("Celeron") >= 0 or cpu_name.find('Pentium') >= 0 or cpu_name.find("Xeon") >= 0:
                        pass
                    elif cpu_name.find("Core i") >= 0:
                        if int(cpu_name.split()[-1][0]) in (2, 3, 4, 5, 6):
                            continue
                    elif cpu_name.find("Core M >= 0"):
                        pass
                    else:
                        continue
                item['name'] = cpu_name
                pivot = pivot.next_sibling
                main_clock_speed = pivot.getText().strip().split('‑')
                if main_clock_speed[0]:
                    if len(main_clock_speed) > 1:
                        item['clock'], item['maxClock'] = \
                            int(main_clock_speed[0].strip()), int(main_clock_speed[1].strip())
                    else:
                        item['clock'], item['maxClock'] = \
                            int(main_clock_speed[0].strip()), int(main_clock_speed[0].strip())
                else:
                    item['clock'], item['maxClock'] = None, None
                pivot = pivot.next_sibling
                cores = pivot.getText().strip().split('/')
                if cores[0]:
                    if len(cores) > 1:
                        item['cores'], item['threads'] = int(cores[0].strip()), int(cores[1].strip())
                    else:
                        item['cores'], item['threads'] = int(cores[0].strip()), int(cores[0].strip())
                else:
                    item['cores'], item['threads'] = None, None
                score = row.find("span", class_='bl_med_val_244_705')
                # 跑分分数获取
                if score:
                    item['singleCore'] = score.getText().strip()
                else:
                    continue
                score = row.find("span", class_='bl_med_val_244_706')
                if score:
                    item['multiCore'] = score.getText().strip()
                else:
                    continue
                score = row.find("span", class_='bl_med_val_671_2014')
                if score:
                    item['score_Cine20'] = score.getText().strip()
                else:
                    item['score_Cine20'] = None
                cpu_ranks.append(item)
            self.cpu_bench = cpu_ranks
        return cpu_ranks

    def get_cpu_s(self):
        if self.cpu_bench is None:
            self._get_cinebench()
        cpu_s = set()
        for item in self.cpu_bench:
            cpu_s.add(item['name'])
        return cpu_s

    def get_gpu_s(self):
        if self.gpu_bench is None:
            self._get_stats()
        gpu_s = set()
        for item in self.gpu_bench:
            gpu_s.add(item['name'])
        return gpu_s

    def filter_laptops(self, laptop_list: list):
        result_list = []
        cpu_s = self.get_cpu_s()
        gpu_s = self.get_gpu_s()
        c_remove_count = 0
        g_remove_count = 0
        for laptop in laptop_list:
            if laptop["cpu"] not in cpu_s:
                c_remove_count += 1
                continue
            if laptop['gpu'] == "#intergrated" or laptop["gpu"] in gpu_s:
                pass
            else:
                g_remove_count += 1
                continue
            result_list.append(laptop)
        print(str(c_remove_count) + " laptops removed due to CPU.")
        print(str(g_remove_count) + " laptops removed due to GPU.")
        print(str(len(laptop_list)) + " laptops remaining.")
        return result_list


def read_laptops():
    output = []
    for i in range(1, 5):
        with open('crawled_data/laptop_' + str(i) + '.txt', 'r', encoding='utf-8') as file:
            resultjson = json.loads(file.read())
        soup = BeautifulSoup(resultjson['result']['html'], parser='html.parser')
        ratings = soup.find_all('div', class_="td__rating")
        for rating in ratings:
            rating.decompose()
        buttons = soup.find_all('button')
        for button in buttons:
            button.decompose()
        table_rows = soup.find_all('tr')
        for row in table_rows:
            item = dict()
            item['name'] = row.find("div", class_="td__nameWrapper").getText().strip()
            specs = row.find_all("td", class_="td__spec")
            for spec in specs:
                key = spec.h6.getText().strip()
                spec.h6.decompose()
                value = spec.getText().strip()
                item[key] = value
            item["CPU"] = re.findall(r'\((.*)\)', item['CPU'])[0]
            item['price'] = row.find('td', class_="td__price").getText().strip()
            output.append(item)
    gpu_s = set()
    cpu_s = set()
    resolutions = set()
    mem_s = set()
    for item in output:
        gpu_s.add(item['GPU'])
        mem_s.add(item['Memory'])
        resolutions.add((item['Resolution']))
        cpu = item['CPU']
        cpu_s.add(cpu)
    with open("crawled_data/parts_set.txt", 'w', encoding="utf8")as file:
        file.write("笔记本中的硬件种类集合：\nGPU:")
        file.write(pprint.pformat(gpu_s))
        file.write("\nCPU:")
        file.write(pprint.pformat(cpu_s))
        file.write("\n分辨率:")
        file.write(pprint.pformat(resolutions))
        file.write('\n内存:')
        file.write(pprint.pformat(mem_s))
    return output, cpu_s, gpu_s


if __name__ == '__main__':
    # 数据库接口初始化
    connector = MysqlConnector()
    columns = ['name', 'brand', 'type',
               'price', 'priceUrl',
               'cpu', 'gpu',
               'memorySize', 'memoryGen', 'memoryRate',
               'storage',
               'screenSize',
               'resolution',
               'refreshRate', 'gamut',
               'duration',
               'interface',
               'thickness',
               'weight',
               'pictures',
               'releaseTime']
    try:
        connector.connect_to_db('cdb-ctmslwcn.gz.tencentcdb.com', 'se', 'sufese777', "laptop", port=10020)
    except Exception as e:
        raise e
    connector.toggle_debug(True)
    # cpu，gpu型号统计：
    cpus = set()
    gpus = set()

    result = []
    mark = Benchmark()
    for brand in TaiPingYangCrawler.BRANDS:
        laptops = TaiPingYangCrawler.unify_items(TaiPingYangCrawler().get_laptop_list(brand=brand, pages_limit=10))
        laptops = mark.filter_laptops(laptops)
        for item in laptops:
            item['brand'] = brand
        print("writing brand: " + brand)
        # 尝试写入mysql，临时表
        values = list()
        for laptop in laptops:
            #   cpu，gpu型号统计
            cpus.add(laptop['cpu'])
            gpus.add(laptop['gpu'])
            # 组织提交数据包
            item = list()
            for column in columns:
                item.append(laptop[column])
            values.append(item)
        connector.insert_many("laptop_input_test", columns, values)

        print("gpu type count:" + str(len(gpus)))
        print("cpu type count:" + str(len(cpus)))

    try:
        connector.connect_to_db('cdb-ctmslwcn.gz.tencentcdb.com', 'se', 'sufese777', "laptop", port=10020)
    except Exception as e:
        raise e
    cpu_keys = ['name', 'cores', 'threads', 'clock', 'maxClock', 'singleCore', 'multiCore']
    cpu_stats = mark.cpu_bench
    values = list()
    for cpu in cpu_stats:
        item = list()
        if cpu['name'] not in cpus:
            continue
        else:
            for column in cpu_keys:
                item.append(cpu[column])
            values.append(item)
    connector.insert_unique("cpu", cpu_keys, values)

    try:
        connector.connect_to_db('cdb-ctmslwcn.gz.tencentcdb.com', 'se', 'sufese777', "laptop", port=10020)
    except Exception as e:
        raise e
    gpu_keys = ['name', 'memory', 'score']
    gpu_stats = mark.gpu_bench
    values.clear()
    for gpu in gpu_stats:
        item = list()
        if gpu['name'] not in gpus:
            continue
        else:
            for column in gpu_keys:
                item.append(gpu[column])
            values.append(item)
    connector.insert_unique("gpu", gpu_keys, values)

    pprint.pprint(gpus)
    pprint.pprint(values)
    print(len(gpus))
    print(len(values))
