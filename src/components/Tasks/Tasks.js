import React, { useState } from "react";
import Modal from "../Modal/Modal";
import "./Tasks.css";
import TaskListDnD from "../TaskListDnD/TaskListDnD";
import Mock from "../Mock/Mock";



function Tasks() {
  const [modalActive, setModalActive] = useState(false);
  const [modalEditActive, setModalEditActive] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [edit, setEdit] = useState("");
  

  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  
  const handleChange = (e) => {
    setUserInput(e.currentTarget.value);
  };

  const addNewTask = (task) => {
    if (task) {
      let date = new Date();
      const curMonth = month[date.getMonth()];
      const curDate = date.getDate();
      const newTask = {
        id: "new",
        title: task,
        prio: "none",
        date: date.getTime(),
        startdate: curMonth+' '+curDate,
      };
      setTasks(newTask);
    }
  };

  return (
    <>
      <label className="create__new__task" onClick={() => setModalActive(true)}>
        Create task
        <button className="create__new__task__btn"></button>
      </label>
      <TaskListDnD
        tasks={tasks}
        active={modalEditActive}
        setActive={setModalEditActive}
        edit={edit}
      />
      <Modal active={modalActive} setActive={setModalActive}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addNewTask(userInput);
            setModalActive(false);
            setUserInput("");
          }}
        >
          <input
            value={userInput}
            type="text"
            onChange={handleChange}
            autoFocus
            placeholder="What we gonna do?"
          />
          <button>sub</button>
        </form>
        <Mock />
      </Modal>
      <Modal active={modalEditActive} setActive={setModalEditActive}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setEdit(userInput);
            setModalEditActive(false);
            setUserInput("");
          }}
        >
          <input
            value={userInput}
            type="text"
            onChange={handleChange}
            autoFocus
            placeholder="Plans changed?"
          />
          <button>sub</button>
        </form>
      </Modal>
    </>
  );
}

export default Tasks;
