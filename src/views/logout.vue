<template lang="pug">
  p
    |logout
</template>
<script>
import Cookies from 'js-cookie'
export default {
  mounted(){
    Cookies.remove('accessToken')
    Cookies.remove('accessTokenExpiresAt')
    Cookies.remove('refreshToken')
    Cookies.remove('refreshTokenExpiresAt')
  }
}
</script>
