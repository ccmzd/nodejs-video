const fs = require("fs");
const path = require("path");

/**
 * 创建目录
*/
function buildCatalogue() {
    let fileDir = path.resolve(__dirname, "video");
    fs.mkdir(fileDir, (err)=>{
        if(err) {
            console.log("创建video目录失败");
            return 
        } else {
            console.log("创建video目录成功！");
        }
    });
    let pathFile = path.resolve(fileDir, "video.txt")
    return pathFile;

}



exports.bc = buildCatalogue;
