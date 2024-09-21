import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FormSelect } from "widgets";

const CreateUser = () => {
  const roleOptions = [
    { value: "Admin", label: "Admin" },
    { value: "Vendor", label: "Vendor" },
    { value: "Dealer", label: "Dealer" },
    { value: "Customer", label: "Customer" },
  ];
  return (
    <Form>
      <Row className="mb-3">
        <Col sm={12} className="mb-3 mb-lg-0">
          <Form.Label
            className="col-sm-4 col-form-label form-label"
            htmlFor="fullName"
          >
            Full name
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="First name"
            id="fullName"
            required
          />
        </Col>
      </Row>
      {/* row */}
      <Row className="mb-3">
        <Col md={12} xs={12}>
          <Form.Label
            className="col-sm-4 col-form-label form-label"
            htmlFor="email"
          >
            Email
          </Form.Label>
          <Form.Control type="email" placeholder="Email" id="email" required />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={12} xs={12}>
          <Form.Label className="col-sm-4" htmlFor="country">
            Role
          </Form.Label>
          <Form.Control
            as={FormSelect}
            placeholder="Select Role"
            id="role"
            options={roleOptions}
          />
        </Col>
      </Row>
      {/* row */}
      <Row className="mb-3">
        <Col md={12} xs={12}>
          <Form.Label className="col-sm-4" htmlFor="phone">
            Password
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Create Password"
            id="password"
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={12} xs={12}>
          <Form.Label className="col-sm-4" htmlFor="phone">
            Confirm Password
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            id="confirmPassword"
          />
        </Col>
      </Row>

      {/* Zip code */}
      <Row className="align-items-center">
        <Form.Label className="col-sm-4" htmlFor="zipcode"></Form.Label>

        <Col md={8} xs={12}></Col>

        <Col md={{ offset: 4, span: 8 }} xs={12} className="mt-4">
          <Button variant="primary" type="submit">
            Create User
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default CreateUser;
