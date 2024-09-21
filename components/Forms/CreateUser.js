import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FormSelect } from "../../widgets/index";
import { useForm } from "react-hook-form";

const CreateUser = (props) => {
  const { createUser, onClose = () => {} } = props;
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
    reset,
    getValues,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      role: "",
      password: "",
      confirmPassword: "",
    },
  });

  const formSubmit = async (values) => {
    createUser({
      name: values.name,
      role: values.role,
      password: values.password,
      email: values.email,
    });

    reset(); // reset form after submission

    onClose();
  };

  return (
    <Form onSubmit={handleSubmit(formSubmit)}>
      <Row className="mb-3">
        <Col sm={12} className="mb-3 mb-lg-0">
          <Form.Label
            className="col-sm-4 col-form-label form-label"
            htmlFor="name"
          >
            Full name
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Full name"
            id="name"
            {...register("name", { required: true })}
          />
          {errors.name && <div className="text-danger">Name is required</div>}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={12} xs={12}>
          <Form.Label
            className="col-sm-4 col-form-label form-label"
            htmlFor="email"
          >
            Email
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            id="email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && (
            <div className="text-danger">Invalid email address</div>
          )}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={12} xs={12}>
          <Form.Label className="col-sm-4" htmlFor="role">
            Role
          </Form.Label>
          <Form.Select
            id="role"
            {...register("role", { required: true })}
            options={roleOptions}
          >
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

      <Row className="mb-3">
        <Col md={12} xs={12}>
          <Form.Label className="col-sm-4" htmlFor="password">
            Password
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Create Password"
            id="password"
            {...register("password", { required: true, minLength: 8 })}
          />
          {errors.password && (
            <div className="text-danger">
              Password must be at least 8 characters
            </div>
          )}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={12} xs={12}>
          <Form.Label className="col-sm-4" htmlFor="confirmPassword">
            Confirm Password
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            id="confirmPassword"
            {...register("confirmPassword", {
              required: true,
              validate: (value) =>
                value === getValues("password") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <div className="text-danger">{errors.confirmPassword.message}</div>
          )}
        </Col>
      </Row>

      <Row className="align-items-center">
        <Col md={{ offset: 4, span: 8 }} xs={12} className="mt-4">
          <Button variant="success" type="submit">
            Create User
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default CreateUser;
