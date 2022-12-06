import React, { useState } from "react";

function Attaches({ comments, setComments }) {
  const [userInput, setUserInput] = useState("");
  const handleChange = (e) => {
    e.preventDefault();
    setUserInput(e.currentTarget.value);
  };

  const handleSub = (e) => {
    e.preventDefault();
    alert("Work in progress")
  }

  return (
    <div className="comment__area">
      <div>Comments</div>
      <form id="comment" onSubmit={(e) => handleSub(e)}>
        <input
          type="text"
          onChange={handleChange}
          placeholder="comment here"
        />
        
      </form>
      {comments.map(({ comment, subcomment }) => {
        return (
          <ul key={comment} className="comment">
           <div className="user__icon"></div><span className="user__name"> User: </span> {comment}
            <form id="comment1" onSubmit={(e) => handleSub(e)}>
              <input
                type="text"
                onChange={handleChange}
                placeholder="comment here"
              />
              
            </form>
            {subcomment.map(({ comment1, subcomment1 }) => {
              return (
                <ul key={comment1} className="comment__1">
                  <div className="user__icon"></div><span className="user__name"> User: </span> {comment1}
                  <form id="comment2" onSubmit={(e) => handleSub(e)}>
                    <input
                      type="text"
                      onChange={handleChange}
                      placeholder="comment here"
                    />
                    
                  </form>
                  {subcomment1.map(({ comment2 }) => {
                    return (
                      <ul key={comment2} className="comment__2">
                       <div className="user__icon"></div><span className="user__name"> User: </span> {comment2}
                      </ul>
                    );
                  })}
                </ul>
              );
            })}
          </ul>
        );
      })}
    </div>
  );
}

export default Attaches;
