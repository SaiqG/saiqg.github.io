import { useEffect, useState } from "react";
import TaskListDnD from "./TaskListDnD";

function SingleTask({
  title,
  id,
  task,
  setTask,
  done,
  index,
  date,
  setActive,
  edit,
  prio,
}) {
  const [ide, setIde] = useState("");
  const handleEdit = (e, ident) => {
    e.preventDefault();
    e.stopPropagation();
    setActive(true);
    setIde(ident);
  };

  useEffect(() => {
    if (edit !== task.title && edit !== '' && id === ide) {
      setTask(
        task.map((task) => (task.id === ide ? { ...task, title: edit } : task))
      );
      setIde("");
    }
  }, [edit]);

  const handleDelete = (e, id) => {
    e.stopPropagation();
    setTask(task.filter((task) => task.id !== id));
    localStorage.removeItem(id);
  };

  const handleSelect = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setTask(
      task.map((task) =>
        task.id === id ? { ...task, prio: e.currentTarget.value } : task
      )
    );

  };

  return (
    <div className="task__cont">
      {index}.{title}
      <select
        onClick={(e) => handleSelect(e, id)}
        className={done ? "select hide" : "select"}
      >
        <option selected={prio === "none" ? true : false} value="none">
          None
        </option>
        <option selected={prio === "chill" ? true : false} value="chill">
          Chill
        </option>
        <option selected={prio === "rush" ? true : false} value="rush">
          Rush!
        </option>
      </select>
      <div className="creation__date">
        {done
          ? `Finished in ${Math.round(
              (new Date() - task.filter((task) => task.id === id)[0].date) /
                3600000
            )}hours`
          : date}
      </div>
      <img
        onClick={(e) => handleEdit(e, id)}
        className="icon__edit"
        alt="edit icon"
        src={require("../../img/edit.png")}
      />
      <img
        onClick={(e) => handleDelete(e, id)}
        className="icon__remove"
        alt="delete icon"
        src={require("../../img/remove.png")}
      />
      <div className="test"></div>
    </div>
  );
}

export default SingleTask;
