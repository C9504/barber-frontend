import React, { useContext, useMemo } from "react";

import { Container } from "react-bootstrap";
import { StatusContext } from "../../contexts/status-context";

const Overview = () => {

    const [status, setStatus] = useContext(StatusContext);

    const overview = useMemo(() => {
        return status;
    }, [status]);

    return (
        <>
            <Container>
                <h1>{overview ? 'is Running...' : 'Stopped'}</h1>
            </Container>
        </>
    );
}
export default Overview;