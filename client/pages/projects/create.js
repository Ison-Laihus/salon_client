// pages/projects/create.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    number_index: 0,
    progresses: [],
    progress_index: 0,
    project_name: '',
    project_describe: '',
    group_number: 0,
    group_number_now: 0,
    progress_name: '',
    group_describe: '',
    images: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '添加项目',
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.request({
      // url: 'http://salon.hiter-lab.cn:3000/data/progress',
      url: 'http://salon.hiter-lab.cn/salon/progress.php',
      method: 'GET',
      header: {
        'cookie': wx.getStorageSync("sessionid")
      },
      success: function(res) {
        var data = res.data;
        console.log(data);
        if (data.success & data.data.length > 0) {
          var arr = [];
          for (var i=0; i<data.data.length; i++) {
            arr.push(data.data[i]['progress']);
          }
          console.log(arr);
          that.setData({
            "progresses": arr,
            "progress_name": arr[0]
          });
        } else {
          wx.showToast({
            title: '获取项目进度定义失败',
            icon: 'warn',
            image: '../images/danger.png',
            duration: 3000
          });
        }
      },
      fail: function(res) {
        console.log(res);
      }
    })
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
  getProjectName: function(e) {
    this.setData({
      project_name: e.detail.value
    });
  },
  getProjectDescribe: function(e) {
    this.setData({
      project_describe: e.detail.value
    });
  }, 
  getPredictNumber: function(e) {
    console.log(e.detail.value);
    this.setData({
      group_number: e.detail.value
    });
  },
  getHaveNumber: function(e) {
    this.setData({
      group_number_now: e.detail.value
    });
  },
  getProgressNumber: function(e) {
    var index = e.detail.value;
    var progress_name = this.data.progresses[index]
    this.setData({
      progress_name: progress_name,
      progress_index: index
    });
  },
  getGroupDescribe: function(e) {
    this.setData({
      group_describe: e.detail.value
    });
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.images // 需要预览的图片http链接列表
    })
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
  submit: function(e) {
    let that = this;
    wx.request({
      // url: "http://salon.hiter-lab.cn:3000/projects",
      url: 'http://salon.hiter-lab.cn/salon/projects.php',
      header: {
        'cookie': wx.getStorageSync("sessionid"),
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      data: {
        "project_name": that.data.project_name,
        "project_describe": that.data.project_describe,
        "group_number": that.data.group_number,
        "group_number_now": that.data.group_number_now,
        "group_describe": that.data.group_describe,
        "progress_id": that.data.progress_index,
      },
      success: function(res) {
        var data = res.data;
        console.log(data);
        if ( data.success ) {

          let item_id = data.item_id;
          console.log(that.data.images);
          for (let i=0; i<that.data.images.length; i++) {
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
                'type': 'projects'
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
            title: '创建项目成功',
            icon: "success",
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
      fail: function(e) {
        wx.showToast({
          title: '创建项目失败 ',
          icon: 'warn',
          image: '../images/danger.png',
          duration: 3000
        });
      }
    });
  }
})