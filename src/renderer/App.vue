<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'AskING-FE'
  }
</script>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  .app {
    width: 100%;
    height: 100%;
    overflow: hidden;
    /*::-webkit-scrollbar {display:none;}*/
    -webkit-user-select: none;
    -webkit-app-region: drag;
  }

</style>
