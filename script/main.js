/*
 * 2022 © MaoHuPi
 * script/main.js
 */

const html = $('html'), 
    pageHeader = $('#pageHeader'), 
    pageTitle = $('#pageTitle');
function main(){
    document.title = WEBSITE_TITLE;
    document.documentElement.style.setProperty('--webSiteTitle', `'${WEBSITE_TITLE}'`);
    document.documentElement.style.setProperty('--colorThemeDeg', WEBSITE_THEME);
    if(notEmpty($_GET, 'page')){
        let page = $_GET['page'];
        sendXmlhttp(`page/${page}.json`, '', t => {
            let data = JSON.parse(t);
            pageInit(data);
        }, 'get');
    }
    else if(notEmpty($_GET, 'file')){
        let file = decodeURIComponent($_GET['file']);
        // fileInit(`file/${file}`); // 已在mdViewer.html內處理索引起始點問題
        fileInit(file);
    }
    else{
        $_GET['page'] = 'home';
        main();
    }
}
main();
function pageInit(data){
    let title = 'title' in data ? data.title : '無標題';
    document.title = `${WEBSITE_TITLE} > ${title}`;
    $('.pageTitle', pageTitle).innerText = title;
    if('links' in data && Object.keys(data.links).length > 0){
        // for(linkData of data.links){
        for(linkId in data.links){ // 同時支援 object 和 array 的寫法 (較保險)
            let linkData = data.links[linkId], 
                link = $create('a'), 
                box = $create('div');
            link.className = 'link';
            if('link' in linkData){link.setAttribute('href', linkData['link']);}
            if('page' in linkData){link.setAttribute('href', `?page=${linkData['page']}`);}
            if('file' in linkData){link.setAttribute('href', `?file=${linkData['file']}`);}
            if('title' in linkData){box.innerText = linkData['title'];}
            if('background' in linkData){box.style.setProperty('--bgi', `url(${linkData['background']})`);}
            link.append(box);
            $('#pageContent').append(link);
        }
    }
    
}
function fileInit(filePath){
    let fileMimeType = fileJS.getMimeType(filePath);
    let fileName = fileJS.getMainName(filePath);
    let fileMimeClass = fileMimeType.split('/').length > 1 ? fileMimeType.split('/')[0] : '*';
    document.title = `${WEBSITE_TITLE} > ${fileName}`;
    $('.pageTitle', pageTitle).innerText = fileName;
    if(fileMimeClass == 'image'){
        var image = $create('img');
        image.src = filePath;
        $('#pageContent').appendChild(image);
    }
    else if(fileMimeType == 'text/markdown'){
        var iframe = $create('iframe');
        iframe.src = `mdViewer.html?file=${filePath}`;
        $('#pageContent').appendChild(iframe);
    }
    else{
        var iframe = $create('iframe'); // html, php, pdf...
        iframe.src = filePath;
        $('#pageContent').appendChild(iframe);
    }
}
function showHideHeader(){
    if(html.scrollTop > pageTitle.offset('top') + pageTitle.offsetHeight){
        pageHeader.style.opacity = 1;
        pageHeader.style.pointerEvents = 'auto';
    }
    else{
        pageHeader.style.opacity = 0;
        pageHeader.style.pointerEvents = 'none';
    }
    setTimeout(showHideHeader, 30);
}
showHideHeader();