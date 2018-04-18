// pages/store/store.js
var app = getApp();

Page({
  data: {
    storeList: [],
    showLogin: 'hide',
    showStore: 'hide'
  },
  onShow: function () {
    var that = this;

    var list = new Array();

    for (var i = 0; i < 5; i++) {
      var productObj = new Object()
      list.push(productObj)
    }
    that.setData({ storeList: list })
  },
  
  onSelectStore: function (event) {
    var value = event.currentTarget.dataset.key;
    console.log(value)
    wx.setStorage({
      key: 'store',
      data: value,
      complete: function () {
        wx.navigateBack({
          delta: 1
        })
      }
    })
  }
})