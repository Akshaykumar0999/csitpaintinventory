import React, { useContext, useEffect, useState } from "react";
import Header from "../Header";
import "./index.css";
import { NavMenuContext } from "../../Context/navMenuContext";
import Navbar from "../Navbar";
import Table from "react-bootstrap/Table";
// import { MdEdit, MdDelete } from "react-icons/md";

import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

// import { v4 as uuidv4 } from "uuid";
import { SupplierTableRow } from "../TableRow";
import axios from "axios";
// const supplierTableData = [
//   {
//     id: uuidv4(),
//     firstname: "Akshay",
//     lastname: "kumar",
//     email: "akshay@gmail.com",
//     phonenumber: "123478909",
//     companyid: "CSIT",
//     jobtitle: "Web Developer",
//     address: "MBNR",
//     city: "MBNR",
//     state: "Telangana",
//     zip: "687767",
//     website: "akshay.in",
//   },
//   {
//     id: uuidv4(),
//     firstname: "Srujana",
//     lastname: "DVS",
//     email: "srujana@gmail.com",
//     phonenumber: "123478909",
//     companyid: "CSIT",
//     jobtitle: "Web Developer",
//     address: "Sattinenipalli",
//     city: "Sattinenipalli",
//     state: "AP",
//     zip: "687767",
//     website: "srujana.com",
//   },
// ];

