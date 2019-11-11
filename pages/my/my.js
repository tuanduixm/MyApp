// pages/my/my.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null
  },

  onLoad:function(e){
    this.setData({
      userInfo: app.globalData.userInfo
    });
    console.log('get',app.globalData.userInfo)

    
  },
  
  

})