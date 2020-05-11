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
            item['price'] = row.find('td', class_="td__price").getText().strip()
            output.append(item)
    pprint.pprint(output)
    GPUs = set()
    CPUs = set()
    Resolutions = set()
    mems = set()
    for item in output:
        if item['price'].isspace():
            output.remove(item)
            continue
        GPUs.add(item['GPU'])
        mems.add(item['Memory'])
        Resolutions.add((item['Resolution']))
        cpu = re.findall(r'\((.*)\)', item['CPU'])[0]
        CPUs.add(cpu)

    with open("crawled_data/parts_set.txt", 'w')as file:
        file.write("\nGPUs:")
        file.write(pprint.pformat(GPUs))
        file.write("\nCPUs:")
        file.write(pprint.pformat(CPUs))
        file.write("\nResX:")
        file.write(pprint.pformat(Resolutions))
        file.write('\nMems:')
        file.write(pprint.pformat(mems))
    return list(CPUs), list(GPUs)


def get_benchmarks():
    html = HTMLDownloader.get_page_content("https://benchmarks-zh.onelink-translations.com/compare/best-cpus")['html']
    soup = BeautifulSoup(html, parser="lxml")
    rows = soup.find("table", class_="navigationtable").tbody.find_all('tr')
    cpu_ranks = dict()
    for row in rows:
        cpu_name = row.find('a').getText().strip()
        cpu_name = re.sub(' Processor', '', cpu_name)
        score = row.find('span', class_="bar-score").getText().strip()
        cpu_ranks[cpu_name] = score
    html = HTMLDownloader.get_page_content("https://benchmarks-zh.onelink-translations.com/compare/best-gpus")['html']
    soup = BeautifulSoup(html, parser="html.parser")
    rows = soup.find("table", class_="navigationtable").tbody.find_all('tr')
    gpu_ranks = dict()
    for row in rows:
        gpu_name = row.find('a').getText().strip()
        score = row.find('span', class_="bar-score").getText().strip()
        gpu_ranks[gpu_name] = score
    return cpu_ranks, gpu_ranks
    pass


if __name__ == '__main__':
    # 候选笔记本包含的所有cpu和gpu种类
    pprint.pprint(read_laptops())
    # 3DMark上所有有评分的cpu和gpu
    cpu_marks, gpu_marks = get_benchmarks()
    pprint.pprint(cpu_marks)
    pprint.pprint(gpu_marks)