const Supplier = () => {
  const data = useContext(NavMenuContext);
  const [show, setShow] = useState(false);
  const [supplierDataList, setSupplierDataList] = useState([]);
  const [typeData, setTypeData] = useState([]);
  const [supplierData, setSupplierData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    phonenumber: "",
    companyid: "",
    jobtitle: "",
    city: "",
    state: "",
    zip: "",
    website: "",
    description: "",
  });

  useEffect(() => {
    getAllDetails();
  }, []);

  useEffect(() => {
    getTypes();
  }, [])

  const baseApi = axios.create({
    baseURL: "https://paint-backend-ypum.vercel.app",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const getAllDetails = async () => {
    try {
      const resData = await baseApi.get("/suppliers");
      console.log(resData.data);
      if (resData.status === 200) {
        const convertCamelCase = resData.data.map((each) => ({
          firstname: each.firstname,
          lastname: each.lastname,
          phonenumber: each.phonenumber,
          address: each.address,
          website: each.website,
          zip: each.zip,
          state: each.state,
          companyid: each.company_id,
          id: each.id,
          jobtitle: each.jobtitle,
          email: each.email,
          city: each.city,
          description: each.description,
          createdat: each.created_at,
          updatedat: each.updated_at,
        }));
        setSupplierDataList(convertCamelCase);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const getTypes = async () => {
    try {
      const res = await baseApi.get("/companyType");
      if (res.status === 200){
        setTypeData(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  //Adding supplier data in input feilds
  const handleSupplierdetails = (e) => {
    const { name, value } = e.target;
    setSupplierData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //Adding SupplerData into table when clicking on the Add button In the POPUP form
  const addSupplierValues = async () => {
    const newSupplier = {
      firstname: supplierData.firstname,
      lastname: supplierData.lastname,
      phonenumber: supplierData.phonenumber,
      address: supplierData.address,
      website: supplierData.website,
      zip: supplierData.zip,
      state: supplierData.state,
      company_id: supplierData.companyid,
      id: supplierData.id,
      jobtitle: supplierData.jobtitle,
      email: supplierData.email,
      city: supplierData.city,
      description: supplierData.description,
    };
    try {
      const res = await baseApi.post("/suppliers", newSupplier);
      if (res.status === 201) {
        alert(res.data.message);
        const data = res.data.supplierData;
        const convertCamelCasedata = {
          firstname: data.firstname,
          lastname: data.lastname,
          phonenumber: data.phonenumber,
          address: data.address,
          website: data.website,
          zip: data.zip,
          state: data.state,
          companyid: data.company_id,
          id: data.id,
          jobtitle: data.jobtitle,
          email: data.email,
          city: data.city,
          description: data.description,
          createdat: data.created_at,
          updatedat: data.updated_at,
        };
        setSupplierDataList([...supplierDataList, convertCamelCasedata]);
      }
    } catch (error) {
      console.log(error);
    }
    // const newSupplier = {
    //   id: uuidv4(),
    //   firstname: supplierData.firstname,
    //   lastname: supplierData.lastname,
    //   email: supplierData.email,
    //   address: supplierData.address,
    //   phonenumber: supplierData.phonenumber,
    //   jobTitle: supplierData.jobTitle,
    //   companyid: supplierData.companyid,
    //   city: supplierData.city,
    //   state: supplierData.state,
    //   zip: supplierData.zip,
    //   website: supplierData.website,
    //   supplierDescription: supplierData.supplierDescription,
    // };
    // setSupplierDataList((prev) => [...prev, newSupplier]);
    setShow(false);
    setSupplierData({
      firstname: "",
      lastname: "",
      email: "",
      address: "",
      phonenumber: "",
      jobTitle: "",
      companyid: "",
      city: "",
      state: "",
      zip: "",
      website: "",
      supplierDescription: "",
    });
  };

  //Updating(edit) Values based on active ID
  const updateSupplierId = async (id, editSupplierData) => {
    const supplierEditData = {
      firstname: editSupplierData.firstname,
      lastname: editSupplierData.lastname,
      phonenumber: editSupplierData.phonenumber,
      address: editSupplierData.address,
      website: editSupplierData.website,
      zip: editSupplierData.zip,
      state: editSupplierData.state,
      company_id: editSupplierData.companyid,
      id: editSupplierData.id,
      jobtitle: editSupplierData.jobtitle,
      email: editSupplierData.email,
      city: editSupplierData.city,
      description: editSupplierData.description,
    };
    try {
      const res = await baseApi.put(`/suppliers/${id}`, supplierEditData);
      const responseData = res.data.supplierData;
      if (res.status === 200) {
        alert(res.data.message);
        setSupplierDataList(
          supplierDataList.map((sup) => {
            if (id === sup.id) {
              return {
                ...sup,
                firstname: responseData.firstname,
                lastname: responseData.lastname,
                email: responseData.email,
                phonenumber: responseData.phonenumber,
                jobTitle: responseData.jobTitle,
                companyid: responseData.companyid,
                address: responseData.address,
                city: responseData.city,
                state: responseData.state,
                website: responseData.website,
                zip: responseData.zip,
              };
            }
            return sup;
          })
        );
      }
    } catch (error) {
      console.log(error)
    }
    setSupplierDataList(
      supplierDataList.map((sup) => {
        if (id === sup.id) {
          return {
            ...sup,
            firstname: editSupplierData.firstname,
            lastname: editSupplierData.lastname,
            email: editSupplierData.email,
            phonenumber: editSupplierData.phonenumber,
            jobTitle: editSupplierData.jobTitle,
            companyid: editSupplierData.companyid,
            address: editSupplierData.address,
            city: editSupplierData.city,
            state: editSupplierData.state,
            website: editSupplierData.website,
            zip: editSupplierData.zip,
          };
        }
        return sup;
      })
    );
  };

  //deleteSupplier based on the UserCliked ID
  const deleteSupplier = async (id) => {
    try {
      const res = await baseApi.delete(`/suppliers/${id}`);
      if(res.status === 200) {
        alert(res.data.message);
        const filteredSupplierList = supplierDataList.filter(
          (eachSup) => eachSup.id !== id
        );
        setSupplierDataList(filteredSupplierList);
      }
    } catch (error) {
      console.log(error)
    }
    
  };

  return (
    <div className="main-container-card">
      {data.openNav && <Navbar />}
      <div
        className="headers-section-main-card"
        style={{
          background: data.theme && "#212631",
          color: data.theme && "#fff",
        }}
      >
        <Header />
        <main className="main-content-of-list-item">
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2
              style={{
                color: "#3399ff",
                marginBottom: "20px",
                textAlign: "left",
              }}
            >
              Supplier Data
            </h2>
            <button
              className="bg-primary text-white"
              style={{ borderRadius: "5px", marginBottom: "20px" }}
              onClick={() => {
                setShow(true), setEdit(false);
              }}
            >
              Add Supplier
            </button>
          </div>
          <div className="table-container-card">
            <Table striped bordered hover>
              <thead>
                <tr>
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
                    companyid
                  </th>
                  <th style={{ background: "#3399ff", color: "#ffffff" }}>
                    Address
                  </th>
                  <th style={{ background: "#3399ff", color: "#ffffff" }}>
                    City
                  </th>
                  <th style={{ background: "#3399ff", color: "#ffffff" }}>
                    Website
                  </th>
                  <th style={{ background: "#3399ff", color: "#ffffff" }}>
                    State
                  </th>
                  <th style={{ background: "#3399ff", color: "#ffffff" }}>
                    Zip
                  </th>
                  {/* <th style={{ background: '#3399ff', color: '#ffffff' }}>Edit</th>
                                        <th style={{ background: '#3399ff', color: '#ffffff' }}>Delete</th> */}
                  <th style={{ background: "#3399ff", color: "#ffffff" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {supplierDataList.map((each) => (
                  <SupplierTableRow
                    supplier={each}
                    key={each.id}
                    updateSupplierId={updateSupplierId}
                    deleteSupplier={deleteSupplier}
                    typeData={typeData}
                  />
                ))}
              </tbody>
            </Table>
          </div>
        </main>
      </div>
      <Modal
        show={show}
        centered
        size="xl"
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header
          closeButton
          style={{
            background: data.theme && "#212631",
            color: data.theme && "#fff",
          }}
        >
          <Modal.Title id="example-custom-modal-styling-title">
            Add Supplier
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            background: data.theme && "#212631",
            color: data.theme && "#fff",
          }}
        >
          <Form>
            <Row style={{ marginBottom: "10px" }}>
              <Col>
                {data.theme && <Form.Label>firstname</Form.Label>}
                <Form.Control
                  placeholder="First name"
                  name="firstname"
                  onChange={handleSupplierdetails}
                  style={{
                    background: data.theme && "#212631",
                    color: data.theme && "#fff",
                  }}
                  value={supplierData.firstname}
                />
              </Col>
              {/* <Col>
                {data.theme && <Form.Label>lastname</Form.Label>}
                <Form.Control
                  placeholder="Last name"
                  name="lastname"
                  onChange={handleSupplierdetails}
                  style={{
                    background: data.theme && "#212631",
                    color: data.theme && "#fff",
                  }}
                  value={supplierData.lasttname}
                />
              </Col> */}
              <Col>
                {data.theme && <Form.Label>Company-Type</Form.Label>}
                <Form.Select
                  aria-label="Default select example"
                  name="companyid"
                  onChange={handleSupplierdetails}
                  style={{
                    background: data.theme && "#212631",
                    color: data.theme && "#fff",
                  }}
                  value={supplierData.companyid}
                >
                  {typeData.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                  {/* <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option> */}
                </Form.Select>
              </Col>
            </Row>
            <Row style={{ marginBottom: "10px" }}>
              <Col>
                {data.theme && <Form.Label>Email</Form.Label>}
                <Form.Control
                  placeholder="Email"
                  name="email"
                  onChange={handleSupplierdetails}
                  style={{
                    background: data.theme && "#212631",
                    color: data.theme && "#fff",
                  }}
                  value={supplierData.email}
                />
              </Col>
              <Col>
                {data.theme && <Form.Label>Phone Number</Form.Label>}
                <Form.Control
                  placeholder="phonenumber"
                  name="phonenumber"
                  onChange={handleSupplierdetails}
                  style={{
                    background: data.theme && "#212631",
                    color: data.theme && "#fff",
                  }}
                  value={supplierData.phonenumber}
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: "10px" }}>
              <Col>
                {data.theme && <Form.Label>Job Title</Form.Label>}
                <Form.Control
                  placeholder="Job-Title"
                  name="jobtitle"
                  onChange={handleSupplierdetails}
                  style={{
                    background: data.theme && "#212631",
                    color: data.theme && "#fff",
                  }}
                  value={supplierData.jobtitle}
                />
              </Col>
              <Col>
                {data.theme && <Form.Label>Address</Form.Label>}
                <Form.Control
                  placeholder="Adress"
                  name="address"
                  onChange={handleSupplierdetails}
                  style={{
                    background: data.theme && "#212631",
                    color: data.theme && "#fff",
                  }}
                  value={supplierData.address}
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: "10px" }}>
              <Col>
                {data.theme && <Form.Label>City</Form.Label>}
                <Form.Control
                  placeholder="City"
                  name="city"
                  onChange={handleSupplierdetails}
                  style={{
                    background: data.theme && "#212631",
                    color: data.theme && "#fff",
                  }}
                  value={supplierData.city}
                />
              </Col>
              <Col>
                {data.theme && <Form.Label>State</Form.Label>}
                <Form.Control
                  placeholder="State"
                  name="state"
                  onChange={handleSupplierdetails}
                  style={{
                    background: data.theme && "#212631",
                    color: data.theme && "#fff",
                  }}
                  value={supplierData.state}
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: "10px" }}>
              <Col>
                {data.theme && <Form.Label>Zip</Form.Label>}
                <Form.Control
                  placeholder="Zip"
                  name="zip"
                  onChange={handleSupplierdetails}
                  style={{
                    background: data.theme && "#212631",
                    color: data.theme && "#fff",
                  }}
                  value={supplierData.zip}
                />
              </Col>
              <Col>
                {data.theme && <Form.Label>Website</Form.Label>}
                <Form.Control
                  placeholder="Website"
                  name="website"
                  onChange={handleSupplierdetails}
                  style={{
                    background: data.theme && "#212631",
                    color: data.theme && "#fff",
                  }}
                  value={supplierData.website}
                />
              </Col>
            </Row>
            {/* <Row style={{ marginBottom: "10px" }}>
              <Col>
                {data.theme && <Form.Label>Company-Type</Form.Label>}
                <Form.Select
                  aria-label="Default select example"
                  name="companyid"
                  onChange={handleSupplierdetails}
                  style={{
                    background: data.theme && "#212631",
                    color: data.theme && "#fff",
                  }}
                  value={supplierData.companyid}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </Form.Select>
              </Col>
            </Row> */}

            <Row style={{ marginBottom: "10px" }}>
              <Col>
                {data.theme && <Form.Label>Description</Form.Label>}
                <Form.Control
                  as="textarea"
                  aria-label="Description"
                  placeholder="Description"
                  name="description"
                  onChange={handleSupplierdetails}
                  style={{
                    background: data.theme && "#212631",
                    color: data.theme && "#fff",
                  }}
                  value={supplierData.description}
                />
              </Col>
            </Row>
          </Form>
          <button className="btn btn-success" onClick={addSupplierValues}>
            Add
          </button>
          {data.theme && (
            <button
              className="btn btn-secondary"
              onClick={() => setShow(false)}
              style={{ marginLeft: "10px" }}
            >
              Close
            </button>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Supplier;
