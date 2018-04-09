// pages/orderDetail/orderDetail.js
var app = getApp();

Page({
  data: {
    currentOrderNum: '',
    orderDetail: null,
    hasDetail: false,
    bookDetail: null,
    showFoot: 'hide',
    productList: [],
    bindPhone: '',
    storeId: '',
    storeName: '',
    storeAddress: '',
    storePhone: '',
    isBookOpmetory: true,
    isFromCart: false,
    customerGenger: '',
    customerName: '',
    customerPhoto: '',
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
    
    // 页面初始化 options为页面跳转所带来的参数
    // var that = this;
    // that.setData({ currentOrderNum: options.orderNum })

    // wx.request({
    //   url: app.HostURL + '/wechat/webapp/user/getOrderDetail',
    //   data: {
    //     sessionId: app.globalData.ipcApp.getSessionID(),
    //     orderNumber: this.data.currentOrderNum
    //   },
    //   method: 'POST',
    //   header: { 'content-type': 'application/json' },
    //   success: function (res) {
    //     console.log(res)
    //     that.setData({orderDetail: res.data.result})
    //   }
    // })
  }
})