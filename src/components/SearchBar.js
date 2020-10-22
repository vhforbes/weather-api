import React, { useEffect, useState } from "react";

import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const SearchBar = (props) => {
  const [input, setInput] = useState();

  let { city, changeCity } = props;

  const handleChange = (e) => {
    let value = e.target.value;
    value.replace(/\s/g, "+");
    setInput(value);
  };

  const handleClick = () => {
    changeCity(input);
  };

  return (
    <div>
      <Navbar expand="lg" bg="dark">
        <h3
          className="mx-auto"
          style={{ color: "white", margin: "0px 0px 5px 5px" }}
        >
          Victor's Weather App
        </h3>
      </Navbar>

      <Navbar
        style={{ marginBottom: "15px", paddingBottom: "10px" }}
        expand="lg"
        bg="dark"
      >
        <Form
          inline
          className="mx-auto"
          style={{
            margin: "10px",
          }}
        >
          <FormControl
            type="text"
            onChange={(e) => handleChange(e)}
            placeholder="Search"
            className="mr-sm-2"
          />
          <Button className="mx-auto" onClick={() => handleClick()} style={{}}>
            Search
          </Button>
        </Form>
      </Navbar>
    </div>
  );
};

export default SearchBar;
