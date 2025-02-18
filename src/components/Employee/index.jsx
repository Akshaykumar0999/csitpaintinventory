import React, { useContext, useEffect, useState } from "react";
import Header from "../Header";
import "./index.css";
import { NavMenuContext } from "../../Context/navMenuContext";
import Navbar from "../Navbar";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";

import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { EmployeeTableRow } from "../TableRow";
import axios from "axios";
// import { useSelector } from "react-redux";

const Employee = () => {
  // const { auth } = useSelector((state) => state);
  const navbar = useContext(NavMenuContext);
  const [employeeData, setEmployeeDate] = useState([]);
  const [show, setShow] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    PhoneNumber: "",
    address: "",
    companyName: "",
    jobTitle: "",
    status: "",
  });

  const [loading, setLoading] = useState(false);

  //setting inputs values using this handle function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //creating axios baseUrl Headers
  const api = axios.create({
    baseURL: "https://paint-backend-ypum.vercel.app",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  //get Employees Records
  useEffect(() => {
    getEmployeesRecords();
  }, []);
  const onSuccessfullyFetchedEmployeeRecords = (data) => {
    const emplyeesRecordsData = data.map((each) => ({
      id: each.id,
      firstName: each.firstname,
      lastName: each.lastname,
      email: each.email,
      PhoneNumber: each.phonenumber,
      companyName: each.company_name,
      jobTitle: each.job_title,
      address: each.address,
      status: each.status,
    }));
    setEmployeeDate(emplyeesRecordsData);
  };
  const getEmployeesRecords = async () => {
    setLoading(true);
    try {
      const res = await api.get("/employees");
      // console.log(res);
      setLoading(false);
      onSuccessfullyFetchedEmployeeRecords(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //Add employess records
  const addEmplyeeRecord = async (e) => {
    e.preventDefault();
    const newEmployeeRecord = {
      firstname: employeeDetails.firstName,
      lastname: employeeDetails.lastName,
      email: employeeDetails.email,
      phonenumber: employeeDetails.PhoneNumber,
      address: employeeDetails.address,
      company_name: employeeDetails.companyName,
      job_title: employeeDetails.jobTitle,
      status: employeeDetails.status,
    };
    const res = await api.post("/employees", newEmployeeRecord);
    setEmployeeDate([...employeeData, newEmployeeRecord]);
    setEmployeeDetails({
      firstName: "",
      lastName: "",
      email: "",
      PhoneNumber: "",
      address: "",
      companyName: "",
      jobTitle: "",
      status: "",
    });
  };

  //Update employess records
  const updateEditedDatavalues = async (data, id) => {
    try {
      const res = await api.put(`/employees/${id}`, data);
      console.log(res);
      if (res.status === 200) {
        alert(res.data.message);
        setEmployeeDate(
          employeeData.map((emp) => {
            if (emp.id === id) {
              return {
                ...emp,
                firstName: data.firstName,
                email: data.email,
                PhoneNumber: data.PhoneNumber,
                status: data.status,
                address: data.address,
                companyName: data.companyName,
                jobTitle: data.jobTitle,
              };
            }
            return emp;
          })
        );
      }else {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Delete employess records
  const deleteEmployeeRecord = async (id) => {
    try {
      const delRes = await api.delete(`/employees/${id}`);
      // console.log(delRes);
      if (delRes.status === 200) {
        alert(delRes.data.message);
        const filteredData = employeeData.filter((each) => each.id !== id);
        setEmployeeDate(filteredData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="main-container-card"
      style={{
        background: navbar.theme && "#212631",
        color: navbar.theme && "#fff",
      }}
    >
      {navbar.openNav && <Navbar />}
      <div
        className="headers-section-main-card"
        style={{
          background: navbar.theme && "#212631",
          color: navbar.theme && "#fff",
        }}
      >
        <Header />
        <main className="main-content-of-list-item">
          <h2
            style={{
              color: "#3399ff",
              marginBottom: "20px",
              alignSelf: "flex-start",
            }}
          >
            Employee Data
          </h2>
          <div
            className="table-container-card d-flex flex-grow-1 justify-content-start align-items-center"
            style={{ width: "100%", height: "100%" }}
          >
            {loading ? (
              <Spinner
                animation="grow"
                variant="primary"
                style={{ margin: "0 auto" }}
              />
            ) : (
              <Table striped bordered hover style={{ width: "100%" }}>
                <thead>
                  <tr key="abc">
                    <th style={{ background: "#3399ff", color: "#ffffff" }}>
                      Name
                    </th>
                    <th style={{ background: "#3399ff", color: "#ffffff" }}>
                      Email
                    </th>
                    <th style={{ background: "#3399ff", color: "#ffffff" }}>
                      Phone Number
                    </th>
                    <th style={{ background: "#3399ff", color: "#ffffff" }}>
                      Job Title
                    </th>
                    <th style={{ background: "#3399ff", color: "#ffffff" }}>
                      CompanyName
                    </th>
                    <th style={{ background: "#3399ff", color: "#ffffff" }}>
                      Address
                    </th>
                    <th style={{ background: "#3399ff", color: "#ffffff" }}>
                      Status
                    </th>
                    <th style={{ background: "#3399ff", color: "#ffffff" }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {employeeData.map((employee) => (
                    <EmployeeTableRow
                      employee={employee}
                      key={employee.id}
                      deleteEmployeeRecord={deleteEmployeeRecord}
                      updateEditedDatavalues={updateEditedDatavalues}
                    />
                  ))}
                </tbody>
                <div
                  style={{ width: "100%" }}
                  className="d-flex justify-content-start align-items-center"
                >
                  <button
                    className="bg-primary text-white"
                    style={{
                      borderRadius: "5px",
                      marginTop: "10px",
                    }}
                    onClick={() => setShow(true)}
                  >
                    Add Employee
                  </button>
                </div>
              </Table>
            )}
          </div>
        </main>
        <Modal
          show={show}
          size="xl"
          onHide={() => setShow(false)}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header
            closeButton
            style={{
              background: navbar.theme && "#212631",
              color: navbar.theme && "#fff",
            }}
          >
            <Modal.Title id="example-custom-modal-styling-title">
              Add Employee
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              background: navbar.theme && "#212631",
              color: navbar.theme && "#fff",
            }}
          >
            <Form>
              <Row style={{ marginBottom: "10px" }}>
                <Col>
                  {navbar && <Form.Label>Firstname</Form.Label>}
                  <Form.Control
                    placeholder="First name"
                    name="firstName"
                    value={employeeDetails.firstName}
                    onChange={handleChange}
                    style={{
                      background: navbar.theme && "#212631",
                      color: navbar.theme && "#fff",
                    }}
                  />
                </Col>
                <Col>
                  {navbar && <Form.Label>Lastname</Form.Label>}
                  <Form.Control
                    placeholder="Last name"
                    name="lastName"
                    value={employeeDetails.lastName}
                    onChange={handleChange}
                    style={{
                      background: navbar.theme && "#212631",
                      color: navbar.theme && "#fff",
                    }}
                  />
                </Col>
              </Row>
              <Row style={{ marginBottom: "10px" }}>
                <Col>
                  {navbar && <Form.Label>Email</Form.Label>}
                  <Form.Control
                    placeholder="Email"
                    name="email"
                    value={employeeDetails.email}
                    onChange={handleChange}
                    style={{
                      background: navbar.theme && "#212631",
                      color: navbar.theme && "#fff",
                    }}
                  />
                </Col>
                <Col>
                  {navbar && <Form.Label>Phone Number</Form.Label>}
                  <Form.Control
                    placeholder="PhoneNumber"
                    name="PhoneNumber"
                    value={employeeDetails.PhoneNumber}
                    onChange={handleChange}
                    style={{
                      background: navbar.theme && "#212631",
                      color: navbar.theme && "#fff",
                    }}
                  />
                </Col>
              </Row>
              <Row style={{ marginBottom: "10px" }}>
                <Col>
                  {navbar && <Form.Label>Job Title</Form.Label>}
                  <Form.Control
                    placeholder="Job-Title"
                    name="jobTitle"
                    value={employeeDetails.jobTitle}
                    onChange={handleChange}
                    style={{
                      background: navbar.theme && "#212631",
                      color: navbar.theme && "#fff",
                    }}
                  />
                </Col>
                <Col>
                  {navbar && <Form.Label>Address</Form.Label>}
                  <Form.Control
                    placeholder="Address"
                    name="address"
                    value={employeeDetails.address}
                    onChange={handleChange}
                    style={{
                      background: navbar.theme && "#212631",
                      color: navbar.theme && "#fff",
                    }}
                  />
                </Col>
              </Row>
              <Row style={{ marginBottom: "10px" }}>
                <Col>
                  {navbar && <Form.Label>Status</Form.Label>}
                  <Form.Select
                    aria-label="Default select example"
                    onChange={handleChange}
                    name="status"
                    style={{
                      background: navbar.theme && "#212631",
                      color: navbar.theme && "#fff",
                    }}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">In-Active</option>
                  </Form.Select>
                </Col>
                <Col>
                  {navbar && <Form.Label>Company Name</Form.Label>}
                  <Form.Control
                    placeholder="Company Name"
                    name="companyName"
                    value={employeeDetails.companyName}
                    onChange={handleChange}
                    style={{
                      background: navbar.theme && "#212631",
                      color: navbar.theme && "#fff",
                    }}
                  />
                </Col>
              </Row>
            </Form>
            <button
              type="submit"
              className="btn btn-success"
              onClick={addEmplyeeRecord}
            >
              Add
            </button>
            {navbar && (
              <button
                className="btn btn-secondary"
                style={{ marginLeft: "5px" }}
                onClick={() => setShow(false)}
              >
                Close
              </button>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Employee;
