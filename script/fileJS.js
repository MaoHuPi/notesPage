/*
 * 2022 © MaoHuPi
 * script/fileJS.js
 */

class fileJS{
    static tsj(t, s, j){return(t.split(s).join(j));};
    static getName(filePath){
        filePath = filePath.toString();
        filePath = this.tsj(filePath, '\r', '');
        filePath = this.tsj(filePath, '\\', '/');
        filePath = filePath.split('/');
        var fileName = filePath[filePath.length - 1];
        return(fileName);
    }
    static getMainName(filePath){
        var fileName = this.getName(filePath);
        fileName = fileName.split('.');
        if(fileName.length > 1){
            fileName.pop();
        }
        var fileMainName = fileName.join('.');
        return(fileMainName);
    }
    static getSubName(filePath){
        var fileName = this.getName(filePath);
        fileName = fileName.split('.');
        var fileSubName = fileName.length > 1 ? fileName[fileName.length - 1] : '';
        return(fileSubName);
    }
    static removeName(filePath){
        filePath = filePath.toString();
        filePath = this.tsj(filePath, '\r', '');
        filePath = this.tsj(filePath, '\\', '/');
        filePath = filePath.split('/');
        // filePath.pop();
        filePath[filePath.length - 1] = '';
        filePath = filePath.join('/');
        return(filePath);
    }
    static getMimeType(filePath){
        let fileSubName = this.getSubName(filePath).toLowerCase(), 
            fileMimeType;
        switch(fileSubName){
            case 'jpg':
            case 'jpeg':
                fileMimeType = 'image/jpeg';
                break;
            case 'png':
                fileMimeType = 'image/png';
                break;
            case 'htm':
            case 'html':
                fileMimeType = 'text/html';
                break;
            case 'md':
            case 'markdown':
                fileMimeType = 'text/markdown';
                break;
            case 'txt':
            case 'text':
                fileMimeType = 'text/plain';
                break;
            case 'php':
                fileMimeType = 'application/x-httpd-php';
                break;
            case 'pdf':
                fileMimeType = 'application/pdf';
                break;
            default:
                fileMimeType = '*';
                break;
        }
        return(fileMimeType);
    }
}