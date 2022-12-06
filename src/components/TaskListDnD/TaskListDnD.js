import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import SingleTask from "./SingleTask";

function TaskListDnD({ tasks, setActive, edit }) {
  const [queue, setQueue] = useState([]);
  const [development, setDevelopment] = useState([]);
  const [done, setDone] = useState([]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("queue")))
      setQueue(JSON.parse(localStorage.getItem("queue")));
    if (JSON.parse(localStorage.getItem("development")))
      setDevelopment(JSON.parse(localStorage.getItem("development")));
    if (JSON.parse(localStorage.getItem("done")))
      setDone(JSON.parse(localStorage.getItem("done")));
  }, []);

  useEffect(() => {
    localStorage.setItem("queue", JSON.stringify(queue));
    localStorage.setItem("development", JSON.stringify(development));
    localStorage.setItem("done", JSON.stringify(done));
  }, [queue, development, done]);

  useEffect(() => {
    if (tasks.title) {
      tasks.id =
        (queue.length + development.length + done.length + 1).toString() +
        tasks.title;
      setQueue([...queue, tasks]);
    }
  }, [tasks]);

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let inQueue = queue;
    let inDev = development;
    let inDone = done;

    if (source.droppableId === "queueId") {
      add = inQueue[source.index];
      inQueue.splice(source.index, 1);
    } else if (source.droppableId === "developmentId") {
      add = inDev[source.index];
      inDev.splice(source.index, 1);
    } else {
      add = inDone[source.index];
      inDone.splice(source.index, 1);
    }

    if (destination.droppableId === "queueId") {
      inQueue.splice(destination.index, 0, add);
    } else if (destination.droppableId === "developmentId") {
      inDev.splice(destination.index, 0, add);
    } else {
      inDone.splice(destination.index, 0, add);
    }
    setDevelopment(inDev);
    setQueue(inQueue);
    setDone(inDone);

    localStorage.setItem("queue", JSON.stringify(queue));
    localStorage.setItem("development", JSON.stringify(development));
    localStorage.setItem("done", JSON.stringify(done));
  };

  const navigate = useNavigate();
  const onTaskClick = (id) => {
    navigate(`/${id}`);
  };

  return (
    <div className="tasks__container">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="tasks__queue__container">
          <h1>Queue</h1>
          <div className="t__scroll">
          <Droppable droppableId="queueId">
            {(provided) => (
              <div
                className="tasks__queue"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {queue.map(({ id, title, prio, startdate }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li
                          className={prio}
                          onClick={() => {
                            onTaskClick(id);
                          }}
                          key={id}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <SingleTask
                            id={id}
                            title={title}
                            date={startdate}
                            task={queue}
                            index={parseInt(id.match(/\d+/))}
                            setTask={setQueue}
                            setActive={setActive}
                            edit={edit}
                            prio={prio}
                          />
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                <div className="hide__placeholder">{provided.placeholder}</div>
              </div>
            )}
          </Droppable>
          </div>
        </div>
        <div className="tasks__development__container">
          <h1>Development</h1>
          <div className="t__scroll">
          <Droppable droppableId="developmentId">
            {(provided) => (
              <div
                className="tasks__development"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {development.map(({ id, title, prio, startdate }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li
                          className={prio}
                          onClick={() => {
                            onTaskClick(id);
                          }}
                          key={id}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <SingleTask
                            id={id}
                            title={title}
                            date={startdate}
                            index={parseInt(id.match(/\d+/))}
                            task={development}
                            setTask={setDevelopment}
                            setActive={setActive}
                            edit={edit}
                            prio={prio}
                          />
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                <div className="hide__placeholder">{provided.placeholder}</div>
              </div>
            )}
          </Droppable>
          </div>
        </div>
        <div className="tasks__done__container">
          <h1>Done</h1>
          <div className="t__scroll">
          <Droppable droppableId="doneId">
            {(provided) => (
              <div
                className="tasks__done"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {done.map(({ id, title, prio, startdate }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li
                          className={prio}
                          onClick={() => {
                            onTaskClick(id);
                          }}
                          key={id}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <SingleTask
                            id={id}
                            title={title}
                            date={startdate}
                            index={parseInt(id.match(/\d+/))}
                            task={done}
                            setTask={setDone}
                            done={true}
                            setActive={setActive}
                            edit={edit}
                            prio={prio}
                          />
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                <div className="hide__placeholder">{provided.placeholder}</div>
              </div>
            )}
          </Droppable>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}

export default TaskListDnD;
