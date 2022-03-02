<template>
  <div 
    :class="[ message.user === this.username ? 'messageDivThisUser' : 'bg-messageDiv' ]"
    class="mb-4 bg-black border-none messageDiv">
    <p class="p-0 m-0">
      <small class="text-warning">
        {{ message.user}} 
      </small>, 
      <small class="text-info mr-3">
        {{ message.time }}
      </small>
    </p>
    <div 
      :class="[ message.user === this.username ? 'bg-primary' : 'bg-secondary' ]"
      class="p-2 messageText">
      <p class="p-0 m-0">{{ message.text}}</p>
    </div>
  </div>



</template>

<script>
export default {
  props: {
    message: Object
  },
  data(){
    return{
      'username':sessionStorage.getItem("username")
    }
  }
}
</script>

<style scoped>
  .messageText {
    border-radius: 0px 10px 10px 10px;
  }

  .messageDiv {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .messageDivThisUser {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
</style>