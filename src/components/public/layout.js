import React, { useContext, useMemo } from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { StatusContext } from "../../contexts/status-context";

const Layout = () => {

    const [status, setStatus] = useContext(StatusContext);

    const logged = useMemo(() => {
        return status;
    }, [status]);

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#"><strong className="text-success">Negrdo</strong> <sub className="text-muted" style={{ fontSize: '10px' }}>Barbers</sub></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">


                        {logged && (
                            <Nav
                                className="me-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                <>
                                    <Nav.Link href="#action1">Home</Nav.Link>
                                    <Nav className="me-auto"><Link to={'/customers'} className="nav-link">Clientes</Link></Nav>
                                    <Nav className="me-auto"><Link to={'/customers'} className="nav-link">Services</Link></Nav>
                                    <Nav className="me-auto"><Link to={'/appointments'} className="nav-link">Citas</Link></Nav>
                                    {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
                                        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action4">
                                            Another action
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action5">
                                            Something else here
                                        </NavDropdown.Item>
                                    </NavDropdown> */}
                                </>
                            </Nav>
                        )}
                        {/* <Nav.Link href="#" disabled>
                                Link
                            </Nav.Link> */}

                        {/* <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form> */}
                        {logged === false && (
                            <>
                                <Nav className="me-auto">
                                    <Link to={'/'} className="nav-link">Home</Link>
                                </Nav>
                                <Nav id="collasible-nav-dropdown" className="ms-auto">
                                    <Link to={'/register'} className="nav-link">Register</Link>
                                </Nav>
                            </>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <main>
                <Outlet />
            </main>
        </>
    );

}
export default Layout;