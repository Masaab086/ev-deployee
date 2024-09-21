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
import { Funnel } from "react-bootstrap-icons";

import useUser from "../../../hooks/useUser";
import CreateUser from "../../../components/Forms/CreateUser";
import UpdateUser from "../../../components/Forms/UpdateUser";
import DeleteUser from "../../../components/Forms/DeleteUser";
import PermissionForm from "../../../components/Forms/PermissionForm";

const Users = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isPermissionOpen, setIsPermissionOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  // Custom hoock to handle user information
  const { users, deleteUserById, updateUser, createUser } = useUser();
  return (
    <>
      <Container fluid className="p-6">
        {/* <Container> */}
        <Row>
          <Col sm={2}>
            <Button className="mb-3" onClick={() => setIsCreateOpen(true)}>
              Create New User
            </Button>
          </Col>
          <Col sm={7}></Col>
          <Col sm={3}>
            {/* <Funnel size={24} /> */}
            <Dropdown as={ButtonGroup}>
              <Button variant="light">Filter by Role ({filter})</Button>
              <Dropdown.Toggle
                split
                variant="light"
                id="dropdown-split-basic"
              />
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    setFilter("All");
                  }}
                  href="#"
                >
                  All
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setFilter("Admin");
                  }}
                  href="#"
                >
                  Admin
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setFilter("Vendor");
                  }}
                  href="#"
                >
                  Vendor
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setFilter("Dealer");
                  }}
                  href="#"
                >
                  Dealer
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    setFilter("Customer");
                  }}
                  href="#"
                >
                  Customer
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        {/* </Container> */}
        <Table className="text-nowrap">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Full Name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              if (filter === "All") {
                return (
                  <tr key={"user-" + index}>
                    <th scope="row">{user.id}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
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
                          setIsPermissionOpen(true);
                        }}
                        variant="primary"
                        className="me-1"
                      >
                        Edit Permissions
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
              } else {
                if (filter === user.role)
                  return (
                    <tr key={"user-" + index}>
                      <th scope="row">{user.id}</th>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
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
                            setIsPermissionOpen(true);
                          }}
                          variant="primary"
                          className="me-1"
                        >
                          Edit Permissions
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
              }
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
            Create New User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateUser />
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
            Update User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateUser data={selected} />
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
            onDelete={() => deleteUserById(selected?.id)}
          />
        </Modal.Body>
      </Modal>

      <Modal
        show={isPermissionOpen}
        onHide={() => setIsPermissionOpen(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        size="md"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Permission Manager
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PermissionForm data={selected} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Users;
