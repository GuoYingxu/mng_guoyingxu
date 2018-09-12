import util from './util';
import Cookies from 'js-cookie';
import * as qiniu from 'qiniu-js'
import { Config } from '../config';
import album from '../store/modules/album';
export async  function  uploadFiles(vm,files,params){
  let file = files[0];
  let key =  new Date().getTime()+file.name;
  let putExtra = {
    fname: file.name,
    params: {},
    mimeType: null
  };
  if(!validataToken()){
    await getUpToken()
  }
  const token = Cookies.get('uploadtoken')
  console.log(token)
  let config = {
    useCdnDomain: true,
    region: qiniu.region.z2
  };
    // 添加上传dom面板
    let next = (response) =>{
      let total = response.total;
      console.log(total.percent)
      console.log(response)
      // $(".speed").text("进度：" + total.percent + "% ");
    }
    let complete = (response) => {
      console.log(response)
       savePic(response.hash,key,params)
    }
    let subscription;
    // 调用sdk上传接口获得相应的observable，控制上传和暂停
    let observable = qiniu.upload(file, key, token, putExtra, config);
    observable.subscribe({next,complete})
}
function savePic(hash,name,params){
  const bucket = Config[process.env.NODE_ENV].qiniu.Bucket
  const domain = Config[process.env.NODE_ENV].qiniu.Domain[bucket]
  return  util.api.post('/api/image',{
    hash:hash,
    name:name,
    domain:domain,
    albumId:params.albumId,
    url:domain+'/'+name
  }).then(res=>{
    console.log(res)
  })
}
export async function getUpToken(){
  return util.api.get('/api/upload/token').then(res=>{
    Cookies.set('uploadtoken',res.data.token)
    Cookies.set('uploadTokenExpiresAt',new Date().getTime() + 7198*1000)
    return res.data.token
  }).catch(err=>{
    return null
  })
}

function validataToken(){
  if(util.isNull(Cookies.get('uploadtoken')) || util.isNull(Cookies.get('uploadTokenExpiresAt'))){
    return false
  }else{
    var expiresAt = Cookies.get('uploadTokenExpiresAt')
    if(parseInt(expiresAt) > new Date().getTime()){
      return true
    }else{
      return false
    }
  }
}