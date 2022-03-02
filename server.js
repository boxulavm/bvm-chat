import express from "express"
import http from "http"
import { Server as socketio } from "socket.io"
import { Users, findUserByID, removeUserByID } from './utils/Users.js'
import { formatMessage, Messages, getMessagesFromChannel } from './utils/Messages.js'
import cors from 'cors'
import bodyParser from 'body-parser'

const port = 5000
const app = express()
const server = http.createServer(app)
app.use(cors())
app.use(bodyParser.json())

const io = new socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }}
)

// 
io.on("connection", socket => {
    console.log("New client connected")

    socket.on('message', msg => {
      Messages.push(formatMessage(msg.username,msg.text,msg.channel))
      io.to(msg.channel).emit('message', formatMessage(msg.username,msg.text,msg.channel))
    })

    socket.on('joinedChannel', msg => {
      // broadcast when a user connects (everyone sees exept user)

      socket.join(msg.channel)

      //

      Users.push({
        id: socket.id,
        username: msg.username,
        channel: msg.channel
      })

      io.to(msg.channel).emit('prevMessages', getMessagesFromChannel(msg.channel))

      socket.broadcast.to(msg.channel).emit('message',formatMessage('BVMchatBOT',`A user ${msg.username} has joined the chat`,msg.channel))

      io.to(msg.channel).emit('users',Users)

    })

    // runs when client dissconnects
    socket.on("disconnect", (e) => {

      const user = findUserByID(socket.id)

      let username = ""

      if(user){
        removeUserByID(socket.id)
        removeChannelData(user.channel)

        username = user.username

        io.to(user.channel).emit('message',formatMessage('BVMchatBOT',`${username} has left the chat`,user.channel))
  
        io.to(user.channel).emit('users', Users)
      }


      console.log("Client disconnected")
    })

})
// 

app.get('/channels', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const channels = Users.map(u => u.channel)

  res.end(JSON.stringify({ channels: [...new Set(channels)] }));
})

app.post('/checkUsername', (req, res) => {

  let {username,channel} = req.body

  const usernameInChannel = Users.filter(user => user.channel == channel && user.username == username)

  if(usernameInChannel.length > 0){
    username += `_${Math.floor(Math.random() * (10000000 - 1 + 1) + 1)}`
  }

  res.end(JSON.stringify({
    username:username
  }))
})

const removeChannelData = channel => {
  const usersLeftInChannel = Users.filter(user => user.channel == channel).length
  if(usersLeftInChannel === 0){
    const channelMessages = Messages.filter(msg => msg.channel != channel)
    Messages.splice(0,Messages.length)
    
    channelMessages.forEach(element => {
      Messages.push(element)
    });

  }
}

server.listen(port, () => console.log(`Listening on port ${port}`))