import imageCompression from 'browser-image-compression';
import convert from 'image-file-resize';
import { file } from 'jszip';
let JSZip = require('jszip');


export default class Tools {
    static async CompressList(imageList, setImage, setFiles, setTotCont) {
        var imagesb64 = []
        var files = []
        var c = 1
        for (var image of imageList) {
            setTotCont(c / imageList.length * 100)
            var [imgDict, fileDict] = await Tools.CompressImage(image)
            imagesb64.push(imgDict)
            files.push(fileDict)
            c++
        }
        setImage(imagesb64);
        setFiles(files);
        return imagesb64
    }

    static async CompressImage(image) {
        const imageFile = image;
        try {
            const compressedFile = await imageCompression(imageFile, { useWebWorker: true });
            var file = { image: compressedFile, name: imageFile.name }
            var image = await imageCompression.getDataUrlFromFile(compressedFile);
            var res = { image: image, name: imageFile.name }
            return [res, file]
        } catch (error) {
            console.log(error);
        }
    }

    static async ConvertList(imageList, options, setTotCont, setFiles) {
        var files = []
        var c = 1
        for (var image of imageList) {
            setTotCont(c / imageList.length * 100)
            for (var opt of options) {
                var fileDict = await this.ResizeImage(image, opt)
                var [res, file] = await this.CompressImage(fileDict.image)
                fileDict.image = file.image
                files.push(fileDict)
            }
            c++
        }
        setFiles(files);
    }


    static async ResizeImage(imageFile, options) {
        if(!options.fileType){
            options.fileType = 'png';
        }
        if(!options.name){
            options.name = options.width+'x'+options.height;
        }
        var img = await convert({
            file: imageFile,
            width: options.width,
            height: options.height,
            type: options.fileType
        })
        console.log(imageFile.name)
        var res = { image: img, name: (imageFile['name'].split('.')[0]+ '-' + options.name + '.' + options.fileType).replace('undefined', '')}
        return res
    }

    static downloadAll(images) {
        var link = document.createElement('a');
        link.style.display = 'none';
        document.body.appendChild(link);
        for (var n of images) {
            link.setAttribute('download', n.name);
            link.setAttribute('href', n.image);
            link.click();
        }
        document.body.removeChild(link);
    }

    static downloadZip(files) {
        let zip = new JSZip()
        for (var i of files) {
            zip.file(i.name, i.image);
        }
        zip.generateAsync({ type: 'blob' }).then((blobdata) => {
            let zipblob = new Blob([blobdata])
            var elem = window.document.createElement("a")
            elem.href = window.URL.createObjectURL(zipblob)
            elem.download = 'images.zip'
            elem.click()
        })
    }
}