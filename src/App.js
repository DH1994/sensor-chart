import './App.css';
import { Sensor } from './sensor';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useEffect, useState } from 'react';
import { url } from './global.js'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [sensorcfg, setSensorcfg] = useState([]);

  useEffect(() => {
    fetch(url + '/nodered/sensors', {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(response => response.json())
      .then(data => setSensorcfg(data));
  }, [])

  let sensors = sensorcfg.map((sensor) => {
    return (
      <Row>
        <Col>
          <Sensor name={sensor.name} url={sensor.url} />
        </Col>
      </Row>
    )
  })

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Container>
        {sensors}
      </Container>
    </div>
  );
}

export default App;
