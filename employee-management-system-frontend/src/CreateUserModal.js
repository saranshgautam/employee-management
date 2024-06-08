import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import axios from 'axios'; // Assuming you're using axios for HTTP requests

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
}));

const CreateUserModal = ({ isOpen, handleClose, employee }) => {
  console.log("Entered");
  const classes = useStyles();
  // const [firstName, setFirstName] = useState(employee === null ? "" : employee.firstName);
  // const [lastName, setLastName] = useState(employee === null ? "" : employee.lastName);
  // const [email, setEmail] = useState(employee === null ? "" : employee.email);
  // const [formTitle, setFormTitle] = useState(employee === null ? "Create new user" : "Update employee details");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [formTitle, setFormTitle] = useState("");
  console.log("employee received : " + employee)
  employee === null ? console.log("abba") : console.log("dabba")
  const handleSubmit = () => {
    console.log("Printing employee");
    console.log(employee)
    const userData = { firstName, lastName, email };
    if(employee === null) {
        // Submit form data to the backend API
        axios.post('http://localhost:8080/api/v1/employees', userData)
          .then(response => {
            console.log('User created successfully:', response.data);
            // Close the modal after successful submission
            handleClose();
          })
          .catch(error => {
            console.error('Error creating user:', error);
            // Handle error if needed
          });
    } else {
        axios.put(`http://localhost:8080/api/v1/employees/${employee.id}`, userData)
            .then(response => {
                console.log('User updated successfully:', response.data);
                // Handle success response
              })
              .catch(error => {
                console.error('Error updating user:', error);
              });
    }
  };

  const closeModal = () => {
    setEmail('');
    setFirstName('')
    setLastName('')
    handleClose()
    console.log("Closing modal")
  }

  return (
    <Dialog open={isOpen} onClose={closeModal} aria-labelledby="form-dialog-title">{console.log("Form started")}
      <DialogTitle id="form-dialog-title">{formTitle}</DialogTitle>
      <DialogContent>
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            autoFocus
            margin="dense"
            id="firstName"
            label="First Name"
            type="text"
            fullWidth
            value={firstName || employee.firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="lastName"
            label="Last Name"
            type="text"
            fullWidth
            value={lastName || employee.lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateUserModal;
