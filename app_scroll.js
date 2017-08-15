"use strict";
const fs = require('fs');
const he = require("he");
const asyncs = require("async")
const cheerio = require('cheerio');
const phantom = require('phantom');
const Sequelize = require('sequelize')
const config = require('./config')
const t = require('./template/scroll/basf')

const sequelize = new Sequelize(config.db);

const News = sequelize.define('news', {
    title: { type: Sequelize.STRING, allowNull: false},
    description: { type: Sequelize.STRING(500), allowNull: false},
    cover: { type: Sequelize.STRING, allowNull: false},
    content: { type: Sequelize.TEXT, allowNull: false},
    link: { type: Sequelize.STRING, allowNull: false},
    host: { type: Sequelize.STRING, allowNull: false},
    author: { type: Sequelize.STRING, allowNull: false},
},{
  timestamps: false,
  tableName: config.table
});

News.sync();

let news_list = []

let q = asyncs.queue((news,callback) => {
  (async () => {
    try{
        console.log("Opening News Page => "+news.link);
        const instance = await phantom.create(['--load-images=no']);
        const page = await instance.createPage();
        await page.on("onResourceRequested", function(requestData) {
            console.info('Requesting', requestData.url)
        });
        const status = await page.open(news.link);
        const content = await page.property('content');
        const $ = cheerio.load(content)
        //console.log("content ->"+$(".container-content").html())
        let cont = eval(t.news.content)
        cont = cont? cont : "no content"
        news['content'] = t.news.htmlEncode? he.decode(cont) : cont
        News.create(news)
        await instance.exit();
        callback()        
    }catch(e){console.log(e)}
  })()
})

q.saturated = function() { 
    console.info('all workers to be used'); 
}

q.drain = () => {
    console.log('all urls have been processed');
    //fs.writeFile('news.txt', JSON.stringify(news_list), function(err){ if (err) throw err });
    sequelize.close()
}

(async () => {
  	
    const instance = await phantom.create(['--load-images=no']);
    const page = await instance.createPage();
    await page.on("onResourceRequested", function(requestData) {
        console.log('Requesting', requestData.url)
    });
    await page.on("onLoadFinished",function(requestData) {
        console.info('onLoadFinished')
    });
    await page.on("onResourceTimeout",function(requestData) {
        console.info('Requesting Timeout', requestData.url)
    });
    await page.property('viewportSize', {width: 1920, height: 1080})

    const status = await page.open("https://www.basf.com/cn/zh/company/news-and-media/news-releases.html");
    
    await page.property('scrollPosition', t.news.scroll)
    console.log("await...")
    await sleep(2000)
    console.log("continue")

    // await page.property('scrollPosition', {
    //   top: 100
    // })
    const content = await page.property('content');
    // console.log("content ->"+content)
    const $ = cheerio.load(content);
    let items = eval(t.news.body)
    //page.render('page'+i+'.jpg',{format: 'jpeg', quality: '60'})
    //items.length
    console.log(`News per page: ${items.length}`)
    
    for(let i = 0; i < items.length; i++) {
        let error_count = 0
        try{
            let news = {}
            let title = eval(`items.eq(i).${t.news.title}`)
            title = title? title : "no title"
            news['title'] = t.news.htmlEncode? he.decode(title) : title
            //console.log("title ->"+news.title)

            let description = eval(`items.eq(i).`+t.news.description)
            description = description? description : 'no description'
            news['description'] = t.news.htmlEncode? he.decode(description) : description

            //console.log("description ->"+news.description)

            let link = eval(`items.eq(i).`+t.news.link)
            news['link'] = link? t.news.linkPrefix+link : "no link"
            //console.log("link ->"+news.link)

            let cover = eval(`items.eq(i).`+t.news.cover)
            news['cover'] = cover? t.news.coverPrefix+cover : 'no cover'
            //console.log("cover ->"+news.cover)

            news['author'] = t.news.author
            news['host'] = t.news.host
            news_list.push(news)

        }catch(e){
            console.log(e)
            error_count++
            if(error_count > 7) {
                fs.writeFileSync('fail.url',t.pages[i]+'\n')
                await instance.exit();
            }
        }
    }
    
    await instance.exit();
    //fs.writeFile('news.txt', JSON.stringify(news_list), function(err){ if (err) throw err });

    news_list.forEach(news => {
        q.push(news, err => { if(err) console.log(err) })
    })
  
})()

const sleep = ms => {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, ms);
    })
}








