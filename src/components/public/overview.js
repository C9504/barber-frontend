import React, { useEffect } from "react";

import { Container } from "react-bootstrap";
import { useKeycloak } from "@react-keycloak/web";

const Overview = () => {

    const {keycloak, initialized} = useKeycloak();

    useEffect(() => {
        console.log(initialized);
    });

    return (
        <>
            <Container fluid>
                <h1>{keycloak.authenticated ? 'is Running...' : 'Stopped'}</h1>
                <p>{JSON.stringify(keycloak.hasResourceRole('barber'))}</p>
            </Container>
        </>
    );
}
export default Overview;