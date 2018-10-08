// pages/projects/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // is_group_member: true, // 如果是项目组成，可以查看其他成员信息
    // project_name: '基于碳的海水过滤系统',
    // project_describe: '我们都知道，碳有一种特性，就是能够过滤水中的杂质。由此引发了我们的想象，我们能否用这种特性来扩大话，将海水过滤为淡水。我们希望能够开发出这种碳结构类似性物质，帮我们做到这一点。',
    // thumb_number: 100,
    // page_views: 1000,
    // group_number: 6,
    // group_number_now: 1,
    // group_describe: '我希望我们的团队能够有6人，分别是会写文档的1人，会计算机的1人，会化学的3人，会法律的1人（有专利申请经验的优先）',
    // date: '2018-07-12',
    // progress: '组队中...',
    // project_owner: 'lyk',
    // project_owner_skills: "机器学习，深度学习",
    // is_group_member: true, // 如果是项目组成，可以查看其他成员信息
    project_name: '',
    project_describe: '',
    thumb_number: 0,
    page_views: 0,
    group_number: 0,
    group_number_now: 0,
    group_describe: '',
    date: '',
    progress: '',
    project_owner: '',
    project_owner_skills: '',
    is_group_member: false, // 如果是项目成员，可以查看其他成员信息
    image_url: []
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
    var project_id = wx.getStorageSync('project_id');
    wx.request({
      url: "http://salon.hiter-lab.cn/salon/one_project.php",
      method: "POST",
      header: {
        'cookie': wx.getStorageSync("sessionid"),
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        'project_id': project_id
      },
      success: function (res) {
        var data = res.data;
        console.log(data);
        if (data.success && data.data.length) {
          that.setData({
            project_name: data.data[0].project_name,
            project_describe: data.data[0].project_describe,
            thumb_number: data.data[0].thumb_number,
            page_views: data.data[0].page_views,
            group_number: data.data[0].group_number,
            group_number_now: data.data[0].group_number_now,
            group_describe: data.data[0].group_describe,
            date: data.data[0].date,
            progress: data.data[0].progress,
            // project_owner: '',
            // project_owner_skills: '',
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
      error: function () {

      }
    });
    // 获取图片
    wx.request({
      url: "http://salon.hiter-lab.cn/salon/pictures.php",
      method: "POST",
      header: {
        'cookie': wx.getStorageSync("sessionid"),
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        'id': project_id,
        'type': 'projects'
      },
      success: function (res) {
        var data = res.data;
        console.log(data);
        if (data.success && data.data.length) {
          var image_url = [];
          for ( var i =0; i<data.data.length; i++ ) {
            image_url.push(data.data[i]['url']);
          }
          console.log(image_url);
          that.setData({
            image_url: image_url
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
      error: function () {

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
  
  }
})