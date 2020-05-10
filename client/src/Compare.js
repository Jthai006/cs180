import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import ApexCharts from 'apexcharts';
import ReactApexChart from 'react-apexcharts';


class Compare extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      player1: '',
      player2: '',
      series: [{
        name: 'Player1',
        type: 'column',
        data: [1, 1, 1, 1, 1, 1]
      }, {
        name: 'Player2',
        type: 'column',
        data: [1, 1, 1, 1, 1, 1]
      }],
      options: {
        chart: {
          height: 350,
          type: 'line',
          stacked: false
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          width: [1, 1, 4]
        },
        title: {
          text: 'Player 1 vs. Player 2',
          align: 'left',
          offsetX: 110
        },
        xaxis: {
          categories: ['Points', 'Rebounds', 'Assists', '3PM', 'Steals', 'Blocks'],
        },
        yaxis: [
          {
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: '#008FFB'
            },
            labels: {
              style: {
                colors: '#008FFB',
              }
            },
            tooltip: {
              enabled: true
            }
          },
          {
            seriesName: 'Income',
            opposite: true,
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: '#00E396'
            },
            labels: {
              style: {
                colors: '#00E396',
              }
            }
          },
        ],
        tooltip: {
          fixed: {
            enabled: true,
            position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
            offsetY: 30,
            offsetX: 60
          },
        },
        legend: {
          horizontalAlign: 'left',
          offsetX: 40
        }
      },
    
    
    };
  }


        onPlayer1Change = (event) => {
          this.setState({ player1: event.target.value })
      }
      onPlayer2Change = (event) => {
          this.setState({ player2: event.target.value })
      }

      // getBarData(res) {
      //   console.log(res);
      //   this.setState({
      //       // series: [{
      //       //     data: res
      //       // }]
      //       player1: 'nig'
      //   });
      // }

  onSubmitPlayers = () => {
      fetch('http://localhost:9000/comparePlayers', {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              player1: this.state.player1,
              player2: this.state.player2
          })
      })
          .then(response => response.json())
          .then(res => {
              // this.getBarData(res);
              this.setState({player1: 'nig'})
      })

}
  

    

  render() {
    
    return (
      <div>
        <Container fluid="true">
          <Row>
            <Col className="bg-white" lg={{ span: 8, offset: 2 }} md={{ span: 10, offset: 1 }} sm={{ span: 12, offset: 0 }}>
              <h1>Compare Two Players</h1>
              <Form>
                    <Form.Group controlId="formPlayer1">
                        <Form.Label>Player 1</Form.Label>
                        <Form.Control onChange={this.onPlayer1Change} type="player" placeholder="Enter player name" />
                    </Form.Group>

                    <Form.Group controlId="formPlayer2">
                        <Form.Label>Player 2</Form.Label>
                        <Form.Control onChange={this.onPlayer2Change} type="player" placeholder="Enter player name" />
                    </Form.Group>
                    <Button onClick={this.onSubmitPlayers} variant="primary" type="submit"> 
                        Compare!
                    </Button>
                </Form>
                <div id="chart">
                  <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={550} />
                </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Compare;