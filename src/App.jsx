import React, { useContext, useEffect, useState } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import { AuthContext } from './context/AuthProvider'
import { getLocalStorage } from './utils/localStorage'

const App = () => {
    const [user, setUser] = useState(null)
    const [loggedInUserData, setLoggedInUserData] = useState(null)
    const [userData] = useContext(AuthContext)

    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser')
        if (loggedInUser) {
            const { role, data } = JSON.parse(loggedInUser)
            setUser(role)
            setLoggedInUserData(data)
        }
    }, [])

    const handleLogin = (email, password) => {
        const { employees, admin } = getLocalStorage()

        // Check for admin login
        if (email === admin[0].email && password === admin[0].password) {
            setUser('admin')
            localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin' }))
            return;
        }

        // Check for employee login
        const employee = employees.find((e) => email === e.email && password === e.password)
        if (employee) {
            setUser('employee')
            setLoggedInUserData(employee)
            localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee', data: employee }))
            return;
        }

        // If neither admin nor employee found, show alert
        alert("Invalid Credentials")
    }

    return (
        <>
            {!user ? <Login handleLogin={handleLogin} /> : ''}
            {user === 'admin' ? <AdminDashboard changeUser={setUser} /> : (user === 'employee' ? <EmployeeDashboard changeUser={setUser} data={loggedInUserData} /> : null)}
        </>
    )
}

export default App;