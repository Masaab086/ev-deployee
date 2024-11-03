import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import useCollection from "../../hooks/firebase/useCollection";

const UpdateStation = (props) => {
  const { data, onClose = () => {} } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: data.id,
      name: data.name,
      franshis: data.franshis,
      spaceProvider: data.spaceProvider,
      machineProvider: data.machineProvider,
      reluxShare: data.reluxShare,
      tariff: data.tariff,
    },
  });

  const { updateDocument } = useCollection("stations");

  const onSubmit = async (values) => {
    await updateDocument(values);
    onClose();
    // console.log(values);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row className="mb-3">
        <Col sm={12} className="mb-3 mb-lg-0">
          <Form.Label htmlFor="id">Station Id</Form.Label>
          <Form.Control
            type="text"
            placeholder="Station Id"
            id="id"
            disabled
            {...register("id")}
          />
        </Col>
      </Row>
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
          {errors.franchise && (
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
            Update Station
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default UpdateStation;
