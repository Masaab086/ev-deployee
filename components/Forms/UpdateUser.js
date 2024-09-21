import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import useCollection from "../../hooks/firebase/useCollection";

const UpdateUser = (props) => {
  const { data, onClose = () => {} } = props;

  const roleOptions = [
    { value: "Admin", label: "Admin" },
    { value: "Vendor", label: "Vendor" },
    { value: "Dealer", label: "Dealer" },
    { value: "Customer", label: "Customer" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
    },
  });

  const { updateDocument } = useCollection("users");

  const onSubmit = async (values) => {
    await updateDocument(values);
    onClose();
    // console.log(values);
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
            disabled
            {...register("id")}
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={12} xs={12}>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            disabled
            type="email"
            placeholder="Email"
            id="email"
            {...register("email", {
              required: true,
              pattern: /^\S+@\S+$/i,
            })}
          />
          {errors.email && (
            <div className="text-danger">Invalid email address</div>
          )}
        </Col>
      </Row>

      <Row>
        <Col sm={12} className="mb-3 mb-lg-0">
          <Form.Label htmlFor="name">Full name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Full name"
            id="name"
            {...register("name", { required: true, maxLength: 100 })}
          />
          {errors.name && (
            <div className="text-danger">
              Name is required and should be less than 100 characters
            </div>
          )}
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={12} xs={12}>
          <Form.Label htmlFor="role">Role</Form.Label>
          <Form.Select id="role" {...register("role", { required: true })}>
            <option value="">Select Role</option>
            {roleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Select>
          {errors.role && <div className="text-danger">Role is required</div>}
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col md={{ offset: 4, span: 8 }} xs={12} className="mt-4">
          <Button variant="success" type="submit">
            Update User
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default UpdateUser;
