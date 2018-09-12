import util from '../../libs/util';
const user = {
  state:{
    nickname:"",
    phone:'',
    email:"",
    id:""
  },
  mutations:{
    SET_USER(state,value){
      state.nickname = value.nickname ||value.phone||value.email;
      state.phone = value.phone;
      state.email = value.email
      state.id =value.id
    }
    
  },
  actions:{
  }
}
export default user