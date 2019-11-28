// pages/addcard/addcard.js
const app = getApp()
const DB = wx.cloud.database().collection('test');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value1: '',
    value2: '',
    value3: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  submit:function(res){
    console.log(res.detail.value)
    let value = res.detail.value;
    DB.where({
      name:value.name,
      id:value.card
    }).get({
      success:function(res){
        console.log('success get',res);
        console.log(res.data[0].phone)
        
        let message = '你的饭卡找到了，请在寻物ap小程序查看最新发布页面'
        console.log('message:',message);
        console.log(typeof(message));
        wx.cloud.callFunction({
          name: 'zhenzisms',
          data: {
            $url: 'send',
            apiUrl: 'https://sms_developer.zhenzikj.com',
            message: message,
            number: res.data[0].phone,
            messageId: 'aaq'
          }
        }).then((res) => {
          console.log('send ok?',res.result);
        }).catch((e) => {
          //console.log(e);
        });
      },
      fail:function(res){
        console.log('fail get',res);
      }
    });

    const DB2 = wx.cloud.database().collection('edit');
    DB2.add({
      data: {
        type_t: 'found',
        category: '校园卡',
        msg: '  找到校园卡，卡号：' + value.card +' ,姓名：' + value.name +', 联系电话: ' +  value.phone,
        fileIDs: [],
        nickName: app.globalData.userInfo.nickName,
        submission_time: new Date().getTime(),
        avatarUrl: app.globalData.userInfo.avatarUrl
      },
      success: function (res) {
        console.log('上传信息成功', res)
      }

    });

    wx.navigateBack({
      delta: 1
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})