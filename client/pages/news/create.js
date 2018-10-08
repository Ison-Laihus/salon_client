// pages/news/create.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    content: '',
    images: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '添加新闻',
    });
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
  
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          images: that.data.images.concat(res.tempFilePaths)
        });
      }
    });
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.images // 需要预览的图片http链接列表
    })
  },
  getTitle: function(e) {
    this.setData({
      title: e.detail.value
    });
  },
  getContent: function(e) {
    this.setData({
      content: e.detail.value
    });    
  },
  submit: function(e) {
    var that = this;
    wx.request({
      url: "http://salon.hiter-lab.cn/salon/news.php",
      method: "POST",
      header: {
        'cookie': wx.getStorageSync("sessionid"),
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        title: that.data.title,
        content: that.data.content,
      },
      success: function(res) {
        var data = res.data;
        if (data.success) {

          let item_id = data.item_id;
          
          for (let i = 0; i < that.data.images.length; i++) {
            wx.uploadFile({
              // url: 'http://salon.hiter-lab.cn:3000/upload',
              url: 'http://salon.hiter-lab.cn/salon/upload.php',
              header: {
                'cookie': wx.getStorageSync("sessionid")
              },
              filePath: that.data.images[i],
              name: 'image',
              formData: {
                'item_id': item_id,
                'type': 'news'
              },
              success: function (res) {
                var data = res.data;
                console.log(data);
                console.log(res);
              },
              fail: function (res) {
                console.log(res);
              }
            });
          }

          wx.showToast({
            title: '创建成功',
            icon: 'success',
            duration: 3000
          });
        } else {
          wx.showToast({
            title: data.err,
            icon: 'warn',
            image: '../images/danger.png',
            duration: 3000
          });
        }
      },
      fail: function() {
        wx.showToast({
          title: '创建新闻失败',
          icon: 'warn',
          image: '../images/danger.png',
          duration: 3000
        });
      }
    });
  }
})