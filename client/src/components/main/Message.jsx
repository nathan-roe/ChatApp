import react from 'react';
const moment = require('moment');

const Message = ({chat}) => {
    return (
        <div style={{padding: '5px', paddingTop: '0', border: '1px solid grey', marginTop: '2vh', borderRadius: '1em'}}>
            <div style={{display: 'flex', alignItems: "baseline", justifyContent: 'space-between', marginTop: '0', marginBottom: '2vh'}}>
                <b style={{fontSize: "16px"}}>{chat.user[0]} {chat.user[1]}</b>
                <p style={{marginLeft: '1vw', fontSize: "12px"}}>{chat.time}</p>
            </div>
            <p>{chat.message}</p>
        </div>
    );
}
export default Message;