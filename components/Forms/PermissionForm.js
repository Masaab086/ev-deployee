// You're using useForm from React Hook Form, but you need to apply it to your form fields correctly. Here's the modified code:
// Jsx
import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FormSelect } from "widgets";
import { useForm } from "react-hook-form";

const PermissionForm = (props) => {
  const { data } = props;

  const allPermissions = ["viewing_dashboard", "sending_reminders"];

  const roleOptions = [
    { value: "viewing_dashboard", label: "viewing_dashboard" },
    { value: "sending_reminders", label: "sending_reminders" },
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
      {allPermissions.map((permission, index) => {
        return (
          <Container>
            <Row className="mb-3 bg-gray-100 px-4" key={"permission-" + index}>
              <Col sm={6} className="fw-bold  fs-4  text-bold">
                {permission}
              </Col>
              <Col sm={6}>
                <Button
                  variant={
                    data.permissions.includes(permission) ? "danger" : "primary"
                  }
                  type="submit"
                >
                  {data.permissions.includes(permission)
                    ? "Block Permission"
                    : "Allow permission"}
                </Button>
              </Col>
            </Row>
          </Container>
        );
      })}
    </Form>
  );
};

export default PermissionForm;
// In the above code, I've added the field names as arguments to the register function, like this: {...register("id")}, {...register("name")}, and so on. This tells React Hook Form to register each field with the corresponding name.
// Now, when you submit the form, the onSubmit function will receive the form data with the correct field names.
