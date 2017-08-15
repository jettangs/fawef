exports.news = {
	body: `$('.lxs-list-content')`,
	title: `find('.headline').find('a').html()`,
	content: `$(".lxs-news-detail").html()`,
	description: `find('.bodytext').html()`,
	link: `find('.headline').find('a').attr('href')`,
	cover: `find('.lxs-list-pic').find('img').attr('src')`,
	author: `lanxess`,
	host: `https://www.lanxess.com`,
	linkPrefix: ``,
	coverPrefix: `https://www.lanxess.com`
}

let prefix = 'https://lanxess.com/corporate/media/press-releases/trade-technical/'

exports.pages = [
	`${prefix}`,
    `${prefix}1/`,
    `${prefix}2/`,
    `${prefix}3/`,
    `${prefix}4/`,
    `${prefix}5/`,
    `${prefix}6/`,
    `${prefix}7/`,
    `${prefix}8/`,
    `${prefix}9/`
]