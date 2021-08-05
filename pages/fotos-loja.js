import Head from 'next/head'
let JSZip = require('jszip');
import styles from '../styles/Home.module.css'
import { Form, Button, Row, Col } from 'react-bootstrap'
import imageCompression from 'browser-image-compression';
import { useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";


export default function Home() {
    const [images, setImage] = useState(null)
    const [visibility, setVisibility] = useState("none")
    const [contador, setContador] = useState("none")
    const [loading, setLoading] = useState(false)
    const [files, setFiles] = useState(null)
    const [textCont, setTextCont] = useState(null)

    const loadingHandler = (l) => {
        if (l) {
            setLoading(false)
            setVisibility("block")
            setContador("none")
        }
        else {
            setLoading(true)
            setVisibility("none")
            setContador("block")
        }
    }

    async function upFoto(event) {
        var imageList = event.target.files
        setTextCont(`1 de ${imageList.length}`)
        loadingHandler(false)
        var files = []
        var imagesb64 = []
        var c = 1
        for (var image of imageList) {
            setTextCont(`${c} de ${imageList.length}`)
            const imageFile = image;
            const options = {
                useWebWorker: true
            }
            try {
                const img100 = await imageCompression(imageFile, { useWebWorker: true, maxWidthOrHeight: 100 });
                const img190 = await imageCompression(imageFile, { useWebWorker: true, maxWidthOrHeight: 190 });
                const img250 = await imageCompression(imageFile, { useWebWorker: true, maxWidthOrHeight: 250 });
                const img350 = await imageCompression(imageFile, { useWebWorker: true, maxWidthOrHeight: 350 });
                const img530 = await imageCompression(imageFile, { useWebWorker: true, maxWidthOrHeight: 530 });
                const img600 = await imageCompression(imageFile, { useWebWorker: true, maxWidthOrHeight: 600 });
                const wpimg100 = await imageCompression(imageFile, { useWebWorker: true, maxWidthOrHeight: 100, fileType:'webp'});
                const wpimg190 = await imageCompression(imageFile, { useWebWorker: true, maxWidthOrHeight: 190, fileType:'webp'});
                const wpimg250 = await imageCompression(imageFile, { useWebWorker: true, maxWidthOrHeight: 250, fileType:'webp'});
                const wpimg350 = await imageCompression(imageFile, { useWebWorker: true, maxWidthOrHeight: 350, fileType:'webp'});
                const wpimg530 = await imageCompression(imageFile, { useWebWorker: true, maxWidthOrHeight: 530, fileType:'webp'});
                const wpimg600 = await imageCompression(imageFile, { useWebWorker: true, maxWidthOrHeight: 600, fileType:'webp'});
                files.push({ image: img100, name: imageFile['name'].replace(".png", "") + "-1-100_small.png" });
                files.push({ image: img190, name: imageFile['name'].replace(".png", "") + "-1-190_small_x1.png" });
                files.push({ image: img250, name: imageFile['name'].replace(".png", "") + "-1-250_medium.png" });
                files.push({ image: img350, name: imageFile['name'].replace(".png", "") + "-1-350_medium_x1.png" });
                files.push({ image: img530, name: imageFile['name'].replace(".png", "") + "-1-530_large.png" });
                files.push({ image: img600, name: imageFile['name'].replace(".png", "") + "-1-600_large_x1.png" });
                files.push({ image: wpimg100, name: imageFile['name'].replace(".png", "") + "-1-100_small.webp" });
                files.push({ image: wpimg190, name: imageFile['name'].replace(".png", "") + "-1-190_small_x1.webp" });
                files.push({ image: wpimg250, name: imageFile['name'].replace(".png", "") + "-1-250_medium.webp" });
                files.push({ image: wpimg350, name: imageFile['name'].replace(".png", "") + "-1-350_medium_x1.webp" });
                files.push({ image: wpimg530, name: imageFile['name'].replace(".png", "") + "-1-530_large.webp" });
                files.push({ image: wpimg600, name: imageFile['name'].replace(".png", "") + "-1-600_large_x1.webp" });
            } catch (error) {
                console.log(error);
            }
            c++
        }
        setImage(imagesb64);
        setFiles(files);
        loadingHandler(true)
    }

    function downloadZip() {
        let zip = new JSZip()
        for (var i of files) {
            zip.file(i.name, i.image);
        }
        zip.generateAsync({ type: 'blob' }).then((blobdata) => {
            let zipblob = new Blob([blobdata]);
            var elem = window.document.createElement("a");
            elem.href = window.URL.createObjectURL(zipblob);
            elem.download = 'images.zip';
            elem.click();
        })
    }


    return (
        <div className={styles.container}>
            <Head>
                <title>RadarFit Compressor</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
                    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
                    crossOrigin="anonymous"
                />
            </Head>

            <Form >
                <center><Form.Label>Selecione a imagem do produto</Form.Label></center>
                <Form.File onChange={upFoto} style={{ width: "100%", margin: 20 }} id="file" name="file" multiple />
            </Form>
            <Row><div style={{ display: contador }}>{textCont}</div></Row>
            <ClipLoader loading={loading} size={15} ></ClipLoader>
            <Row>
                <Col><Button style={{ display: visibility }} variant="outline-dark" onClick={downloadZip}>  Zip</Button></Col>
            </Row>
        </div>
    )
}
