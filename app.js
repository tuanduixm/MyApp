//app.js

App({
  globalData:{
    openid:'',
    userInfo:'',
    categories: ['所有', '校园卡', '雨伞', '钱包']
   
  },
  onLaunch:function(){
    let that = this;
    if(!wx.cloud){
      console.error('找不到云');
    }else{
      wx.cloud.init({
        traceUser:true,
        env: 'qq-x7f66'
      });  
      wx.cloud.callFunction({
        name: 'getOpenid',
        success: function (res) {
          console.log('成功', res.result.openid);
          that.globalData.openid = res.result.openid;
        },
        fail: function (res) {
          console.log('失败', res);
        }
      });

      
    }


    
  }
})