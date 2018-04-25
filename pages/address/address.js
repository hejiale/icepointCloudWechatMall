// pages/person/address/address.js
var app = getApp();

Page({
  data: {
    addressList: null
  },

  onShow: function () {
    var that = this;
    that.queryAddressList();
  },
  onSetDefault: function (e) {
    var that = this;
    var item = e.currentTarget.dataset.key;

    app.globalData.request.setDefaultAddress({ userAddressId: item.id }, function (data) {
      that.queryAddressList();
    });
  },
  editAddress: function (e) {
    var that = this;
    var item = e.currentTarget.dataset.key;

    wx.navigateTo({
      url: '../editAddress/editAddress?id='+item.id
    })
  },
  onDeleteAddress: function (e) {
    var that = this;
    var item = e.currentTarget.dataset.key;

    app.globalData.request.deleteAddress({ userAddressId: item.id }, function (data) {
      that.queryAddressList();
    });
  },
  onInsertNewAddress: function (e) {
    wx.navigateTo({
      url: '../editAddress/editAddress'
    })
  },
  queryAddressList: function () {
    var that = this;

    let options = {
      sessionId: app.globalData.sessionId,
      data: {
        pageNo: 1,
        maxPageSize: 100
      }
    };

    app.globalData.request.queryAddressList(options, function (data) {
      that.setData({ addressList: data.result.resultList });
    });
  }
})