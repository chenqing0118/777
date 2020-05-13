import requests
import re


class HTMLDownloader(object):
    @staticmethod
    def get_page_content(url: str, header: dict = None, retry_time: int = 3):
        """
        获取HTML页面全部文字内容，去除js和css等装饰信息。
            :param url:网页URL，包括http协议头
            :param header:html请求头
            :param retry_time 尝试重连次数
            :return  网页所有信息,响应的url
            :except  UserWarning 连接失败抛出异常
        """
        result = {}
        (html, response_url) = HTMLDownloader.get_raw_page(url, header, retry_time)
        # 削去多余的空白符号，保留单个桩
        html = re.sub(r'[\n\r\t]', '\n', html)
        html = re.sub(r'\n+', '\n', html)
        html = re.sub(r' +', " ", html)

        # 削去 所有的 style 区域，精简结果
        html = re.sub(r'<style.*?>.*?/style>', "###style texts###", html, flags=re.S)

        # # 收集页面id信息，解析可能用得到
        # id_dict = {'newLemmaIdEnc': re.compile(r'\bnewLemmaIdEnc:"(.*?)"'),
        #            'LemmaId': re.compile(r'\blemmaId:"(.*?)"'),
        #            'newLemmaId': re.compile(r'\bnewLemmaId:"(.*?)"'),
        #            'subLemmaId': re.compile(r'\bsubLemmaId:"(.*?)"')}
        #
        # for key, pattern in id_dict.items():
        #     find = re.findall(pattern, html)
        #     result[key] = find[0] if len(find) > 0 else None

        # 削去所有 js 内容（可能有问题）
        html = re.sub(r'<script.*?>.*?/script>', "###java script###", html, flags=re.S)
        # 返回页面内容和真实响应url
        result['html'] = html
        result['response_url'] = re.sub(r'\?.*', '', response_url)

        return result

    @staticmethod
    def get_raw_page(url: str, header: dict = None, retry_time: int = 3) -> tuple:
        """
        获取HTML页面全部原生内容。
            :param url:网页URL，包括http协议头
            :param header:html请求头
            :param retry_time 尝试重连次数
            :return  网页所有信息,响应的url
            :except  UserWarning 连接失败抛出异常
        """
        # 处理/生成请求头
        if header is None:
            # 生成默认请求头
            internal_header = {"Accept": "*/*",
                               "Accept-Language": "en-US,en;q=0.8",
                               "Cache-Control": "max-age=0",
                               "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) \
                                                AppleWebKit/537.36 (KHTML, like Gecko) \
                                                Chrome/48.0.2564.116 Safari/537.36",
                               "Connection": "keep-alive",
                               "Referer": "https://pcpartpicker.com/products/laptop/"
                               }
        else:
            internal_header = header

        # 尝试 @retry_time 次连接
        fail_count = 0
        if retry_time < 1:
            retry_time = 1
        while fail_count < retry_time:
            try:
                # 获取内容
                response = requests.get(url, headers=internal_header, timeout=5)
                response.raise_for_status()
            except:
                # 记录失败，重试连接
                fail_count += 1
                # debug output
                print("%s connection fail %s" % url, fail_count)
                continue
            else:
                # 获取成功操作
                # 组织页面的全部信息
                result = response.content.decode(response.encoding, errors="ignore")
                return result, response.url
        # 连接失败，抛异常
        raise UserWarning("connection failed {} times.".format(retry_time))

    @staticmethod
    def send_post(url: str, data: dict, header: dict = None, retry_time=1) -> dict:
        """
        模仿浏览器向服务器提出post请求，用于获取内部数据
            :param url 网页URL，包括http协议头
            :param data 夹在post中发送的数据
            :param header:html请求头
            :param retry_time 尝试重连次数
            :return  网页返回的数据包
            :except  UserWarning 连接失败抛出异常
        """
        # 处理/生成请求头
        if header is None:
            # 生成默认请求头
            internal_header = {"Accept": "*/*",
                               "Accept-Language": "en-US,en;q=0.8",
                               "Cache-Control": "max-age=0",
                               "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) \
                                                        AppleWebKit/537.36 (KHTML, like Gecko) \
                                                        Chrome/48.0.2564.116 Safari/537.36",
                               "Connection": "keep-alive"
                               }
        else:
            internal_header = header

        # 尝试 @retry_time 次连接
        fail_count = 0
        if retry_time < 1:
            retry_time = 1
        while fail_count < retry_time:
            try:
                # 获取内容
                response = requests.post(url=url, headers=internal_header, data=data)
            except Exception as e:
                # 记录失败，重试连接
                fail_count += 1
                # debug output
                print(e.with_traceback())
                print("%s：post fail %s" % url, fail_count)
                continue
            else:
                return response
        # 连接失败，抛异常
        raise UserWarning("connection failed {} times.".format(retry_time))

        pass
