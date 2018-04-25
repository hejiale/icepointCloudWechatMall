// pages/person/address/address.js
var app = getApp();

Page({
  data: {
    addressList: null
  },

  onLoad: function (options) {
  },

  onShow: function () {
    var that = this;

    let options = {
      sessionId: app.globalData.sessionId,
      pagerSearchReq: {
        pageNo: 1,
        maxPageSize: 100
      }
    };

    app.globalData.request.queryAddressList(options, function (data) {
      that.setData({ addressList: data});
    });

  },

  onInsertNewAddress: function (e) {
    wx.navigateTo({
      url: '../editAddress/editAddress'
    })
  },
  editAddress: function () {
    wx.navigateTo({
      url: '../editAddress/editAddress'
    })
  }
})