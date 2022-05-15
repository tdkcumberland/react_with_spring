import './App.css';
import React, { useState, useEffect } from 'react'
import { getAll, create } from './service'
import Notification from './Notification'

function App() {
  const [employeeList, setNewEmployeeList] = useState([])
  const [statusCode, setStatusCode] = useState(200)
  const [errorMessage, setErrorMessage] = useState(null)
  const [newName, setNewName] = useState('')
  const [newLastName, setLastName] = useState('')

  const hook = () => {
    getAll().then(employeeList => {
      setNewEmployeeList(employeeList)
    })
  }

  useEffect(hook, [])

  const updateErrorMessage = (message, errorCode) => {
    setStatusCode(errorCode)
    setErrorMessage(message, errorCode)
  }

  const refresh = () => {
    getAll().then(employeeList => {
      setNewEmployeeList(employeeList)
    })
  }

  const addEmployee = (event) => {
    event.preventDefault()
    const newEmployee = {
      firstName: newName,
      lastName: newLastName
    }
    create(newEmployee).then(createdEmplyee => {
      updateErrorMessage(`${newName} has been added`, 200)
      setTimeout(() => {
        updateErrorMessage(null)
      }, 5000)
      refresh()
    }).catch(error => {
      for (var key in error) {
        console.log(key, error.key)
      }
      updateErrorMessage(error.message)
      setTimeout(() => {
        updateErrorMessage(null)
      }, 5000)
    })
  }

  const handleNewNameChange = (event) => {
    
    setNewName(event.target.value)
    console.log(newName);
  }

  const handleNewLastNameChange = (event) => {
    setLastName(event.target.value)
    console.log(newLastName);
  }

  return (
    <div className="App">
      <h1>TDM REACTJS+SPRING DEMO</h1>
      <Notification message={errorMessage} statusCode={statusCode} />
      <EmployeeForm addEmployee={addEmployee} newName={newName} newLastName={newLastName} handleNewNameChange={handleNewNameChange} handleNewLastNameChange={handleNewLastNameChange} />
      <EmployeeList employees={employeeList} />
    </div>
  );
}

const EmployeeForm = ({ addEmployee, newName, newLastName, handleNewNameChange, handleNewLastNameChange }) => {
  return (
    <form onSubmit={addEmployee}>
      <div>
        first name: <input value={newName} onChange={handleNewNameChange} />
      </div>
      <p>
        {newName} {newLastName}
      </p>
      <div>
        last name: <input value={newLastName} onChange={handleNewLastNameChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const EmployeeList = (props) => {
  return (
    <>
      {props.employees.map(employee => <Employee key={employee.lastName} firstName={employee.firstName} lastName={employee.lastName} />)}
    </>
  )
}

const Employee = (props) => {
  return (
    <li key={props.lastName}> {props.firstName} {props.lastName}</li>
  )
}

export default App;
