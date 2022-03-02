<template>
  <div class="row">
  <div class="col-lg-6 col-md-8 col-sm-12 mx-auto bg-dark mb-3 p-5 shadow-lg rounded">
    
    <h1 class="text-primary mb-5">
      <i class="fas fa-user"></i>
      {{this.username}}
    </h1>

    <p v-if="channelExistMsg" class="text-danger">Channel already exist!</p>

    <div class="mb-5">
      <label class="form-label h3 mb-4">Create a new channel</label>
      
      <div class="input-group mb-">
        <input v-model="newChannel" type="text" class="form-control" placeholder="e.g. Node.js" >
        <button :disabled="!newChannel" class="btn btn-outline-primary" type="button" id="button-addon2" @click="submitNewChannel">Submit</button>
      </div>        
    </div>

    <div v-if="this.channels.length > 0" class="mt-5">
      <label class="form-label h3 mb-4">Join a channel</label>
      
      <select ref="selectChannel" @change="onChange(e)" class="form-select">
        <option v-for="(channel, index) in channels" :key="channel+index" :value="channel" >{{channel}}</option>
      </select>

      <button class="btn btn-outline-primary px-5 mt-3" @click="joinChannel">Join</button>

    </div>
  </div>
</div>
</template>

<script>
export default {
  data(){
    return {
      username: '',
      newChannel: '',
      existingChannel: '',
      channelExistMsg: false,
      channels: []
    }
  },
  created(){
    this.checkUser()
    this.checkChannel()
    this.getChannels()
  },
  methods: {
    async submitNewChannel(){
      if(!this.channels.includes(this.newChannel)){
        const username = await this.checkUsername(this.newChannel)
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("channel", this.newChannel);

        this.$router.push(`/Channel`) 
      } else {
        this.newChannel = ''
        this.channelExistMsg = true
        setTimeout(() => {
          this.channelExistMsg = false
        }, 3500);
      }
      // 
    },
    async joinChannel(){
      this.existingChannel = this.$refs.selectChannel.value
      const username = await this.checkUsername(this.$refs.selectChannel.value)
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("channel", this.existingChannel);
      this.$router.push(`/Channel`) 
    },
    onChange() {     
      this.existingChannel = this.$refs.selectChannel.value
    },
    checkUser(){
      const username = sessionStorage.getItem("username");
      if(!username){
        this.$router.push('/')
      }

      this.username = username
    },
    checkChannel(){
      if(sessionStorage.getItem("channel")){
        this.$router.push('/Channel')
      }
    },
    async getChannels(){
      const response = await fetch('http://localhost:5000/channels')
      const resData  = await response.json()
      this.channels = [...resData.channels]
    },
    async checkUsername(channel){

      const response = await fetch('http://localhost:5000/checkUsername', {
        method: 'POST',
        body: JSON.stringify({
          username: this.username,
          channel: channel
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })

      const resData  = await response.json()

      return(resData.username)

    }
  }
}
</script>

<style>

</style>