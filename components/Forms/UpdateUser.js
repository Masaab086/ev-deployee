// You're using useForm from React Hook Form, but you need to apply it to your form fields correctly. Here's the modified code:
// Jsx
import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FormSelect } from "widgets";
import { useForm } from "react-hook-form";

const UpdateUser = (props) => {
  const { data } = props;

  const roleOptions = [
    { value: "Admin", label: "Admin" },
    { value: "Vendor", label: "Vendor" },
    { value: "Dealer", label: "Dealer" },
    { value: "Customer", label: "Customer" },
  ];

  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
    },
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row className="mb-3">
        <Col sm={12} className="mb-3 mb-lg-0">
          <Form.Label htmlFor="id">User Id</Form.Label>
          <Form.Control
            type="text"
            placeholder="User Id"
            id="id"
            name="id"
            disabled
            {...register("id")}
          />
        </Col>
        <Col sm={12} className="mb-3 mb-lg-0">
          <Form.Label htmlFor="name">Full name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Full name"
            id="name"
            name="name"
            required
            {...register("name")}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={12} xs={12}>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            required
            {...register("email")}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={12} xs={12}>
          <Form.Label htmlFor="role">Role</Form.Label>
          <Form.Control
            as={FormSelect}
            placeholder="Select Role"
            id="role"
            name="role"
            options={roleOptions}
            {...register("role")}
          />
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col md={{ offset: 4, span: 8 }} xs={12} className="mt-4">
          <Button variant="primary" type="submit">
            Update User
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default UpdateUser;
// In the above code, I've added the field names as arguments to the register function, like this: {...register("id")}, {...register("name")}, and so on. This tells React Hook Form to register each field with the corresponding name.
// Now, when you submit the form, the onSubmit function will receive the form data with the correct field names.
