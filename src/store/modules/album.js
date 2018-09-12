import _ from 'lodash'
import util from '../../libs/util'
const album = {
  state:{
    personal_list:[],
    team_list:[],
    currentAlbum:null
  },
  mutations:{
    SET_PERSONAL_ALBUM_LIST(state,value){
      state.personal_list = value
    },
    ADD_TO_PERSONAL_ALBUM_LIST(state,value){
      state.personal_list.unshift(value)
    },
    REMOVE_FROM_PERSONAL_ALBUM_LIST(state,value){
      var temp = [...state.personal_list]
      var albumIndex = _.findIndex(temp,item=>item.id==value.id)
      temp.splice(albumIndex,1)
      state.personal_list = temp
    },
    SET_CURRENT_ALBUM(state,value){
      state.currentAlbum = value
    },
    SET_TEAM_ALBUM_LIST(state,value){
      state.team_list =value
    },
    ADD_TO_TEAM_ALBUM_LIST(state,value){
      state.team_list.unshift(value)
    },
    REMOVE_FROM_TEAM_ALBUM_LIST(state,value){
      var tem = [...state.team_list]
      var albumIndex = _.findIndex(temp,item=>item.id==value.id)
      temp.splice(imgIndex,1)
      state.team_list = temp
    },
  },
  actions:{
    getPersonalAlbumByPage({commit},data){
      util.api.get('/api/album',{
        params:{
          per: data && data.per ,
          page: data && data.page || 1,
          ownerType:'personal'
        }
      }).then(resJson=>{
        commit("SET_PERSONAL_ALBUM_LIST",resJson.data.list)
      })
    },
    getTeamAlbumByPage({commit},data){
      util.api.get('/api/album',{
        params:{
          per:data && data.per ,
          page: data && data.page || 1,
          ownerType:'team',
          ownerId:data && data.teamId 
        }
      }).then(resJson=>{
        commit("SET_TEAM_ALBUM_LIST",resJson.data.list)
      }) 
    },
    saveAlbum({commit},data){
      util.api.post('/api/album',data).then(resJson=>{
        if(data.ownerType=='team'){
          commit('ADD_TO_TEAM_ALBUM_LIST',resJson.data)

        }else{
          commit('ADD_TO_PERSONAL_ALBUN_LIST',resJson.data)
        }
      })
    },
    getAlbumPics({commit},data){
      util.api.get(`/api/album/${data}`).then(res=>{
        console.log(res.data)
        commit('SET_CURRENT_ALBUM',res.data)
      })
    }
  }

}
export default album