<template lang="pug">
  .callback
    p 
      |登录成功，正在跳转...
</template>
<script>
import axios from 'axios'
export default {
  mounted(){
    // this.$store.dispatch('getUserInfo')
      this.$router.push('/home')
  }

}
</script>
