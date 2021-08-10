import { Container, Row, Form, Col, Button } from "react-bootstrap";
import { useEffect } from "react";
import React from "react";

export default function ListConfig({ setListOptions, listOptions }) {

    const ImportConfig = (e) => {
        var reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText(e.target.files[0]);
    }

    function onReaderLoad(event){
        console.log(event.target.result);
        var obj = JSON.parse(event.target.result);
        setListOptions(obj);
    }

    const hiddenFileInput = React.useRef(null);

    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    const addLinha = () => {
        if (listOptions.length == 0) {
            setListOptions([{ id: 1 }])
            return () => { };
        }
        else {
            setListOptions([...listOptions, { id: parseInt(listOptions[listOptions.length - 1].id) + 1, fileType: 'png' }]);
        }
        return () => { };
    }


    async function removeLine(e) {
        var id = parseInt(e.target.name)
        var w = []
        w = listOptions.filter(function (i) { return i.id !== id; });
        setListOptions(w);
        return () => { };
    }

    const upForm = (e) => {
        console.log(listOptions);
        listOptions.map((f) => {
            if (f.id == parseInt(e.target.name.split('-')[1])) {
                if ((e.target.name.split('-'))[0] == 'name' || (e.target.name.split('-'))[0] == 'fileType') {
                    f[e.target.name.split('-')[0]] = e.target.value
                }
                else {
                    var number = parseInt(e.target.value)
                    if (number > 0 && number < 5000) {
                        f[(e.target.name.split('-'))[0]] = number
                    }
                    else {
                        f[(e.target.name.split('-'))[0]] = 5000
                    }
                }
            }
        })
    }

    useEffect(() => {
        setListOptions(listOptions)
    });

    const styleCol = { padding: 1 }

    return (
        <div>
            <Container style={{
                margin: 10,
                padding: 0

            }}>

                <Form onChange={(e) => upForm(e)}>
                    {listOptions.map((option) => (
                        <Row key={option.id} >
                            <Col xs={2} style={styleCol}>
                                <Form.Control
                                    as="select"
                                    defaultValue={option.fileType}
                                    name={`fileType-${option.id}`}
                                >
                                    <option value="png">png</option>
                                    <option value="jpeg">jpg</option>
                                    <option value="webp">webp</option>
                                </Form.Control>
                            </Col>
                            <Col xs={3} style={styleCol}>
                                <Form.Control type="number" placeholder="Altura" defaultValue={option.height} name={`height-${option.id}`} ></Form.Control>
                            </Col>
                            <Col xs={3} style={styleCol}>
                                <Form.Control type="number" placeholder="Largura" defaultValue={option.width} name={`width-${option.id}`}></Form.Control>
                            </Col>
                            <Col xs={3} style={styleCol}>
                                <Form.Control placeholder="Nome do arquivo" defaultValue={option.name} name={`name-${option.id}`}></Form.Control>
                            </Col>
                            <Col xs={1} style={styleCol}>
                                <Button variant="danger" name={option.id} onClick={removeLine}>-</Button>
                            </Col>

                        </Row>
                    ))}
                    <Row>
                        <center>
                            <Col style={{ marginTop: 10 }}>
                                <Button variant='outline-info' onClick={addLinha}>+ Configuração</Button>
                            </Col>
                            <Col style={{ marginTop: 10 }}>
                                <Button variant='outline-success' onClick={handleClick}>Importar configuração</Button>
                                <input
                                    type="file"
                                    ref={hiddenFileInput}
                                    onChange={ImportConfig}
                                    style={{ display: 'none' }}
                                />
                            </Col>
                        </center>
                    </Row>
                </Form>

            </Container>
        </div>
    )
}