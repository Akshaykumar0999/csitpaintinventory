import React, { useContext, useEffect, useState } from "react";
import Header from "../Header";
import "./index.css";
import { NavMenuContext } from "../../Context/navMenuContext";
import Navbar from "../Navbar";
import {
  FaRegCaretSquareUp,
  FaRegCaretSquareDown,
  FaProductHunt,
} from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { MdEdit, MdDelete } from "react-icons/md";
import Table from "react-bootstrap/Table";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";

const Product = () => {
  const data = useContext(NavMenuContext);
  const [slideUp, setSlideUp] = useState(true);
  const [CategorySlideUp, setCategorySlideUp] = useState(true);
  const [isActiveTab, setIsActiveTab] = useState({
    product: true,
    productCategory: false,
  });

  useEffect(() => {
    getProducts();
  }, []);
  const api = axios.create({
    baseURL: "http://paint-backend-ypum.vercel.app/productCategory",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const getProducts = async () => {
    try {
      const res = await api.get();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main-container-card">
      {data.openNav && <Navbar />}
      <div className="headers-section-main-card">
        <Header />
        <main className="main-content-of-list-item">
          <div className="product-managing-tabs-main">
            <div
              className="product-align-item"
              onClick={() =>
                setIsActiveTab((prev) => ({
                  ...prev,
                  product: !prev.product,
                  productCategory: !prev.productCategory,
                }))
              }
              style={{
                background: isActiveTab.product ? "#3399ff" : "#ffffff",
                color: isActiveTab.product ? "#ffffff" : "#212631",
              }}
            >
              <FaProductHunt size={20} style={{ marginRight: "10px" }} />
              <h3 className="product-name">Product</h3>
            </div>
            <div
              className="product-align-item"
              onClick={() =>
                setIsActiveTab((prev) => ({
                  ...prev,
                  productCategory: !prev.productCategory,
                  product: !prev.product,
                }))
              }
              style={{
                background: isActiveTab.productCategory ? "#3399ff" : "#ffffff",
                color: isActiveTab.productCategory ? "#ffffff" : "#212631",
              }}
            >
              <BiSolidCategoryAlt size={20} style={{ marginRight: "10px" }} />
              <h3 className="product-name">Product-Category</h3>
            </div>
          </div>
          {isActiveTab.product ? (
            <div className="product-container-silder-card">
              <div className="product-container-name-card">
                <div>
                  <h2
                    style={{
                      color: "#3399ff",
                      fontSize: "20px",
                      marginBottom: "0",
                    }}
                  >
                    Product Data
                  </h2>
                  <p
                    style={{
                      fontSize: "10px",
                      margin: "0",
                      color: "#212631",
                    }}
                  >
                    Add, Edit, Delete and Read Product Data
                  </p>
                </div>
                <button
                  className="product-slides-card"
                  onClick={() => setSlideUp((prev) => !prev)}
                >
                  <p style={{ margin: "0" }}>
                    {slideUp ? "Collapse" : "Show Form"}
                  </p>
                  {slideUp ? (
                    <FaRegCaretSquareUp
                      size={20}
                      style={{ marginLeft: "10px" }}
                    />
                  ) : (
                    <FaRegCaretSquareDown
                      size={20}
                      style={{ marginLeft: "10px" }}
                    />
                  )}
                </button>
              </div>
              {slideUp && (
                <Form className="product-form-container">
                  <Row>
                    <Col sm style={{ marginBottom: "15px" }}>
                      <Form.Control
                        placeholder="Product Code"
                        name="ProductCode"
                      />
                    </Col>
                    <Col sm style={{ marginBottom: "15px" }}>
                      <Form.Control
                        placeholder="Product Name"
                        name="ProductName"
                      />
                    </Col>
                    <Col style={{ marginBottom: "15px" }}>
                      <Form.Control placeholder="Unit Cost" name="UnitCost" />
                    </Col>
                    <Col style={{ marginBottom: "15px" }}>
                      <Form.Control placeholder="Unit Price" name="UnitPrice" />
                    </Col>
                    <Col style={{ marginBottom: "15px" }}>
                      <Form.Control
                        placeholder="Record Level"
                        name="RecordLevel"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{ marginBottom: "5px" }}>
                      <Form.Control
                        placeholder="Target Level"
                        name="TargetLevel"
                      />
                    </Col>
                    <Col style={{ marginBottom: "5px" }}>
                      <Form.Control placeholder="Quantity" name="Quantity" />
                    </Col>
                    <Col style={{ marginBottom: "5px" }}>
                      <Form.Control placeholder="Re Order Qty" name="ReOrder" />
                    </Col>
                    <Col style={{ marginBottom: "5px" }}>
                      <Form.Label style={{ fontSize: "15px" }}>
                        Product-Category-ID
                      </Form.Label>
                      <Form.Select aria-label="Default select example">
                        <option value="Berger-ID23">Berger-ID23</option>
                        <option value="Berger-ID28">Berger-ID28</option>
                        <option value="Berger-ID29">Berger-ID29</option>
                      </Form.Select>
                    </Col>
                    <Col style={{ marginBottom: "5px" }}>
                      <Form.Label style={{ fontSize: "15px" }}>
                        Product Discountinued
                      </Form.Label>
                      <div style={{ display: "flex" }}>
                        <Form.Check
                          style={{ margin: "0px 10px 10px 10px" }}
                          type="radio"
                          name="ProductDiscountinued"
                          label={"Yes"}
                        />
                        <Form.Check
                          style={{ margin: "0px 10px 10px 10px" }}
                          type="radio"
                          name="ProductDiscountinued"
                          label={"No"}
                          checked
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm style={{ marginBottom: "15px" }}>
                      <Form.Label style={{ fontSize: "15px" }}>
                        Product Description
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        aria-label="With textarea"
                        name="ProductDescription"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <button className="btn bg-primary text-white mt-2 d-flex align-self-end">
                        Add Product
                      </button>
                    </Col>
                  </Row>
                </Form>
              )}
            </div>
          ) : (
            <div
              className="product-container-silder-card"
              style={{ marginTop: "15px" }}
            >
              <div className="product-container-name-card">
                <div>
                  <h2
                    style={{
                      color: "#3399ff",
                      fontSize: "20px",
                      marginBottom: "0",
                    }}
                  >
                    ProductCategory Data
                  </h2>
                  <p
                    style={{
                      fontSize: "10px",
                      margin: "0",
                      color: "#212631",
                    }}
                  >
                    Add, Edit, Delete and Read Product-Category Data
                  </p>
                </div>
                <button
                  className="product-slides-card"
                  onClick={() => setCategorySlideUp((prev) => !prev)}
                >
                  <p style={{ margin: "0" }}>
                    {CategorySlideUp ? "Collapse" : "Show Form"}
                  </p>
                  {CategorySlideUp ? (
                    <FaRegCaretSquareUp
                      size={20}
                      style={{ marginLeft: "10px" }}
                    />
                  ) : (
                    <FaRegCaretSquareDown
                      size={20}
                      style={{ marginLeft: "10px" }}
                    />
                  )}
                </button>
              </div>
              {CategorySlideUp && (
                <Form className="product-form-container">
                  <Row>
                    <Col style={{ marginBottom: "15px" }}>
                      <Form.Label>Category Code</Form.Label>
                      <Form.Control
                        placeholder="Category-Code"
                        name="categorycode"
                      />
                    </Col>
                    <Col sm style={{ marginBottom: "15px" }}>
                      <Form.Label>Category Name</Form.Label>
                      <Form.Control
                        placeholder="Category Name"
                        name="Categoryname"
                      />
                    </Col>
                    <Col sm style={{ marginBottom: "15px" }}>
                      <Form.Label>Category Descripton</Form.Label>
                      <Form.Control
                        placeholder="Category Description"
                        name="Categorydescription"
                      />
                    </Col>
                    <Col>
                      <Form.Label>Category-Status</Form.Label>
                      <Form.Select aria-label="Default select example">
                        <option value="Active">Active</option>
                        <option value="InActive">InActive</option>
                      </Form.Select>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <button className="btn bg-primary text-white mt-2 d-flex align-self-end">
                        Add Product-Category
                      </button>
                    </Col>
                  </Row>
                </Form>
              )}
            </div>
          )}
          {isActiveTab.product ? (
            <div className="product-table-main-card">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th style={{ background: "#3399ff", color: "#ffffff" }}>
                      #
                    </th>
                    <th style={{ background: "#3399ff", color: "#ffffff" }}>
                      Product Name
                    </th>
                    <th style={{ background: "#3399ff", color: "#ffffff" }}>
                      Product Code
                    </th>
                    <th style={{ background: "#3399ff", color: "#ffffff" }}>
                      UnitCost
                    </th>
                    <th style={{ background: "#3399ff", color: "#ffffff" }}>
                      UnitPrice
                    </th>
                    <th style={{ background: "#3399ff", color: "#ffffff" }}>
                      AddedDate
                    </th>
                    <th style={{ background: "#3399ff", color: "#ffffff" }}>
                      ModifiedDate
                    </th>
                    <th style={{ background: "#3399ff", color: "#ffffff" }}>
                      ReOrderQty
                    </th>
                    <th style={{ background: "#3399ff", color: "#ffffff" }}>
                      Qty
                    </th>
                    <th style={{ background: "#3399ff", color: "#ffffff" }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>70</td>
                    <td>90</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td className="d-flex">
                      <MdEdit
                        style={{
                          color: "#3399ff",
                          marginRight: "10px",
                          border: "1px solid #3399ff",
                          borderRadius: "4px",
                        }}
                        size={20}
                      />
                      <MdDelete
                        style={{
                          color: "#e55353",
                          border: "1px solid #e55353",
                          borderRadius: "4px",
                        }}
                        size={20}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Devid</td>
                    <td>olsen</td>
                    <td>20</td>
                    <td>25</td>
                    <td>olsenoi</td>
                    <td>Othometo</td>
                    <td>@uhuj</td>
                    <td>@hope</td>
                    <td className="d-flex">
                      <MdEdit
                        style={{
                          color: "#3399ff",
                          marginRight: "10px",
                          border: "1px solid #3399ff",
                          borderRadius: "4px",
                        }}
                        size={20}
                      />
                      <MdDelete
                        style={{
                          color: "#e55353",
                          border: "1px solid #e55353",
                          borderRadius: "4px",
                        }}
                        size={20}
                      />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          ) : (
            <div className="product-table-main-card">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th style={{ background: "#3399ff", color: "#ffffff" }}>
                      #
                    </th>
                    <th style={{ background: "#3399ff", color: "#ffffff" }}>
                      Category Name
                    </th>
                    <th style={{ background: "#3399ff", color: "#ffffff" }}>
                      Category Code
                    </th>
                    <th style={{ background: "#3399ff", color: "#ffffff" }}>
                      Is-Active
                    </th>
                    <th style={{ background: "#3399ff", color: "#ffffff" }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>70</td>
                    <td className="d-flex">
                      <MdEdit
                        style={{
                          color: "#3399ff",
                          marginRight: "10px",
                          border: "1px solid #3399ff",
                          borderRadius: "4px",
                        }}
                        size={20}
                      />
                      <MdDelete
                        style={{
                          color: "#e55353",
                          border: "1px solid #e55353",
                          borderRadius: "4px",
                        }}
                        size={20}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Devid</td>
                    <td>olsen</td>
                    <td>20</td>
                    <td className="d-flex">
                      <MdEdit
                        style={{
                          color: "#3399ff",
                          marginRight: "10px",
                          border: "1px solid #3399ff",
                          borderRadius: "4px",
                        }}
                        size={20}
                      />
                      <MdDelete
                        style={{
                          color: "#e55353",
                          border: "1px solid #e55353",
                          borderRadius: "4px",
                        }}
                        size={20}
                      />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Product;
