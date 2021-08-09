import { Row, Col, Container, Button } from 'react-bootstrap'
import Router from 'next/router'
import LinearProgress from '@material-ui/core/LinearProgress'
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import styles from '../styles/Home.module.css'
import Compress from './compress';

export default function Selector({setService, setBackground, service}) {
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
                                    <ToggleButton value="compress" onClick={() => {setService("compress"); setBackground('images/casa.jpg')}} aria-label="left aligned">
                                        <label>Comprimir imagem</label>
                                    </ToggleButton>
                                    <ToggleButton value="resize" onClick={() =>{setService("resize"); setBackground('images/astronalta.jpg')}} aria-label="centered">
                                        <label>Redimensionar Imagem</label>
                                    </ToggleButton>
                                    <ToggleButton value="crop" onClick={() =>{setService("crop"); setBackground('')}} aria-label="centered">
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