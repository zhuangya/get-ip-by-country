#GIP


## 简介

这是一个可以根据国家代码来得到对应分配到的 ip 段的工具
数据来源默认是 anpic `http://ftp.apnic.net/apnic/stats/apnic/delegated-apnic-latest`

也可以自己指定其他来源

## 安装

```bash
$ npm install -g get-ips-by-country
```

## 用法

获得中国的 ip 段:

```bash
$ gip CN
```

获得日本的 ip 段并且输出到 jp-ip.txt:

```bash
$ gip JP > jp-ip.txt
```
