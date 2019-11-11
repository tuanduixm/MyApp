//index.js
//获取应用实例
const app = getApp();

const DB = wx.cloud.database().collection('test');

Page({
  data: {
    
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

  },


  onLoad: function(options) {
    

    wx.cloud.callFunction({
      name: 'getOpenid',
      success: function(res) {
        console.log('成功', res.result.openid);
        app.globalData.openid = res.result.openid;
      },
      fail: function(res) {
        console.log('失败', res);
      }
    });

  },
  onGotUserInfo: function(e) {
    if (e.detail.userInfo) {
      var user = e.detail.userInfo;
      app.globalData.userInfo = user;
      wx.switchTab({
        url: "/pages/home/home",
        success: function (e) {
          console.log('succur',e)
        },
        fail:function(e){
          console.log('fai',e)
        }

      })
      console.log(user);
    } else {
      console.log("用户拒绝了登陆");
    }
  },

  onShareAppMessage: function (res) {
    return {
      title: '大学城失物招领ap',
      path: '/pages/index/index',
      imageUrl: '/images/icon.png'
    }
  }


})

