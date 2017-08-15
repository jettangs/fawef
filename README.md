# sz_news_crawler
#### 描述：
新闻爬虫，适用于爬取各大网站的新闻信息，可根据模版爬取新闻标题，概要，图片，内容等信息，自动保存到数据库。(目前仅支持PostgreSQL)

#### 原理：
根据新闻列表的网页地址，先爬取新闻的标题，概要，图片，再由地址进入到新闻主页中爬取内容，最后保存到数据库中。

#### 用法：
列表页面采用懒加载并且无法URL的请尝试使用`app_scroll.js`和scroll模版,原理是模拟页面滚动来获取动态加载的内容，其他情况请使用`app_static.js`和static模版。

模版说明:
static模版
```javascript
exports.news = {
    //是否进行html解码(适用于html编码的中文网页）
    htmlEncode: true,
    //新闻主体(列表页)
	body: `$('.magarticle-content.central-list')`,
	//新闻标题(列表页)
	title: `find('.content-title').find('a').html()`,
	//新闻内容(详情页）
	content: `$(".main-content").html()`,
	//新闻概要(列表页)
	description: `find('.abstract').html()`,
	//新闻链接(列表页)
	link: `find('.content-title').find('a').attr('href')`,
	//新闻主图(列表页)
	cover: `find('.lxs-list-pic').find('img').attr('src')`,
	//作者
	author: `solvay`,
	//域名
	host: `www.solvay.com`,
	//新闻链接地址前缀
	linkPrefix: `http://www.solvay.com`,
	//新闻主图地址前缀
	coverPrefix: ``
}

//新闻列表页地址前缀
let prefix = 'http://www.solvay.com/en/asking-more/index.html?page='

//保存新闻的所有列表页
exports.pages = [
	`${prefix}0`,
    `${prefix}1`,
    `${prefix}2`,
    `${prefix}3`,
    `${prefix}4`,
    `${prefix}5`,
    `${prefix}6`
]
```

scroll模版
在news对象上增加了scroll属性，移除了pages对象
