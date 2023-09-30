import { Route, Routes } from "react-router-dom";
import Layout from "../components/public/layout";
import Overview from "../components/public/overview";
import Customers from "../components/customers";
import Register from "../components/public/register";
import { useKeycloak } from "@react-keycloak/web";
import { Spinner } from "react-bootstrap";
import Welcome from "../components/public/welcome";
import Services from "../components/services";
import Appointments from "../components/appointments";
import Barbers from "../components/barbers";

const LayoutRoutes = () => {

    const { keycloak, initialized } = useKeycloak();

    if (!initialized) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', minHeight: '800px', alignItems: 'center' }}>
                <h2 style={{ textAlign: 'center' }}>
                    <Spinner animation="border" variant="primary" />{" "}
                    Loading...
                </h2>
            </div>
        );
    }

    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                {!keycloak.authenticated && (
                    <>
                        <Route index element={<Welcome />} />
                        <Route path="/register" element={<Register />} />
                    </>
                )}
                {keycloak.authenticated && (
                    <>
                        <Route index element={<Overview />} />
                        <Route path="/customers" element={<Customers />} />
                        <Route path="/appointments" element={<Appointments />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/barbers" element={<Barbers />} />
                    </>
                )}
            </Route>
        </Routes>
    );
}

export default LayoutRoutes;