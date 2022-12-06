import React from 'react'

function Description({setActive, desc}) {
  return (
    <div className='discription'>
        <div>Description</div>
        <button onClick={()=> setActive(true)}>add/edit</button>
        <div dangerouslySetInnerHTML={{__html: desc}}></div>
    </div>
  )
}

export default Description