import { Row, Col, Container, Button } from 'react-bootstrap'
import DropZone from '../components/dropzone';
import LinearProgress from '@material-ui/core/LinearProgress'
import styles from '../styles/Home.module.css'
import Tools from '../tools/tools';


export default function Compress({onDrop, visibility, contador, totCont, files, images}) {
    return (
        <div className={styles.container}>
            <Container>
                <Row>
                    <Col md={7}>
                        <label className={styles.textTitulo} >Adicione as Imagens que deseja comprimir</label>
                    </Col>
                </Row>
                <Row>
                    <label className={styles.textoDescricao}>
                        Arraste e solte ou clique no botão para escolher os arquivos
                    </label>
                </Row>
                <Row>
                    <Col >
                        <DropZone onDrop={onDrop} />
                    </Col>
                    <label style={{ display: visibility }} className={styles.sucesso}>Sucesso!&#129304;</label>
                    <Col className={styles.barraProgresso}>
                        <LinearProgress variant="determinate" value={totCont} style={{ display: contador }} />
                    </Col>
                    <Col></Col>
                </Row>
                <Row style={{ marginTop: 50 }}>
                    <Col md={3}><Button style={{ display: visibility, backgroundColor: "#35DE95", border: 0 }} onClick={() => Tools.downloadAll(images)}>  Baixar Imagens</Button></Col>
                    <Col><Button style={{ display: visibility, backgroundColor: "#8C75FF", border: 0 }} onClick={() => Tools.downloadZip(files)}>Baixar em ZIP</Button></Col>
                </Row>
            </Container>
        </div>
    )
}