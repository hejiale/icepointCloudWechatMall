// pages/person/address/address.js
var app = getApp();

Page({
  data: {
    addressList: []
  },

  onLoad: function (options) {
  },

  onShow: function () {
    var that = this;

    var list = new Array();

    for (var i = 0; i < 5; i++) {
      var productObj = new Object()
      list.push(productObj)
    }
    that.setData({ addressList: list })

    // 页面显示
    // var that = this;
    // wx.request({
    //   url: app.HostURL + '/wechat/webapp/user/listAddress',
    //   data: {
    //     sessionId: app.globalData.ipcApp.getSessionID(),
    //     pageNo: '1',
    //     maxPageSize: '10000'
    //   },
    //   method: 'POST',
    //   header: { 'content-type': 'application/json' },
    //   success: function (res) {
    //     console.log(res)
    //     that.setData({ addressList: res.data.result.resultList })
    //   }
    // })
  },
  // onTapAddressDetail: function (event) {
  //   var value = event.currentTarget.dataset.key;
  //   wx.navigateTo({
  //     url: '../editAddress/editAddress?id=' + value.id
  //   })
  // },
  onInsertNewAddress: function (e) {
    wx.navigateTo({
      url: '../editAddress/editAddress'
    })
  },
  editAddress: function(){
    wx.navigateTo({
      url: '../editAddress/editAddress'
    })
  }
})