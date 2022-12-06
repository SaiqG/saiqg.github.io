import React from 'react'

const queueM = [{"id":"1Lorem ipsum","title":"Lorem ipsum","prio":"rush","date":1670258413536,"startdate":"Dec 5"},{"id":"3New task","title":"New task","prio":"chill","date":1670323094218,"startdate":"Dec 6"},{"id":"6Task","title":"Task","prio":"none","date":1670323145922,"startdate":"Dec 6"}];
const developmentM = [{"id":"5task task","title":"task task","prio":"chill","date":1670323108799,"startdate":"Dec 6"},{"id":"6One more task","title":"Edited name task","prio":"rush","date":1670323190580,"startdate":"Dec 6"}];
const doneM = [{"id":"4One more task","title":"One more task","prio":"none","date":1670313002363,"startdate":"Dec 6"}];
const lorem =["<p><span style=\"font-size: 18pt;\"><strong><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://tyriar.gallerycdn.vsassets.io/extensions/tyriar/lorem-ipsum/1.3.1/1640026564395/Microsoft.VisualStudio.Services.Icons.Default\" alt=\"\" width=\"122\" height=\"122\"></strong></span></p>\n<p style=\"text-align: center;\"><span style=\"font-size: 18pt;\"><strong>Lorem ipsum</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut<span style=\"text-decoration: underline;\"> labore et dolore </span>magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut <s>aliquip ex ea commodo consequat. </s></span></p>",[{checked: true, title:"Lorem"},{checked: false, title:"Ipsum"},{checked: true, title:"Dolor sit"},{checked: false, title:"amet, consectetur"}],[{"comment":"1st comment","subcomment":[{"comment1":"1st sub comment","subcomment1":[{"comment2":"1nd comment to sub comment","subcomment2":[]},{"comment2":"2nd comment to sub comment","subcomment2":[]}]},{"comment1":"2nd sub comment","subcomment1":[]}]},{"comment":"2nd comment","subcomment":[]},{"comment":"3rd comment","subcomment":[]}]];

const loadMock = () => {

    localStorage.setItem("queue", JSON.stringify(queueM));
    localStorage.setItem("development", JSON.stringify(developmentM));
    localStorage.setItem("done", JSON.stringify(doneM));
    localStorage.setItem("1Lorem ipsum", JSON.stringify(lorem));
    alert("Cool! Now try to open '1.Lorem ipsum' task =)")
    window.location.reload(false);
}

const cleanAll = () => {
localStorage.clear();
window.location.reload(false);
}

function Mock() {
  return (
    <div>
        <button onClick={() => loadMock()}>Load mock</button>
        <button onClick={() => cleanAll()}>Clean all</button>
    </div>
  )
}

export default Mock