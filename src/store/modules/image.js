import _ from 'lodash'
import util from '../../libs/util';
const image = {
  state:{
    list:[],
    current:null
  },
  mutations:{
    SET_IMAGE_LIST(state,value){
      state.list = value
    },
    ADD_TO_IMAGE_LIST(state,value){
      state.list.unshift(value)
    },
    REMOVE_FROM_IMAGE_LIST(state,value){
      var temp = [...state.list]
      var imgIndex = _.findIndex(temp,item=>item.id ==value.id)
      temp.splice(imgIndex,1)
      state.list= temp
    },
    SET_CURRENT_IMAGE(state,value){
      state.current =value
    }
  },
  actions:{
    getImageByPage({commit},data){
      util.api.get('/api/image',{
        params:{
          per:data &&data.per || 10,
          page: data&&data.page || 1
        }
      }).then(resJson=>{
        commit('SET_IMAGE_LIST',resJson.data.list)
      })
    },
    getImageById(){
      util.api.get('/image/id').then(resJson=>{
        commit('SET_CURRENT_IMAGE',resJson.data)
      })
    }
  }
}
export default image