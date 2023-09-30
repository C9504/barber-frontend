import React, { useEffect, useState } from "react";
import "./register.css";
import axios from "axios";
import { getBarberService } from "../../services/config";
import { Col, Row } from "react-bootstrap";
import { useKeycloak } from "@react-keycloak/web";

const Register = () => {

    const [registered, setRegistered] = useState(false);
    const [registering, setRegistering] = useState(false);
    const { keycloak, initialized } = useKeycloak();

    const [register, setRegister] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        role: 'customer',
        phone: '',
        address: ''
    });

    useEffect(() => {
        console.log(initialized);
    });

    const onRegister = async (e) => {
        e.preventDefault();
        setRegistering(true);
        await axios.post(`${getBarberService()}/register`, register).then((res) => {
            if (res.status === 200) {
                setRegistered(true);
            }
            setRegistering(false);
            console.log(res.data);
        }).catch((err) => {
            console.error(JSON.stringify(err));
        });
    }

    const handleRegister = (event) => {
        const fields = {
            firstName: register.firstName,
            lastName: register.lastName,
            email: register.email,
            username: register.username,
            password: register.password,
            confirmPassword: register.confirmPassword,
            role: register.role,
            phone: register.phone,
            address: register.address
        };
        fields[event.target.name] = event.target.value;
        setRegister(fields);
        console.log(fields);
    }

    return (
        <div className="form-signin w-100 m-auto">
            <form onSubmit={onRegister}>
                <div className="text-center">
                    <img className="mb-4" src="/img/logo.png" alt="" width="100" height="100" />
                    <h1 className="h3 mb-3 fw-normal">Por favor registrate</h1>
                </div>
                <Row className="mb-3">
                    <Col>
                        <div className="form-floating">
                            <input type="text" className="form-control" onChange={handleRegister} name="firstName" id="floatingNameInput" placeholder="Nombre" required />
                            <label htmlFor="floatingNameInput">Primer Nombre</label>
                        </div>
                    </Col>
                    <Col>
                        <div className="form-floating">
                            <input type="text" className="form-control" onChange={handleRegister} name="lastName" id="floatingLastNameInput" placeholder="Apellidos" required />
                            <label htmlFor="floatingLastNameInput">Apellidos</label>
                        </div>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <div className="form-floating">
                            <input type="email" className="form-control" onChange={handleRegister} maxLength={100} name="email" id="floatingInput" placeholder="name@example.com" required />
                            <label htmlFor="floatingInput">Correo electronico</label>
                        </div>
                    </Col>
                    <Col>
                        <div className="form-floating">
                            <input type="text" className="form-control" onChange={handleRegister} minLength={5} maxLength={10} name="username" id="floatingUserNameInput" placeholder="Nombre de usuario" required />
                            <label htmlFor="floatingUserNameInput">Nombre de usuario</label>
                        </div>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <div className="form-floating">
                            <input type="password" className="form-control" onChange={handleRegister} minLength={8} name="password" id="floatingPassword" placeholder="Password" required />
                            <label htmlFor="floatingPassword">Contraseña</label>
                        </div>
                    </Col>
                    <Col>
                        <div className="form-floating">
                            <input type="password" className="form-control" onChange={handleRegister} minLength={8} name="confirmPassword" id="floatingConfirmPassword" placeholder="Confirm Password" required />
                            <label htmlFor="floatingConfirmPassword">Confirmar contraseña</label>
                        </div>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <div className="form-floating">
                            <input type="text" className="form-control" onChange={handleRegister} minLength={5} maxLength={200} name="address" id="floatingAddressInput" placeholder="Dirección de residencia" required />
                            <label htmlFor="floatingAddressInput">Dirección de residencia</label>
                        </div>
                    </Col>
                </Row>
                <Row className="mb-2">
                    <Col>
                        <div className="form-floating mb-2">
                            <select className="form-control" id="floatingRoles" name="role" onChange={handleRegister} required>
                                <option value="customer">Cliente</option>
                                <option value="barber">Barbero</option>
                            </select>
                            <label htmlFor="floatingRoles">Rol</label>
                        </div>
                    </Col>
                    <Col>
                        <div className="form-floating">
                            <input type="tel" pattern="[0-9]{10}" title="Ingrese un numero de telefono valido de 10 digitos" className="form-control" onChange={handleRegister} minLength={5} maxLength={10} name="phone" id="floatingPhoneInput" placeholder="Nombre de usuario" required />
                            <label htmlFor="floatingPhoneInput">Telefono</label>
                        </div>
                    </Col>
                </Row>
                {registered && (
                    <button className="btn btn-success w-100 py-2" type="button" onClick={() => keycloak.login({ redirectUri: `${window.location.origin}` })}>Iniciar sesion</button>
                )}
                {!registered && (
                    <button className="btn btn-primary w-100 py-2" type="submit" disabled={registering}>Registrarse</button>
                )}
                <p className="mt-5 mb-3 text-body-secondary text-center">&copy; 2023</p>
            </form>
        </div>
    );

}
export default Register;