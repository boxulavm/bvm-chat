<template>
  <div class="row mb-3">
    <div class="col-lg-12 mx-auto bg-dark p-5 shadow-lg rounded">
      
      <div class="text-end mb-3">
        <button @click="leaveChannel" class="btn btn-outline-primary">leave Channel</button>
      </div>

      <div class="row">
        <div class="col-lg-3 mb-5">
          <div class="bg-primary p-2">
            <h5>Channel</h5>
            <h6 class="bg-dark p-3">{{ channel }}</h6>
            <h5>Users</h5>
            <div class="bg-dark p-3" id="users-div">
              <p v-for="user in users" :key="user.id">{{ user.username }}</p>
            </div>
          </div>
        </div>
        <div class="col-lg-9 bg-black">
          <div ref="messagesDiv" id="messagesDiv" class="p-3">
              <Message v-for="message in messages" :key="message.id" :message="message" />
          </div>
        </div>
      </div>

      <div class="input-group mt-5">
        <input @keyup.enter="submitMsg" type="text" class="form-control" placeholder="enter message" v-model="msgText">
        <button :disabled="!msgText" @click="submitMsg" class="btn btn-outline-primary" type="button" id="button-addon2">Send</button>
      </div>    
      
    </div>
  </div>
</template>

<script>
import Message from '../components/Message.vue'
import { io } from 'socket.io-client'

export default {
  components: {
    Message
  },
  data(){
    return {
      msgText: '',
      username: '',
      channel: '',
      messages: [],
      users: []
    }
  },
  methods: {
    submitMsg(){

      if(this.msgText !== ""){
        this.socket.emit('message', {
          username: this.username,
          text: this.msgText,
          channel:this.channel
        })
        this.msgText = ""
      }

    },
    leaveChannel(){
      sessionStorage.setItem("channel", '');
      this.$router.push(`/Channels`) 
    },
    addToMessages(msg){
      this.messages = [...this.messages, msg]
    },
    addUsers(users){
      this.users = users.filter(user => user.channel == this.channel)
    },
    scrollTop(){
      const messageDiv = this.$refs.messagesDiv
      messageDiv.scrollTop = messageDiv.scrollHeight;
    },
    checkChannel(){
      if(!sessionStorage.getItem("channel")){
        this.$router.push('/Channels')
      }

      this.channel = sessionStorage.getItem("channel")
    },
    checkUsername(){
      if(!sessionStorage.getItem("username")){
        this.$router.push('/')
      }

      this.username = sessionStorage.getItem("username")
    }
  },
  created() {

    this.checkChannel()
    this.checkUsername()

    this.socket = io('localhost:5000/')

    const that = this

    this.socket.on('prevMessages', data => {
      console.log(data)
      this.messages = [...data]
    })

    this.socket.on('message', data => {
      that.addToMessages(data)
    })

    this.socket.on('users', data => {
      that.addUsers(data)
    })

    this.socket.emit('joinedChannel', {
      username: this.username,
      channel: this.channel
    })

  },
  beforeUnmount() {

    if (this.socket) {
      this.socket.disconnect(this.username) 
    }
  },
  updated(){
    this.scrollTop()
  }
}

</script>

<style scoped>
  #messagesDiv {
    height: 500px;
    overflow: auto;
  }

  #users-div {
    max-height: 300px;
    overflow: auto;
  }
</style>