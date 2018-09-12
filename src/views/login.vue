<style lang="less">
@import './login.less';
</style>

<template lang="pug">
  .login(@keydown.enter = 'handleSubmit')
    .login-con
      Card(:bordered="false")
        p(slot='title')
          Icon(type='log-in')
          |欢迎登录
        .form-con
          Form(ref='loginForm' :model="form" :rules="rules")
            FormItem(prop='userName')
              Input(v-model='form.userMame' placeholder="请输入用户名")
                span(slot='prepend')
                  Icon(:size='16' type="person")
            FormItem(prop='password')
              Input(v-model='form.password' type='password' placeholder="请输入密码")
                span(slot='prepend')
                  Icon(:size='14' type='locked')
            FormItem
              Button(@click="handleSubmit" type="primary" long) 登录
</template>

<script>
import Cookies from 'js-cookie'
export default {
  data(){
    return {
      form:{
        userName:'',
        password:''
      },
      rules:{
        userName:[
          {required:true,message:'账号不能为空',trigger:'blur'}
        ],
        password:[
          {required:true,message:'密码不能为空',trigger:'blur'}
        ]
      }
    }
  },
  methods:{
    handleSubmit(){
      this.$refs.loginForm.validate((valid)=>{
        if(valid){
          // sent to Server
          Cookies.set('user', this.form.userName);
          Cookies.set('password', this.form.password);
          this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
          if (this.form.userName === 'iview_admin') {
              Cookies.set('access', 0);
          } else {
              Cookies.set('access', 1);
          }
          this.$router.push({
              name: 'home_index'
          });
          
        }
      })
    }
  }
}
</script>
