import React, { useCallback } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Row, Col, Container, Button } from 'react-bootstrap'
import { useState } from 'react';
import Compress from '../components/compress';
import Tools from '../tools/tools';
import Selector from '../components/selector';
import Image from 'next/image'
import Resize from '../components/resize';

export default function Home() {
  const [images, setImage] = useState(null)
  const [visibility, setVisibility] = useState("none")
  const [contador, setContador] = useState("none")
  const [files, setFiles] = useState(null)
  const [totCont, setTotCont] = useState(0)
  const [service, setService] = useState('compress')
  const [listOptions, setListOptions] = useState([])
  const [listNames, setListNames] = useState([])
  const [background, setBackground] = useState('images/casa.jpg')

  const loadingHandler = (l) => {
    if (l) {
      setVisibility("block")
      setContador("none")
    }
    else {
      setVisibility("none")
      setContador("block")
    }
  }

  const onDrop = useCallback(async acceptedFiles => {
    loadingHandler(false)
    service === 'compress'
      ? await Tools.CompressList(acceptedFiles, setImage, setFiles, setTotCont)
      : service === 'resize'
        ? await Tools.ResizeList(acceptedFiles, setImage, setFiles, setTotCont, listOptions, listNames)
        : service === 'crop'
          ? null
          : null
    loadingHandler(true)
  }, [])

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
          <Selector setService={setService} setBackground={setBackground} service={service}></Selector>
          {
            service === 'compress'
              ? <Compress onDrop={onDrop} images={images} visibility={visibility} contador={contador} totCont={totCont} images={images} files={files} />
              : service === 'resize'
                ? <Resize onDrop={onDrop} images={images} visibility={visibility} contador={contador} totCont={totCont} images={images} files={files} />
                : service === 'crop'
                  ? null
                  : null
          }
        </Col>
        <Col md={6} style={{ margin: 0, padding: 0 }}>
          <div className={styles.fotoLateral} >
            <img src={background} style={{ width: "100%", height: "100%" }} />
          </div>
        </Col>
      </Row>
    </div>
  )
}
