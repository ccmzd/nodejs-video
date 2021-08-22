const axios = require("axios");

function geturls(url, type) {
    return new Promise((resolve, reject)=>{
        axios.get(url, {responseType:type}).then((data)=>{
            var html = "";
            html = data;
            resolve(html.data);
        })
    });
}


module.exports = geturls;
