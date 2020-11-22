import { navigate } from '@reach/router';
import React from 'react';
function Droppable (props) {
    const drop = e => {
        // if(e.target.className !== 'midHeader')
        // {   
        //     console.log('wrong spot')
        //     return;
        // }   
        e.preventDefault();
        const data_id = e.dataTransfer.getData('transfer');
        const data = document.getElementById(data_id);
        data.style.display = 'inherit';
        e.target.appendChild(data);
        let dataArr = data_id.split(',')
        navigate('/newRoom/' + dataArr[0] + '/' + dataArr[1])
        // navigate('/main/' + dataArr[0] + '/' + dataArr[1]);
    }
    const dragOver = e => {
        e.preventDefault();
    }
    return (
        <div id={props.id} onDrop={drop} onDragOver={dragOver} className={props.className} style={{display: "flex"}}>
            {props.children}
        </div>
    );
}
export default Droppable;