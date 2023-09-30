import { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Table } from 'react-bootstrap';
import axios from 'axios';
import { getBarberService } from '../services/config';

const Barbers = () => {

  const [barbers, setBarbers] = useState([]);

  useEffect(() => {
    getBarbers();
  }, []);

  const getBarbers = async () => {
    axios.get(`${getBarberService()}/barbers`, { withCredentials: true }).then((res) => {
      console.log(res.data);
      setBarbers(res.data);
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
                Barbers
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
                    {barbers.map((barber, index, array) => {
                      return (
                        <tr key={barber.id}>
                          <td>{index + 1}.</td>
                          <td>{barber.name}</td>
                          <td>{barber.lastName}</td>
                          <td>{barber.address}</td>
                          <td>{barber.phone}</td>
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

export default Barbers;
