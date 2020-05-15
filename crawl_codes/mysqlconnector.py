# coding=utf-8
import pymysql

CHARSET = 'utf8mb4'


# noinspection PyBroadException
class MysqlConnector:

    def __init__(self, url: str = None, username: str = None, password: str = None, dbname: str = None,
                 port=3306) -> None:
        self._url = None
        self._username = None
        self._password = None
        self._dbname = None
        self._debug = False
        self._dbconn = None
        if not (url is None and username is None):
            self.connect_to_db(url, username, password, dbname, port)

    def toggle_debug(self, t_or_f: bool) -> None:
        self._debug = t_or_f

    def connect_to_db(self, url: str, username: str, passwd: str, dbname: str, port=3306) -> bool:
        self._url = url
        self._username = username
        self._password = passwd
        self._dbname = dbname
        try:
            self._dbconn = pymysql.connect(url, username, passwd, dbname, port)
            if self._debug:
                print('connection successful to ' + url + ' as ' + username)
            return True
        except Exception as e:
            raise e

    def execute_raw_sql(self, sql_statement: str):
        if self._debug:
            print(sql_statement)
        cursor = self._dbconn.cursor()
        try:
            # 执行sql语句
            cursor.execute(sql_statement)
            # 提交到数据库执行
            self._dbconn.commit()
            results = cursor.fetchall()
            return results
        except:
            # 如果发生错误则回滚
            self._dbconn.rollback()
            return None

    def create_table(self, table_name: str, column_args: list, overwrite: bool = False):
        sqlstmt = ""
        if overwrite:
            sqlstmt += "DROP TABLE IF EXISTS " + str.lower(table_name) + ";"
        sqlstmt += "CREATE TABLE IF NOT EXISTS "
        sqlstmt += str.lower(table_name) + "("
        for args in column_args:
            sqlstmt += args + ","
        sqlstmt = sqlstmt[:-1] + ")CHARSET = utf8mb4"
        self.execute_raw_sql(sqlstmt)

    def create_schema(self, schema_name: str) -> bool:
        self.execute_raw_sql("CREATE SCHEMA IF NOT EXISTS" + str.lower(schema_name))

    def insert_one(self, table: str, values: dict):
        arglist = []
        sqlstmt = "INSERT INTO " + str.lower(table) + "("
        value_statement = "("
        for key, value in values.items():
            sqlstmt += key + ','
            arglist.append(value)
            value_statement += "%s" + ","
        sqlstmt = sqlstmt[:-1] + ") VALUES" + value_statement[:-1] + ")"
        cursor = self._dbconn.cursor()
        if self._debug:
            print(sqlstmt)
        try:
            # 执行sql语句
            cursor.execute(sqlstmt, arglist)
            # 提交到数据库执行
            self._dbconn.commit()
            return True
        except Exception as e:
            # 如果发生错误则回滚
            print(e)
            self._dbconn.rollback()
            return False

    def insert_unique(self, table: str, columns: list, values_list: list, overwrite=False):
        if overwrite:
            sqlstmt = "INSERT INTO " + str.lower(table) + "("
        else:
            sqlstmt = "INSERT IGNORE INTO " + str.lower(table) + "("
        value_statement = "("
        for key in columns:
            sqlstmt += key + ","
            value_statement += "%s " + ","
        sqlstmt = sqlstmt[:-1] + ") VALUES" + value_statement[:-1] + ")"
        if overwrite:
            sqlstmt += "on duplicate key update "
            for key in columns:
                sqlstmt += key + "=values(" + key + "),"
                sqlstmt = sqlstmt[:-1]
        if self._debug:
            print(sqlstmt)
        cursor = self._dbconn.cursor()
        try:
            # 执行sql语句
            cursor.executemany(sqlstmt, values_list)
            # 提交到数据库执行
            self._dbconn.commit()
        except:
            # 如果发生错误则回滚
            self._dbconn.rollback()

    def insert_many(self, table: str, columns: list, values_list: list):
        """
        向SQL中批量插入数据。
        """
        sqlstmt = "INSERT INTO " + str.lower(table) + "("
        value_statement = "("
        for key in columns:
            sqlstmt += key + ','
            value_statement += "%s " + ","
        sqlstmt = sqlstmt[:-1] + ") VALUES" + value_statement[:-1] + ")"
        cursor = self._dbconn.cursor()
        try:
            # 执行sql语句
            cursor.executemany(sqlstmt, values_list)
            # 提交到数据库执行
            self._dbconn.commit()
        except:
            # 如果发生错误则回滚
            self._dbconn.rollback()
            return False

    def delete(self, table: str, selection: str):
        sqlstmt = "DELETE FROM " + table + " WHERE " + selection
        self.execute_raw_sql(sqlstmt)

    def query(self, tables: list, columns: list = None, selection: str = None, groupby: str = None,
              having: str = None,
              orderby: str = None,
              limit: int = 500) -> list:
        """
        返回双层list
        """
        sqlstmt = "SELECT "
        if columns is None:
            sqlstmt += "*"
        else:
            for column in columns:
                sqlstmt += column + ','
            sqlstmt = sqlstmt[:-1]
        sqlstmt += " FROM "
        for table in tables:
            sqlstmt += (table + ",")
        sqlstmt = sqlstmt[:-1]
        if selection is not None:
            sqlstmt += " WHERE " + selection
        if groupby is not None:
            sqlstmt += " GROUP BY " + groupby
        if having is not None:
            sqlstmt += " HAVING " + having
        if orderby is not None:
            sqlstmt += " ORDER BY " + orderby
        if limit not in (None, 0):
            sqlstmt += " LIMIT " + str(limit)
        if self._debug:
            print(sqlstmt)
        cursor = self._dbconn.cursor()
        cursor.execute(sqlstmt)
        results = cursor.fetchall()
        return results

    def update(self, table: str, new_values: dict, selection: str):
        sqlstmt = "UPDATE " + table + " SET "
        for key, value in new_values.items():
            if type(value) is str:
                sqlstmt += key + "='" + value + "',"
            else:
                sqlstmt += key + "=" + value + ","
        sqlstmt = sqlstmt[:-1] + " WHERE " + selection
        self.execute_raw_sql(sqlstmt)

    def get_raw_conn(self):
        return self._dbconn

    def __del__(self):
        if self._dbconn is not None:
            self._dbconn.close()
