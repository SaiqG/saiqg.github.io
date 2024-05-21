import { useEffect, useState } from "react";
import TaskListDnD from "./TaskListDnD";

function SingleTask({
  title,
  id,
  task,
  curDate,
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
          -
        </option>
        <option selected={prio === "chill" ? true : false} value="chill">
          Обычно
        </option>
        <option selected={prio === "rush" ? true : false} value="rush">
          Срочно!
        </option>
      </select>
      <div className="creation__date">
        {done
          ? `Выполнено за ${Math.round(
              (curDate - task.filter((task) => task.id === id)[0].date) /
                3600000
            )}ч.`
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
