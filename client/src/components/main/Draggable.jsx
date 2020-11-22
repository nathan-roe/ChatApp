import React from 'react';
function Draggable (props) {
    // console.log(props.id);
    const dragStart = e => {
        const target = e.target;
        e.dataTransfer.dropEffect = "copy"
        e.dataTransfer.setData('transfer', target.id);
        setTimeout(() => {
            target.style.display = 'none';
        }, 0)
    }
    const dragOver = e => {
        e.stopPropagation();
    }
    return (
        <div id={props.id} onDragStart={dragStart} onDragOver={dragOver} className={props.className} draggable='true'>
            {props.children}
        </div>
    );
}
export default Draggable;