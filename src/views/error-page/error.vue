<template lang="pug">
  p #{message}
</template>
<script>
export default {
  data(){
    return {
      message:this.$route.params.message || 'undefined message'
    }
  }
}
</script>

