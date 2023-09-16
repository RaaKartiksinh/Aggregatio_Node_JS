import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiHelper from "../Helper/ApiHelper";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";

export default function Address() {
  const [getAddress, setGetAddress] = useState([]);
  const [open, setOpen] = useState(false);
  const [addressInfo, setAddressInfo] = useState({});
  const [mode, setMode] = useState("create");

  const handleInputChange = (e) => {
    setAddressInfo({
      ...addressInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setMode("create");
    setAddressInfo({});
  };

  const { id } = useParams();
  const navigate = useNavigate();

  const getAddresses = async () => {
    try {
      const result = await apiHelper.getAdress(id);
      setGetAddress(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (addressId) => {
    try {
      console.log("Deleting address:", addressId);
      const result = await apiHelper.deleteAdress(addressId);
      console.log("Delete result:", result);
      getAddresses();
    } catch (error) {
      console.log("Error deleting address:", error);
    }
  };

  const handleUpdateAddress = async (addressId, e) => {
    e.preventDefault();
    try {
      const result = await apiHelper.updateAdress(addressId, addressInfo);
      console.log("Update result:", result);
      getAddresses();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateAddress = async (e) => {
    e.preventDefault();
    try {
      console.log("handleCreateAddress called");
      console.log("addressInfo:", addressInfo);
      const result = await apiHelper.createAdress(addressInfo);
      console.log("result:", result);
      setOpen(false);
      getAddresses();
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    getAddresses();
    setAddressInfo({
      ...addressInfo,
      user: id,
    });
    // eslint-disable-next-line
  }, [id]);

  return (
    <>
      <div className="container mt-5">
        <h4>User Details</h4>
        <table className="table table table-striped">
          <thead>
            <tr>
              <th scope="col">Name : </th>
              <th scope="col">
                {getAddress[0] && getAddress[0].User
                  ? `${getAddress[0].User.fristName} ${getAddress[0].User.lastName}`
                  : "User Not Found"}
              </th>
              <th>Add Address </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Email : </th>
              <th scope="col">
                {getAddress[0] && getAddress[0].User
                  ? `${getAddress[0].User.email}`
                  : "User Not Found"}
              </th>
              <th>
                <button
                  className="Adduser Address_btn"
                  onClick={handleClickOpen}
                >
                  <span>Add User</span>
                </button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="container mt-4">
        <h4>Address</h4>
        <table className="table table-striped-columns">
          <thead>
            <tr>
              <th>Update</th>
              <th>Delete</th>
              <th>Go To Back</th>
            </tr>
          </thead>

          <tbody>
            {getAddress[0] && getAddress[0].Address ? (
              getAddress[0].Address.map((address, index) => (
                <tr key={index}>
                  <td>
                    <td className="pt-3 px-3">
                      <b> Address ID:</b> <br /> {address._id}
                    </td>
                    <td className="w-100">
                      <table className="table table-striped ">
                        <tbody>
                          <tr>
                            <th scope="col">Address:</th>
                            <td> {address.Address1}</td>
                          </tr>
                          <tr>
                            <th scope="col">Street :</th>
                            <td> {address.Address2}</td>
                          </tr>
                          <tr>
                            <th scope="col">City :</th>
                            <td>
                              {address.Country +
                                "," +
                                address.State +
                                "," +
                                address.City}
                            </td>
                          </tr>
                          <tr>
                            <th>Mobile:</th>
                            <td>{address.Telephone} </td>
                          </tr>
                          <tr>
                            <th>Ex information :</th>
                            <td>{address.Delivery_information} </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </td>
                  {/* eslint-disable-next-line */}
                  <td scope="row">
                    <i
                      className="bi bi-file-earmark-arrow-up-fill"
                      onClick={() => {
                        setMode("update");
                        setAddressInfo({ ...address, user: id });
                        handleClickOpen();
                      }}
                    ></i>
                  </td>

                  {/* eslint-disable-next-line */}
                  <td scope="row">
                    <i
                      className="bi bi-trash3"
                      onClick={() => handleDelete(address._id)}
                    ></i>
                  </td>

                  {/* eslint-disable-next-line */}
                  <td scope="row">
                    <i
                      className="bi bi-house-add-fill"
                      onClick={() => navigate("../")}
                    ></i>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No address data available</td>
              </tr>
            )}
          </tbody>
        </table>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            {mode === "update"
              ? `Update Address - ${addressInfo._id}`
              : "Create Address"}
          </DialogTitle>

          <form
            method="post"
            onSubmit={
              mode === "update"
                ? (e) => handleUpdateAddress(addressInfo._id, e)
                : handleCreateAddress
            }
          >
            <DialogContent>
              <DialogContentText>{/* text */}</DialogContentText>

              <TextField
                autoFocus
                margin="dense"
                id="user"
                name="user"
                label="User"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleInputChange}
                value={addressInfo.user || id}
              />

              <TextField
                autoFocus
                margin="dense"
                id="Address1"
                name="Address1"
                label="Address"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleInputChange}
                value={addressInfo.Address1 || ""}
              />

              <TextField
                autoFocus
                margin="dense"
                name="Address2"
                id="Address2"
                label="Address2"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleInputChange}
                value={addressInfo.Address2 || ""}
              />

              <TextField
                autoFocus
                margin="dense"
                id="City"
                label="City"
                name="City"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleInputChange}
                value={addressInfo.City || ""}
              />

              <TextField
                autoFocus
                margin="dense"
                id="State"
                name="State"
                label="State"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleInputChange}
                value={addressInfo.State || ""}
              />

              <TextField
                autoFocus
                margin="dense"
                id="Country"
                name="Country"
                label="Country"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleInputChange}
                value={addressInfo.Country || ""}
              />

              <TextField
                autoFocus
                margin="dense"
                id="Telephone"
                name="Telephone"
                label="Telephone"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleInputChange}
                value={addressInfo.Telephone || ""}
              />

              <TextField
                autoFocus
                margin="dense"
                id="Delivery_information"
                name="Delivery_information"
                label="Delivery_information"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleInputChange}
                value={addressInfo.Delivery_information || ""}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">
                {mode === "update" ? "Update" : "Create"}
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </>
  );
}
