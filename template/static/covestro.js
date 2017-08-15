exports.news = {
	body: `$('.lxs-list-content')`,
	title: `find('.headline').find('a').html()`,
	content: `$(".container-content").html()`,
	description: `find('.underline').html()`,
	link: `find('.headline').find('a').attr('href')`,
	cover: `find('img').attr('src')`,
	author: `covestro`,
	host: `https://www.covestro.com/`,
	linkPrefix: `https://press.covestro.com/news.nsf/id/`,
	coverPrefix: `https://press.covestro.com/news.nsf/id/`
}

let prefix = 'https://press.covestro.com/news.nsf/id/Home_EN?Open&sNEWS='

exports.pages = [
    `${prefix}1`,
    `${prefix}11`,
    `${prefix}21`,
    `${prefix}31`,
    `${prefix}41`,
    `${prefix}51`,
    `${prefix}61`,
    `${prefix}71`,
    `${prefix}81`,
	`${prefix}91`
]