var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var map = new QQMapWX({
  key: '7KFBZ-DM533-AJE3Q-YOEM3-ZLKOS-EGBBL'
});
var app = getApp();

Page({
  data: {
    productList: [],
    isShowMemberRights: 'hide',
    isExtractEmail: 'show',
    isExtractSelf: 'hide',
    //自提或邮寄标签判定是否选择地址选项
    isShowStore: '',
    currentAddress: null,
    selectAddressId: null,
    totalPrice: 0,
    shouldPayPrice: 0,
    memberInfo: null,
    discountPrice: 0,
    balancePrice: 0,
    pointPrice: 0,
    isInputPoint: false,
    //当前输入折扣抵扣金额
    inputDiscountValue: 0,
    inputValue: 0,
    useBalance: 0,
    usePoint: 0,
    isFromCart: false,
    currentStore: null,
    totalStore: 0
  },
  onLoad: function (options) {
    var that = this;
    that.setData({ isFromCart: options.isFromCart });

    wx.showLoading();
    //获取会员信息
    app.globalData.request.getMemberInfo(function (data) {
      that.setData({ memberInfo: data.result });
      //处理商品数据
      that.setData({ productList: app.globalData.orderProducts });
      that.getCartTotalPrice();
    });

    //获取客户默认地址
    app.globalData.request.getDefaultAddress(function (data) {
      that.setData({ currentAddress: data.result, selectAddressId: data.result.id });
    });

    //获取门店
    that.queryStoreList();
  },
  onShow: function () {
    var that = this;

    if (that.data.selectAddressId) {
      app.globalData.request.getDetailAddress({ userAddressId: that.data.selectAddressId }, function (data) {
        that.setData({ currentAddress: data.result });
      });
    }
  },
  onSelectAddress: function () {
    var that = this;

    if (that.data.currentAddress != null) {
      wx.navigateTo({
        url: '../address/address?id=' + that.data.currentAddress.id,
      })
    } else {
      wx.navigateTo({
        url: '../address/address',
      })
    }
  },
  onSelectStore: function () {
    wx.navigateTo({
      url: '../store/store',
    })
  },
  onCall: function () {
    var that = this;

    wx.makePhoneCall({
      phoneNumber: that.data.currentStore.phone,
    })
  },
  //下单
  offerOrder: function () {
    var that = this;

    if (that.data.selectAddressId == null) {
      wx.showToast({
        title: '请选择收货地址!',
        icon: 'none'
      })
      return;
    }

    var orderParameter = {
      order: {
        pickUpGoodsType: "PICK_UP_IN_A_STORE",
        netPointId: that.data.currentStore.id,
        // netPointId: 2,
        addressId: that.data.selectAddressId,
        amountPayable: parseFloat(that.data.shouldPayPrice).toFixed(2),
        discount: that.data.memberInfo.mallCustomer.discount,
        discountPrice: parseFloat(that.data.discountPrice).toFixed(2),
        integral: that.data.usePoint,
        integralPrice: that.data.pointPrice,
        balance: parseFloat(that.data.useBalance).toFixed(2),
        balancePrice: parseFloat(that.data.balancePrice).toFixed(2)
      }
    };

    var products = [];
    var carts = [];

    for (var i = 0; i < that.data.productList.length; i++) {
      var item = that.data.productList[i];
      if (item.specifications != null) {
        products.push({
          specificationsId: item.specifications.id,
          count: item.shoppingCart.count
        });
      } else {
        products.push({
          goodsId: item.goods.goodsId,
          count: item.shoppingCart.count
        });
      }
      if (item.shoppingCart.cartId) {
        carts.push(item.shoppingCart.cartId);
      }
    }
    orderParameter.goodsOrders = products;

    console.log(orderParameter);

    wx.showLoading({
      title: '正在提交订单...',
    })
    app.globalData.request.payOrder(orderParameter, function (data) {
      if (data.retCode >= 306 && data.retCode <= 308) {
        wx.showToast({
          title: data.retMsg,
          icon: "none"
        })
      } else {
        if (that.data.isFromCart == 1) {
          app.globalData.request.deleteCart({ cartIds: carts.join(',') }, function (data) {
            wx.hideLoading();

            wx.showModal({
              title: '提示',
              content: '订单提交成功!',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  wx.navigateBack();
                }
              }
            })
          });
        } else {
          wx.hideLoading();

          wx.showModal({
            title: '提示',
            content: '订单提交成功!',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack();
              }
            }
          })
        }
      }
    });
  },
  onShowInputBalance: function () {
    var that = this;
    that.setData({ isShowMemberRights: 'show', isInputPoint: false, inputDiscountValue: that.data.balancePrice, inputValue: that.data.balancePrice });
  },
  onShowInputPoint: function () {
    var that = this;
    that.setData({ isShowMemberRights: 'show', isInputPoint: true, inputDiscountValue: that.data.pointPrice, inputValue: that.data.pointPrice });
  },
  onCoverClicked: function (e) {
    this.setData({ isShowMemberRights: 'hide' });
  },
  onExtractEmail: function () {
    this.setData({ isExtractEmail: 'hide' });
    this.setData({ isExtractSelf: 'show' });
    this.setData({ isShowStore: '' });
  },
  onExtractSelf: function () {
    this.setData({ isExtractSelf: 'hide' });
    this.setData({ isExtractEmail: 'show' });
    this.setData({ isShowStore: 'hide' });
  },
  discountTextInput: function (event) {
    var that = this;
    var str = event.detail.value;

    if (that.data.isInputPoint) {
      var pointMoney = (parseInt(str) * that.data.memberInfo.integralTrade.money) / that.data.memberInfo.integralTrade.integral_sum;

      var shouldMoney = parseFloat(that.data.totalPrice) - parseFloat(that.data.discountPrice) - parseFloat(that.data.balancePrice);

      if (parseFloat(pointMoney) > shouldMoney) {
        that.setData({ inputValue: '0' })
      } else if (parseInt(str) > parseInt(that.data.memberInfo.mallCustomer.integral)) {
        that.setData({ inputValue: '0' });
      } else {
        that.setData({ inputValue: str })
      }
    } else {
      var shouldPay = parseFloat(that.data.totalPrice) - parseFloat(that.data.discountPrice) - parseFloat(that.data.pointPrice);

      if (parseFloat(str) > shouldPay) {
        that.setData({ inputValue: '0' })
      } else if (parseFloat(str) > parseFloat(that.data.memberInfo.mallCustomer.balance)) {
        that.setData({ inputValue: that.data.memberInfo.mallCustomer.balance });
      } else {
        that.setData({ inputValue: str })
      }
    }

    if (str.length > 0) {
      if (that.data.isInputPoint) {
        var point = (parseInt(that.data.inputValue) * that.data.memberInfo.integralTrade.money) / that.data.memberInfo.integralTrade.integral_sum;
        that.setData({ inputDiscountValue: point.toFixed(2) });
      } else {
        that.setData({ inputDiscountValue: that.data.inputValue })
      }
    } else {
      that.setData({ inputDiscountValue: 0 })
    }
  },
  onSureDiscount: function () {
    var that = this;

    if (that.data.isInputPoint) {
      that.setData({ pointPrice: that.data.inputDiscountValue, usePoint: that.data.inputValue });
    } else {
      that.setData({ balancePrice: that.data.inputDiscountValue, useBalance: that.data.inputValue });
    }

    that.getShouldPayAmount();
    that.setData({ isShowMemberRights: 'hide' });
  },
  //计算商品总价
  getCartTotalPrice: function () {
    var that = this;
    var price = 0;

    for (var i = 0; i < that.data.productList.length; i++) {
      var item = that.data.productList[i];
      if (item.specifications != null) {
        price += item.shoppingCart.count * item.specifications.price;
      } else {
        price += item.shoppingCart.count * item.goods.goodsRetailPrice;
      }
    }
    var discountPrice = 0;
    if (that.data.memberInfo.mallCustomer.discount != null) {
      discountPrice = price * (1 - (that.data.memberInfo.mallCustomer.discount / 10));
    }
    that.setData({ totalPrice: price, discountPrice: discountPrice });
    that.getShouldPayAmount();
  },
  //计算剩余应付金额
  getShouldPayAmount: function () {
    var that = this;
    var shouldPay = parseFloat(that.data.totalPrice) - parseFloat(that.data.discountPrice) - parseFloat(that.data.balancePrice) - parseFloat(that.data.pointPrice);
    that.setData({ shouldPayPrice: shouldPay });
  },
  //查询默认门店
  queryStoreList: function () {
    var that = this;

    let options = {
      key: 'FCtwvJYVNagFHA+a0IJbNxTSsxFoLTy6CFzpKDmPnc8='
    };

    app.globalData.request.queryStoreList(options, function (data) {
      var store = data.result.content[0];
      that.setData({ currentStore: store, totalStore: data.result.numberOfElements });
      wx.hideLoading();

      // map.calculateDistance({
      //   to: [{
      //     latitude: store.latitude,
      //     longitude: store.longitude
      //   }],
      //   complete: function (res) {
      //     var longDistance = res.result.elements[0].distance;

      //     if (longDistance >= 1000) {
      //       var distance = (longDistance / 1000).toFixed(0);
      //       store.distance = distance + '公里';
      //     } else {
      //       store.distance = distance + '米';
      //     }
      //     that.setData({ currentStore: store });
      //   }
      // })
    });
  },
  // paySignData: function(data,date){
  //   var stringA = "appId=" + data.appid + "&nonceStr=" + data.nonce_str + "&package=prepay_id=" + data.prepay_id + "&signType=MD5" + "&timeStamp=" + date;

  //   var stringSignTemp = stringA + "&key=5eef8283dc4c421484229a59449e11c2";

  //   console.log(stringSignTemp);

  //   var sign = app.globalData.MD5.hexMD5(stringSignTemp).toUpperCase();

  //   console.log(sign);

  //   return sign;
  // },
  // let options = {
  //   orderNo: "20150834343434421",
  //   price: 1,
  //   jsCode: app.globalData.loginCode,
  //   isService: false
  // }

  // app.globalData.request.payOrder(options, function (data) {
  //   console.log(data);
  //   var date = String(new Date().getTime()).substr(0, 10);

  //   wx.requestPayment({
  //     timeStamp: date,
  //     'nonceStr': data.nonce_str,
  //     'package': "prepay_id=" + data.prepay_id,
  //     'signType': 'MD5',
  //     'paySign': that.paySignData(data,date),
  //     'success': function (res) {
  //       console.log(res)
  //     },
  //     'fail': function (res) {
  //       console.log(res)
  //     },
  //     'complete': function (res) {
  //       console.log(res)
  //     }
  //   })
  // })
})

