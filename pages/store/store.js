// pages/store/store.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var demo = new QQMapWX({
  key: '7KFBZ-DM533-AJE3Q-YOEM3-ZLKOS-EGBBL'
});
var app = getApp();

Page({
  data: {
    storeList: null
  },
  onLoad: function () {
    var that = this;

    let options = { key: 'Hy9Krb6NIp8LGslMfXtuLCi89ThcuuAp5S8OST3PYCk=' };

    app.globalData.request.queryStoreList(options, function (data) {

      that.setData({ storeList: data.result.content });

      for (var i = 0; i < that.data.storeList.length; i++) {
        var object = that.data.storeList[i];
        demo.calculateDistance({
          to: [{
            latitude: object.latitude,
            longitude: object.longitude
          }],
          success: function (res) {
            var distance = res.result.elements[0].distance / 1000;
            object.distance = distance.toFixed(0);

            console.log(object.distance);

            that.setData({ storeList: that.data.storeList });
          }
        });
      }
    });
  },
  onSelectStore: function (event) {

  },

})