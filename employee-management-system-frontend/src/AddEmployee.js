// export default function AddEmployee() {
//     return <h1>Hello from world!</h1>
// }

import React, { useState } from 'react';
// import {useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  form: {
    width: '60%',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const AddEmployee = () => {
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create employee object with input values
    const newEmployee = {
      firstName: firstName,
      lastName: lastName,
      email: email,
    };
    console.log(newEmployee)
    // Hit POST request to backend server
    axios.post('http://localhost:8080/api/v1/employees', newEmployee)
      .then(response => {
        console.log('Employee added successfully:', response.data);
        // Call onAddEmployee function to update state with new employee data
        // onAddEmployee(response.data);
        // Clear input fields
        setFirstName('');
        setLastName('');
        setEmail('');
        navigate('/')

      })
      .catch(error => {
        console.error('Error adding employee:', error);
        // Handle error if needed
      });
  };

  return (
    <Paper className={classes.root}>
      <Typography variant="h5" gutterBottom>Add Employee</Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          variant="outlined"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <TextField
          label="Last Name"
          variant="outlined"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
        <Button type="submit" variant="contained" color="primary" className={classes.button}>
          Add Employee
        </Button>
      </form>
    </Paper>
  );
};

export default AddEmployee;
