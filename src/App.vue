<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import constants from './js/constants'
import { mapActions } from 'vuex'
export default {
  name: 'App',
  mounted() {
    this.login()
  },
  methods: {
    ...mapActions(['login']),
  }
}
</script>
<style src='./commons.scss' lang="scss"></style>
<style>
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.el-header {
  padding-left: 0;
  padding-right: 0;
}
</style>
