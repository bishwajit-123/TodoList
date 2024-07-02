import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TaskList from './TaskList';
import 'bootstrap/dist/css/bootstrap.min.css';
import backgroundImage from "../assets/Images/pic.jpg"

function TaskInput() {
    const localItem = () => {
        const storeItem = localStorage.getItem("list");
        return storeItem ? JSON.parse(localStorage.getItem("list")) : [];
    };

    const [form, setForm] = useState("");
    const [task, setTask] = useState(localItem());
    const [update, setUpdate] = useState(true);
    const [edit, setEdit] = useState(null);
    
    

    useEffect(() => {
        localStorage.setItem("list", JSON.stringify(task));
    }, [task]);

    const handleUpdate = () => {
        if (form === "") {
            alert("Please fill the input box");
        } else if (!update) {
            setTask(task.map((newElem) => {
                if (newElem.id === edit) {
                    return { ...newElem, title: form };
                }
                return newElem;
            }));
            setUpdate(true);
            setForm("");
            setEdit(null);
        } else {
            const allform = { id: uuidv4(), title: form, complete: false};
            setTask([...task, allform]);
            setForm("");
        }
    };

    return (
        <div >
            <section className="justify-content-md-center mt-5" >
                <div className="container mx-auto">
                    <div className="w-10 mx-auto d-flex flex-wrap">
                        <div className="col-lg-4 col-md-6 bg-light rounded-lg d-flex flex-column ml-auto w-100 mt-10 bg-white rounded" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            <h2 className="text-dark font-weight-bold mb-5 text-center display-10 mt-3">
                                TodoList
                            </h2>
                            <div className="mb-3 d-flex justify-content-center">
                                <input
                                    type="text"
                                    className="form-control w-75"
                                    value={form}
                                    onChange={(e) => setForm(e.target.value)}
                                />
                            </div>
                            <div className="d-flex justify-content-center mb-4">
                                {update ? (
                                    <button className="btn btn-primary w-30" onClick={handleUpdate}>
                                        Add Task
                                    </button>
                                ) : (
                                    <button className="btn btn-primary w-30" onClick={handleUpdate}>
                                        Update Task
                                    </button>
                                )}
                            </div>
                            <TaskList
                                task={task}
                                setTask={setTask}
                                setUpdate={setUpdate}
                                setForm={setForm}
                                setEdit={setEdit}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default TaskInput;
