import { Route, Routes } from "react-router-dom";
import Layout from "../components/public/layout";
import Overview from "../components/public/overview";
import Customers from "../components/customers";
import Register from "../components/public/register";

const LayoutRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<Overview />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/register" element={<Register/>}/>
            </Route>
        </Routes>
    );
}

export default LayoutRoutes;