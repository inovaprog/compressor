import imageCompression from 'browser-image-compression';
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
        const options = {
            useWebWorker: true
        }
        try {
            const compressedFile = await imageCompression(imageFile, options);
            var file = { image: compressedFile, name: imageFile.name }
            var image = await imageCompression.getDataUrlFromFile(compressedFile);
            var res = { image: image, name: imageFile.name }
            return [res, file]
        } catch (error) {
            console.log(error);
        }
    }

    static async ResizeList(imageList, setTotCont, setImage, setFiles, options, name) {
        var files = []
        var c = 1
        for (var image of imageList) {
            setTotCont(c / imageList.length * 100)
            for (var opt of options) {
                var imgResized = await this.ResizeImage(image, opt, name)
                file.push(imgResized)
            }
            c++
        }
        setFiles(files);
    }

    static async ResizeImage(image, options, name) {
        const imageFile = image;
        try {
            const img = await imageCompression(imageFile, options);
            return { image: img, name: imageFile['name'].split('.')[0] + name + options.fileType };
        } catch (error) {
            console.log(error);
        }
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
            elem.download = 'compressed.zip'
            elem.click()
        })
    }
}