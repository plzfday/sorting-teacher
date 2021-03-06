import React, { createRef } from 'react';
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import Visualise from './Visualise';
import { randomListNoDup } from '../assets/RandomItems';

class SinglePlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'select',
    };
    this.list = [];
    this.listRef = createRef();
    this.algorithms = 'bubble';
  }

  render() {
    let left_side = null;
    const mode = this.state.mode;
    if (mode === 'select') {
      left_side = <div></div>;
    } else if (mode === 'play') {
      left_side = <Visualise list={JSON.parse(this.list)} algoType={this.algorithms} />;
    }
    return (
      <Container>
        <Row className='my-5'>
          <Col
            md={9}
            style={{
              border: '1px solid black',
              height: 'calc(100vh - 170px)',
            }}
          >
            {left_side}
          </Col>
          <Col md={3}>
            <Form onSubmit={this.validate.bind(this)}>
              <Row className='mx-3 my-5'>
                <Form.Group as={Row} controlId='formGridAlgorithms'>
                  <Form.Label>Select algorithms</Form.Label>
                  <Form.Control
                    as='select'
                    onChange={(e) => {
                      this.algorithms = e.target.value.split(' ')[0].toLowerCase();
                    }}
                  >
                    <option>Bubble Sort</option>
                    <option>Selection Sort</option>
                    <option>Insertion Sort</option>
                    {/* <option>Merge Sort</option>
                    <option>Quick Sort</option> */}
                  </Form.Control>
                </Form.Group>
              </Row>

              <Row className='mx-3 my-5'>
                <Form.Group as={Row} controlId='formGridList'>
                  <Form.Label>List</Form.Label>
                  <Form.Control ref={(ref) => (this.listRef = ref)} placeholder='[3, 2, 4, 1, 5]' />
                </Form.Group>
              </Row>

              <Row className='mx-3 my-5'>
                <Form.Group as={Row} controlId='formGridButton'>
                  <Form.Label>Random list with length of 7</Form.Label>
                  <Button variant='dark' onClick={this.generateRandomList.bind(this)}>
                    Random List
                  </Button>
                </Form.Group>
              </Row>

              <Row className='mx-3 my-5'>
                <Button variant='info' type='submit'>
                  {this.state.mode === 'select' ? 'Start' : 'Reset'}
                </Button>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }

  generateRandomList() {
    let l = randomListNoDup(50, 7);
    this.setState({ list: l });
    this.listRef.value = `[${l.toString().replaceAll(',', ', ')}]`;
  }

  validate(e) {
    e.preventDefault();

    const isValidInput = () => {
      const testVal = this.listRef.value;
      const regex = /\[(?:\d+,\s*)+\d+\]/;
      if (regex.test(testVal)) {
        const convList = JSON.parse(testVal);
        let isSafe = false;
        for (let i = 1; i < convList.length; i++) {
          if (convList[i - 1] > convList[i]) {
            return true;
          }
        }
        if (!isSafe) {
          return false;
        }
      }
      return false;
    };

    if (!isValidInput()) {
      alert('Please enter the valid list (No uniform data, No sorted data)');
    } else {
      this.list = this.listRef.value;
      if (this.state.mode === 'play') {
        if (window.confirm('Do you surely want to reset?')) {
          this.setState({ mode: 'select' });
        }
      } else {
        this.setState({ mode: 'play' });
      }
    }
  }
}

export default SinglePlay;
