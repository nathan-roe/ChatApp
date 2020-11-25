This app incorporates Socket.io, MongoDB, Mongoose, Express, React, and Node. It allows users to communicate with other users in real time. 
On top of that, ChatApp has multiple rooms users can go into, in which user messages and names are stored. 
Using advanced JSON manipulation, I was able to create a one-to-many relationship between users and rooms, (one user has many rooms they can go into)
as well as a one-to-many relationship between users and friends (one user has many friends). The room relationship is completely built out and fully functional. 
The relationship between a user and their friends is also completely built out on the backend, and is only missing the styling on the front end.

React: Shows rooms and allows users to view the page without every having it reload.
Socket.io: Allows real-time communication between users on my server. client -> server -> all clients
MongoDB: Stores information on rooms and users, allowing individual rooms to hold onto message and user data, and allows users to sign into the app.
Mongoose: Acts as a bridge between the app and the database, allowing me to use React to show all of a users rooms.
Node: JavaScript makes up the entirety of the app, along with HTML, CSS, etc.
