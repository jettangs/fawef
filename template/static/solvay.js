exports.news = {
	body: `$('.magarticle-content.central-list')`,
	title: `find('.content-title').find('a').html()`,
	content: `$(".main-content").html()`,
	description: `find('.abstract').html()`,
	link: `find('.content-title').find('a').attr('href')`,
	cover: `find('.lxs-list-pic').find('img').attr('src')`,
	author: `solvay`,
	host: `www.solvay.com`,
	linkPrefix: `http://www.solvay.com`,
	coverPrefix: ``
}

let prefix = 'http://www.solvay.com/en/asking-more/index.html?page='

exports.pages = [
	`${prefix}0`,
    `${prefix}1`,
    `${prefix}2`,
    `${prefix}3`,
    `${prefix}4`,
    `${prefix}5`,
    `${prefix}6`
]