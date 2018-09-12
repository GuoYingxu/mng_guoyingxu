<template lang="pug">
  div(class="v-file-upload")
    div(class="v-file-upload",
    @click="handleClick")
      input( ref='input',type="file",class="v-file-upload-input",@change="handleChange",:multiple="multiple")
      slot
</template>
<script>
import {uploadFiles} from '../../../libs/fileUpload'
export default {
  name:'FileUpload',
  props:{
    multiple:{
      type:Boolean,
      default:false
    },
    album:{
      type:Number
    }
  },
  methods:{
    handleClick(){
      this.$refs.input.click()
    },
    handleChange(e){
      const files = e.target.files;
      if(!files){
        return
      }
      let params = {}
      if(this.album){
        params.albumId = this.album
      }
      uploadFiles(this,files,params)
      this.$refs.input.value = null
    }
  }
}
</script>
<style lang="less" scoped>
.v-file-upload{
  display: inline-block
}
.v-file-upload-input{
  display: none
}
</style>
