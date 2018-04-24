// pages/home/home.js
var app = getApp()

Page({
  data: {
    deviceWidth: 0,
    deviceHeight: 0,
    classItemList: [],
    classList: [
      '精选',
      '送女票',
      '海淘',
      '创意生活',
      '送基友',
      '送爸妈',
      '设计感',
      '文艺风',
    ],
    isShowClassView: 'hide',
    isShowProductListView: 'hide',
    productList: []
  },
  onLoad: function (options) {
    var that = this;
    app.getSystemInfo(function (systemInfo) {
      var winWidth = systemInfo.windowWidth;
      var winHeight = systemInfo.windowHeight;
      that.setData({
        deviceWidth: winWidth, deviceHeight: winHeight
      })
    })
  },
  onShow: function () {
    var that = this;

    var list = new Array();

    for (var i = 0; i < 10; i++) {
      var productObj = new Object()
      list.push(productObj)
    }
    that.setData({ classItemList: list })
    that.setData({ productList: list })
  },
  onShoppingCart: function () {
    wx.navigateTo({
      url: '../store/store',
    })
    // if (app.globalData.customer) {
    //   wx.navigateTo({
    //     url: '../cart/cart',
    //   })
    // } else {
    //   wx.navigateTo({
    //     url: '../bindPhone/bindPhone',
    //   })
    // }
  },
  onSearchProduct: function () {
    wx.navigateTo({
      url: '../searchPage/searchPage',
    })
  },
  onShowClassView: function () {
    this.setData({ isShowClassView: 'show' });
  },
  onCloseClassCover: function () {
    this.setData({ isShowClassView: 'hide' });
  },
  onClassItemClicked: function () {
    this.setData({ isShowProductListView: 'show' });
  }
})