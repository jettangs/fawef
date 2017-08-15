exports.news = {
	scroll: {top: 7000,left: 0},
	htmlEncode: false,
	body: `$('.row.pressrelease-content')`,
	title: `find('.category-title').find('.col-md-12.col-xs-12').eq(1).find('h2').find('a').html()`,
	content: `$(".col-md-8.col-content").html()`,
	description: `find('.description-link').find('.col-md-12.col-xs-12').eq(0).find('a').html()`,
	link: `find('.category-title').find('.col-md-12.col-xs-12').eq(1).find('h2').find('a').attr('href')`,
	cover: `find('.image-wrapper.col-md-2.col-xs-2').find('.link').find('.image-cpt-container').find('picture').find('img').attr('src')`,
	author: `basf`,
	host: `https://www.basf.com`,
	linkPrefix: `https://www.basf.com`,
	coverPrefix: `https://www.basf.com`
}
