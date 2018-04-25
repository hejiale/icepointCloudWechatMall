//app.js
var request = require('utils/Request.js')
var MD5 = require('utils/md5.js')

App({
  onLaunch: function () {
    var that = this;

    wx.login({
      success: function (res) {
        that.globalData.loginCode = res.code;

        let options = { jsCode: res.code };

        that.globalData.request.login(options, function (data) {
          that.globalData.customer = data.weChatUserInfo.customer;
          that.globalData.weChatUser = data.weChatUserInfo.weChatUserKey;
          that.globalData.sessionId = data.sessionId;
        });
      }
    });
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
  globalData: {
    userInfo: null,
    systemInfo: null,
    loginCode: null,
    request: request,
    MD5: MD5,
    companyId: 60,
    customer: null,
    weChatUser: null,
    sessionId: null,
    //本地保存商品搜索记录key
    historySearchWords: 'historySearchWordsKey',
  }
})