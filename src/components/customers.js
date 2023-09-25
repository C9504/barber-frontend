import { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import axios from 'axios';
import { getCustomerService } from '../services/config';

const Customers = () => {

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = async () => {
    axios.get(`${getCustomerService()}/customers`, { withCredentials: true }).then((res) => {
      console.log(res.data);
      setCustomers(res.data);
    }).catch((err) => {
      console.error('error', err);
    });
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={12}>
            <Card>
              <Card.Header>
                Customers
              </Card.Header>
              <Card.Body>
                <Table striped size='sm'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Last Name</th>
                      <th>Address</th>
                      <th>Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer, index, array) => {
                      return (
                        <tr key={customer.id}>
                          <td>{index + 1}.</td>
                          <td>{customer.name}</td>
                          <td>{customer.lastName}</td>
                          <td>{customer.address}</td>
                          <td>{customer.phone}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Customers;
