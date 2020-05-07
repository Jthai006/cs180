import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

class Compare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player1: '',
      player2: ''
    }
  }

    onPlayer1Change = (event) => {
        this.setState({ player1: event.target.value })
    }
    onPlayer2Change = (event) => {
        this.setState({ player2: event.target.value })
    }

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
                this.setState({ player1: res });
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
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Compare;