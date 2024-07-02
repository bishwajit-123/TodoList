import React, { useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { IoRemoveCircle } from "react-icons/io5";
import 'bootstrap/dist/css/bootstrap.min.css';

function TaskList({ task, setTask, setUpdate, setForm, setEdit }) {
 
  const handleRemove = (id) => {
    const filterItems = task.filter((item) => id !== item.id);
    setTask(filterItems);
  };

  const handleEdit = (id) => {
    const editItem = task.find((item) => id === item.id);
    setForm(editItem.title);
    setUpdate(false);
    setEdit(id);
  };

  const handleRemoveAll = () => {
    setTask([]);
  };

  const handleStrike = (id) => {
    setTask(task.map((compItem) => {
        if (compItem.id === id) {
            return { ...compItem, complete: !compItem.complete};
        }
        return compItem;
    }));

  }

  return (
    <div>
      <ul>
        {task.map((taskList) => (
          <li
            className={`d-flex justify-content-between border-bottom px-2 py-1 align-items-center ${taskList.complete?"text-decoration-line-through" : ""}`}
            key={taskList.id}
          >
            <div className="d-flex gap-3">
              <span className="cursor-pointer" onClick={() => handleStrike(taskList.id)}>
              <IoRemoveCircle size={25}/>
              </span>
              <span>{taskList.title}</span>
            </div>
            <div className="d-flex gap-3">
              <span className="cursor-pointer" onClick={() => handleEdit(taskList.id)}>
                <FaEdit size={25} />
              </span>
              <span className="cursor-pointer" onClick={() => handleRemove(taskList.id)}>
                <MdDeleteForever size={25} />
              </span>
            </div>
          </li>
        ))}
      </ul>
      {task.length >= 1 && (
        <div className="text-center py-2">
          <button className="btn btn-danger" onClick={handleRemoveAll}>
            Remove All
          </button>
        </div>
      )}
    </div>
  );
}

export default TaskList;
