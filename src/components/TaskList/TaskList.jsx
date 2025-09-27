import React from 'react';
import AcceptTask from './AcceptTask';
import NewTask from './NewTask';
import CompleteTask from './CompleteTask';
import FailedTask from './FailedTask';

const TaskList = ({ data, updateUserData }) => {
    const handleAccept = (taskToUpdate) => {
        const updatedTasks = data.tasks.map((task) => {
            if (task.taskTitle === taskToUpdate.taskTitle) {
                return { ...task, newTask: false, active: true };
            }
            return task;
        });

        const updatedCounts = {
            ...data.taskCounts,
            newTask: data.taskCounts.newTask - 1,
            active: data.taskCounts.active + 1,
        };

        updateUserData({ ...data, tasks: updatedTasks, taskCounts: updatedCounts });
    };

    const handleComplete = (taskToUpdate) => {
        const updatedTasks = data.tasks.map((task) => {
            if (task.taskTitle === taskToUpdate.taskTitle) {
                return { ...task, active: false, completed: true };
            }
            return task;
        });

        const updatedCounts = {
            ...data.taskCounts,
            active: data.taskCounts.active - 1,
            completed: data.taskCounts.completed + 1,
        };

        updateUserData({ ...data, tasks: updatedTasks, taskCounts: updatedCounts });
    };

    const handleFailed = (taskToUpdate) => {
        const updatedTasks = data.tasks.map((task) => {
            if (task.taskTitle === taskToUpdate.taskTitle) {
                return { ...task, active: false, failed: true };
            }
            return task;
        });

        const updatedCounts = {
            ...data.taskCounts,
            active: data.taskCounts.active - 1,
            failed: data.taskCounts.failed + 1,
        };

        updateUserData({ ...data, tasks: updatedTasks, taskCounts: updatedCounts });
    };

    return (
        <div id='tasklist' className='h-auto md:h-[50%] overflow-x-auto flex items-center justify-start gap-5 flex-nowrap w-full py-1 mt-10 md:mt-16'>
            {data.tasks.map((elem, idx) => {
                if (elem.active) {
                    return <AcceptTask key={idx} data={elem} handleComplete={handleComplete} handleFailed={handleFailed} />;
                }
                if (elem.newTask) {
                    return <NewTask key={idx} data={elem} handleAccept={handleAccept} />;
                }
                if (elem.completed) {
                    return <CompleteTask key={idx} data={elem} />;
                }
                if (elem.failed) {
                    return <FailedTask key={idx} data={elem} />;
                }
                return null;
            })}
        </div>
    );
};

export default TaskList;