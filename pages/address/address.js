// pages/person/address/address.js
var app = getApp();

Page({
  data: {
    addressList: []
  },

  onLoad: function (options) {
  },

  onShow: function () {
    var that = this;

    var list = new Array();

    for (var i = 0; i < 5; i++) {
      var productObj = new Object()
      list.push(productObj)
    }
    that.setData({ addressList: list })
  },

  onInsertNewAddress: function (e) {
    wx.navigateTo({
      url: '../editAddress/editAddress'
    })
  },
  editAddress: function(){
    wx.navigateTo({
      url: '../editAddress/editAddress'
    })
  }
})