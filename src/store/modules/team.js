import _ from 'lodash'
import util from '../../libs/util';
const team = {
  state:{
    list:[]
  },
  mutations:{
    SET_TEAM_LIST(state,value){
      state.list =value
    },
    ADD_TO_TEAM_LIST(state,value){
      let index = _.findIndex(state.list,item=> item.id == value.id)
      if(index<0){
        state.list.unshift(value)
      }
    }
  },
  actions:{
    saveTeam({commit},team){
      util.api.post('/api/team',team).then(resJson=>{
        commit("ADD_TO_TEAM_LIST",resJson.data)
      })
    },
    getAllTeam({commit}){
      util.api.get('/api/team').then(resJson=>{
        console.log(resJson.data)
        commit('SET_TEAM_LIST',resJson.data.list)
      })
    }
  }
}
export default team