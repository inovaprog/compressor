import { Row, Col, Container, Button } from 'react-bootstrap'
import Router from 'next/router'
import LinearProgress from '@material-ui/core/LinearProgress'
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import styles from '../styles/Home.module.css'

export default function Selector({ setService, setBackground, service, loadingHandler , setContador}) {
    return (
        <div>
            <Row>
                <Col sm={12}>
                    <Container>
                        <center>
                            <div>
                                <ToggleButtonGroup
                                    value={service}
                                    exclusive
                                    aria-label="text alignment"
                                    className={styles.select}
                                >
                                    <ToggleButton value="compress" onClick={() => { setService("compress"); setBackground('images/casa.jpg'); loadingHandler(false); setContador('none') }} aria-label="left aligned">
                                        <label>Comprimir imagem</label>
                                    </ToggleButton>
                                    <ToggleButton value="resize" onClick={async () => { await setService("resize"); await setBackground('images/astronalta.jpg'); loadingHandler(false); setContador('none') }} aria-label="centered">
                                        <label>Redimensionar Imagem</label>
                                    </ToggleButton>
                                    <ToggleButton value="crop" onClick={() => { setService("crop"); setBackground(''); loadingHandler(false); setContador('none') }} aria-label="centered">
                                        <label>Cortar Imagem</label>
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                        </center>
                    </Container>
                </Col>
            </Row>
        </div>
    )
}