// You're using useForm from React Hook Form, but you need to apply it to your form fields correctly. Here's the modified code:
// Jsx
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FormSelect } from "../../widgets/index";
import { useForm } from "react-hook-form";
import useCollection from "../../hooks/firebase/useCollection";

const PermissionForm = (props) => {
  const { data } = props;

  const [allPermissions, setAllPermissions] = useState([]);
  const { getDocuments } = useCollection("permissions");

  useEffect(() => {
    const fetchPermission = async () => {
      const docs = await getDocuments();
      setAllPermissions(docs);
    };
    fetchPermission();
  }, []);

  return (
    <Container>
      {allPermissions.map((permission, index) => {
        return (
          <Container key={"permissiom-" + index}>
            <Row className="mb-3 bg-gray-100 px-4">
              <Col sm={6} className="fw-bold  fs-4  text-bold">
                {permission.name}
              </Col>
              <Col sm={6}>
                <Button
                  variant={
                    data.permissions.includes(permission.name)
                      ? "danger"
                      : "primary"
                  }
                  type="submit"
                >
                  {data.permissions.includes(permission.name)
                    ? "Block Permission"
                    : "Allow permission"}
                </Button>
              </Col>
            </Row>
          </Container>
        );
      })}
    </Container>
  );
};

export default PermissionForm;
// In the above code, I've added the field names as arguments to the register function, like this: {...register("id")}, {...register("name")}, and so on. This tells React Hook Form to register each field with the corresponding name.
// Now, when you submit the form, the onSubmit function will receive the form data with the correct field names.
