import json
import pprint
import re

from crawl_codes.crawl_main import Benchmark
from crawl_codes.HTML_Downloader import HTMLDownloader
from crawl_codes.pc_online_crawler import TaiPingYangCrawler
from crawl_codes.mysqlconnector import MysqlConnector

connector = MysqlConnector()
connector.toggle_debug(True)
try:
    connector.connect_to_db('cdb-ctmslwcn.gz.tencentcdb.com', 'se', 'sufese777', "laptop", port=10020)
except Exception as e:
    raise e

connector.execute_raw_sql("TRUNCATE `laptop`.`temp`;")
connector.execute_raw_sql("insert into `temp` SELECT * FROM laptop.laptop_new;")

data = connector.query(['gpu'], limit=0)
gpus = set()
for i in data:
    gpus.add(i[0])
data = connector.query(['cpu'], limit=0)
cpus = set()
for i in data:
    cpus.add(i[0])

count = 0
columns = ['id', 'name', 'brand', 'type',
           'price', 'priceUrl', 'releaseTime',
           'cpu', 'gpu',
           'memorySize', 'memoryGen', 'memoryRate',
           'storage_ssd',
           'storage_hdd',
           'screenSize',
           'resolution',
           'refreshRate', 'gamut',
           'duration',
           'interface',
           'thickness',
           'weight',
           'pictures',
           'video'
           ]
data = connector.query(["laptop_new"], limit=0)  # pprint.pprint(data)
error_gpus = set()
error_cpus = set()
correct_set = list()
for item in data:
    cpu_name = item[7]
    gpu_name = item[8]
    if gpu_name not in gpus:
        error_gpus.add(gpu_name)
        count += 1
    elif cpu_name not in cpus:
        error_cpus.add(cpu_name)
        count += 1
pprint.pprint(error_gpus)
print(count)

error_cpus = list(error_cpus)
error_cpus.sort()
error_gpus = list(error_gpus)
error_gpus.sort()
for name in error_gpus:
    connector.delete("temp", " gpu = '" + name + "'")
for name in error_cpus:
    connector.delete("temp", " cpu = '" + name + "'")
