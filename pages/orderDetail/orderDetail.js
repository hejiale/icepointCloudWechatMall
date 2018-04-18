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
  }
})