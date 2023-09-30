import { useKeycloak } from "@react-keycloak/web";
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";

const Welcome = () => {

    const {keycloak, initialized} = useKeycloak();

    useEffect(() => {
        console.log(initialized);
    });

    return (
        <>
            <Container fluid>
                <h1>{keycloak.authenticated ? 'is Running...' : 'Stopped'}</h1>
            </Container>
        </>
    );
}
export default Welcome;