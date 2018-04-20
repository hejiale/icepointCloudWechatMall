// pages/cart/cart.js
var app = getApp();

Page({
  data: {
    showContent: 'hide',
    allCartList: [],
    canEdit: false,
  },
  onLoad: function (options) {
  },
  onLogin: function () {
    wx.navigateTo({
      url: '../bindPhone/bindPhone'
    })
  },
  onShow: function () {

    var that = this;

    var list = new Array();

    for (var i = 0; i < 10; i++) {
      var productObj = new Object()
      list.push(productObj)
    }
    that.setData({ allCartList: list })
  },
  onTapEdit: function () {
    this.setData({
      canEdit: !this.data.canEdit
    })
  },
  onSelected: function (event) {
    
  },
  onTotalPrice: function () {
    
  },
  onCancel: function () {
    this.setData({
      canEdit: !this.data.canEdit
    })
  },
  onReduce: function (event) {
   
  },
  onCrease: function (event) {
    
  },
  onDelete: function () {
    
  },
  onBook: function () {
    wx.navigateTo({
      url: '../bookOrder/bookOrder?hasDetail=0&isCart=1'
    })
  }
})