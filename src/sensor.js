import Table from 'react-bootstrap/Table'
import React, { useEffect, useState } from 'react';
import GaugeChart from 'react-gauge-chart'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import uniqueId from 'lodash/uniqueId'

export function Sensor(props) {
    const [sensorValues, setSensorValues] = useState({})

    const chartStyle = {
        height: 150,
        width: 300,
    }

    const [chartId1] = useState(() => uniqueId('myprefix-'))
    const [chartId2] = useState(() => uniqueId('myprefix-'))
    const [chartId3] = useState(() => uniqueId('myprefix-'))

    const getSensorValues = () => {
            fetch(props.url, {
                mode: 'cors',
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            })
                .then(response => response.json())
                .then(data => setSensorValues(data));
    }

    useEffect(() => {
        getSensorValues();
        const interval = setInterval(() => {
            getSensorValues();
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, [])

    return (
        <Container>
            <Row md="3">
                <Col xs lg="2">
                    <h2>{props.name}</h2>
                    <p>Humidity</p>
                    <GaugeChart id={chartId1} style={chartStyle}
                        nrOfLevels={3}
                        percent={sensorValues['humidity'] / 100}
                        cornerRadius={3}
                        colors={['#5BE12C', '#F5CD19', '#EA4228']}
                        needleColor="#345243"
                        animate={false}
                    />
                    <p>Temperature</p>
                    <GaugeChart id={chartId2} style={chartStyle}
                        nrOfLevels={30}
                        colors={["#FF5F6D", "#FFC371"]}
                        arcWidth={0.3}
                        percent={sensorValues['temperature'] / 100}
                        formatTextValue={value => value + '°C'}
                        animate={false}
                    />
                    <p>Battery</p>
                    <GaugeChart id={chartId3} style={chartStyle}
                        animate={false}
                        nrOfLevels={20}
                        percent={sensorValues['battery'] / 100}
                        cornerRadius={3}
                        colors={['#5BE12C', '#F5CD19', '#EA4228']}
                        needleColor="#345243"
                    />
                    <Table striped bordered hover variant="dark">
                        <tbody>
                            <tr>
                                <td>Linkquality</td><td>{sensorValues['linkquality']}</td>
                            </tr>
                            <tr>
                                <td>Pressure</td><td>{sensorValues['pressure']}</td>
                            </tr>
                            <tr>
                                <td>Voltage</td><td>{sensorValues['voltage']}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}