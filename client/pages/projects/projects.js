// pages/projects/projects.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    success: true,
    listData: [
      {
        image_url: "../images/views2.jpg",
        project_name: "name 1",
        user: "lyk",
        process_name: "step 2",
        date: "2018-07-13",
        group_number: 5,
        group_number_now: 2
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.request({
      url: "http://salon.hiter-lab.cn/salon/projects.php",
      method: "GET",
      header: {
        'cookie': wx.getStorageSync("sessionid")
      },
      success: function(res) {
        var data = res.data;
        if ( data.success && data.data.length ) {
          that.setData({
            "success": data.success,
            "listData": data.data
          })
        } else {
          that.setData({
            "success": false
          })
        }
      },
      error: function() {

      }
    });
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
  seeDetail: function (e) {
    var id = e.currentTarget.id;
    wx.request({
      url: 'http://salon.hiter-lab.cn/salon/page_view.php',
      method: 'POST',
      header: {
        'cookie': wx.getStorageSync("sessionid"),
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        'id': id,
        'type': 'projects'
      },
      success: function(res) {
        var data = res.data;
        if ( !data.success ) {
          console.log(data.err);
        }
      },
      fail: function(e) {
        console.log('error');
      }
    });
    wx.setStorage({
      key: 'project_id',
      data: e.currentTarget.id
    });
    wx.navigateTo({
      url: '/pages/projects/details',
    })
  }
})