import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { getLocalStorage } from '../../utils/localStorage';

const CreateTask = () => {
    const [userData, setUserData] = useContext(AuthContext);

    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [assignTo, setAssignTo] = useState('');
    const [category, setCategory] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();

        const newTask = {
            taskTitle,
            taskDescription,
            taskDate,
            category,
            active: false,
            newTask: true,
            failed: false,
            completed: false,
        };

        const { employees } = getLocalStorage();
        let employeeFound = false;
        const updatedEmployees = employees.map((elem) => {
            if (assignTo === elem.firstName) {
                elem.tasks.push(newTask);
                elem.taskCounts.newTask = elem.taskCounts.newTask + 1;
                elem.hasNewTask = true;
                employeeFound = true;
            }
            return elem;
        });

        if (employeeFound) {
            setUserData(updatedEmployees);
            localStorage.setItem('employees', JSON.stringify(updatedEmployees));
            setAlertMessage(`Task created for ${assignTo}`);
        } else {
            setAlertMessage("Employee not found. Please enter a valid employee name.");
        }

        setTaskTitle('');
        setCategory('');
        setAssignTo('');
        setTaskDate('');
        setTaskDescription('');
        
        setTimeout(() => setAlertMessage(''), 3000);
    };

    return (
        <div className='p-5 bg-[#1c1c1c] mt-5 rounded'>
            {alertMessage && (
                <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg z-50">
                    {alertMessage}
                </div>
            )}
            <form onSubmit={submitHandler} className='flex flex-col md:flex-row md:flex-wrap w-full items-start justify-between'>
                <div className='w-full md:w-1/2'>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Task Title</h3>
                        <input
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            className='text-sm py-1 px-2 w-full md:w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4'
                            type="text"
                            placeholder='Make a UI design'
                            required
                        />
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Date</h3>
                        <input
                            value={taskDate}
                            onChange={(e) => setTaskDate(e.target.value)}
                            className='text-sm py-1 px-2 w-full md:w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4'
                            type="date"
                            required
                        />
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Assign to</h3>
                        <input
                            value={assignTo}
                            onChange={(e) => setAssignTo(e.target.value)}
                            className='text-sm py-1 px-2 w-full md:w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4'
                            type="text"
                            placeholder='employee name'
                            required
                        />
                    </div>
                    <div>
                        <h3 className='text-sm text-gray-300 mb-0.5'>Category</h3>
                        <input
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className='text-sm py-1 px-2 w-full md:w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4'
                            type="text"
                            placeholder='design, dev, etc'
                            required
                        />
                    </div>
                </div>

                <div className='w-full md:w-2/5 flex flex-col items-start'>
                    <h3 className='text-sm text-gray-300 mb-0.5'>Description</h3>
                    <textarea
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        className='w-full h-44 text-sm py-2 px-4 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4'
                        name=""
                        id=""
                        required
                    ></textarea>
                    <button className='bg-emerald-500 py-3 hover:bg-emerald-600 px-5 rounded text-sm mt-4 w-full'>
                        Create Task
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateTask;