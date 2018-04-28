// pages/person/address/address.js
var app = getApp();

Page({
  data: {
    addressList: null,
    orderSelectAddressId:null
  },

  onLoad: function (options){
    var that = this;
    that.setData({ orderSelectAddressId: options.id});
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

    if (that.data.orderSelectAddressId == item.id){
      wx.showToast({
        title: '当前选中的地址不可删除',
        icon:'none'
      })
      return;
    }

    app.globalData.request.deleteAddress({ userAddressId: item.id }, function (data) {
      that.queryAddressList();
    });
  },
  onInsertNewAddress: function (e) {
    wx.navigateTo({
      url: '../editAddress/editAddress'
    })
  },
  onChooseAddress: function(e){
    var that = this;
    var item = e.currentTarget.dataset.key;

    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2]  //上一个页面

    prevPage.setData({
      selectAddressId: item.id
    })
    wx.navigateBack()
  },
  queryAddressList: function () {
    var that = this;

    let options = {
      pageNo: 1,
      maxPageSize: 100
    };

    wx.showLoading({});

    app.globalData.request.queryAddressList(options, function (data) {
      that.setData({ addressList: data.result.resultList });
      wx.hideLoading();
    });
  }
})