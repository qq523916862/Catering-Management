<template>
  <div id="app">
    <router-view class="page-box" />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height:100%;
}
html{
  height:100%;
  background: #eeeeee;
}
body{
  height:100%;
  min-width: 600px;
}
.page-box{
  padding-bottom: 50px;
}
</style>
