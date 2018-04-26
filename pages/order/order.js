// pages/person/order/order.js
var app = getApp();

Page({
  data: {
    orderList: []
  },
  onLoad: function (options) {

  },

  onShow: function () {
    var that = this;

    let options = {
      sessionId: app.globalData.sessionId,
      pageNumber: 1,
      pageSize:100
    };

    app.globalData.request.queryOrderList(options, function (data) {
      
    });
  },

  onOrderDetail: function (event) {
    var value = event.currentTarget.dataset.key;
    wx.navigateTo({
      url: '../orderDetail/orderDetail?orderNum=' + value.orderNumber
    })

  }
  
})