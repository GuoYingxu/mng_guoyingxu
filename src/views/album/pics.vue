<template lang='pug'>
  .album_list
    Row(style='height:100%',v-if='album')
      card(style="height:100%")
        p(slot="title")
          |{{album && album.name}}
        div(slot="extra")
          Button(type="ghost") 我的图库
          FileUpload(:album="album.id")
            Button(type='ghost',icon='ios-cloud-upload-outline')
              |上传图片
        .page-content
          ImageItem(v-for='item in album.images', :item='item',:key='item.id')
</template>
<script>
import {mapState} from 'vuex'
import FileUpload from '../my-components/file-upload'
import ImageItem from '../pics/imageItem'
export default {
  computed:{
    ...mapState({
      album:state => state.album.currentAlbum
    })
  },

  mounted(){
    console.log(this.$route)
    if(this.$route.params.id)
    this.$store.dispatch('getAlbumPics',this.$route.params.id)
  },
  methods:{
    upload(){

    }
  },
  watch:{
    $route(val,old){
      if(val!==old){
        this.$store.dispatch('getAlbumPics',this.$route.params.id)
      }
    }
  },
  components:{
    FileUpload,ImageItem
  }
  
}
</script>
<style lang="less" scoped>
.album_list{
  height:100%
}
 .page-content{
   display:flex;
   flex-direction: 'row';
   flex-wrap: 'wrap';
   justify-content: 'flex-start';
 }
</style>
