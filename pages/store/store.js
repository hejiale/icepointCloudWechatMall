// pages/store/store.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var map = new QQMapWX({
  key: '7KFBZ-DM533-AJE3Q-YOEM3-ZLKOS-EGBBL'
});
var app = getApp();

Page({
  data: {
    storeList: null,
    keyword: ''
  },
  onLoad: function () {
    var that = this;
    that.queryStoreList();
  },
  onSelectStore: function (event) {

  },
  onSearchInput: function (event) {
    var that = this;
    that.setData({ keyword: event.detail.value, storeList: null });
    that.queryStoreList();
  },
  //查询门店列表
  queryStoreList: function () {
    var that = this;

    let options = {
      key: 'Hy9Krb6NIp8LGslMfXtuLCi89ThcuuAp5S8OST3PYCk=',
      keyword: that.data.keyword
    };

    wx.showLoading({})

    app.globalData.request.queryStoreList(options, function (data) {
      that.calculateDistance(data.result.content);
    });
  },
  //计算店铺距离
  calculateDistance: function (stores) {
    var that = this;

    for (var i = 0; i < stores.length; i++) {
      (function (i) {
        var store = stores[i];
        map.calculateDistance({
          to: [{
            latitude: store.latitude,
            longitude: store.longitude
          }],
          complete: function (res) {
            var longDistance = res.result.elements[0].distance;

            if (longDistance >= 1000) {
              var distance = (longDistance / 1000).toFixed(0);
              store.distance = distance + '公里';
            } else {
              store.distance = distance + '米';
            }
            that.setData({ storeList: stores });

            if (i == stores.length - 1) {
              wx.hideLoading();
            }
          }
        })
      }(i))
    }
  }
})

