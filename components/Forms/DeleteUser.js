import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FormSelect } from "../../widgets/index";

const DeleteUser = (props) => {
  const { onClose = () => {}, onDelete = () => {} } = props;
  const roleOptions = [
    { value: "Admin", label: "Admin" },
    { value: "Vendor", label: "Vendor" },
    { value: "Dealer", label: "Dealer" },
    { value: "Customer", label: "Customer" },
  ];
  return (
    <Form>
      <Row className="mb-3">
        <Col sm={6} className="mb-3 mb-lg-0">
          <Button
            onClick={() => {
              onDelete();
              onClose();
            }}
            variant="danger"
            className="me-1 w-full px-8 "
          >
            Yes
          </Button>
        </Col>
        <Col sm={6} className="mb-3 mb-lg-0">
          <Button
            onClick={onClose}
            variant="light"
            className="me-1 w-full px-8"
          >
            No
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default DeleteUser;
