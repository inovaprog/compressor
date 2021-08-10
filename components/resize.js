import { Row, Col, Container, Button } from 'react-bootstrap'
import DropZone from '../components/dropzone';
import LinearProgress from '@material-ui/core/LinearProgress'
import styles from '../styles/Home.module.css'
import Tools from '../tools/tools';
import ListConfig from './listConfig';


export default function Resize({ onDrop, visibility, contador, totCont, files, setListOptions, listOptions }) {
    return (
        <div className={styles.container}>
            <Container>
                <Row>
                    <Col md={7}>
                        <label className={styles.textTitulo} >Selecione as imagens que deseja redimensionar</label>
                    </Col>
                </Row>
                <Row>
                    <label className={styles.textoDescricao}>
                        Selecione as configurações, arraste e solte ou clique no botão para escolher os arquivos
                    </label>
                </Row>
                <ListConfig setListOptions={setListOptions} listOptions={listOptions}></ListConfig>
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
                    <Col><Button style={{ display: visibility, backgroundColor: "#8C75FF", border: 0 }} onClick={() => Tools.downloadZip(files)}>Baixar em ZIP</Button></Col>
                </Row>
            </Container>
        </div>
    )
}