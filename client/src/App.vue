<template>
  <div class="container">

    <h1 class="text-center p-2"><strong class="text-dark">BVM</strong>chat</h1>
    <h6 class="text-center"><i>The greatest chat app ever!</i></h6>

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {}
}

</script>

<style>
  body {
    background-color: var(--bs-secondary);
    color: var(--bs-white)
  }

  .bg-black {
    background-color: #000;
  }

  @media(max-width: 600px){
    .container {
      padding: 20px !important;
    }
  }
</style>