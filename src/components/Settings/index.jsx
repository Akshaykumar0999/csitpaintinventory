import React, { useContext, useEffect, useState } from "react";
import Header from "../Header";
import "./index.css";
import { NavMenuContext } from "../../Context/navMenuContext";
import Navbar from "../Navbar";

import { MdOutlineDisplaySettings, MdEdit, MdDelete } from "react-icons/md";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import axios from "axios";
import SettingsItem from "../SettingsItem";

const settingsTabsList = [
  {
    id: 1,
    name: "Type-Settings",
    icon: <MdOutlineDisplaySettings style={{ marginRight: "5px" }} />,
    styles: '',
  },

  {
    id: 2,
    name: "Profile",
    icon: <MdOutlineDisplaySettings style={{ marginRight: "5px" }} />,
    styles: '',
  },

  {
    id: 3,
    name: "Bussiness",
    icon: <MdOutlineDisplaySettings style={{ marginRight: "5px" }} />,
    styles: '',
  },

  {
    id: 4,
    name: "Themes",
    icon: <MdOutlineDisplaySettings style={{ marginRight: "5px" }} />,
    styles: '',
  },
];

const Settings = () => {
  const data = useContext(NavMenuContext);
  const [typeList, setTypeList] = useState([]);
  const [activeTab, setActTab] = useState(settingsTabsList[0].id);
  const [isEdited, setIsEdited] = useState(false);
  const [actId, setActId] = useState(0);
  const [type, setType] = useState({ name: "", addedby: "", modifiedby: "" });
  const handleTypes = (e) => {
    const { value, name } = e.target;
    setType((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    getTypeRecords();
  }, []);

  const api = axios.create({
    baseURL: "https://paint-backend-ypum.vercel.app",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const getTypeRecords = async () => {
    try {
      const res = await api.get("/companyType");
      console.log(res);
      if (res.status === 200) {
        setTypeList(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onAddType = async (e) => {
    e.preventDefault();
    const newType = {
      name: type.name,
      addedby: type.addedby,
      modifiedBy: type.modifiedby,
    };
    try {
      const res = await api.post("/companyType", newType);
      console.log(res.data.result);
      if (res.status === 200) {
        setTypeList([...typeList, res.data.result[0]]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onEditType = async (e) => {
    e.preventDefault();
    const newType = {
      name: type.name,
      addedby: type.addedby,
      modifiedBy: type.modifiedby,
    };
    try {
      const res = await api.put(`/companyType/${actId}`, newType);
      const resData = res.data.result[0];
      if (res.status === 200) {
        setTypeList(
          typeList.map((item) => {
            if (item.id === actId) {
              return {
                ...item,
                name: resData.name,
                addedby: resData.addedby,
                modifiedby: resData.modifiedBy,
                modifiedOn: resData.modifiedOn,
                addedOn: resData.addedOn,
              };
            }
            return item;
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
    setType({ name: "", addedby: "", modifiedby: "" });
    setIsEdited(false);
  };
  const onDeleteData = async (id) => {
    try {
      const res = await api.delete(`/companyType/${id}`);
      if (res.status === 200) {
        const filetredList = typeList.filter((each) => each.id !== id);
        setTypeList(filetredList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const typeSettings = () => {
    return (
      <div className="typesettings-form-card">
        <Form style={{ marginRight: "10px", width: "25%" }}>
          <Row style={{ marginBottom: "10px" }}>
            <Col>
              <Form.Label>TypeName</Form.Label>
              <Form.Control
                placeholder="Type-name"
                name="name"
                onChange={handleTypes}
                style={{
                  background: data.theme && "#212631",
                  color: data.theme && "#fff",
                }}
                value={type.name}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col>
              <Form.Label>Added By</Form.Label>
              <Form.Control
                placeholder="Added By"
                name="addedby"
                onChange={handleTypes}
                style={{
                  background: data.theme && "#212631",
                  color: data.theme && "#fff",
                }}
                value={type.addedby}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: "10px" }}>
            <Col>
              <Form.Label>Modified By</Form.Label>
              <Form.Control
                placeholder="Modified By"
                name="modifiedby"
                onChange={handleTypes}
                style={{
                  background: data.theme && "#212631",
                  color: data.theme && "#fff",
                }}
                value={type.modifiedby}
              />
            </Col>
          </Row>
          {isEdited ? (
            <Button type="submit" className="mt-2" onClick={onEditType}>
              Edit
            </Button>
          ) : (
            <Button type="submit" className="mt-2" onClick={onAddType}>
              Add
            </Button>
          )}
        </Form>
        <div style={{ width: "73%" }}>
          <Table striped bordered hover style={{ width: "100%" }}>
            <thead>
              <tr>
                <th style={{ background: "#3399ff", color: "#ffffff" }}>Id</th>
                <th style={{ background: "#3399ff", color: "#ffffff" }}>
                  Name
                </th>
                <th style={{ background: "#3399ff", color: "#ffffff" }}>
                  Added-by
                </th>
                <th style={{ background: "#3399ff", color: "#ffffff" }}>
                  Added-on
                </th>
                <th style={{ background: "#3399ff", color: "#ffffff" }}>
                  ModifiedBy
                </th>
                <th style={{ background: "#3399ff", color: "#ffffff" }}>
                  ModifiedOn
                </th>
                <th style={{ background: "#3399ff", color: "#ffffff" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {typeList.map((each) => (
                <tr key={each.id}>
                  <td
                    style={{
                      background: data.theme && "#212631",
                      color: data.theme && "#fff",
                    }}
                  >
                    {each.id}
                  </td>
                  <td
                    style={{
                      background: data.theme && "#212631",
                      color: data.theme && "#fff",
                    }}
                  >
                    {each.name}
                  </td>
                  <td
                    style={{
                      background: data.theme && "#212631",
                      color: data.theme && "#fff",
                    }}
                  >
                    {each.addedby}
                  </td>
                  <td
                    style={{
                      background: data.theme && "#212631",
                      color: data.theme && "#fff",
                    }}
                  >
                    {each.addedOn.slice(0, 10)}
                  </td>
                  <td
                    style={{
                      background: data.theme && "#212631",
                      color: data.theme && "#fff",
                    }}
                  >
                    {each.modifiedBy}
                  </td>
                  <td
                    style={{
                      background: data.theme && "#212631",
                      color: data.theme && "#fff",
                    }}
                  >
                    {each.modifiedOn.slice(0, 10)}
                  </td>
                  <td
                    className="d-flex"
                    style={{
                      background: data.theme && "#212631",
                      color: data.theme && "#fff",
                    }}
                  >
                    <MdEdit
                      style={{
                        color: "#3399ff",
                        marginRight: "10px",
                        border: "1px solid #3399ff",
                        borderRadius: "4px",
                      }}
                      size={20}
                      onClick={() => onEditData(each.id)}
                    />
                    <MdDelete
                      style={{
                        color: "#e55353",
                        border: "1px solid #e55353",
                        borderRadius: "4px",
                      }}
                      size={20}
                      onClick={() => onDeleteData(each.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  };

  const settingsDetails = () => {
    switch (activeTab) {
      case 1:
        return typeSettings();
        break;
      case 2:
        return (
          <div style={{ width: "100%", textAlign: "center" }}>
            This Profile Page will be added soon😊
          </div>
        );
        break;
      case 3:
        return (
          <div style={{ width: "100%", textAlign: "center" }}>
            This Bussiness Page will be added soon😊
          </div>
        );
        break;
      case 4:
        return (
          <div style={{ width: "100%", textAlign: "center" }}>
            This Themes Page will be added soon😊
          </div>
        );
        break;
      default:
        break;
    }
  };

  const onEditData = (id) => {
    const activeList = typeList.map((item) => {
      if (item.id === id) {
        setType({
          name: item.name,
          addedby: item.addedby,
          modifiedby: item.modifiedBy,
        });
      }
    });
    setActId(id);
    setIsEdited(true);
  };

  const updateActiveTab = (id) => {
    setActTab(id);
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
        <main className="content-main-container">
          <ul className="settings-tablist-card">
            {settingsTabsList.map((each) => (
              <SettingsItem
                details={each}
                key={each.id}
                updateActiveTab={updateActiveTab}
                isActive= {activeTab === each.id}
              />
            ))}
          </ul>
          <div className="settings-details-card">{settingsDetails()}</div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
