// pages/my_publish/my_publish.js

var app = getApp();
const DB = wx.cloud.database().collection('edit');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    DB.where({
      _openid:app.globalData.openid
    }).get({
      success:function(res){
        console.log('getlist',res);
        let tempList = [];
        for(let i = 0; i < res.data.length; i++){
          tempList.push(res.data[i])
        }
        that.setData({
          list:tempList
        });

        

        console.log(that.data.list);
      },
      fail:function(res){
        console.log('fail_List',res);
      }
    })
  },

  delete:function(res){
    console.log(res.currentTarget.id);
    let id = res.currentTarget.id;
    let that =this;
    wx.showModal({
      title: '删除',
      content: '确认删除？',
      confirmText: '确定',
      cancelText: '取消',
      success:function(res){
        if (res.confirm) {

          console.log('用户点击了确定')
          DB.doc(that.data.list[id]._id).remove({
            success: function (res) {
              console.log('remove succe', res);
            },
            fail: function (res) {
              console.log('remove fail', res);
            }
          });
          that.data.list.splice(id,1);
          that.setData({
            list:that.data.list
          });
          
          
        } else if (res.cancel) {

          console.log('用户点击取消')

        }
      }
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