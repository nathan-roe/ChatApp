import { navigate } from "@reach/router";
import react from 'react';
const newRoom = ({userId, roomId}) => {
    navigate('/main/' + userId + '/' + roomId);
    return (<></>);
}
export default newRoom;