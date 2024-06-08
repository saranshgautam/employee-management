import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

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

const EditEmployee = () => {
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const {id} = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch employee details based on ID when component mounts
    fetchEmployeeDetails(id);
  }, [id]);

  const fetchEmployeeDetails = async (id) => {
    try {
      // Fetch employee details from backend
      const response = await axios.get(`http://localhost:8080/api/v1/employees/${id}`);
      const { firstName, lastName, email, phone } = response.data;
      // Set state with fetched employee details
      setFirstName(firstName);
      setLastName(lastName);
      setEmail(email);
      setPhone(phone);
    } catch (error) {
      console.error('Error fetching employee details:', error);
      // Handle error if needed
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedEmployee = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
    };
    try {
      // Update employee details using PUT request
      await axios.put(`http://localhost:8080/api/v1/employees/${id}`, updatedEmployee);
      console.log('Employee updated successfully');
      setFirstName('');
        setLastName('');
        setEmail('');
        navigate('/')
      // Redirect to employee list or show a success message
    } catch (error) {
      console.error('Error updating employee:', error);
      // Handle error if needed
    }
  };

  return (
    <Paper className={classes.root}>
      <Typography variant="h5" gutterBottom>Edit Employee</Typography>
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
        <TextField
          label="Phone Number"
          variant="outlined"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" className={classes.button}>
          Update Employee
        </Button>
      </form>
    </Paper>
  );
};

export default EditEmployee;
