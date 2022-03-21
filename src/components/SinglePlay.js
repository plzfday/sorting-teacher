import React, { createRef } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import Visualise from "./Visualise";

class SinglePlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "select",
    };
    this.list = [];
    this.listRef = createRef();
    this.algorithms = "bubble";
  }

  render() {
    let display_type = null;
    const mode = this.state.mode;
    if (mode === "select") {
      display_type = (
        <Form onSubmit={this.validate.bind(this)}>
          <Row>
            <Col className="m-5">
              <Form.Group as={Row} controlId="formGridAlgorithms">
                <Form.Label>Select algorithms</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => {
                    this.algorithms = e.target.value.split(" ")[0].toLowerCase();
                  }}
                >
                  <option>Bubble Sort</option>
                  <option>Insertion Sort</option>
                  <option>Selection Sort</option>
                  <option>Merge Sort</option>
                  <option>Quick Sort</option>
                </Form.Control>
              </Form.Group>
            </Col>
  
            <Col className="m-5">
              <Form.Group as={Row} controlId="formGridList">
                <Form.Label>List</Form.Label>
                <Form.Control
                  ref={(ref) => (this.listRef = ref)}
                  placeholder="[3, 2, 4, 1, 5]"
                />
              </Form.Group>
            </Col>
  
            <Col className="m-5">
              <Form.Group as={Row} controlId="formGridButton">
                <Form.Label>Random list with length of 10</Form.Label>
                <Button
                  variant="primary"
                  onClick={this.generateRandomList.bind(this)}
                >
                  Random List
                </Button>
              </Form.Group>
            </Col>
          </Row>
          <Button className="mx-5" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      );
    } else if (mode === "play") {
      display_type = <Visualise list={JSON.parse(this.list)} algoType={this.algorithms} />;
    }
    return display_type;
  }

  generateRandomList() {
    let l = [];
    for (let i = 0; i < 5; i++) {
      l.push(Math.floor(Math.random() * 50 + 1));
    }
    this.setState({ list: l });
    this.listRef.value = `[${l.toString().replaceAll(",", ", ")}]`;
  }

  validate() {
    if (!this.listRef.value) {
      // TODO: validate the input
      alert("Please");
    } else {
      this.list = this.listRef.value;
      this.setState({ mode: "play" });
    }
  }

  onChangeAlgo() {}
}

export default SinglePlay;