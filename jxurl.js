const cheerio = require("cheerio");
const geturl = require("./geturl.js");
const dlfile = require("./dlfile.js");
const fs = require("fs");
const path = require("path");

/**
 * 获取首页中所有的标题
 */
 function getTitle(url) {
    let fd = dlfile.bc();
    var list = [];
    let $ = cheerio.load(url);
    $(".day-list .plan-item em").each((i, e)=>{
        list.push(`第${i+1}天：` + $(e).text());
    })
    fs.writeFile(fd, JSON.stringify(list), (err)=>{
        if(err) {
            console.log("创建目录文件错误", err);
        } else {
            console.log("创建目录文件成功");
        }
    });
    
}

/**
 * 解析首页的函数，获取每页视频的网址，并放入一个数组中返回；
 */
function getCheerio(urlData, url) {
    // 创建目录
    getTitle(urlData);

    // 获取url地址主机地址
    let urls = new URL(url);
    let $ = cheerio.load(urlData);

    // 解析每页视频的地址
    let urlList = []
    $(".day-list li a").each((i, e)=>{
        // urls.protoccl获取协议，url.hostname获取主机地址，通过字符串拼接获取完整的网址
        urlList.push(urls.protocol + "//" + urls.hostname + $(e).attr("href"));
    });
    return urlList;
}

/**
 * 将传入的数组进行遍历；
 */
function openList(data) {
    for(var i in data) {
        listUrl(data[i]);
    }
}

/**
 * 解析网页中视频链接地址
 * 由于一个网页中可能存在多个视频，需要对
 */
async function listUrl(data){
    let urlData = await geturl(data);
    let $ = cheerio.load(urlData);
    let name = $(".plan-cont .detail-list h3").text();
    let url = $(".plan-cont .detail-list video").attr("src");
    let datas = await geturl(url, "stream");
    let fileDir = path.resolve(__dirname, "video");
    let dataStream = fs.createWriteStream(path.resolve(fileDir + "\\" + name + ".mp4"));
    datas.pipe(dataStream);
    dataStream.on("close", ()=>{
        console.log("文件读取结束");
    });
}

/**
 * 封装文件的读写
*/ 


exports.getIndex = getCheerio;
exports.blLizet = openList;
exports.getTitles = getTitle;