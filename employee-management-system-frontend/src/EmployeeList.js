import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import axios from "axios"; // Assuming you're using axios for HTTP requests
import CreateUserModal from "./CreateUserModal";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  actionButtons: {
    display: "flex",
    gap: "8px", // Adjust the gap between buttons as needed
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  createUserButton: {
    marginTop: "20px",
    marginBottom: "16px", // Add some bottom margin to the button
  },
});

const EmployeeList = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    // Close the modal
    setIsOpen(false);
  };

  const [employees, setEmployees] = useState([]);
  const [currentEmployee, setCurrentEmployee] = useState({});
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    // Fetch employees from backend API
    axios
      .get("http://localhost:8080/api/v1/employees")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
      });
  }, []); // Empty dependency array means this effect runs once after the component mounts

  const handleDelete = (id) => {
    setSelectedEmployeeId(id);
    setOpenDialog(true);
    // Handle delete logic here
    // console.log('Deleting employee with ID:', id);
  };

  const handleDeleteConfirm = () => {
    // Send request to delete employee from backend
    axios
      .delete(`http://localhost:8080/api/v1/employees/${selectedEmployeeId}`)
      .then((response) => {
        console.log("Employee deleted successfully");
        setOpenDialog(false);
        axios
          .get("http://localhost:8080/api/v1/employees")
          .then((response) => {
            setEmployees(response.data);
          })
          .catch((error) => {
            console.error("Error fetching employees:", error);
          });
        // You may also want to update the employee list in the UI
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
        setOpenDialog(false);
      });
  };

  const handleDeleteCancel = () => {
    // Close the dialog box without deleting the employee
    setOpenDialog(false);
  };

  return (
    <div className={classes.container}>
      <Link to="/addEmployee">
        <Button
          variant="contained"
          color="primary"
          className={classes.createUserButton}
        >
          Register New Employee
        </Button>
      </Link>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="employee table">
          <TableHead>
            <TableRow>
              <TableCell>S. No</TableCell>
              <TableCell align="left">First Name</TableCell>
              <TableCell align="left">Last Name</TableCell>
              <TableCell align="left">Email Address</TableCell>
              <TableCell align="left">Phone number</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee, index) => (
              <TableRow key={employee.id}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="left">{employee.firstName}</TableCell>
                <TableCell align="left">{employee.lastName}</TableCell>
                <TableCell align="left">{employee.email}</TableCell>
                <TableCell align="left">{employee.phone}</TableCell>
                <TableCell align="left">
                  <Link to={`/edit/${employee.id}`}>
                    <Button variant="contained" color="primary">
                      Edit
                    </Button>
                  </Link>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDelete(employee.id)}
                  >
                    Delete
                  </Button>
                  <Dialog
                    open={openDialog}
                    onClose={handleDeleteCancel}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      Confirm Delete
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        {`Are you sure you want to delete this employee?`}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleDeleteCancel} color="primary">
                        Cancel
                      </Button>
                      <Button
                        onClick={handleDeleteConfirm}
                        color="secondary"
                        autoFocus
                      >
                        Delete
                      </Button>
                    </DialogActions>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EmployeeList;
