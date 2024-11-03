"use client";
import { useEffect, useState } from "react";
// import node module libraries
import {
  Container,
  Table,
  Button,
  Pagination,
  Modal,
  Row,
  Col,
  Dropdown,
  ButtonGroup,
} from "react-bootstrap";

import UpdateUser from "../../../components/Forms/UpdateUser";
import DeleteUser from "../../../components/Forms/DeleteUser";
import PermissionForm from "../../../components/Forms/PermissionForm";
import useCollection from "../../../hooks/firebase/useCollection";
import useDocument from "../../../hooks/firebase/useDocument";
import CreateStationForm from "../../../components/Forms/CreateStation";
import UpdateStation from "../../../components/Forms/UpdateStation";

const Stations = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isPermissionOpen, setIsPermissionOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  // Custom hoock to handle user information

  const { createDocument } = useDocument();
  const { deleteDocument, getDocuments, updateDocument, data, refresh } =
    useCollection("stations");

  const createStation = async (data) => {
    createDocument("stations", data);
  };

  useEffect(() => {
    refresh();
  }, [isCreateOpen, isUpdateOpen, isDeleteOpen, isPermissionOpen]);

  return (
    <>
      <Container fluid className="p-6">
        {/* <Container> */}

        {/* </Container> */}
        <Table className="text-nowrap">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col"> Name</th>
              <th scope="col">Franchise</th>
              <th scope="col">Space Provider</th>
              <th scope="col">Machine Provider</th>
              <th scope="col">Relux Share</th>
              <th scope="col">Tariff</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => {
              return (
                <tr key={"user-" + index}>
                  <th scope="row">{user.id}</th>
                  <td>{user.name}</td>
                  <td>{user.franshis}</td>
                  <td>{user.spaceProvider}</td>
                  <td>{user.machineProvider}</td>
                  <td>{user.reluxShare}</td>
                  <td>{user.tariff}</td>
                  <td className="d-flex gap-2">
                    <Button
                      onClick={() => {
                        setSelected(user);
                        setIsUpdateOpen(true);
                      }}
                      variant="light"
                      className="me-1"
                    >
                      Edit
                    </Button>

                    <Button
                      onClick={() => {
                        setSelected(user);
                        setIsDeleteOpen(true);
                      }}
                      variant="danger"
                      className="me-1"
                    >
                      Delete
                    </Button>
                  </td>
                  <td></td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Pagination>
          <Pagination.Prev disabled>Previous</Pagination.Prev>
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Next disabled>Next</Pagination.Next>
        </Pagination>
      </Container>

      <Modal
        show={isCreateOpen}
        onHide={() => setIsCreateOpen(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Create New Station
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateStationForm
            createStation={createStation}
            onClose={() => {
              setIsCreateOpen(false);
              refresh();
            }}
          />
        </Modal.Body>
      </Modal>
      <Modal
        show={isUpdateOpen}
        onHide={() => setIsUpdateOpen(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Update Station
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateStation
            data={selected}
            onClose={() => {
              setIsUpdateOpen(false);
              refresh();
            }}
          />
        </Modal.Body>
      </Modal>

      <Modal
        show={isDeleteOpen}
        onHide={() => setIsDeleteOpen(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        size="sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Delete User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeleteUser
            data={selected}
            onClose={() => setIsDeleteOpen(false)}
            onDelete={() => deleteDocument(selected)}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Stations;
