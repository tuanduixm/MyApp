// pages/info/info.js

const app = getApp();
const DB = wx.cloud.database().collection('test');

let _id = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value1: '',
    value2: '',
    value3: '',
    value4: '',
    visible1: false,
    actions1: [{
        name: '广东工业大学'
      },
      {
        name: '广东美术学院'
      }
    ]

  },



  onLoad: function() {
    let that = this;
    DB.where({
      _openid: app.globalData.openid
    }).get({
      success: function(res) {
        if(res.data.length==0){

          DB.add({
            data: {
              name: '',
              school: '',
              id: '',
              phone: ''
            },
            success: function (res) {
              console.log('suc', res);
              that._id = res._id;
            },
            fail: function (res) {
              console.log('fail', res);
            }
          })


        }else{
          console.log('succ', res);
          that.setData({
            value1: res.data[0].name,
            value2: res.data[0].school,
            value3: res.data[0].id,
            value4: res.data[0].phone
          });
          that._id = res.data[0]._id;
        }
        

      },
      fail: function(res) {
        console.log('fail', res);
      }
    })
  },

  handleOpen1() {
    this.setData({
      visible1: true
    });
  },

  handleCancel1() {
    this.setData({
      visible1: false
    });
  },

  handleClickItem1({
    detail
  }) {
    let that = this;
    const index = detail.index + 1;
    let selected;
    switch (index) {
      case 1:
        selected = '广东工业大学';
        break;
      case 2:
        selected = '广东美术学院';
        break;
    };

    this.setData({
      value2: selected
    });

    this.handleCancel1();
    console.log(detail);
    console.log('val2', this.data.value2);

  },

  modifyInfo(e) {
    let that = this;
    console.log('modif', e);
    DB.doc(this._id).update({
      data: {
        name: e.detail.value.name,
        school: e.detail.value.school,
        id: e.detail.value.id,
        phone: e.detail.value.phone,
      }
    });
    wx.navigateBack({
      
    })

  },





})