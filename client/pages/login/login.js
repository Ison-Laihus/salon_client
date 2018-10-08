

Page({
  data: {
    username: '',
    password: ''
  },
  onLoad: function () {

  },
  password: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  username: function (e) {
    this.setData({
      username: e.detail.value
    })
  },
  login: function (e) {
    //登录
    var that = this;

    console.log(this.data);

    wx.request({
      url: 'http://salon.hiter-lab.cn/salon/login.php',
      // url: 'http://salon.hiter-lab.cn:3000/login',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        'username': that.data.username,
        'password': that.data.password
      },
      success: function (res) {
        var data = res.data;
        if ( data.success ) {
          wx.setStorageSync("sessionid", res.header["Set-Cookie"]);
          
          that.redirect();
        } else {
          console.log(data.err)
        }
      }
    })
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  redirect: function (e) {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  }
})
