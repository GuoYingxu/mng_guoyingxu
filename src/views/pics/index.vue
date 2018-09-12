<template lang="pug">
  .pics
    Row(style="height:100%")
      card(style="height:100%")
        p(slot='title')
          Icon(type='ios-cloud-upload-outline')
          |所有图片
        div(slot='extra')
          FileUpload
            Button(type='ghost',icon='ios-cloud-upload-outline')
              |上传文件
        .page-content

          ImageItem(v-for='item in image.list', :item='item',:key='item.id')

</template>
<script>
import util from '../../libs/util.js'
import FileUpload from '../my-components/file-upload'
import ImageItem from './imageItem'
import {mapState} from 'vuex'
export default {
  async mounted(){
    // const res =  await util.test().catch(err=>err)
    // console.log("===res",res.code,res.message)
    this.$store.dispatch('getImageByPage')
  },
  computed:{
    ...mapState({
      image: state => state.image
    })
  },
  components:{
    FileUpload,
    ImageItem
  }
}
</script>

<style lang="less" scoped>
  .pics{
    height: 100%;
  }
  .upload-button{

    .file-input{
      // position: absolute;
      // left:0;
      // display: inline-block;
      // box-sizing: border-box;
      opacity: 1;
      background: red;
      cursor: pointer;  
    }
 }
 .page-content{
   display:flex;
   flex-direction: 'row';
   flex-wrap: 'wrap';
   justify-content: 'flex-start';
 }
</style>
