/*
 * 2022 © MaoHuPi
 * script/basic.js
 */

/* basic */
const $ = function(e, f = document){return(f.querySelector(e));};
const $$ = function(e, f = document){return(f.querySelectorAll(e));};
const $create = function(...args){return(document.createElement(...args));};
const notEmpty = function(object, key){return(key in object && object[key] != '');}
Element.prototype.offset = function(type){
    let e = this;
    var reE = {
        height:e.offsetHeight, 
        width:e.offsetWidth , 
        top:0, 
        left:0
    };
    while(e !== document.body && e.offsetLeft && e.offsetTop && e.offsetParent){
        reE.left += e.offsetLeft;
        reE.top += e.offsetTop;
        e = e.offsetParent;
    }
    return(reE[type]);
}
/* copy from https://github.com/Tab-Studio/TSJSlib/blob/main/basic.js */
const $_GET = {}, 
    $_COOKIE = {};
if(location.href.indexOf('?') > -1){
    location.href.split('?')[1].split('&').forEach(kv => {
        kv = kv.split('=');
        $_GET[kv[0]] = kv[1];
    });
}
if(document.cookie !== ''){
    document.cookie.split('; ').forEach(kv => {
        kv = kv.split('=');
        $_COOKIE[kv[0]] = kv[1];
    });
}
function getGet(key = false){
    let get = {};
    if(location.href.indexOf('?') > -1){
        location.href.split('?')[1].split('&').forEach(kv => {
            kv = kv.split('=');
            get[kv[0]] = kv[1];
        });
    }
    if(key !== false){
        return(get[key]);
    }
    else{
        return(get);
    }
}
function getCookie(key = false){
    let cookie = {};
    if(document.cookie !== ''){
        document.cookie.split('; ').forEach(kv => {
            kv = kv.split('=');
            cookie[kv[0]] = kv[1];
        });
    }
    if(key !== false){
        return(cookie[key]);
    }
    else{
        return(cookie);
    }
}
function setCookie(key = undefined, value = undefined, expire = undefined, path = undefined, domain = undefined, secure = undefined){
    let cookie = '';
    if(key !== undefined && value !== undefined){
        cookie = `${key}=${value}`;
        if(expire !== undefined){
            cookie += `; expires=${expire}`;
        }
        if(path !== undefined){
            cookie += `; path=${path}`;
        }
        if(domain !== undefined){
            cookie += `; domain=${domain}`;
        }
        if(secure !== undefined){
            cookie += `; secure`;
        }
        document.cookie = cookie;
    }
}
function sendXmlhttp(name = '', value = '', responseFunction = t => {console.log(t);}, type = 'get'){
    let xmlhttp = new XMLHttpRequest();
    let rf = function (){
        if (xmlhttp.readyState==4) {
            responseFunction(xmlhttp.responseText);
        }
    }
    type = type.toLowerCase();
    xmlhttp.addEventListener("readystatechange", rf);
    if(type == 'get'){
        xmlhttp.open("GET", name+value);
        xmlhttp.send();
    }
    else if(type == 'post'){
        xmlhttp.open("POST", name,true);
        xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xmlhttp.send(value);
    }
}