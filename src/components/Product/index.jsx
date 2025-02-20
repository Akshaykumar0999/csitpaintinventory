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
import { useSelector } from "react-redux";

const Product = () => {
  const { auth } = useSelector((state) => state);
  const data = useContext(NavMenuContext);
  const [slideUp, setSlideUp] = useState(true);
  const [CategorySlideUp, setCategorySlideUp] = useState(true);
  const [isActiveTab, setIsActiveTab] = useState({
    product: true,
    productCategory: false,
  });

  //Product Category state Methods
  const [productCategories, setProductsCategories] = useState([]);
  const [proCategory, setProCategory] = useState({
    CategoryCode: "",
    CategoryName: "",
    CategoryDesc: "",
    IsActive: "",
  });
  const [activeId, setActiveId] = useState(null);
  const [updateStatus, setUpdateStatus] = useState(false);
  //setting new values of ProductCatgeory from the input feilds
  const handleProductCategory = (e) => {
    const { name, value } = e.target;
    setProCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  //getProducts Category using useEffect Methos
  useEffect(() => {
    getProductCategories();
  }, [productCategories]);
  //Initializing Base api using Axios
  const api = axios.create({
    baseURL: "https://paint-backend-ypum.vercel.app",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  //getProductCategories Api, Fetching ProductCategories here
  const getProductCategories = async () => {
    try {
      const res = await api.get("/productCategory");
      if (res.status === 200) {
        setProductsCategories(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //Adding ProductCategory
  const handleSubmitProductcategory = async (e) => {
    e.preventDefault();
    const newCategoryData = {
      CategoryCode: proCategory.CategoryCode,
      CategoryName: proCategory.CategoryName,
      CategoryDesc: proCategory.CategoryDesc,
      IsActive: proCategory.IsActive,
      CategoryImage: "",
    };
    try {
      const res = await api.post("/productCategory", newCategoryData);
      if (res.status === 200) {
        alert("Category Added Successfully");
        const resData = res.data;
        const category = {
          CategoryId: res.data.productCategoryId,
          CategoryCode: resData.productCategoryData.CategoryCode,
          CategoryName: resData.productCategoryData.CategoryName,
          CategoryDesc: resData.productCategoryData.CategoryDesc,
          IsActive: resData.productCategoryData.IsActive,
          CategoryImage: resData.productCategoryData.CategoryImage,
        };
        setProductsCategories((prev) => [...prev, category]);
        setProCategory({
          CategoryCode: "",
          CategoryName: "",
          CategoryDesc: "",
          IsActive: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  //Deleting ProductCategory
  const deleteProductCategory = async (id) => {
    try {
      const res = await api.delete(`/productCategory/${id}`);
      if (res.status === 200) {
        alert("Product Category Deleted Successfully.");
        const newFilteredlist = productCategories.filter(
          (each) => each.id !== id
        );
        setProductsCategories(newFilteredlist);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //Updating ActiveId while user clicking on the Edit icon...
  const updateProductCategory = (id) => {
    setActiveId(id);
    setUpdateStatus(true);
    productCategories.map((item) => {
      if (item.CategoryId === id) {
        setProCategory({
          CategoryCode: item.CategoryCode,
          CategoryName: item.CategoryName,
          CategoryDesc: item.CategoryDesc,
          IsActive: item.IsActive,
        });
      }
    });
  };
  //Updating ProductCategory
  const updatedDataOfProductCat = async (e) => {
    e.preventDefault();
    const UpdatedCategoryData = {
      CategoryCode: proCategory.CategoryCode,
      CategoryName: proCategory.CategoryName,
      CategoryDesc: proCategory.CategoryDesc,
      IsActive: proCategory.IsActive,
      CategoryImage: "",
    };
    try {
      const res = await api.put(
        `/productCategory/${activeId}`,
        UpdatedCategoryData
      );
      if (res.status === 200) {
        alert("Category Data Updated Successfully.");
        const data = res.data.productCategoryData;
        setProductsCategories(
          productCategories.map((item) => {
            if (item.id === activeId) {
              return {
                ...item,
                CategoryId: res.data.productCategoryId,
                CategoryCode: data.CategoryCode,
                CategoryName: data.CategoryName,
                CategoryDesc: data.CategoryDesc,
                IsActive: data.IsActive,
                CategoryImage: "",
              };
            }
            return item;
          })
        );
        setProCategory({
          CategoryCode: "",
          CategoryName: "",
          CategoryDesc: "",
          IsActive: "",
        });
        setUpdateStatus(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Products States Methods
  const [products, setProducts] = useState([]);
  const [productEntry, setProductEntry] = useState({
    ProductCode: "",
    ProductName: "",
    ProductDescription: "",
    StandardUnitCost: "",
    UnitPrice: "",
    ReorderLevel: "",
    TargetLevel: "",
    QuantityPerUnit: "",
    Discontinued: "",
    MinimumReorderQuantity: "",
    ProductCategory: "",
  });
  const [productActiveID, setProductActiveID] = useState(null);
  const [productActive, setProductActive] = useState(false);
  //getProducts Using useEffect Method
  useEffect(() => {
    getProducts();
  }, [products]);
  //setting new values to the input feilds which user entered
  const handleProductsEntry = (e) => {
    const { name, value } = e.target;
    setProductEntry((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  //Get Products and fetching the products from the url
  const getProducts = async () => {
    try {
      const res = await api.get("/products");
      if (res.status === 200) {
        setProducts(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //Add Products Function
  const AddProducts = async (e) => {
    e.preventDefault();
    const newProduct = {
      ProductCode: productEntry.ProductCode,
      ProductName: productEntry.ProductName,
      ProductDescription: productEntry.ProductDescription,
      StandardUnitCost: productEntry.StandardUnitCost,
      UnitPrice: productEntry.UnitPrice,
      ReorderLevel: productEntry.ReorderLevel,
      TargetLevel: productEntry.TargetLevel,
      QuantityPerUnit: productEntry.QuantityPerUnit,
      Discontinued: productEntry.Discontinued,
      MinimumReorderQuantity: productEntry.MinimumReorderQuantity,
      ProductCategoryID: productEntry.ProductCategory,
      ModifiedBy: auth.user.id,
      addedBy: auth.user.id,
    };
    try {
      const res = await api.post("/products", newProduct);
      const data = res.data.productData;
      if (res.status === 201) {
        alert("Product Added Successfuly.");
        const Product = {
          ProductID: res.data.productId,
          ProductCode: data.ProductCode,
          ProductName: data.ProductName,
          ProductDescription: data.ProductDescription,
          StandardUnitCost: data.StandardUnitCost,
          UnitPrice: data.UnitPrice,
          ReorderLevel: data.ReorderLevel,
          TargetLevel: data.TargetLevel,
          QuantityPerUnit: data.QuantityPerUnit,
          Discontinued: data.Discontinued,
          AddedOn: data.AddedOn,
          MinimumReorderQuantity: data.MinimumReorderQuantity,
          ProductCategoryID: data.ProductCategoryID,
          ModifiedBy: data.ModifiedBy,
          addedBy: data.addedBy,
        };
        setProducts((prev) => [...prev, Product]);
        setProductEntry({
          ProductCode: "",
          ProductName: "",
          ProductDescription: "",
          StandardUnitCost: "",
          UnitPrice: "",
          ReorderLevel: "",
          TargetLevel: "",
          QuantityPerUnit: "",
          Discontinued: "",
          MinimumReorderQuantity: "",
          ProductCategory: "",
        });
      } else {
        alert("Required All Fields");
      }
    } catch (error) {
      console.log(error);
    }
  };
  //Delete Product function
  const deleteProduct = async (id) => {
    try {
      const res = await api.delete(`/products/${id}`);
      if (res.status === 200) {
        alert("Product Deleted Successfully");
        setProducts(products.filter((each) => each.ProductID !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };
  //Updating activeId and activetab for products
  const updateActives = (id) => {
    products.map((each) => {
      if (each.ProductID === id) {
        setProductEntry({
          ...each,
          ProductCode: each.ProductCode,
          ProductName: each.ProductName,
          ProductDescription: each.ProductDescription,
          StandardUnitCost: each.StandardUnitCost,
          UnitPrice: each.UnitPrice,
          ReorderLevel: each.ReorderLevel,
          TargetLevel: each.TargetLevel,
          QuantityPerUnit: each.QuantityPerUnit,
          Discontinued: each.Discontinued,
          MinimumReorderQuantity: each.MinimumReorderQuantity,
          ProductCategory: each.ProductCategoryID,
        });
      }
    });
    setProductActiveID(id);
    setProductActive(true);
  };
  //Updated Product Function
  const updateProducts = async (e) => {
    e.preventDefault();
    const UpadetedValues = {
      ProductCode: productEntry.ProductCode,
      ProductName: productEntry.ProductName,
      ProductDescription: productEntry.ProductDescription,
      StandardUnitCost: productEntry.StandardUnitCost,
      UnitPrice: productEntry.UnitPrice,
      ReorderLevel: productEntry.ReorderLevel,
      TargetLevel: productEntry.TargetLevel,
      QuantityPerUnit: productEntry.QuantityPerUnit,
      Discontinued: productEntry.Discontinued,
      MinimumReorderQuantity: productEntry.MinimumReorderQuantity,
      ProductCategoryID: productEntry.ProductCategory,
      ModifiedBy: auth.user.id,
      addedBy: auth.user.id,
    };
    try {
      const res = await api.put(`/products/${productActiveID}`, UpadetedValues);
      const data = res.data.productData;
      if (res.status === 200) {
        alert("Product Updated Successfully.");
        setProducts(
          products.map((item) => {
            if (item.ProductID === productActiveID) {
              return {
                ...item,
                ProductID: res.data.productId,
                ProductCode: data.ProductCode,
                ProductName: data.ProductName,
                ProductDescription: data.ProductDescription,
                StandardUnitCost: data.StandardUnitCost,
                UnitPrice: data.UnitPrice,
                ReorderLevel: data.ReorderLevel,
                TargetLevel: data.TargetLevel,
                QuantityPerUnit: data.QuantityPerUnit,
                Discontinued: data.Discontinued,
                MinimumReorderQuantity: data.MinimumReorderQuantity,
                ProductCategoryID: data.ProductCategoryID,
                ModifiedBy: data.ModifiedBy,
                addedBy: data.addedBy,
              };
            }
            return item;
          })
        );
        setProductEntry({
          ProductCode: "",
          ProductName: "",
          ProductDescription: "",
          StandardUnitCost: "",
          UnitPrice: "",
          ReorderLevel: "",
          TargetLevel: "",
          QuantityPerUnit: "",
          Discontinued: "",
          MinimumReorderQuantity: "",
          ProductCategory: "",
        });
        setProductActive(false);
      }
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
                        onChange={handleProductsEntry}
                        value={productEntry.ProductCode}
                      />
                    </Col>
                    <Col sm style={{ marginBottom: "15px" }}>
                      <Form.Control
                        placeholder="Product Name"
                        name="ProductName"
                        onChange={handleProductsEntry}
                        value={productEntry.ProductName}
                      />
                    </Col>
                    <Col style={{ marginBottom: "15px" }}>
                      <Form.Control
                        placeholder="Unit Cost"
                        name="StandardUnitCost"
                        onChange={handleProductsEntry}
                        value={productEntry.StandardUnitCost}
                      />
                    </Col>
                    <Col style={{ marginBottom: "15px" }}>
                      <Form.Control
                        placeholder="Unit Price"
                        name="UnitPrice"
                        onChange={handleProductsEntry}
                        value={productEntry.UnitPrice}
                      />
                    </Col>
                    <Col style={{ marginBottom: "15px" }}>
                      <Form.Control
                        placeholder="Reorder Level"
                        name="ReorderLevel"
                        type="number"
                        onChange={handleProductsEntry}
                        value={productEntry.ReorderLevel}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{ marginBottom: "5px" }}>
                      <Form.Control
                        placeholder="Target Level"
                        name="TargetLevel"
                        type="number"
                        onChange={handleProductsEntry}
                        value={productEntry.TargetLevel}
                      />
                    </Col>
                    <Col style={{ marginBottom: "5px" }}>
                      <Form.Control
                        placeholder="Quantity"
                        name="QuantityPerUnit"
                        onChange={handleProductsEntry}
                        value={productEntry.QuantityPerUnit}
                      />
                    </Col>
                    <Col style={{ marginBottom: "5px" }}>
                      <Form.Control
                        placeholder="Re Order Qty"
                        name="MinimumReorderQuantity"
                        type="number"
                        onChange={handleProductsEntry}
                        value={productEntry.MinimumReorderQuantity}
                      />
                    </Col>
                    <Col style={{ marginBottom: "5px" }}>
                      <Form.Label style={{ fontSize: "15px" }}>
                        Product-Category-ID
                      </Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        onChange={handleProductsEntry}
                        name="ProductCategory"
                      >
                        {productCategories.map((each) => (
                          <option key={each.CategoryId} value={each.CategoryId}>
                            {each.CategoryName}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                    <Col style={{ marginBottom: "5px" }}>
                      <Form.Label style={{ fontSize: "15px" }}>
                        Product Discountinued
                      </Form.Label>
                      <div style={{ display: "flex" }}>
                        <label style={{ marginRight: "10px" }}>
                          <input
                            style={{ margin: "0px 5px 10px 10px" }}
                            type="radio"
                            value={1}
                            name="Discontinued"
                            onChange={handleProductsEntry}
                          />
                          Active
                        </label>
                        <label>
                          <input
                            style={{ margin: "0px 5px 10px 10px" }}
                            type="radio"
                            value={0}
                            name="Discontinued"
                            onChange={handleProductsEntry}
                          />
                          InActive
                        </label>
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
                        onChange={handleProductsEntry}
                        value={productEntry.ProductDescription}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {productActive ? (
                        <button
                          className="btn bg-primary text-white mt-2 d-flex align-self-end"
                          onClick={updateProducts}
                        >
                          Update Product
                        </button>
                      ) : (
                        <button
                          className="btn bg-primary text-white mt-2 d-flex align-self-end"
                          onClick={AddProducts}
                        >
                          Add Product
                        </button>
                      )}
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
                        name="CategoryCode"
                        value={proCategory.CategoryCode}
                        onChange={handleProductCategory}
                      />
                    </Col>
                    <Col sm style={{ marginBottom: "15px" }}>
                      <Form.Label>Category Name</Form.Label>
                      <Form.Control
                        placeholder="Category Name"
                        name="CategoryName"
                        value={proCategory.CategoryName}
                        onChange={handleProductCategory}
                      />
                    </Col>
                    <Col sm style={{ marginBottom: "15px" }}>
                      <Form.Label>Category Descripton</Form.Label>
                      <Form.Control
                        placeholder="Category Description"
                        name="CategoryDesc"
                        value={proCategory.CategoryDesc}
                        onChange={handleProductCategory}
                      />
                    </Col>
                    <Col>
                      <Form.Label>Category-Status</Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        onChange={handleProductCategory}
                        name="IsActive"
                      >
                        <option disabled>Select Status</option>
                        <option value="Active">Active</option>
                        <option value="InActive">InActive</option>
                      </Form.Select>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {updateStatus ? (
                        <button
                          className="btn bg-primary text-white mt-2 d-flex align-self-end"
                          onClick={updatedDataOfProductCat}
                        >
                          Update
                        </button>
                      ) : (
                        <button
                          className="btn bg-primary text-white mt-2 d-flex align-self-end"
                          onClick={handleSubmitProductcategory}
                        >
                          Add Product-Category
                        </button>
                      )}
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
                      Category
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
                      Status
                    </th>
                    <th style={{ background: "#3399ff", color: "#ffffff" }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((each) => (
                    <tr key={each.ProductID}>
                      <td>{each.ProductID}</td>
                      <td>{each.ProductName}</td>
                      <td>{each.ProductCode}</td>
                      <td>{each.ProductCategoryID}</td>
                      <td>{each.StandardUnitCost}</td>
                      <td>{each.UnitPrice}</td>
                      <td>{each.AddedOn.slice(0, 10)}</td>
                      <td>{each.ModifiedOn.slice(0, 10)}</td>
                      <td>{each.MinimumReorderQuantity}</td>
                      <td>{each.TargetLevel}</td>
                      <td>{each.Discontinued === 1 ? "Active" : "InActive"}</td>
                      <td className="d-flex">
                        <MdEdit
                          style={{
                            color: "#3399ff",
                            marginRight: "10px",
                            border: "1px solid #3399ff",
                            borderRadius: "4px",
                          }}
                          size={20}
                          onClick={() => updateActives(each.ProductID)}
                        />
                        <MdDelete
                          style={{
                            color: "#e55353",
                            border: "1px solid #e55353",
                            borderRadius: "4px",
                          }}
                          size={20}
                          onClick={() => deleteProduct(each.ProductID)}
                        />
                      </td>
                    </tr>
                  ))}
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
                  {productCategories.map((each) => (
                    <tr key={each.CategoryId}>
                      <td>{each.CategoryId}</td>
                      <td>{each.CategoryName}</td>
                      <td>{each.CategoryCode}</td>
                      <td>{each.IsActive}</td>
                      <td className="d-flex">
                        <MdEdit
                          style={{
                            color: "#3399ff",
                            marginRight: "10px",
                            border: "1px solid #3399ff",
                            borderRadius: "4px",
                          }}
                          size={20}
                          onClick={() => updateProductCategory(each.CategoryId)}
                        />
                        <MdDelete
                          style={{
                            color: "#e55353",
                            border: "1px solid #e55353",
                            borderRadius: "4px",
                          }}
                          size={20}
                          onClick={() => deleteProductCategory(each.CategoryId)}
                        />
                      </td>
                    </tr>
                  ))}
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
