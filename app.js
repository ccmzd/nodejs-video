const geturl = require("./geturl.js");
const jxurl = require("./jxurl.js");


let url = "http://hiyd.ouj.com/bb/10481/";
let typeOne = "json";

/**
 * 传入网址、返回类型;
 * 1.通过外部爬虫函数获取代码；
 * 2.将返回的代码通过外部解析函数;
 */
async function main() {
    // 创建目录，写入每天的信息；
    let res = await geturl(url, typeOne);

    let data = jxurl.getIndex(res, url);
    jxurl.blLizet(data);
   
}

main();




