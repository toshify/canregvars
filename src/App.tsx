import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Table,
} from "react-bootstrap";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1>Variables</h1>
          <p>Header</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table hover responsive>
            <thead>
              <tr>
                <th>row 1</th>
                <th>row 2</th>
                <th>row 3</th>
                <th>row 4</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>data 1-1</td>
                <td>data 1-2</td>
                <td>data 1-3</td>
                <td>data 1-4</td>
              </tr>
              <tr>
                <td>data 2-1</td>
                <td>data 2-2</td>
                <td>data 2-3</td>
                <td>data 2-4</td>
              </tr>
              <tr>
                <td>data 3-1</td>
                <td>data 3-2</td>
                <td>data 3-3</td>
                <td>data 3-4</td>
              </tr>
            </tbody>
          </Table>
          <Container>
            <Row>
              <Col>
                Middle
                <div>
                  <Button variant="primary">Just a Bootstrap button</Button>
                </div>
                <Card>
                  <CardHeader>
                    <p>Count</p>
                  </CardHeader>
                  <CardBody>
                    <Button
                      variant="secondary"
                      onClick={() => setCount((count) => count + 1)}
                    >
                      count is {count}
                    </Button>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <Row>
        <Col>
          Footer
          <Card>
            <CardHeader>Card Header</CardHeader>
            <CardBody>Card Body</CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
