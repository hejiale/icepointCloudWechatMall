// pages/orderDetail/orderDetail.js
var app = getApp();

Page({
  data: {
    orderDetail: null,
    showFoot: 'hide',
    productList: [],
    isShowOpmetory: 'hide',
    defaultOpmetory: null,
    isShowMemberRights: 'hide'
  },
  onLoad: function (options) {
    var that = this;

    var list = new Array();

    for (var i = 0; i < 5; i++) {
      var productObj = new Object()
      list.push(productObj)
    }
    that.setData({ productList: list })
  }
})