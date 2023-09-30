import React, { useEffect } from "react";

import { Container } from "react-bootstrap";
import { useKeycloak } from "@react-keycloak/web";

const Appointments = () => {

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
export default Appointments;