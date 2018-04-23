//app.js
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
    if (that.globalData.userInfo) {
      typeof cb == "function" && cb(that.globalData.userInfo)
    }
    else {
      wx.getUserInfo({
        success: function (res) {
          console.log(res);
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  getSystemInfo: function (cb) {
    var that = this;
    if (that.globalData.systemInfo) {
      typeof cb == "function" && cb(that.globalData.systemInfo)
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
  getUserBindPhone: function (cb) {
    var that = this;
    var value = wx.getStorageSync(that.globalData.userBindPhoneKey);
    typeof cb == "function" && cb(value)
  },

  globalData: {
    userInfo: null,
    systemInfo: null,
    loginCode: null,
    request: request,
    MD5: MD5,
    companyId: 60,
    //本地保存商品搜索记录key
    historySearchWords: 'historySearchWordsKey',
    //本地保存用户绑定手机号
    userBindPhoneKey: 'userBindPhoneKey'
  }
})