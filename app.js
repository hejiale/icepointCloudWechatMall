//app.js
var ipcApp = require('utils/icepointcloud.js')
var request = require('utils/Request.js')
var MD5 = require('utils/md5.js')

App({
  onLaunch: function () {
    var that = this;

    wx.login({
      success: function (res) {
        that.globalData.loginCode = res.code;
      }
    })
  },

  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    }
    else {
      wx.getUserInfo({
        success: function (res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  getSystemInfo: function (cb) {
    var that = this;
    if (this.globalData.systemInfo) {
      typeof cb == "function" && cb(this.globalData.systemInfo)
    }
    else {
      wx.getSystemInfo({
        success: function (res) {
          that.globalData.systemInfo = res;
          typeof cb == "function" && cb(that.globalData.systemInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null,
    systemInfo: null,
    ipcApp: ipcApp,
    loginCode: null,
    request:request,
    MD5:MD5,
    companyId: 60,
    //本地保存商品搜索记录key
    historySearchWords: 'historySearchWords'
  }
})