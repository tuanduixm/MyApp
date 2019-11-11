//app.js

App({
  globalData:{
    openid:'',
    userInfo:'',
    categories: ['所有', '校园卡', '雨伞', '钱包']
   
  },
  onLaunch:function(){
    if(!wx.cloud){
      console.error('找不到云');
    }else{
      wx.cloud.init({
        traceUser:true,
        env: 'qq-x7f66'
      });  

      
    }


    
  }
})