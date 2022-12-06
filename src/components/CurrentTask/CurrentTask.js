import React, { useRef, useState, useEffect } from "react";
import "./CurrentTask.css";
import Description from "./Description";
import SubTasks from "./SubTasks";
import Atteches from "./Atteches";
import Modal from "../Modal/Modal";
import { Editor } from "@tinymce/tinymce-react";
import { useParams } from "react-router-dom";

function CurrentTask() {
  const [modalActive, setModalActive] = useState(false);
  const [desc, setDesc] = useState("");
  const [sub, setSub] = useState([]);
  const [comments, setComments] = useState([
    // {
    //   comment: "1st comment",
    //   subcomment: [
    //     {
    //       comment1: "1st sub comment",
    //       subcomment1: [
    //         { comment2: "1nd comment to sub comment", subcomment2: [] },
    //         { comment2: "2nd comment to sub comment", subcomment2: [] },
    //       ],
    //     },
    //     { comment1: "2nd sub comment", subcomment1: [] },
    //   ],
    // },
    // {
    //   comment: "2nd comment",
    //   subcomment: [],
    // },
    // {
    //   comment: "3rd comment",
    //   subcomment: [],
    // },
  ]);
  const editorRef = useRef(null);
  const idTask = useParams();
  const [saveData, setSaveData] = useState([]);

  const handleAddDes = (e) => {
    e.preventDefault();
    setDesc(editorRef.current.getContent());
    setModalActive(false);
  };

  useEffect(() => {
    setSaveData([desc, sub, comments]);
  }, [desc, sub, comments]);
  useEffect(() => {
    if (JSON.parse(localStorage.getItem(idTask.id))) {
      setDesc(JSON.parse(localStorage.getItem(idTask.id))[0]);
      setSub(JSON.parse(localStorage.getItem(idTask.id))[1]);
      setComments(JSON.parse(localStorage.getItem(idTask.id))[2]);
    }
  }, []);

  useEffect(() => {
    if (saveData !== []) {
      localStorage.setItem(idTask.id, JSON.stringify(saveData));
    }
  }, [saveData]);
  return (
    <>
      <div className="title">
        {idTask.id.match(/\d+/)}
        {"."}
        {idTask.id.match(/\D+/)}
      </div>
      <div className="current__task__container">
        <Description setActive={setModalActive} desc={desc} />
        <SubTasks sub={sub} setSub={setSub} />
      </div>
      <Atteches comments={comments} setComments={setComments} />
      <Modal active={modalActive} setActive={setModalActive}>
        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue="Add description here / also files can be added with this library"
          init={{
            menubar: false,
          }}
          apiKey="kfnh9pvg8zvd02wu8bfmprp25fhe66oj6cmrhqjnr5ddeaqv"
          plugins="anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange formatpainter pageembed permanentpen powerpaste advtable advcode editimage tableofcontents footnotes mergetags autocorrect"
          toolbar="undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat"
        />
        <button onClick={(e) => handleAddDes(e)}>sub</button>
      </Modal>
    </>
  );
}

export default CurrentTask;
