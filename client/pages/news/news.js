// pages/news/news.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    success: true,
    listData: [
      {
        id: 1,
        image_url: "../images/views1.jpg",
        title: "标题1",
        content: "新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容新闻内容",
        date: "2018-07-13",
        page_views: 5,
        thumb_number: 2
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '新闻列表',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.request({
      url: 'http://salon.hiter-lab.cn/salon/news.php',
      method: 'GET',
      header: {
        'cookie': wx.getStorageSync("sessionid")
      },
      success: function(res) {
        var data = res.data;
        if ( data.success && data.data.length ) {
          that.setData({
            success: data.success,
            listData: data.data
          });
        } else {
          that.setData({
            success: false
          });
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
          title: '获取新闻数据失败',
          icon: 'warn',
          image: '../images/danger.png',
          duration: 3000
        });
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
        'type': 'news'
      },
      success: function (res) {
        var data = res.data;
        if (!data.success) {
          console.log(data.err);
        }
      },
      fail: function (e) {
        console.log('error');
      }
    });
    wx.setStorage({
      key: 'news_id',
      data: e.currentTarget.id
    });
    wx.navigateTo({
      url: '/pages/news/details',
    })
  }
})