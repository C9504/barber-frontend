import React, { useEffect } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

const Layout = () => {

    const { keycloak, initialized } = useKeycloak();

    useEffect(() => {
        console.log(initialized);
    });

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#"><strong className="text-success">Negrdo</strong> <sub className="text-muted" style={{ fontSize: '10px' }}>Barbers</sub></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        {keycloak.authenticated && (
                            <>
                                <Nav
                                    className="me-auto my-2 my-lg-0"
                                    style={{ maxHeight: '100px' }}
                                    navbarScroll
                                >
                                    <>
                                        <Nav className="me-auto"><Link to={'/'} className="nav-link">Overview</Link></Nav>
                                        {keycloak.hasResourceRole('barber') && (
                                            <>
                                                <Nav className="me-auto"><Link to={'/customers'} className="nav-link">Clientes</Link></Nav>
                                            </>
                                        )}
                                        {keycloak.hasResourceRole('customer') && (
                                            <Nav className="me-auto"><Link to={'/barbers'} className="nav-link">Barberos</Link></Nav>
                                        )}
                                        <Nav className="me-auto"><Link to={'/services'} className="nav-link">Services</Link></Nav>
                                        <Nav className="me-auto"><Link to={'/appointments'} className="nav-link">Citas</Link></Nav>
                                    </>
                                </Nav>
                                <Nav id="collasible-nav-dropdown" className="ms-auto">
                                    <Link onClick={() => keycloak.logout({ redirectUri: `${window.location.origin}` })} className="nav-link">Logout</Link>
                                </Nav>
                            </>

                        )}

                        {/* <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form> */}
                        {!keycloak.authenticated && (
                            <>
                                <Nav className="me-auto">
                                    <Link to={'/'} className="nav-link">Home</Link>
                                </Nav>
                                <Nav id="collasible-nav-dropdown" className="ms-auto">
                                    <Link onClick={() => keycloak.login({ redirectUri: `${window.location.origin}` })} className="nav-link">Login</Link>
                                    <Link to={'/register'} className="nav-link">Registrarse</Link>
                                </Nav>
                            </>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <main className="mt-3">
                <Outlet />
            </main>
        </>
    );

}
export default Layout;