// pages/productDetail/productDetail.js

var WxParse = require('../../wxParse/wxParse.js');
var app = getApp();

Page({
  data: {
    DetailObject: null,
    isSelectDetail: true,
    showParameterView: 'hide',
    goodsId: null,
    deviceHeight: 0,
    parameterObject: null,
    selectParameters: [],
    parameterPrice: null
  },
  onLoad: function (options) {
    var that = this;
    that.setData({ goodsId: options.id });

    app.globalData.request.queryProductDetail(options.id, function (data) {
      WxParse.wxParse('article', 'html', data.goods.goodsTextDetails, that, 5);
      that.setData({ DetailObject: data });
    })

    app.getSystemInfo(function (systemInfo) {
      that.setData({
        deviceHeight: systemInfo.windowHeight
      })
    })
  },
  onBook: function (event) {
    wx.navigateTo({
      url: '../bookOrder/bookOrder',
    })
    // app.getUserBindPhone(function (bindPhone) {
    //   if (bindPhone.length) {
    //     wx.navigateTo({
    //       url: '../bookOrder/bookOrder',
    //     })
    //   } else {
    //     wx.navigateTo({
    //       url: '../bindPhone/bindPhone',
    //     })
    //   }
    // })
  },
  onCart: function () {
    var that = this;

    app.getUserBindPhone(function (bindPhone) {
      if (bindPhone.length) {
        that.setData({ showParameterView: 'show', parameterPrice: that.data.DetailObject.goods.goodsRetailPrice });
        that.queryParameterRequest();
      } else {
        wx.navigateTo({
          url: '../bindPhone/bindPhone',
        })
      }
    })
  },
  onToCart: function () {
    app.getUserBindPhone(function (bindPhone) {
      if (bindPhone.length) {
        wx.navigateTo({
          url: '../cart/cart',
        })
      } else {
        wx.navigateTo({
          url: '../bindPhone/bindPhone',
        })
      }
    })
  },
  onDetail: function () {
    this.setData({ isSelectDetail: true });
  },
  onParameter: function () {
    this.setData({ isSelectDetail: false });
  },
  onCoverClick: function () {
    var that = this;
    that.setData({ showParameterView: 'hide', parameterObject: null });
    that.data.selectParameters.splice(0, that.data.selectParameters.length);
  },
  onSelectParameter: function (e) {
    var that = this;
    var item = e.currentTarget.dataset.key;

    if (item.enableSelect) {
      if (!item.selected) {
        for (var i = 0; i < that.data.selectParameters.length; i++) {
          var selectItem = that.data.selectParameters[i];
          if (selectItem.name == item.name) {
            that.data.selectParameters.splice(i, 1);
          }
        }

        if (that.data.selectParameters.indexOf(item) == -1) {
          that.data.selectParameters.push(item);
        }
      } else {
        for (var i = 0; i < that.data.selectParameters.length; i++) {
          var selectItem = that.data.selectParameters[i];
          if (selectItem.value == item.value && selectItem.name == item.name) {
            that.data.selectParameters.splice(i, 1);
          }
        }
      }
      that.queryParameterRequest();
    }
  },
  queryParameterRequest: function () {
    var that = this;

    var options = new Object();
    options.goodsId = that.data.goodsId;

    if (that.data.selectParameters.length > 0) {
      var array = new Array();

      for (var i = 0; i < that.data.selectParameters.length; i++) {
        var parameter = that.data.selectParameters[i];
        array.push({ specificationName: parameter.name, specificationValue: parameter.value });
      }
      options.specificationsModels = array;
    }

    wx.showLoading({});

    app.globalData.request.queryProductDetailParameter(JSON.stringify(options), function (data) {

      if (data.price) {
        that.setData({ parameterPrice: data.price });
      } else {
        that.setData({ parameterPrice: that.data.DetailObject.goods.goodsRetailPrice });
      }

      for (var z = 0; z < that.data.selectParameters.length; z++) {
        var selectParameter = that.data.selectParameters[z];
        for (var i = 0; i < data.specifications.length; i++) {
          var specification = data.specifications[i];
          for (var j = 0; j < specification.values.length; j++) {
            var value = specification.values[j];
            if (selectParameter.name == value.name && selectParameter.value == value.value) {
              value.selected = true;
            }
          }
        }
      }
      that.setData({ parameterObject: data });
      wx.hideLoading();
    })
  }
})