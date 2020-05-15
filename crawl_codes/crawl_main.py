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

    def _get_3d_mark(self):
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
            gpu_ranks = dict()
            for row in rows:
                gpu_name = row.find('a').getText().strip()
                score = row.find('span', class_="bar-score").getText().strip()
                gpu_ranks[gpu_name] = score
            self.gpu_bench = gpu_ranks
            return gpu_ranks

    def _get_cinebench(self):
        if self.cpu_bench is not None:
            return self.cpu_bench
        else:
            """
                从以下网址获取cpu跑分情况
                :return:
                """
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
                item['cpu_name'] = re.sub("-", " ", " ".join(cpu_name.split()))
                pivot = pivot.next_sibling
                main_clock_speed = pivot.getText().strip().split('‑')
                if len(main_clock_speed) > 1:
                    item['Mhz'], item['Mhz_turbo'] = main_clock_speed[0].strip(), main_clock_speed[0].strip()
                else:
                    item['Mhz'], item['Mhz_turbo'] = main_clock_speed[0].strip(), None
                pivot = pivot.next_sibling
                cores = pivot.getText().strip().split('/')
                if len(cores) > 1:
                    item['cores'], item['threads'] = cores[0].strip(), cores[0].strip()
                else:
                    item['cores'], item['threads'] = cores[0].strip(), cores[0].strip()
                score = row.find("span", class_='bl_med_val_244_705')
                # 跑分分数获取
                if score:
                    item['score_Cine15single'] = score.getText().strip()
                else:
                    continue
                score = row.find("span", class_='bl_med_val_244_706')
                if score:
                    item['score_Cine15Multi'] = score.getText().strip()
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
            cpu_s.add(item['cpu_name'])
        return cpu_s

    def get_gpu_s(self):
        if self.gpu_bench is None:
            self._get_3d_mark()
        gpu_s = set(self.gpu_bench.keys())
        return gpu_s

    def filter_laptops(self, laptop_list: list):
        cpu_s = self.get_cpu_s()
        gpu_s = self.get_gpu_s()
        c_remove_count = 0
        g_remove_count = 0
        for laptop in laptop_list:
            if laptop["cpu"] not in cpu_s:
                laptops.remove(laptop)
                c_remove_count += 1
                continue
            if not (laptop['gpu']) == "#intergrated":
                if laptop["gpu"] not in gpu_s:
                    laptops.remove(laptop)
                    g_remove_count += 1
                    continue
        print(str(c_remove_count) + " laptops removed due to CPU.")
        print(str(g_remove_count) + " laptops removed due to GPU.")
        print(str(len(laptop_list)) + " laptops remaining.")
        return laptop_list


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
    result = []
    mark = Benchmark()
    for brand in TaiPingYangCrawler.BRANDS:
        laptops = TaiPingYangCrawler.unify_items(TaiPingYangCrawler().get_laptop_list(brand=brand, pages_limit=1))
        laptops = mark.filter_laptops(laptops)
        for item in laptops:
            item['brand'] = brand
        result.extend(laptops)

    cpus = set()
    gpus = set()
    for i in result:
        cpus.add(i['cpu'])
        gpus.add(i['gpu'])
    pprint.pprint(cpus)
    print('\n\n')
    pprint.pprint(gpus)
    with open('crawled_data/test', "w", encoding="utf-8") as file:
        file.write('\n----------------------------------------\n字段值情况：\n')
        file.write(pprint.pformat(result))

    # 尝试写入mysql，临时表
    connector = MysqlConnector()
    try:
        connector.connect_to_db('cdb-ctmslwcn.gz.tencentcdb.com', 'se', 'sufese777', "laptop", port=10020)
    except Exception as e:
        raise e
    columns = ['name',
               'brand',
               'type',
               'price',
               'releaseTime',
               'cpu', 'gpu',
               'memorySize',
               'memoryGen',
               'memoryRate',
               'storage',
               'screenSize',
               'resolution',
               'refreshRate', 'gamut',
               'duration',
               'interface',
               'thickness',
               'weight',
               # 'pictures'
               ]
    values = list()
    for laptop in result:
        item = list()
        for column in columns:
            item.append(laptop[column])
        values.append(item)
    connector.insert_many("laptop_input_test", columns, values)
