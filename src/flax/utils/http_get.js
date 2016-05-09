/**
 * @author       Longsir <longames@qq.com>
 * @copyright    2015 Longames Ltd.
 * @github       {@link https://github.com/longyangxi/flax.js}
 * @flax         {@link http://flax.so}
 * @license      MIT License: {@link http:http://mit-license.org/}
 */

function http_get(url, callback, params, isPost, errorcallback, try_times){
    if(url == null || url == '')
        return;

    try_times = try_times || 3;

    var xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject("MSXML2.XMLHTTP");

    if(isPost){
        var paramsStr = "params=" + JSON.stringify(params);
        xhr.open("POST", url);
        if(paramsStr !== "") rUrl = url + "?" + paramsStr;
        console.log("send post: " + rUrl);
    }else{
        var paramsStr = flax.encodeUrlVars(params);
        var rUrl = url;
        if(paramsStr !== "") rUrl = url + "?" + paramsStr;
        console.log("send get: " + rUrl);
        xhr.open("GET",rUrl);
    }
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    if(!isPost || paramsStr == "") {
        xhr.send();
    } else {
        xhr.send(paramsStr);
    }

    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                var response = xhr.responseText;
                response = response.replace(/\\/g,"");
                try{
                    response = JSON.parse(response);
                } catch (e) {

                }
                if(callback){
                    callback(response);
                }
            }else{
                if(--try_times){
                    cc.log("retry on response error: " + url);
                    http_get(url, callback, params, isPost, errorcallback, try_times);
                }else{
                    var response = xhr.responseText;
                    if(errorcallback)
                        errorcallback(response);
                }
            }
        }else{
//            cc.log(xhr.status + ", " + xhr.readyState)
        }
    }
}