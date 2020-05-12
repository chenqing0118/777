import json
import pprint
import re
from crawl_codes.HTML_Downloader import HTMLDownloader

from bs4 import BeautifulSoup


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


def get_benchmarks():
    html = HTMLDownloader.get_page_content("https://benchmarks-zh.onelink-translations.com/compare/best-cpus")['html']
    soup = BeautifulSoup(html, features="html.parser")
    rows = soup.find("table", class_="navigationtable").tbody.find_all('tr')
    cpu_ranks = dict()
    for row in rows:
        cpu_name = row.find('a').getText().strip()
        cpu_name = re.sub(' Processor', '', cpu_name)
        score = row.find('span', class_="bar-score").getText().strip()
        cpu_ranks[cpu_name] = score
    html = HTMLDownloader.get_page_content("https://benchmarks-zh.onelink-translations.com/compare/best-gpus")['html']
    soup = BeautifulSoup(html, features="html.parser")
    rows = soup.find("table", class_="navigationtable").tbody.find_all('tr')
    gpu_ranks = dict()
    for row in rows:
        gpu_name = row.find('a').getText().strip()
        score = row.find('span', class_="bar-score").getText().strip()
        gpu_ranks[gpu_name] = score
    return cpu_ranks, gpu_ranks
    pass


def get_cpu_mark_mixed():
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
        item['cpu_name'] = " ".join(cpu_name.split()[1:])
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
    return cpu_ranks


if __name__ == '__main__':
    # 最终输出字符串
    file_string = ""
    # 候选笔记本,和包含的所有cpu和gpu种类
    laptops, laptop_cpu, laptop_gpu = read_laptops()
    # 3DMark上所有有评分的cpu和gpu
    dummy, gpu_marks = get_benchmarks()
    # pprint.pprint(cpu_marks)
    # pprint.pprint(gpu_marks)
    # 外网笔记本cpu评分记录网站
    cpu_ranks = get_cpu_mark_mixed()
    # 根据CPU取交集
    cpu_s = set()
    remove_count = 0
    for i in cpu_ranks:
        cpu_s.add(i['cpu_name'])

    for i in laptops:
        if i["CPU"] not in cpu_s:
            laptops.remove(i)
            remove_count += 1
    print(str(remove_count) + " laptops removed due to CPU.\n")
    file_string += "最终CPU集合：\n" + pprint.pformat(set(cpu_s.intersection(laptop_cpu)))
    # 根据显卡取交集
    gpu_s = set(gpu_marks.keys())
    remove_count = 0
    for i in laptops:
        if i["GPU"] not in gpu_s:
            laptops.remove(i)
            remove_count += 1
    print(str(remove_count) + " laptops removed due to GPU.\n")
    file_string += "\n最终GPU集合：\n" + pprint.pformat(gpu_s.intersection(laptop_gpu))
    laptop_names = set()
    # 整理笔记本型号
    for i in laptops:
        laptop_names.add(i['name'])
    file_string += "\n最终笔记本清单：\n" + pprint.pformat(laptop_names)
    file_string += "\n共：" + str(len(laptop_names)) + " 个型号.\n"

    with open('crawled_data/final_parts', "w", encoding="utf-8") as file:
        file.write(file_string)
