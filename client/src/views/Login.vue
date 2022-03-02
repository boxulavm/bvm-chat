<template>
  <div class="row">
    <div class="col-lg-6 col-md-8 col-sm-12 mx-auto bg-dark p-5 shadow-lg rounded">
      <label class="form-label h2">Username</label>
      <input @keyup.enter="submitUsername" type="text" class="form-control my-3" placeholder="e.g. Nodezilla" v-model="username">
      <div class="text-center mt-5">
        <button class="btn btn-outline-primary btn-lg px-5" :disabled="!username" @click="submitUsername">Submit</button>
      </div>
    </div>
</div>
</template>

<script>
export default {
  data(){
    return {
      username: ''
    }
  },
  methods: {
    submitUsername(){

      if(this.username){
        sessionStorage.setItem("username", this.username);
        this.$router.push(`/Channels`) 
      }

    },
    checkUsername(){
      if(sessionStorage.getItem("username")){
        this.$router.push(`/Channels`) 
      }
    }
  },
  created(){
    this.checkUsername()
  }
}
</script>

<style>

</style>