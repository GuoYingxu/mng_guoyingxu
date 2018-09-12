<template lang="pug">
  .team
    Row(style="height:100%")
      card(style="height:100%")
        p(slot="title")
          |我的组织
        div(slot='extra')
          Button(type='ghost',@click="createNew")
            |新建组织
        .page-content
          Table(:columns='columns',:data="teams")
    Modal(title="组织",v-model="modal",@on-ok="saveTeam",@on-cancel="cancelhandler")
      Form(v-model="newTeam")
        FormItem( label="名称")
          Input(v-model= 'newTeam.name')
        FormItem( label="简介")
          Input(v-model='newTeam.description')
</template>
<script>
import {mapState} from 'vuex'
export default {
  data(){
    return {
      newTeam:{
        name:'',
        description:''
      },
      columns:[
        {
          title:"名称",
          key:'name'
        },
        {
          title:'简介',
          key:'description'
        }
      ],

      modal:false
    }
  },
  computed:{
    ...mapState({
      teams: state=>state.team.list
    })
  },
  methods:{
    createNew(){
      this.newTeam = {name:'',description:''}
      this.modal = true;
    },
    cancelhandler(){
      this.modal =false;
    },
    saveTeam(){
      console.log(this.newTeam)
      this.$store.dispatch('saveTeam',this.newTeam)
    }
  }

}
</script>
<style lang="less" scoped>
 .team{
    height: 100%;
  }
</style>
