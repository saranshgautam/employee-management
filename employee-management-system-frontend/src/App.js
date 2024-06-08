import logo from './logo.svg';
import './App.css';
import HelloWorld from './HelloWorld';
import EmployeeList from './EmployeeList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element = {<EmployeeList/>}/>
        <Route path="/addEmployee" element={<AddEmployee/>}/>
        <Route path="/edit/:id" element={<EditEmployee/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
