// import { useEffect, useState } from 'react';
// import io from 'socket.io-client';
// import axios from 'axios';
// import {Link} from '@reach/router';
// import {Form, Container, Button} from 'react-bootstrap';
// const ChatRoom = () => {
//     const [messageLog, setMessageLog] = useState('');
//     const createChatRoom = messageLog => {
//         axios.post('http://localhost:8000/api/rooms/new', messageLog)
//             .then(res => console.log(res.data))
//             .catch(err => console.log(err));
//     }
//     return (
//         <div>
            
//         </div>
//     );
// }
// export default ChatRoom;

// chat room in id of main and user id in there too, so everytime someone adds a new message, the room model (which will hold of the messages and display them on page load) will update 