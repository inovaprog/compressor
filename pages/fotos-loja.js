import React from 'react'
import Head from 'next/head'
let JSZip = require('jszip');
import styles from '../styles/Home.module.css'
import { Container, Button, Row, Col } from 'react-bootstrap'
import imageCompression from 'browser-image-compression';
import { useState } from 'react';
import Router from 'next/router'
import LinearProgress from '@material-ui/core/LinearProgress'
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

export default function Home() {
    const [images, setImage] = useState(null)
    const [visibility, setVisibility] = useState("none")
    const [contador, setContador] = useState("none")
    const [loading, setLoading] = useState(false)
    const [files, setFiles] = useState(null)
    const [totCont, setTotCont] = useState(0)
    const [cont, setcont] = useState(0)

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
        loadingHandler(false)
        var files = []
        var imagesb64 = []
        var c = 1
        for (var image of imageList) {
            setTotCont(c / imageList.length * 100)
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
                const wpimg100 = await imageCompression(imageFile, { useWebWorker: true, maxWidthOrHeight: 100, fileType: 'webp' });
                const wpimg190 = await imageCompression(imageFile, { useWebWorker: true, maxWidthOrHeight: 190, fileType: 'webp' });
                const wpimg250 = await imageCompression(imageFile, { useWebWorker: true, maxWidthOrHeight: 250, fileType: 'webp' });
                const wpimg350 = await imageCompression(imageFile, { useWebWorker: true, maxWidthOrHeight: 350, fileType: 'webp' });
                const wpimg530 = await imageCompression(imageFile, { useWebWorker: true, maxWidthOrHeight: 530, fileType: 'webp' });
                const wpimg600 = await imageCompression(imageFile, { useWebWorker: true, maxWidthOrHeight: 600, fileType: 'webp' });
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

    const hiddenFileInput = React.useRef(null);

    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    return (
        <div>
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
            <Row style={{ margin: 0, padding: 0 }}>
                <Col md={6} >
                    <Row>
                        <Col sm={12}>
                            <Container>
                                <center>
                                    <div>
                                        <ToggleButtonGroup
                                            value={'2'}
                                            exclusive
                                            aria-label="text alignment"
                                            className={styles.select}
                                        >
                                            <ToggleButton value="1" onClick={() => Router.push('/')} aria-label="left aligned">
                                                <label>Compressor de imagem</label>
                                            </ToggleButton>
                                            <ToggleButton value="2" aria-label="centered">
                                                <label>Crop Imagem</label>
                                            </ToggleButton>
                                        </ToggleButtonGroup>
                                    </div>
                                </center>
                            </Container>
                        </Col>
                    </Row>
                    <div className={styles.container}>
                        <Container>
                            <Row>
                                <Col md={7}>
                                    <label className={styles.textTitulo} >Selecione as imagens dos produtos</label>
                                </Col>
                            </Row>
                            <Row>
                                <label className={styles.textoDescricao}>
                                    Clique no botão para escolher os arquivos
                                </label>
                            </Row>
                            <Row>
                                <Col >
                                    <Button onClick={handleClick} style={{ backgroundColor: "#00E1FF", border: 0, whiteSpace: "nowrap" }}>
                                        Escolher Arquivos
                                    </Button>
                                    <input type="file" style={{ width: 0 }} onChange={upFoto} ref={hiddenFileInput} id="file" name="file" multiple />
                                </Col>
                                <label style={{ display: visibility }} className={styles.sucesso}>Sucesso!&#129304;</label>
                                <Col className={styles.barraProgresso}>
                                    <LinearProgress variant="determinate" value={totCont} style={{ display: contador }} />
                                </Col>
                                <Col></Col>
                            </Row>
                            <Row style={{ marginTop: 50 }}>
                                <Col><Button style={{ display: visibility, backgroundColor: "#8C75FF", border: 0 }} onClick={downloadZip}>Baixar em ZIP</Button></Col>
                            </Row>
                        </Container>
                    </div>
                </Col>
                <Col md={6} style={{ margin: 0, padding: 0 }}>
                    <div className={styles.fotoAstronalta}>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
