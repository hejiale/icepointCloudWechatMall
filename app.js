//app.js
var request = require('utils/Request.js')
var MD5 = require('utils/md5.js')

App({
  onLaunch: function () {
    var that = this

    that.getSystemInfo(function (systemInfo) {
      that.globalData.singleLayoutWidth = ((systemInfo.windowWidth * 0.8 * 9) / 16);
      that.globalData.doubleLayoutWidth = ((systemInfo.windowWidth * 0.5 * 0.8 * 9) / 16);
    })
  },
  //获取微信用户信息
  getUserInfo: function (cb) {
    var that = this
    if (that.globalData.userInfo) {
      typeof cb == "function" && cb(that.globalData.userInfo)
    } else {
      wx.getUserInfo({
        success: function (res) {
          console.log(res);
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        },
        fail: function (res) {
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  //获取设备信息
  getSystemInfo: function (cb) {
    var that = this;
    if (that.globalData.systemInfo) {
      typeof cb == "function" && cb(that.globalData.systemInfo)
    } else {
      wx.getSystemInfo({
        success: function (res) {
          that.globalData.systemInfo = res;
          typeof cb == "function" && cb(that.globalData.systemInfo)
        }
      })
    }
  },
  //用户登录
  userLogin: function (cb) {
    var that = this;

    let appId = "wxb6c27db2d85fd508";//(线上商城测试公众号)
    // let appId = "wx06e40d400ac63b20";
    // let appId = "wx8cb86a24040f0da8";

    wx.login({
      success: function (res) {
        console.log(res);
        let options = {
          jsCode: res.code,
          appid: appId,//公众号id 
          webappId: 'wx59f8055b3b0422a4',//小程序id
          webappSecret: '461d1eb1041cb22e4bd6a9b9f6ce9c34'//小程序密钥
        };

        that.globalData.request.login(options, function (data) {
          that.globalData.customer = data.result.weChatUserInfo.customer;
          that.globalData.weChatUser = data.result.weChatUserInfo.weChatUserKey;
          that.globalData.weChatAccountObject = data.result.weChatAccountObject;
          that.globalData.request.setSessionId(data.result.sessionId);
          typeof cb == "function" && cb();
        });
      }
    });
  },
  //获取公司信息
  getCompanyInfo: function (cb) {
    var that = this;

    let appId = "wxb6c27db2d85fd508";//(线上商城测试公众号)
    // let appId = "wx06e40d400ac63b20";
    // let appId = "wx8cb86a24040f0da8";

    let options = {
      appid: appId,//公众号id 
    };

    that.globalData.request.getCompanyInfo(options, function (data) {
      that.globalData.belongCompany = data.result;
      typeof cb == "function" && cb();
    });
  },
  globalData: {
    //微信登录用户信息
    userInfo: null,
    //设备信息
    systemInfo: null,
    request: request,
    MD5: MD5,
    //公司id
    belongCompany: null,
    //登录用户信息
    customer: null,
    weChatUser: null,
    weChatAccountObject: null,
    //本地保存商品搜索记录key
    historySearchWords: 'historySearchWordsKey',
    //下单商品集合
    orderProducts: null,
    //专场详情object
    templateObject: null,
    //商品双排 单排高度
    singleLayoutWidth: 0,
    doubleLayoutWidth: 0
  }
})