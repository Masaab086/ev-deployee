import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FormSelect } from "../../widgets/index";
import { useForm } from "react-hook-form";

const CreateStationForm = (props) => {
  const { createStation, onClose = () => {} } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      franshis: "",
      spaceProvider: "",
      machineProvider: "",
      reluxShare: "",
      tariff: "",
    },
  });

  const formSubmit = async (values) => {
    createStation({
      name: values.name,
      franshis: values.franshis,
      spaceProvider: values.spaceProvider,
      machineProvider: values.machineProvider,
      reluxShare: values.reluxShare,
      tariff: values.tariff,
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
            Station Name
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Station name"
            id="name"
            {...register("name", { required: true })}
          />
          {errors.name && <div className="text-danger">Name is required</div>}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={12} xs={12}>
          <Form.Label className="col-sm-4 col-form-label form-label" htmlFor="">
            Franchis
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Franchis"
            id="franshis"
            {...register("franshis", { required: true })}
          />
          {errors.franshis && (
            <div className="text-danger">Franchis name is required</div>
          )}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={12} xs={12}>
          <Form.Label className="col-sm-4" htmlFor="role">
            Space Provider
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Space Provider"
            id="spaceProvider"
            {...register("spaceProvider", { required: true })}
          />
          {errors.spaceProvider && (
            <div className="text-danger">Space Provider is required</div>
          )}
          {errors.role && <div className="text-danger">Role is required</div>}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={12} xs={12}>
          <Form.Label className="col-sm-4" htmlFor="Machine Proivder">
            Machine Provider
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Machine Provider"
            id="Machine Provider"
            {...register("machineProvider", { required: true })}
          />
          {errors.machineProvider && (
            <div className="text-danger">Machine Provider is required</div>
          )}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={12} xs={12}>
          <Form.Label className="col-sm-4" htmlFor="reluxShare">
            Relux Share
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Relux Share"
            id="reluxShare"
            {...register("reluxShare", {
              required: true,
            })}
          />
          {errors.reluxShare && (
            <div className="text-danger">{errors.confirmPassword.message}</div>
          )}
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={12} xs={12}>
          <Form.Label className="col-sm-4" htmlFor="reluxShare">
            Tariff
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Tariff"
            id="tariff"
            {...register("tariff", {
              required: true,
            })}
          />
          {errors.tariff && (
            <div className="text-danger">{errors.tariff.message}</div>
          )}
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col md={{ offset: 4, span: 8 }} xs={12} className="mt-4">
          <Button variant="success" type="submit">
            Create Station
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default CreateStationForm;
