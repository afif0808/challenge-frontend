import logo from './logo.svg';
import './App.css';
import ProvinceList from './modules/province/ProvinceList';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <Container >
      <Row className={"mt-5"}>
        {/* <Col></Col> */}
        <Col>
          <ProvinceList/>
        </Col>
        {/* <Col></Col> */}

      </Row>
    </Container>
  );
}

export default App;
