import { useContext, useState } from "react";
import "./index.css";
import { MdEdit, MdDelete } from "react-icons/md";
import Form from "react-bootstrap/Form";
import { NavMenuContext } from "../../Context/navMenuContext";

export const EmployeeTableRow = ({
  employee,
  deleteEmployeeRecord,
  updateEditedDatavalues,
}) => {
    const contextData = useContext(NavMenuContext);
  const [edited, setEdited] = useState(false);
  const [editedData, setEditedData] = useState({
    firstName: employee.firstName,
    lastName: employee.lastName,
    email: employee.email,
    PhoneNumber: employee.PhoneNumber,
    address: employee.address,
    companyName: employee.companyName,
    jobTitle: employee.jobTitle,
    status: employee.status,
  });

  const updatedData = {
    firstname: editedData.firstName,
    lastname: editedData.lastName,
    email: editedData.email,
    phonenumber: editedData.PhoneNumber,
    address: editedData.address,
    company_name: editedData.companyName,
    job_title: editedData.jobTitle,
    status: editedData.status,
  };

  const onClickDeleteTableList = () => {
    deleteEmployeeRecord(employee.id);
  };
  const onClickEditEmployee = () => {
    setEdited(true);
  };
  const updateEditedValues = () => {
    setEdited(false);
    updateEditedDatavalues(updatedData, employee.id);
  };
  const handleEditChanges = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <>
      {edited ? (
        <tr key={employee.id}>
          <td
            style={{
              background: contextData.theme && "#212631",
              color: contextData.theme && "#fff",
            }}
          >
            <Form.Control
              placeholder="First name"
              name="firstName"
              style={{
                border: "2px solid #6b7785",
                background: contextData.theme && "#212631",
                color: contextData.theme && "#fff",
              }}
              onChange={handleEditChanges}
              value={editedData.firstName}
            />
          </td>
          <td
            style={{
              background: contextData.theme && "#212631",
              color: contextData.theme && "#fff",
            }}
          >
            <Form.Control
              placeholder="Email"
              name="email"
              style={{
                border: "2px solid #6b7785",
                background: contextData.theme && "#212631",
                color: contextData.theme && "#fff",
              }}
              value={editedData.email}
              onChange={handleEditChanges}
            />
          </td>
          <td
            style={{
              background: contextData.theme && "#212631",
              color: contextData.theme && "#fff",
            }}
          >
            <Form.Control
              placeholder="Phone Number"
              name="PhoneNumber"
              style={{
                border: "2px solid #6b7785",
                background: contextData.theme && "#212631",
                color: contextData.theme && "#fff",
              }}
              value={editedData.PhoneNumber}
              onChange={handleEditChanges}
            />
          </td>
          <td
            style={{
              background: contextData.theme && "#212631",
              color: contextData.theme && "#fff",
            }}
          >
            <Form.Control
              placeholder="Job Title"
              name="jobTitle"
              style={{
                border: "2px solid #6b7785",
                background: contextData.theme && "#212631",
                color: contextData.theme && "#fff",
              }}
              value={editedData.jobTitle}
              onChange={handleEditChanges}
            />
          </td>
          <td
            style={{
              background: contextData.theme && "#212631",
              color: contextData.theme && "#fff",
            }}
          >
            <Form.Control
              placeholder="Company Name"
              name="companyName"
              style={{
                border: "2px solid #6b7785",
                background: contextData.theme && "#212631",
                color: contextData.theme && "#fff",
              }}
              value={editedData.companyName}
              onChange={handleEditChanges}
            />
          </td>
          <td
            style={{
              background: contextData.theme && "#212631",
              color: contextData.theme && "#fff",
            }}
          >
            <Form.Control
              placeholder="Address"
              name="address"
              style={{
                border: "2px solid #6b7785",
                background: contextData.theme && "#212631",
                color: contextData.theme && "#fff",
              }}
              value={editedData.address}
              onChange={handleEditChanges}
            />
          </td>
          <td
            style={{
              background: contextData.theme && "#212631",
              color: contextData.theme && "#fff",
            }}
          >
            <Form.Select
              aria-label="Default select example"
              onChange={handleEditChanges}
              name="status"
              style={{
                border: "2px solid #6b7785",
                background: contextData.theme && "#212631",
                color: contextData.theme && "#fff",
              }}
            >
              <option value="active">Active</option>
              <option value="inactive">In-Active</option>
            </Form.Select>
          </td>
          <td
            style={{
              background: contextData.theme && "#212631",
              color: contextData.theme && "#fff",
            }}
          >
            <button className="btn btn-success" onClick={updateEditedValues}>
              Add
            </button>
          </td>
        </tr>
      ) : (
        <tr key={employee.id}>
          <td
            style={{
              background: contextData.theme && "#212631",
              color: contextData.theme && "#fff",
            }}
          >
            {employee.firstName}
          </td>
          <td
            style={{
              background: contextData.theme && "#212631",
              color: contextData.theme && "#fff",
            }}
          >
            {employee.email}
          </td>
          <td
            style={{
              background: contextData.theme && "#212631",
              color: contextData.theme && "#fff",
            }}
          >
            {employee.PhoneNumber}
          </td>
          <td
            style={{
              background: contextData.theme && "#212631",
              color: contextData.theme && "#fff",
            }}
          >
            {employee.jobTitle}
          </td>
          <td
            style={{
              background: contextData.theme && "#212631",
              color: contextData.theme && "#fff",
            }}
          >
            {employee.companyName}
          </td>
          <td
            style={{
              background: contextData.theme && "#212631",
              color: contextData.theme && "#fff",
            }}
          >
            {employee.address}
          </td>
          <td
            style={{
              background: contextData.theme && "#212631",
              color: contextData.theme && "#fff",
            }}
          >
            {employee.status}
          </td>
          <td
            style={{
              background: contextData.theme && "#212631",
              color: contextData.theme && "#fff",
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
              onClick={onClickEditEmployee}
            />
            <MdDelete
              style={{
                color: "#e55353",
                border: "1px solid #e55353",
                borderRadius: "4px",
              }}
              size={20}
              onClick={onClickDeleteTableList}
            />
          </td>
        </tr>
      )}
    </>
  );
};

export const SupplierTableRow = ({
  supplier,
  updateSupplierId,
  deleteSupplier,
  typeData,
}) => {
  const contextData = useContext(NavMenuContext);
  const [supplierEdit, setSupplierEdit] = useState(false);
  const [editSupplierData, setEditSupplierData] = useState({
    firstname: supplier.firstname,
    lastname: supplier.lastname,
    email: supplier.email,
    phonenumber: supplier.phonenumber,
    jobtitle: supplier.jobtitle,
    companyid: supplier.companyid,
    address: supplier.address,
    city: supplier.city,
    state: supplier.state,
    website: supplier.website,
    zip: supplier.zip,
  });
  const onClickEditSuppleir = () => {
    setSupplierEdit(true);
  };
  const handleEditSupplier = (e) => {
    const { name, value } = e.target;
    setEditSupplierData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const updateSupplierData = () => {
    setSupplierEdit(false);
    updateSupplierId(supplier.id, editSupplierData);
  };
  const onClickDeleteSupplier = () => {
    deleteSupplier(supplier.id);
  };
  return (
    <>
      {supplierEdit ? (
        <tr>
          <td
            style={{
              background: contextData.theme && "#212631",
              color: contextData.theme && "#fff",
            }}
          >
            <Form.Control
              placeholder="First name"
              name="firstname"
              style={{
                border: "2px solid #6b7785",
                background: contextData.theme && "#212631",
                color: contextData.theme && "#fff",
              }}
              onChange={handleEditSupplier}
              value={editSupplierData.firstname}
            />
          </td>
          <td
            style={{
              background: contextData.theme && "#212631",
              color: contextData.theme && "#fff",
            }}
          >
            <Form.Control
              placeholder="Email"
              name="email"
              style={{
                border: "2px solid #6b7785",
                background: contextData.theme && "#212631",
                color: contextData.theme && "#fff",
              }}
              onChange={handleEditSupplier}
              value={editSupplierData.email}
            />
          </td>
          <td
            style={{
              background: contextData.theme && "#212631",
              color: contextData.theme && "#fff",
            }}
          >
            <Form.Control
              placeholder="Phone Number"
              name="Phonenumber"
              style={{
                border: "2px solid #6b7785",
                background: contextData.theme && "#212631",
                color: contextData.theme && "#fff",
              }}
              onChange={handleEditSupplier}
              value={editSupplierData.phonenumber}
            />
          </td>
          <td
            style={{
              background: contextData.theme && "#212631",
              color: contextData.theme && "#fff",
            }}
          >
            <Form.Control
              placeholder="Job Title"
              name="jobtitle"
              style={{
                border: "2px solid #6b7785",
                background: contextData.theme && "#212631",
                color: contextData.theme && "#fff",
              }}
              onChange={handleEditSupplier}
              value={editSupplierData.jobtitle}
            />
          </td>
          <td
            style={{
              background: contextData.theme && "#212631",
              color: contextData.theme && "#fff",
            }}
          >
            {/* <Form.Control
              placeholder="Company-Type"
              name="companyid"
              style={{
                border: "2px solid #6b7785",
                background: contextData.theme && "#212631",
                color: contextData.theme && "#fff",
              }}
              onChange={handleEditSupplier}
              value={editSupplierData.companyid}
            /> */}
            <Form.Select
              aria-label="Company-Type"
              name="companyid"
              onChange={handleEditSupplier}
              style={{
                background: contextData.theme && "#212631",
                color: contextData.theme && "#fff",
              }}
              value={editSupplierData.companyid}
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
          </td>
          <td
            style={{
              background: contextData.theme && "#212631",
              color: contextData.theme && "#fff",
            }}
          >
            <Form.Control
              placeholder="Address"
              name="address"
              style={{
                border: "2px solid #6b7785",
                background: contextData.theme && "#212631",
                color: contextData.theme && "#fff",
              }}
              onChange={handleEditSupplier}
              value={editSupplierData.address}
            />
          </td>
          <td
            style={{
              background: contextData.theme && "#212631",
              color: contextData.theme && "#fff",
            }}
          >
            <Form.Control
              placeholder="City"
              name="city"
              style={{
                border: "2px solid #6b7785",
                background: contextData.theme && "#212631",
                color: contextData.theme && "#fff",
              }}
              onChange={handleEditSupplier}
              value={editSupplierData.city}
            />
          </td>
          <td
            style={{
              background: contextData.theme && "#212631",
              color: contextData.theme && "#fff",
            }}
          >
            <Form.Control
              placeholder="Website"
              name="website"
              style={{
                border: "2px solid #6b7785",
                background: contextData.theme && "#212631",
                color: contextData.theme && "#fff",
              }}
              onChange={handleEditSupplier}
              value={editSupplierData.website}
            />
          </td>
          <td
            style={{
              background: contextData.theme && "#212631",
              color: contextData.theme && "#fff",
            }}
          >
            <Form.Control
              placeholder="State"
              name="state"
              style={{
                border: "2px solid #6b7785",
                background: contextData.theme && "#212631",
                color: contextData.theme && "#fff",
              }}
              onChange={handleEditSupplier}
              value={editSupplierData.state}
            />
          </td>
          <td
            style={{
              background: contextData.theme && "#212631",
              color: contextData.theme && "#fff",
            }}
          >
            <Form.Control
              placeholder="Zip"
              name="zip"
              style={{
                border: "2px solid #6b7785",
                background: contextData.theme && "#212631",
                color: contextData.theme && "#fff",
              }}
              onChange={handleEditSupplier}
              value={editSupplierData.zip}
            />
          </td>
          <td
            className="d-flex"
            style={{
              background: contextData.theme && "#212631",
              color: contextData.theme && "#fff",
            }}
          >
            <button className="btn btn-success" onClick={updateSupplierData}>
              Edit
            </button>
          </td>
        </tr>
      ) : (
        <tr key={supplier.id}>
          <td
            style={{
              background: contextData.theme && "#212631",
              color: contextData.theme && "#fff",
            }}
          >
            {supplier.firstname}
          </td>
          <td
            style={{
              background: contextData.theme && "#212631",
              color: contextData.theme && "#fff",
            }}
          >
            {supplier.email}
          </td>
          <td
            style={{
              background: contextData.theme && "#212631",
              color: contextData.theme && "#fff",
            }}
          >
            {supplier.phonenumber}
          </td>
          <td
            style={{
              background: contextData.theme && "#212631",
              color: contextData.theme && "#fff",
            }}
          >
            {supplier.jobtitle}
          </td>
          <td
            style={{
              background: contextData.theme && "#212631",
              color: contextData.theme && "#fff",
            }}
          >
            {supplier.companyid}
          </td>
          <td
            style={{
              background: contextData.theme && "#212631",
              color: contextData.theme && "#fff",
            }}
          >
            {supplier.address}
          </td>
          <td
            style={{
              background: contextData.theme && "#212631",
              color: contextData.theme && "#fff",
            }}
          >
            {supplier.city}
          </td>
          <td
            style={{
              background: contextData.theme && "#212631",
              color: contextData.theme && "#fff",
            }}
          >
            {supplier.website}
          </td>
          <td
            style={{
              background: contextData.theme && "#212631",
              color: contextData.theme && "#fff",
            }}
          >
            {supplier.state}
          </td>
          <td
            style={{
              background: contextData.theme && "#212631",
              color: contextData.theme && "#fff",
            }}
          >
            {supplier.zip}
          </td>
          <td
            className="d-flex"
            style={{
              background: contextData.theme && "#212631",
              color: contextData.theme && "#fff",
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
              onClick={onClickEditSuppleir}
            />
            <MdDelete
              style={{
                color: "#e55353",
                border: "1px solid #e55353",
                borderRadius: "4px",
              }}
              size={20}
              onClick={onClickDeleteSupplier}
            />
          </td>
        </tr>
      )}
    </>
  );
};
