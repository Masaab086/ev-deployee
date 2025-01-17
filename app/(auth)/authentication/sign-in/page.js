"use client";

// Import node module libraries
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../assets/logo.png";
// Import hooks
import useMounted from "../../../../hooks/useMounted";
import { useForm } from "react-hook-form";
import useLogin from "../../../../hooks/firebase/useLogin";
import { useState } from "react";
import { ColorRing } from "react-loader-spinner";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const hasMounted = useMounted();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    email: "",
    password: "",
  });

  const { loginUser } = useLogin();
  const onSubmit = async (data) => {
    setLoading(true);
    await loginUser({ email: data.email, password: data.password });
    setLoading(false);
  };

  return (
    <Row className="align-items-center justify-content-center g-0 min-vh-100">
      <Col xxl={4} lg={6} md={8} xs={12} className="py-8 py-xl-0">
        {/* Card */}
        <Card className="smooth-shadow-md">
          {/* Card body */}
          <Card.Body className="p-6">
            <div className="mb-4">
              <Link href="/" className="text-blue font-bold text-xl">
                <Image src={logo} width={100} height={50} />
              </Link>
              <p className="mb-6">Please enter your user information.</p>
            </div>
            {/* Form */}
            {hasMounted && (
              <Form onSubmit={handleSubmit(onSubmit)}>
                {/* Username */}
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    placeholder="Enter address here"
                  />
                  {errors.username && (
                    <Form.Text className="text-danger">
                      {errors.username.message}
                    </Form.Text>
                  )}
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                    placeholder="**************"
                  />
                  {errors.password && (
                    <Form.Text className="text-danger">
                      {errors.password.message}
                    </Form.Text>
                  )}
                </Form.Group>

                {/* Checkbox */}
                <div className="d-lg-flex justify-content-between align-items-center mb-4">
                  <Form.Check type="checkbox" id="rememberme">
                    <Form.Check.Input type="checkbox" />
                    <Form.Check.Label>Remember me</Form.Check.Label>
                  </Form.Check>
                </div>
                <div>
                  {/* Button */}
                  <div className="d-grid">
                    <Button variant="success" type="submit">
                      {loading ? (
                        <ColorRing
                          visible={true}
                          height="32"
                          width="32"
                          ariaLabel="color-ring-loading"
                          wrapperStyle={{}}
                          wrapperClass="color-ring-wrapper"
                          colors={[
                            "#ffffff",
                            "#ffffff",
                            "#ffffff",
                            "#ffffff",
                            "#ffffff",
                          ]}
                        />
                      ) : (
                        "Sign In"
                      )}
                      {/* <ColorRing
                        visible={true}
                        height="32"
                        width="32"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={[
                          "#ffffff",
                          "#ffffff",
                          "#ffffff",
                          "#ffffff",
                          "#ffffff",
                        ]}
                      /> */}
                    </Button>
                  </div>
                  <div className="d-md-flex justify-content-between mt-4">
                    <div className="mb-2 mb-md-0">
                      <Link href="/authentication/sign-up" className="fs-5">
                        Create An Account{" "}
                      </Link>
                    </div>
                    <div>
                      <Link
                        href="/authentication/forget-password"
                        className="text-inherit fs-5"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default SignIn;
