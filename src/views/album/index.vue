<template lang="pug">
  .album
    Row(style="height:100%")
      card(style="height:100%")
        p(slot="title",style="height:auto")
          ButtonGroup
            Button(:type="type=='personal' ? 'primary':'ghost' ",@click="type='personal'") 个人相册
            Button(:type="type=='personal' ? 'ghost' :'primary'",@click="type='team'") 集体相册
        div(slot='extra')
          Button(type='ghost',@click='showModal')
            |新建相册
        .page-content
          Table(:columns="columns",:data='currentList')
    Modal(title='相册',v-model="modal",@on-ok="saveAlbum",@on-cancel="cancelhandler")
      Form(v-model='newAlbum')
        FormItem(label='名称')
          Input(v-model='newAlbum.name')
        FormItem(label="类型")
          Select(v-model="newAlbum.ownerType")
            Option(value="personal") 个人相册
            Option(value="team") 集体相册
        FormItem(label="组织", v-if="newAlbum.ownerType=='team'")
          Select(v-model="newAlbum.ownerId")
            Option(v-for="item in teams", :key="item.id",:value="item.id") {{item.name}}
        FormItem(label="发布")
          Select(v-model="newAlbum.publishType")
            Option(value="public") 公开
            Option(value="private") 私有
</template>
<script>
import {mapState } from 'vuex'
export default {
  data(){
    return {
      type:"personal",
      columns:[{
        title:'名称',
        key:'name'
      },{
        title:"操作",
        key:'action',
        width:150,
        align:'center',
        render:(h,params)=>{
          return h('Button',{
            props:{
              type:'primary',
              size:'small'
            },
            on:{
              click:()=>{
                this.$router.push(`/album_pics/${params.row.id}`)
              }
            }
          },'编辑')
        }
      }],
      newAlbum:{
        name:'',
        ownerType:'personal',
        ownerId:'',
        publishType:'private'
      },
      modal:false

    }
  },
  computed:{
    currentList(){
      return  this.type=='personal' ? this.personal_list : this.team_list
    },
    ...mapState({
      personal_list: state=> state.album.personal_list,
      team_list: state=> state.album.team_list,
      teams: state=> state.team.list
    })
  },
  mounted(){
    this.$store.dispatch('getAllTeam')
    this.$store.dispatch('getPersonalAlbumByPage')
  },
  watch:{
    type(value,old){
      if(value!=old){
        if(value=='team'&& this.team_list.length == 0){

          this.$store.dispatch('getTeamAlbumByPage')
        }
        if(value =='personal'&&this.personal_list.length==0){
          this.$store.dispatch('getPersonalAlbumByPage') 
        }
      }
    }
  },
  methods:{
    saveAlbum(){
      this.modal = false;
      this.$store.dispatch('saveAlbum',this.newAlbum)
    },
    showModal(){
      this.modal =true;
      this.newAlbum ={
        name:'',
        ownerType:'personal',
        ownerId:'',
        publishType:'private'
      }
    },
    cancelhandler(){
      this.modal =false
    }
  }

}
</script>
<style lang="less" scoped>
 .album{
    height: 100%;
  }
</style>
