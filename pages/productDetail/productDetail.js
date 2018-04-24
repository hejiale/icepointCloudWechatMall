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
    parameterPrice: null,
    cartNum: 1
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
    if (app.globalData.customer) {
      wx.navigateTo({
        url: '../bookOrder/bookOrder?isCart=0',
      })
    } else {
      wx.navigateTo({
        url: '../bindPhone/bindPhone',
      })
    }
  },
  onCart: function () {
    var that = this;

    if (app.globalData.customer) {
      that.setData({ showParameterView: 'show', parameterPrice: that.data.DetailObject.goods.goodsRetailPrice });
      that.queryParameterRequest();
    } else {
      wx.navigateTo({
        url: '../bindPhone/bindPhone',
      })
    }
  },
  onToCart: function () {
    if (app.globalData.customer) {
      wx.navigateTo({
        url: '../cart/cart',
      })
    } else {
      wx.navigateTo({
        url: '../bindPhone/bindPhone',
      })
    }
  },
  onSelectParameterToCart: function () {
    var that = this;

    if (that.data.parameterObject.specifications.length > 0) {
      if (that.data.selectParameters.length != that.data.parameterObject.specifications.length) {
        wx.showToast({
          title: '请先选择商品规格',
          icon: 'none'
        })
        return;
      }
    }

    var options = {
      count: that.data.cartNum,
      phoneNumber: app.globalData.customer.memberPhone,
      wechatAccount: app.globalData.weChatUser.weChatAccountId
    };

    if (that.data.parameterObject.specificationsId) {
      options.specificationsId = that.data.parameterObject.specificationsId;
    } else {
      options.goodsId = that.data.goodsId;
    }

    app.globalData.request.addShoppingCart(options, function (data) {
      that.setData({ showParameterView: 'hide', parameterObject: null, cartNum: 1 });
      that.data.selectParameters.splice(0, that.data.selectParameters.length);
      wx.showToast({
        title: '商品加入购物车成功!',
      })
    });
  },
  onReduceCart: function () {
    var that = this;
    that.data.cartNum -= 1;
    if (that.data.cartNum == 0) {
      that.data.cartNum = 1;
    }
    that.setData({ cartNum: that.data.cartNum });
  },
  onAddCart: function () {
    var that = this;
    that.data.cartNum += 1;
    that.setData({ cartNum: that.data.cartNum });
  },
  onDetail: function () {
    this.setData({ isSelectDetail: true });
  },
  onParameter: function () {
    this.setData({ isSelectDetail: false });
  },
  onCoverClick: function () {
    var that = this;
    that.setData({ showParameterView: 'hide', parameterObject: null, cartNum :1});
    that.data.selectParameters.splice(0, that.data.selectParameters.length);
  },
  //点击商品规格参数method
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
  //查询商品规格参数请求
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