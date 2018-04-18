// pages/bookOrder/bookOrder.js
var util = require('../../utils/md5.js')
var request = require('../../utils/Request.js')

var app = getApp();

Page({
  data: {
    productList: [],
    isShowMemberRights: 'hide',
    isExtractEmail: 'show',
    isExtractSelf: 'hide',
    isShowStore:'hide'
  },
  onLoad: function (options) {
    var that = this;

    var list = new Array();

    for (var i = 0; i < 5; i++) {
      var productObj = new Object()
      list.push(productObj)
    }
    that.setData({ productList: list })
  },
  onShow: function () {
    
  },
  
  onSelectAddress: function () {
    wx.navigateTo({
      url: '../address/address',
    })
  },
  onSelectStore: function () {
    wx.navigateTo({
      url: '../store/store',
    })
  },
  onCall: function () {
    wx.makePhoneCall({
      phoneNumber: '15216695605',
    })
  },
  offerOrder: function () {
    var ipcApp = app.globalData;

    let options = {
      orderNo: "201508334312121",
      price: 1,
      jsCode: ipcApp.loginCode,
      isService: false
    }

    request.payOrder(options, function (data) {
      console.log(data);
    })


    // wx.request({
    //   url: app.HostURL + '/api/wechat/pay/unifiedOrder',
    //   method: 'GET',
    //   data: {
    //     orderNo: "201508334312121",
    //     price: 1,
    //     jsCode: ipcApp.loginCode,
    //     isService: false
    //   },
    //   success: function (res) {
    //     console.log(res)

    //     var date = String(new Date().getTime()).substr(0, 10);

    //     var stringA = "appId=" + res.data.appid + "&nonceStr=" + res.data.nonce_str + "&package=prepay_id=" + res.data.prepay_id + "&signType=MD5" + "&timeStamp=" + date;

    //     var stringSignTemp = stringA + "&key=5eef8283dc4c421484229a59449e11c2";

    //     console.log(stringSignTemp);

    //     var sign = util.hexMD5(stringSignTemp).toUpperCase();

    //     console.log(sign);

    //     wx.requestPayment({
    //       timeStamp: date,
    //       'nonceStr': res.data.nonce_str,
    //       'package': "prepay_id=" + res.data.prepay_id,
    //       'signType': 'MD5',
    //       'paySign': sign,
    //       'success': function (res) {
    //         console.log(res)
    //       },
    //       'fail': function (res) {
    //         console.log(res)
    //       },
    //       'complete': function (res) {
    //         console.log(res)
    //       }
    //     })
    //   }, fail: function (res) {
    //     console.log(res)
    //   }
    // })
  },

  onShowMemberRightsView: function () {
    var that = this;

    wx.showActionSheet({
      itemList: ['会员折扣', '储值折扣', '积分'],
      itemColor: '#63a0d4',
      success: function (res) {
        that.setData({ isShowMemberRights: 'show' });
      },
      fail: function (res) {
    
      }
    })
  },
  onCoverClicked: function (e) {
    this.setData({ isShowMemberRights: 'hide' });
  },
  onExtractEmail: function () {
    this.setData({ isExtractEmail: 'hide' });
    this.setData({ isExtractSelf: 'show' });
    this.setData({ isShowStore: '' });
  },
  onExtractSelf: function () {
    this.setData({ isExtractSelf: 'hide' });
    this.setData({ isExtractEmail: 'show' });
    this.setData({ isShowStore: 'hide' });
  }
})