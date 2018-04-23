// pages/person/person.js
var app = getApp();
Page({
  data: {
    userInfo: null,
    showLogin: 'hide',
    showPerson: 'hide',
    bindPhone: ''
  },
  onShow: function () {
    // 页面显示
    var that = this;

    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo,
      })
    })
  }
})