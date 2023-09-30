import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Container, Form, InputGroup, Offcanvas, Row } from "react-bootstrap";
import { useKeycloak } from "@react-keycloak/web";
import { getBarberService } from "../services/config";
import axios from "axios";

const Services = () => {

    const { keycloak, initialized } = useKeycloak();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [service, setService] = useState({
        name: '',
        description: '',
        category: '',
        time: 0,
        price: 0,
        image: '',
        state: ''
    });
    const [services, setServices] = useState([]);

    useEffect(() => {
        console.log(keycloak.authenticated, initialized);
        getServices();
    }, []);

    const handleService = (event) => {
        const fields = {
            name: service.name,
            description: service.description,
            category: service.category,
            time: service.time,
            price: service.price,
            image: service.image,
            state: service.state,
        };
        fields[event.target.name] = event.target.value;
        setService(fields);
        console.log(fields);
    }

    const onSubmitService = async (event) => {
        event.preventDefault();
        await axios.post(`${getBarberService()}/services`, service, { headers: { Authorization: `Bearer ${keycloak.token}` }, withCredentials: true }).then((res) => {
            /*if (res.status === 200) {
                setRegistered(true);
            }
            setRegistering(false);*/
            console.log(res.data);
        }).catch((err) => {
            console.error(JSON.stringify(err));
        });
    }

    const getServices = async () => {
        axios.get(`${getBarberService()}/services`, { headers: { Authorization: `Bearer ${keycloak.token}` }, withCredentials: true }).then((res) => {
            console.log(res.data);
            setServices(res.data);
        }).catch((err) => {
            console.error('error', err);
        });
    }

    return (
        <>
            <Container width="50%">
                <Row className="mb-3">
                    <Col>
                        <Button onClick={handleShow} className="float-end" type="button" variant="success" size="sm">Agregar servicio</Button>
                    </Col>
                </Row>
                <Row xs={1} md={4} className="g-4 mt-3">
                    {services.map((service, index, _array) => {
                        return (
                            <Col key={service.id}>
                                <Card>
                                    <Card.Img variant="top" src="img/hairstyle.png" />
                                    <Card.Body>
                                        <Card.Title>{service.name}</Card.Title>
                                        <Card.Text>
                                            {service.description}
                                        </Card.Text>
                                        Tiempo: {service.time} Minutos<br/>
                                        Precio: COP {service.price}
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
            <Offcanvas show={show} onHide={handleClose} placement={'end'} name={'end'}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Agregar nuevo servicio</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form onSubmit={onSubmitService}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre del servicio</Form.Label>
                            <Form.Control type="text" name="name" placeholder="servicio" onChange={handleService} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Categoria</Form.Label>
                            <Form.Select size="sm" name="category" onChange={handleService} required>
                                <option value={'Corte y delineado (Barba)'}>Corte y delineado (Barba)</option>
                                <option value={'Delineado (Barba)'}>Delineado (Barba)</option>
                                <option value={'Tinte (Barba)'}>Tinte (Barba)</option>
                                <option value={'Tinte (Cabello)'}>Tinte (Cabello)</option>
                                <option value={'Alisado (Cabello)'}>Alisado (Cabello)</option>
                                <option value={'Exfoliación'}>Exfoliación</option>
                                <option value={'Mascarilla'}>Mascarilla</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control as="textarea" name="description" rows={3} onChange={handleService} required />
                        </Form.Group>
                        <Form.Label>Precio</Form.Label> 
                        <InputGroup className="mb-3">                                                      
                            <InputGroup.Text>$</InputGroup.Text>
                            <Form.Control type="number" name="price" placeholder="10,000" onChange={handleService} required />
                            <span className="input-group-text">.00</span>
                        </InputGroup>
                        <Form.Label>Tiempo</Form.Label>
                        <InputGroup className="mb-3" >                           
                            <InputGroup.Text><i className="bi bi-stopwatch"></i></InputGroup.Text>
                            <Form.Control type="number" name="time" placeholder="60" onChange={handleService} required />
                            <span className="input-group-text">minutos</span>
                        </InputGroup>
                        <Button type="submit" variant="success" size="sm">Registrar servicio</Button>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}
export default Services;