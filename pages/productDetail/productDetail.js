// pages/productDetail/productDetail.js

var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();

Page({
  data: {
    DetailObject: null,
    isSelectDetail: true
  },
  onLoad: function (options) {
    var that = this;

    app.globalData.request.queryProductDetail(options.id, function (data) {
      WxParse.wxParse('article', 'html', data.goods.goodsTextDetails, that, 5);
      that.setData({ DetailObject: data });
    })
  },
  onBook: function (event) {
    wx.navigateTo({
      url: '../bookOrder/bookOrder'
    })
  },
  onCart: function () {

  },
  onToCart: function () {
    wx.navigateTo({
      url: '../cart/cart',
    })
  },
  onDetail: function () {
    this.setData({ isSelectDetail: true });
  },
  onParameter: function () {
    this.setData({ isSelectDetail: false });
  }
})