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

import useCollection from "../../../../hooks/firebase/useCollection";
import useDocument from "../../../../hooks/firebase/useDocument";

const Tickets = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  // Custom hoock to handle user information
  const tickets = useCollection("requestedTicketsForAssignment");
  const vendors = useCollection("users");
  const documentOperation = useDocument();

  const handleAssign = async (vendorId) => {
    if (selected) {
      console.log(selected);
      const deletedDocument = await documentOperation.deleteDocument(
        "requestedTicketsForAssignment",
        selected.id
      );

      console.log(deletedDocument);
      const selectedItem = selected;
      delete selected.id;
      selectedItem.vendorId = vendorId;
      selectedItem.accepted = false;

      //   await documentOperation.createDocument("assignedTickets", selectedItem);
      tickets.refresh();
    }
    setOpen(false);
  };

  //   useEffect(() => {
  //     getAllUsers();
  //   }, [isCreateOpen, isUpdateOpen, isDeleteOpen, isPermissionOpen]);

  // useEffect(() => {
  //   const updatePermissions = async () => {
  //     const users = await getDocuments();

  //     users.map(async (user) => {
  //       await updateDocument({
  //         id: user.id,
  //         role: user.role,
  //         email: user.email,
  //         name: user.name,
  //         permissions: [],
  //       });
  //     });
  //   };
  //   updatePermissions();
  // }, []);
  // const isUserLoggedin = getUser();

  // if (!isUserLoggedin) {
  //   return null;
  // }

  return (
    <>
      <Container fluid className="p-6">
        {/* <Container> */}
        <Row>
          <Col sm={2}>
            {/* <Button
              variant="success"
              className="mb-3"
              onClick={() => setIsCreateOpen(true)}
            >
              Create New User
            </Button> */}
          </Col>
          <Col sm={7}></Col>
          <Col sm={3}>
            {/* <Funnel size={24} /> */}
            {/* <Dropdown as={ButtonGroup}>
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
            </Dropdown> */}
          </Col>
        </Row>
        {/* </Container> */}
        <Table className="text-nowrap">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Email</th>
              <th scope="col">Customer Address</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {tickets.data.map((ticket, index) => {
              return (
                <tr key={"user-" + index}>
                  <th scope="row">{ticket.id}</th>
                  <td>{ticket.name}</td>
                  <td>{ticket.email}</td>
                  <td>{ticket.address}</td>
                  <td>{ticket.status}</td>
                  <td className="d-flex gap-2">
                    <Button
                      onClick={() => {
                        setSelected(ticket);
                        setOpen(true);
                      }}
                      variant="light"
                      className="me-1"
                    >
                      Assign to Vendor
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
        show={open}
        onHide={() => setOpen(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Assign to vendor
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-wrap gap-3">
            {
              vendors.data.map((vendor, index) => {
                return (
                  <Button
                    key={`index-${index}`}
                    onClick={() => {
                      handleAssign(vendor.id);
                    }}
                    variant="primary"
                    className="me-1"
                  >
                    {vendor.name}
                  </Button>
                );
              })
              // .filter((item) => item.role === "Vendor")
            }
          </div>
        </Modal.Body>
      </Modal>

      {/* <Modal
        show={isCreateOpen}
        onHide={() => setIsCreateOpen(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        size="lg"
      > */}
      {/* <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Create New User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateUser
            createUser={createUser}
            onClose={() => {
              setIsCreateOpen(false);
              getAllUsers();
            }}
          />
        </Modal.Body>
      </Modal> */}
      {/* <Modal
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
          <UpdateUser
            data={selected}
            onClose={() => {
              setIsUpdateOpen(false);
            }}
          />
        </Modal.Body>
      </Modal> */}
      {/* <Modal
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
      </Modal> */}

      {/* <Modal
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
      </Modal> */}
    </>
  );
};

export default Tickets;
