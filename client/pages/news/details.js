// pages/news/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // id: 0,
    // title: '新闻第一篇',
    // content: '欢迎大家来到沙龙微信小程序，欢迎大家来到沙龙微信小程序，欢迎大家来到沙龙微信小程序，欢迎大家来到沙龙微信小程序，欢迎大家来到沙龙微信小程序，欢迎大家来到沙龙微信小程序，欢迎大家来到沙龙微信小程序，欢迎大家来到沙龙微信小程序，欢迎大家来到沙龙微信小程序。',
    // image_url: '../images/views1.jpg',
    // page_views: 100,
    // thumb_number: 10,
    // date: '2018-07-12'
    id: 0,
    title: '',
    content: '',
    image_url: '',
    page_views: 0,
    thumb_number: 0,
    date: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取上个页面缓存的id数据
    wx.getStorage({
      key: 'news_id',
      success: function(res) {
        this.setData({
          id: res.data
        });
      },
      fail: function() {
        wx.showToast({
          title: '获取上个页面存储的id失败',
          icon: 'warn',
          image: '../images/danger.png',
          duration: 3000
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    // 设置页面标题
    wx.setNavigationBarTitle({
      title: '新闻',
    });
    var news_id = wx.getStorageSync('news_id');
    // 获取新闻数据
    wx.request({
      url: "http://salon.hiter-lab.cn/salon/one_news.php",
      method: 'POST',
      header: {
        'cookie': wx.getStorageSync("sessionid"),
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        'news_id': news_id
      },
      success: function(res) {
        var data = res.data;
        if ( data.success ) {
          that.setData({
            title: data.data[0].title,
            content: data.data[0].content,
            page_views: data.data[0].page_views,
            thumb_number: data.data[0].thumb_number,
            date: data.data[0].date,
            image_url: data.data[0].image_url
          });
        } else {
          wx.showToast({
            title: '获取新闻数据失败',
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
  addThumb: function(e) {
    var that = this;
    wx.request({
      url: '/thumb',
      method: 'POST',
      data: {
        id: that.data.id,
      },
      success: function(data) {
        if ( data.success ) {
          that.setData({
            'thumb_number': that.data.thumb_number + 1
          });
          wx.showToast({
            title: '点赞成功',
            icon: 'success',
            duration: 3000
          });
        } else {
          wx.showToast({
            title: '点赞失败',
            icon: 'warn',
            image: '../images/danger.png',
            duration: 3000
          });
        }
      },
      fail: function() {
        wx.showToast({
          title: '点赞失败',
          icon: 'warn',
          image: '../images/danger.png',
          duration: 3000
        });
      }
    });
  }
})