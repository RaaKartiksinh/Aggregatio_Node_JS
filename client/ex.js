






import React, { useEffect, useState } from "react";
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

export default function Home() {
  const [userData, setUserData] = useState([]);
  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [mode, setMode] = useState("create"); // "create" or "update"

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setMode("create"); // Reset the mode to "create"
    setUserInfo({}); // Clear user info
  };

  const GetData = async () => {
    try {
      const result = await apiHelper.getUser();
      setUserData(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id) => {
    console.log("deleteUser");
    console.log(id);
    try {
      await apiHelper.deleteUser(id);
      setUserData((prevUserData) =>
        prevUserData.filter((user) => user._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(userInfo);
    try {
      if (mode === "update") {
        const result = await apiHelper.updateUser(userInfo._id, userInfo);
        console.log(result);
        handleClose();
      } else {
        const result = await apiHelper.createUser(userInfo);
        setUserData((prevUserData) => [...prevUserData, result.data]);
        console.log(result);
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateUser = (user) => {
    setOpen(true);
    setMode("update"); // Set the mode to "update"
    setUserInfo({ ...user }); // Set user data for update
  };

  useEffect(() => {
    GetData();
  }, []);

  return (
    <div>
      <div className="container">
        <button className="Adduser" onClick={handleClickOpen}>
          <span>Add User</span>
        </button>
      </div>

      <div className="container">
        <table className="table table-striped-columns">
          <thead>
            <tr>
              {userData.length > 0 &&
                Object.keys(userData[0]).map((key) => (
                  <th key={key} scope="col">
                    {key}
                  </th>
                ))}
              <th>Update</th>
              <th>Delete</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((item, index) => (
              // eslint-disable-next-line
              <tr scope="row" key={index}>
                {Object.values(item).map((value, sIndex) => (
                  <td key={sIndex}>{value}</td>
                ))}

                <td scope="row">
                  <i
                    className="bi bi-file-earmark-arrow-up-fill"
                    onClick={() => handleUpdateUser(item)}
                  ></i>
                </td>
                <td scope="row">
                  <i
                    className="bi bi-trash3"
                    onClick={() => deleteUser(item._id)}
                  ></i>
                </td>
                <td scope="row">
                  <i
                    className="bi bi-house-add-fill"
                    // onClick={() => addAddres(item._id)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {mode === "update" ? `Update User - ${userInfo._id}` : "Create User"}
        </DialogTitle>

        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>{/* text */}</DialogContentText>

            <TextField
              autoFocus
              margin="dense"
              id="fristName"
              name="fristName"
              label="First Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleInputChange}
              value={userInfo.fristName || ""}
            />

            <TextField
              autoFocus
              margin="dense"
              name="lastName"
              id="name"
              label="Last Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleInputChange}
              value={userInfo.lastName || ""}
            />

            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email"
              name="email"
              type="email"
              fullWidth
              variant="standard"
              onChange={handleInputChange}
              value={userInfo.email || ""}
            />

            <TextField
              autoFocus
              margin="dense"
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              onChange={handleInputChange}
              value={userInfo.password || ""}
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
  );
}

