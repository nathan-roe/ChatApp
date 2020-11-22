import { useEffect, useState, React, useRef} from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import {Link, navigate} from '@reach/router';
import {Form, Container, Button, Row, Col, Tabs} from 'react-bootstrap';
import '../styles/main_style.css';
import Card from 'react-bootstrap/Card';
import Draggable from '../../components/main/Draggable';
import Droppable from '../../components/main/Droppable';
import Message from '../../components/main/Message';
const moment = require('moment');

const Main = ({userId, roomId}) => {
    const [socket] = useState(() => io(':8000'));
    const [user, setUser] = useState({});
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [leftNav, setLeftNav] = useState(true);
    const [midColWidth, setMidColWidth] = useState(8);
    const [inputWidth, setInputWidth] = useState("52vw");
    const [update, setUpdate] = useState(false);
    const [tabs, setTabs] = useState([]);
    const [tabVal, setTabVal] = useState([]);
    const [friendsVal, setFriendsVal] = useState([]);
    const [friends, setFriends] = useState([]);
    const [friendName, setFriendName] = useState('');
    const [roomName, setRoomName] = useState('');
    useEffect(() => {
        
        axios.get('http://localhost:8000/api/users/' + userId)
            .then(res => {
                res.data._id === undefined ?
                    navigate('/') :
                    setUser(res.data);
                let tabArr = [];
                res.data._roomIds.filter(room => room !== roomId).map((val, i) => {
                    axios.get('http://localhost:8000/api/roomIds/get/' + val)
                        .then(res => {
                            setTabVal([...tabVal, res.data.name])
                            // console.log("All previous tabs: ")
                            // console.log([...tabs])
                            
                            tabArr.push({'name': res.data.name, 'roomId': res.data.id, "type": 'submit', "_id": res.data._id});
                            // console.log("The tab arr is: ")
                            // console.log(tabArr);
                            
                        });
                })
                setTabs(tabArr);
                let friendArr = [];
                res.data._friends.map((val, i) => {
                    axios.get('http://localhost:8000/api/friends/get/' + val)
                        .then(res => {
                            setFriendsVal([...friendsVal, res.data.friendName])
                            friendArr.push({'name': res.data.friendName, 'friendId': res.data.id, "_id": res.data._id});
                        });
                })
                setFriends(friendArr);
                console.log(friends);
            })
            .catch(err => console.log("This user is not in the database", err));
            axios.get('http://localhost:8000/api/rooms/' + roomId)
            .then(res => {
                setMessages(res.data.messageLog);
            })
            .catch(err => console.log("This user is not in the database", err));
            scrollToBottom();
    }, [])
    useEffect(() => {
        console.log("The useEffect was enteed")
        if(messages.length > 0)
        {
            console.log("Messages length is greater than 0")
            socket.on('message-to-client', data => {
                if(messages.includes(data))
                {
                    return;
                }
                let mesArr = [...messages, data];
                console.log(mesArr);
                axios.put('http://localhost:8000/api/rooms/edit/' + roomId, mesArr)
                    .then(res => res)
                    .catch(err => err);
                setMessages(mesArr);
                scrollToBottom();
            });
            setUpdate(false);
            // console.log(user);
        }
    }, [update]);

    const onLeftNavClick = e => {
        let newVal = !leftNav;
        setLeftNav(newVal);
        if(leftNav === false) {
            setMidColWidth(8);
            setInputWidth("52vw")
        } else {
            setMidColWidth(10);
            setInputWidth("68.70vw")
        }
    }
    const bottomRef = useRef();
    const scrollToBottom = () => {
        if(bottomRef.current !== null)
        {
            bottomRef.current.scrollIntoView()
        }
    };
    const onSubmitHandler = e => {
        console.log("Began submit process")
        e.preventDefault();
        let time = moment().format('M/D/YY hh:mm a');
        socket.emit('message-to-server', {"message": message, "time": time,"user": [user.firstName, user.lastName, user._id]});
        console.log("Socket emitted")
        setUpdate(true);
        setMessage('');
        return () => socket.disconnect(true);
    }
    const createNewRoom = () => {
        // console.log("room is being created!")
        axios.post('http://localhost:8000/api/rooms/new')
            .then(response => {
                // console.log(response.data);
                axios.post('http://localhost:8000/api/roomId/' + userId, {"name": `${user.firstName}'s room`, "id":response.data._id})
                    .then(res => {
                        // console.log(res);
                        setTabs([...tabs, {'name': res.data.name, 'roomId': res.data.id, "type": 'submit', "_id": res.data._id}])
                    })
                    .catch(err => console.log(err));
                navigate('/main/' + user._id + '/' + response.data._id);
            })
            .catch(err => console.log(err))
    }
    console.log("the room id is: ", roomId)
    axios.get('http://localhost:8000/api/roomIds/getRoom/' + roomId)
            .then(res => setRoomName(res.data.name)) 
            .catch(err => console.log(err));
    // const getNavTabs = () => {
    //     let tabVar = [];
    //     axios.get('http://localhost:8000/api/users/' + userId)
    //         .then(res => {
    //             res.data._id === undefined ?
    //                 navigate('/') :
    //                 setUser(res.data);
    //             res.data._roomIds.filter(room => room !== roomId).map((val, i) => {
    //                 axios.get('http://localhost:8000/api/roomIds/get/' + val)
    //                     .then(res => {
    //                         tabVar.push(res.data)
    //                     });
    //             })
    //         })
    //     return tabVar;
    // }
    const tabSubmitHandler = (e, idx) => {
        e.preventDefault();
        // if(tabVal[idx] === '')
        // {
        //     return;
        // }
        // let box = {"name": tabs[idx].name}
        let typeBox = {"type": "submit"}
        // console.log(tabs);
        // setTabs(tabs.map(tab => tab === tabs[idx] ? Object.assign({}, tab, box) : tab));
        // console.log(tabs[idx]);
        setTabs(tabs.map(tab => {return tab === tabs[idx] ? Object.assign({}, tab, typeBox) : tab}));
        axios.put('http://localhost:8000/api/roomIds/edit/' + tabs[idx]._id, {name: tabs[idx].name})
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }
    const addFriend = (e) => {
        e.preventDefault();
        let nameArr = friendName.split(' ');
        console.log("The name array is: ")
        console.log(nameArr);
        console.log(nameArr[0]);
        console.log(nameArr[1]);
        axios.get('http://localhost:8000/api/users/all')
            .then(
                res => {
                    let friendId = res.data.filter(user => user.firstName == nameArr[0] && user.lastName == nameArr[1]).map(user => user._id);
                    console.log(friendId[0])
                    axios.post('http://localhost:8000/api/friend/' + friendId[0], {"friendName": `${nameArr[0]} ${nameArr[1]}`, "id":friendId})
                        .then(res => {
                            console.log("Hello World")
                            console.log(res.data);
                            setFriends([...friends, {'name': res.data.friendName, 'id': res.datafriendId}])
                        })
                        .catch(err => console.log(err));
                }
            )
            .catch(err => console.log(err));
    }
    // let userImg = require('../../uploads/' + user.profileImg)
    return (
        <Container fluid="sm" className='container' style={{maxWidth: "100%", maxHeight: '100vh', backgroundColor: "rgb(45,51,56)"}}>
            <Row>
                        <Col xs={.5} style={{display: 'flex', justifyContent: 'flex-start'}}>
                        <button onClick={onLeftNavClick} style={{maxHeight: "6vh", border: "2px solid whitesmoke", width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-right-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path fillRule="evenodd" d="M4 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5A.5.5 0 0 0 4 8z"/>
                            </svg>
                            </button>
                        </Col>
                {
                    
                    leftNav ? 
                        <Col xs={2}>
                        <Row style={{display: "flex", flexDirection: "column", height: "45vh", textAlign: "center"}}>
                        <Card className="bg-dark text-white" style={{width: "100%", height: "45vh", overflow: "scroll hidden", overflowX: 'hidden', display: "flex", flexDirection: "column", alignItems: "center"}}>
                                <div className='scrollbar scrollbar-primary'>
                                <div className="navHeader" style={{display: 'flex'}}>
                                <Card.Title><button onClick={createNewRoom} style={{maxHeight: "6vh", border: "2px solid whitesmoke", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center", alignSelf: "center"}}>Create a Room!</button></Card.Title>
                                </div>
                                <Card.Text style={{paddingLeft: '45vw', paddingRight: '45vw', borderBottom: "1px solid grey"}}>
                                    Your Rooms | <span style={{cursor: 'pointer'}} onClick={e => navigate('/newRoom/' + userId + '/5fb4a3eb1285541d50d8cc7d')}>Main</span>
                                </Card.Text>
                                {
                                    // tabs.length > 1 ? 
                                    tabs.map((tab, i) => 
                                    <Draggable id={[user._id, tab.roomId]} className={i} key={i}>
                                        <form onSubmit={e => tabSubmitHandler(e, i)}>
                                            <input style={{width: "12%"}}type={tabs[i].type} value={tabs[i].name} 
                                            onDoubleClick={e => 
                                                setTabs(tabs.map(tab => {
                                                    let tabType = {type: 'text'};
                                                    return tab === tabs[i] ? Object.assign({}, tab, tabType) : tab;
                                                }))
                                            } onChange = {e => setTabs(tabs.map(tab => tab === tabs[i] ? Object.assign({}, tab, {'name': e.target.value}) : tab))}
                                            ></input>
                                            {/* onChange={e => setTabVal(tabs.map(tab => tab === tabs[i] ? tab = e.target.value : tab))} */}
                                        </form>
                                    </Draggable>
                                    // <h1>Hello World</h1>
                                    ) 
                                }
                                </div>
                        </Card>
                        </Row>
                        <Row style={{display: "flex", flexDirection: "column", alignItems: "stretch", height: "45vh"}}>
                            <Card className="bg-dark text-white" style={{width: "100%", height: "45vh", overflow: "scroll hidden", overflowX: 'hidden', display: "flex", flexDirection: "column", alignItems: "center"}}>
                                    <div className='scrollbar scrollbar-primary'>
                                    <div className="navHeader" style={{display: 'flex'}}></div>
                                    <Card.Title style={{maxHeight: "6vh", border: "2px solid whitesmoke", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center", alignSelf: "center"}}>Friends</Card.Title>
                                    <Card.Text style={{paddingLeft: '45vw', paddingRight: '45vw', textAlign: 'center'}}>
                                    <form onSubmit={addFriend}>
                                        <label htmlFor="">Please enter a friend's name:</label>
                                        <input type="text" onChange={e => setFriendName(e.target.value)}/>
                                        <input type="submit" value="submit friend"/>
                                    </form>
                                    {
                                        friends.map((val, i) => {
                                        <p>{val.friendName}</p>
                                        })
                                    }
                                    </Card.Text>
                                    </div>
                            </Card>
                        </Row>
                        <Row style={{display: "flex", flexDirection: "column", alignItems: "stretch", height: "10vh"}}>
                            {/* <img src={userImg} alt="#" style={{width: "100px", height: "100px"}}/> */}
                            {/* <p>FirstName</p> */}
                            <Card className="bg-dark text-white" style={{width: "100%", height: "10vh", overflow: "scroll hidden", overflowX: 'hidden'}}>
                                    <Card.Title>Hello {user.firstName} {user.lastName}</Card.Title>
                            </Card>
                        </Row>

                    </Col>
                : 
                ''
                }
                <Col xs={midColWidth} style={{padding: "0px"}}>
                    <Card className="bg-dark text-white" style={{width: "100%", height: "100vh", display: "flex", justifyContent: "space-between", flexDirection: "column"}}>
                        <Droppable userId={user._id}>
                        <div className="midHeader" style={{width: "100%", borderBottom: "1px solid grey", height: "10vh", paddingTop: "0px", display: "flex", justifyContent: "space-evenly", paddingTop: "2vh"}}>
                                {
                                    roomName ? 
                                    <h4>{roomName}</h4> :
                                    ''
                                }
                                {
                                    roomId === '5fb4a3eb1285541d50d8cc7d' ?
                                    <h4>Main</h4> : 
                                    ''
                                }
                        </div>
                        </Droppable>
                        <div className="centerMain" style={{overflowY: "scroll"}}>
                            {
                                messages.map((chat, i) => {
                                    return <div key={i}>
                                        <Message chat={chat}/> 
                                    </div>
                                })
                            }
                            
                            
                            <div ref={bottomRef} className="list-bottom"></div>
                        </div>
                            <div className="userInput">
                                <Form style={{display: "flex"}} onSubmit={onSubmitHandler}>
                                    <Form.Group>
                                        <Form.Control type="text" style={{width: inputWidth}} value={message} onChange={e => setMessage(e.target.value)}>

                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Button style={{marginLeft: '2vw', width: "10vw"}} type="submit">
                                            Chat
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </div> 
                    </Card>
                    {/*  */}
                </Col>
                <Col style={{height: "100vh", margin: "0px", padding: "0px"}} xs={1.2}>
                    <div className="contacts" style={{height: "60vh"}}>
                    <Card className="bg-dark text-white" style={{width: "100%", height: "60vh", overflow: "scroll hidden", overflowX: 'hidden'}}>
                            {/* <Card.Title>Your Friends</Card.Title>
                            <Card.Text>
                            This is a wider card with supporting text below as a natural lead-in to
                            additional content. This content is a little bit longer.
                            </Card.Text>
                            <Card.Text>Last updated 3 mins ago</Card.Text> */}
                    </Card>
                        {/* <div style={{display: "flex", justifyContent: "space-evenly", paddingBottom: "2vh"}}>
                            <img src="" alt="#"/>
                            <p>FirstName LastName</p>
                        </div> */}
                        {/* <div style={{display: "flex", justifyContent: "space-evenly", paddingBottom: "2vh"}}>
                            <img src="" alt="#"/>
                            <p>FirstName LastName</p>
                        </div>
                        <div style={{display: "flex", justifyContent: "space-evenly", paddingBottom: "2vh"}}>
                            <img src="" alt="#"/>
                            <p>FirstName LastName</p>
                        </div> */}
                    </div>
                    <div className="social" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        {/* <h3>Social</h3>
                        <p style={{textAlign: "center"}}>See what other people are talking about</p> */}
                        <Card className="bg-dark text-white" style={{width: "100%", height: "40vh", overflow: "scroll hidden", overflowX: 'hidden'}}>
                                {/* <Card.Text>
                                This is a wider card with supporting text below as a natural lead-in to
                                additional content. This content is a little bit longer.
                                </Card.Text> */}
                        </Card>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
export default Main;