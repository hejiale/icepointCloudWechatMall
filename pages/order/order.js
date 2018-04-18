// pages/person/order/order.js
var app = getApp();

Page({
  data: {
    orderList: []
  },
  onLoad: function (options) {
  },

  onOrderDetail: function (event) {
    var value = event.currentTarget.dataset.key;
    wx.navigateTo({
      url: '../orderDetail/orderDetail?orderNum=' + value.orderNumber
    })

  },
  onShow: function () {
    var that = this;

    var list = new Array();

    for (var i = 0; i < 3; i++) {
      var productObj = new Object()
    
      list.push(productObj)
    }
    that.setData({ orderList: list })
  }
})