//index.js
//获取应用实例
const app = getApp()
const DB = wx.cloud.database().collection('edit');
var categories = app.globalData.categories

Page({
  data: {
    array: categories,
    category_index: 0,
    category: '所有',
    type_array: ['lost', 'found'],
    //图片路径
    tempFilePaths: null,
    //分类按钮
    showModalStatus: false,
    filep: [],
    //导航栏
    navbar: ['LOST', 'FOUND'],
    currentTab: 0,
    imageList: [],
    tvalue: '',
  },
  powerDrawer: function(e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
  },
  navbarTap: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx

    })
  },
  //单选框触发函数
  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)

  },
  //
  stateswitch: function(e) {

    this.setData({
      tvalue: '',
      imageList: [],
      category_index: 0,
    })
  },

  //事件处理函数
  bindViewTap: function() {

  },

  chooseImage: function() {
    var that = this
    wx.chooseImage({
      count: 3,
      success: function(res) {
        console.log('chooseimage.......')
        console.log(res)
        var tmpfile = res.tempFilePaths;
        console.log(tmpfile);
        that.setData({
          imageList: tmpfile,
          filep: tmpfile
        })
        console.log(that.data.imageList);
      }
    })
  },
  previewImage: function(e) {
    var current = e.target.dataset.src
    console.log('current')
    console.log(current)
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var index_val = this.data.array[e.detail.value]
    this.setData({
      category_index: e.detail.value,
      category: index_val
    })
    console.log('category_index:')
    console.log(this.data.category_index)
    console.log(this.data.category)
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value
    })
  },


  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    console.log(e)
    var that = this;
    var formData = e.detail.value;

    /*var user_id = wx.getStorageSync('user_id')*/
    var type_t = this.data.type_array[this.data.currentTab]
    var category = this.data.category
    var title = ''
    var msg = e.detail.value.input
    var imagesPaths = this.data.filep
    console.log("imageList..........")
    console.log(this.data)
    console.log(imagesPaths)
    //在此调用uploadAll接口
    this.uploadAll(type_t, category, title, msg, imagesPaths)

    // //跳转到主页
    // wx.switchTab({
    //   url: '../index/index',
    //   success: function (e) {
    //     var page = getCurrentPages().pop();
    //     if (page == undefined || page == null) return;
    //     setTimeout(function () {
    //       page.onLoad();
    //     }, 2000);  

    //   }
    // })  

  },

  //imagesPaths图片路径数组
  uploadAll: function(type_t, category, title, msg, imagesPaths) {
    var publish_id = null;
    let fileIDs = [];
    const promiseArr = []
    //只能一张张上传 遍历临时的图片数组
    for (let i = 0; i < imagesPaths.length; i++) {
      let filePath = imagesPaths[i]
      //在每次上传的时候，就往promiseArr里存一个promise，只有当所有的都返回结果时，才可以继续往下执行
      promiseArr.push(new Promise((reslove, reject) => {
        wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + '.png',
          filePath: filePath, // 文件路径
        }).then(res => {
          // get resource ID
          console.log("上传结果", res.fileID)
          fileIDs.push(res.fileID)
          reslove()
        }).catch(error => {
          console.log("上传失败", error)
        })
      }))
    }

    Promise.all(promiseArr).then(res => {
      DB.add({
        data: {
          type_t: type_t,
          category: category,
          msg: msg,
          fileIDs: fileIDs,
          nickName: app.globalData.userInfo.nickName,
          submission_time:new Date().getTime(),
          avatarUrl:app.globalData.userInfo.avatarUrl
        },
        success: function(res) {
          console.log('上传信息成功', res)
        }
      });

      wx.switchTab({
        url: '/pages/home/home',
        success: function(e) {
          var page = getCurrentPages().pop();
          if (page == undefined || page == null) return;
          setTimeout(function() {
            page.onLoad();
          }, 2000);
        },
        fail:function(res){
          console.log('回不去了',res);
        }
      })
    })
  },
  onShow: function() {

  },
})