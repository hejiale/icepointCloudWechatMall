// pages/productList/productList.js
var app = getApp()

Page({
  data: {
    templateObject: null
  },
  onLoad: function(){
    var that = this;
    that.setData({ templateObject: app.globalData.templateObject})
  },
  onGoodsDetail: function (e) {
    var that = this;
    var item = e.currentTarget.dataset.key;

    wx.navigateTo({
      url: '../productDetail/productDetail?id=' + item.goodsId,
    })
  },
})