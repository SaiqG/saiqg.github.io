import React, { useState } from "react";

function SubTasks({sub, setSub}) {
  
  const [userInput, setUserInput] = useState('');
  const handleChange = (e) => {
    setUserInput(e.currentTarget.value);
  };

  const addSub = (e) => {
    e.preventDefault();
    if(userInput !== '')
  {  setSub([...sub, {checked: false, title: userInput}]);
    setUserInput("");}
  };

  const handleDelete = (e, el) => {
    e.stopPropagation();
    setSub(sub.filter((sub) => sub.title !== el));
  };

  const handleCheck = (e,elem) =>{
    e.stopPropagation();
    setSub(sub.map(el => el.title === elem.title? {checked: !el.checked, title: el.title} : {checked: el.checked, title: el.title}))
  }

  return (
    <div className="sub__container">
        <div>Sub tasks</div>
      <form>
        <input
          value={userInput}
          type="text"
          onChange={handleChange}
          placeholder="add sub task"
        />
        <button onClick={(e) => addSub(e)}>add</button>
      </form>
      <div>
        {sub.map(elem => 
          <li key={elem.title} className="sub__tasks">
            <input type="checkbox" defaultChecked={elem.checked} onClick={(e)=>handleCheck(e,elem)} /><span >{elem.title}</span><button onClick={(e) => handleDelete(e,elem.title)}>X</button>
          </li>
        )}
      </div>
    </div>
  );
}

export default SubTasks;
