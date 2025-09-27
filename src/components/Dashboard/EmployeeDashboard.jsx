import React, { useContext, useEffect, useState } from 'react';
import Header from '../other/Header';
import TaskListNumbers from '../other/TaskListNumbers';
import TaskList from '../TaskList/TaskList';
import { AuthContext } from '../../context/AuthProvider';
import { getLocalStorage } from '../../utils/localStorage';

const EmployeeDashboard = (props) => {
    const [userData, setUserData] = useContext(AuthContext);
    const [employeeData, setEmployeeData] = useState(props.data);
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        const { employees } = getLocalStorage();
        const currentEmployee = employees.find((emp) => emp.id === employeeData.id);

        if (currentEmployee?.hasNewTask) {
            setShowNotification(true);
            const updatedEmployees = employees.map((emp) => {
                if (emp.id === currentEmployee.id) {
                    return { ...emp, hasNewTask: false };
                }
                return emp;
            });
            setUserData(updatedEmployees);
            localStorage.setItem('employees', JSON.stringify(updatedEmployees));
            
            const timer = setTimeout(() => {
                setShowNotification(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [employeeData.id, setUserData]);

    const updateUserData = (updatedEmployeeData) => {
        setEmployeeData(updatedEmployeeData);

        const allEmployees = getLocalStorage().employees;
        const updatedEmployees = allEmployees.map((emp) => {
            if (emp.id === updatedEmployeeData.id) {
                return updatedEmployeeData;
            }
            return emp;
        });

        setUserData(updatedEmployees);
        localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    };

    return (
        <div className='p-4 sm:p-6 md:p-8 lg:p-10 bg-[#1C1C1C] h-screen'>
            {showNotification && (
                <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white py-2 px-4 rounded-lg shadow-md transition-opacity duration-500 ease-in-out z-50">
                    You have {employeeData.taskCounts.newTask} new task(s)!
                </div>
            )}
            <Header changeUser={props.changeUser} data={props.data} />
            <TaskListNumbers data={employeeData} />
            <TaskList data={employeeData} updateUserData={updateUserData} />
        </div>
    );
};

export default EmployeeDashboard;