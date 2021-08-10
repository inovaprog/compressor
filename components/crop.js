import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import { Row, Col, Container, Button } from 'react-bootstrap'
import 'react-image-crop/dist/ReactCrop.css';
import { useDropzone } from 'react-dropzone';
import styles from '../styles/Home.module.css'
import ListConfig from './listConfig';
import LinearProgress from '@material-ui/core/LinearProgress'
import Tools from '../tools/tools';


export default function Crop({ onDrop, images, setListOptions, listOptions, visibility, totCont, contador, files }) {
    const [upImg, setUpImg] = useState();
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [crop, setCrop] = useState({ unit: '%', width: 50, height: 50, x: 25, y: 25 });
    const [completedCrop, setCompletedCrop] = useState(null);

    function blobToFile(theBlob, fileName) {
        theBlob.lastModifiedDate = new Date();
        theBlob.name = fileName;
        return theBlob;
    }

    function generateDownload(canvas, crop) {
        if (!crop || !canvas) {
            return;
        }

        canvas.toBlob(
            (blob) => {
                onDrop([blobToFile(blob, 'image.png')]);
            },
            'image/png',
            1
        );
    }



    function DropZone() {
        const onDrop = useCallback(acceptedFiles => {
            console.log(acceptedFiles);
            console.log("dsd")
            const reader = new FileReader();
            reader.addEventListener('load', () => setUpImg(reader.result));
            reader.readAsDataURL(acceptedFiles[0]);
        }, [])
        const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

        return (
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {!upImg
                    ? <div style={{ width: 400, borderStyle: 'dashed', borderRadius: 10, padding: 20, height: 200 }}><center><label className={styles.textoDescricao} style={{ whiteSpace: 'nowrap' }}> Clique aqui ou solte suas fotos ...</label></center></div>
                    : null
                }
            </div>
        )
    }
    const onLoad = useCallback((img) => {
        imgRef.current = img;
    }, []);

    useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
            return;
        }

        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');
        const pixelRatio = window.devicePixelRatio;

        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
    }, [completedCrop]);

    return (
        <div>
            <div className={styles.container}>
                <Container>
                    <Row>
                        <Col md={6}>
                            <Row>
                                <Col md={7}>
                                    <label className={styles.textTitulo} >Selecione a imagen que deseja cortar</label>
                                </Col>
                            </Row>
                            <Row>
                                <label className={styles.textoDescricao}>
                                    Arraste e solte ou clique para escolher a imagem
                                </label>
                            </Row>
                            <Row>
                                <Col >
                                    <center>

                                        {completedCrop?.width
                                            ? (<Button
                                                type="button"
                                                variant="info"
                                                visibility={!completedCrop?.width || !completedCrop?.height}
                                                onClick={() =>
                                                    generateDownload(previewCanvasRef.current, completedCrop)
                                                }
                                            >
                                                Cortar
                                            </Button>) :
                                            null}
                                    </center>
                                </Col>
                                <label style={{ display: visibility }} className={styles.sucesso}>Sucesso!&#129304;</label>
                                <Col className={styles.barraProgresso}>
                                    <LinearProgress variant="determinate" value={totCont} style={{ display: contador }} />
                                </Col>
                                <Col></Col>
                            </Row>
                            <Row style={{ marginTop: 50 }}>
                                <Col md={3}><Button style={{ display: visibility, backgroundColor: "#35DE95", border: 0, whiteSpace: 'nowrap' }} onClick={() => Tools.downloadAll(images)}>  Baixar imagem</Button></Col>
                                <Col><Button style={{ display: visibility, backgroundColor: "#8C75FF", border: 0 }} onClick={() => Tools.downloadZip(files)}>Baixar em ZIP</Button></Col>
                            </Row>
                        </Col>
                        <Col>
                            <center><DropZone /></center>
                            <div className="App">
                                <div>
                                    <center>
                                        <ReactCrop
                                            src={upImg}
                                            onImageLoaded={onLoad}
                                            crop={crop}
                                            onChange={(c) => setCrop(c)}
                                            onComplete={(c) => setCompletedCrop(c)}
                                            style={{ maxWidth: '100%', marginTop: 10, marginBottom: 10 }}
                                        />
                                    </center>
                                </div>
                                <div>
                                    <canvas
                                        ref={previewCanvasRef}
                                        style={{
                                            width: Math.round(completedCrop?.width ?? 0),
                                            height: Math.round(completedCrop?.height ?? 0),
                                            display: 'none'
                                        }}
                                    />
                                </div>

                            </div>

                        </Col>
                    </Row>
                </Container>
            </div>

        </div>
    );
}
