// pages/my/my.js
const app = getApp();
let loggin = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    avatarUrl:'http://img.qqzhi.com/uploads/2018-11-30/021340324.jpg',
    province:'省份',
    nickName:'名称',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hide:''
  },
  toUserInfo:function(e){
    if(loggin == true){
      wx.navigateTo({
        url: '/pages/info/info',
      })
    }else{
      wx.showToast({
        title: '请先登录',
        duration:2000,
        icon:'none'
      })
    }
  },
  toPublish: function (e) {
    if (loggin == true) {
      wx.navigateTo({
        url: '/pages/info/info',
      })
    } else {
      wx.showToast({
        title: '请先登录',
        duration: 2000,
        icon: 'none'
      })
    }
  },

  onLoad:function(e){
    this.setData({
      userInfo: app.globalData.userInfo
    });
    console.log('get',app.globalData.userInfo)

    
  },
  onGotUserInfo: function (e) {
    if (e.detail.userInfo) {
      var user = e.detail.userInfo;
      app.globalData.userInfo = user;
      this.setData({
        userInfo:user,
        nickName:user.nickName,
        avatarUrl:user.avatarUrl,
        province:user.province,
        hide:'none'
      });
      loggin = true;

      
      console.log(user);
    } else {
      console.log("用户拒绝了登陆");
    }
  },

  onShareAppMessage: function (res) {
    return {
      title: '大学城失物招领ap',
      path: '/pages/home/home',
      imageUrl: '/images/icon.png'
    }
  }


  
  

})