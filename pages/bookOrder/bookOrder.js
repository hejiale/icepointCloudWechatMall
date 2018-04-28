var app = getApp();

Page({
  data: {
    productList: [],
    isShowMemberRights: 'hide',
    isExtractEmail: 'show',
    isExtractSelf: 'hide',
    //自提或邮寄标签判定是否选择地址选项
    isShowStore: 'hide',
    currentAddress: null,
    selectAddressId: null,
    totalPrice: null,
    shouldPayPrice: null,
    memberInfo: null,
    discountPrice: 0,
    balancePrice: 0,
    pointPrice: 0,
    isInputPoint: false,
    //当前输入折扣抵扣金额
    inputDiscountValue: null,
    inputValue: null,
    useBalance: null,
    usePoint: null,
    isFromCart: false
  },
  onLoad: function (options) {
    var that = this;
    that.setData({ isFromCart: options.isFromCart });

    //获取会员信息
    app.globalData.request.getMemberInfo(function (data) {
      that.setData({ memberInfo: data });
      //处理商品数据
      that.setData({ productList: app.globalData.orderProducts });
      that.getCartTotalPrice();
    });

    //获取客户默认地址
    app.globalData.request.getDefaultAddress(function (data) {
      that.setData({ currentAddress: data.result, selectAddressId: data.result.id });
    });
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
    wx.navigateTo({
      url: '../address/address?id=' + that.data.currentAddress.id,
    })
  },
  onSelectStore: function () {
    wx.navigateTo({
      url: '../store/store',
    })
  },
  onCall: function () {
    wx.makePhoneCall({
      phoneNumber: '',
    })
  },
  //下单
  offerOrder: function () {
    var that = this;

    var orderParameter = {
      order:{
        pickUpGoodsType: "PICK_UP_IN_A_STORE",
        netPointId: 2,
        addressId: that.data.selectAddressId,
        amountPayable: that.data.shouldPayPrice,
        discount: that.data.memberInfo.mallCustomer.discount,
        discountPrice: that.data.discountPrice,
        integral: that.data.usePoint,
        integralPrice: that.data.pointPrice,
        balance: that.data.useBalance,
        balancePrice: that.data.balancePrice
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
      if (that.data.isFromCart == 1) {
        app.globalData.request.deleteCart({ cartIds: carts.join(',') }, function (data) {
          wx.hideLoading();
          wx.navigateBack();
        });
      } else {
        wx.hideLoading();
        wx.navigateBack();
      }
    });
  },
  onShowInputBalance: function () {
    var that = this;
    that.setData({ isShowMemberRights: 'show', isInputPoint: false, inputDiscountValue: "0.00", inputValue: '' });
  },
  onShowInputPoint: function () {
    var that = this;
    that.setData({ isShowMemberRights: 'show', isInputPoint: true, inputDiscountValue: "0.00", inputValue: '' });
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
      if (parseFloat(str) > parseFloat(that.data.memberInfo.mallCustomer.integral)) {
        that.setData({ inputValue: that.data.memberInfo.mallCustomer.integral });
      } else {
        that.setData({ inputValue: str })
      }
    } else {
      if (parseFloat(str) > parseFloat(that.data.memberInfo.mallCustomer.balance)) {
        that.setData({ inputValue: that.data.memberInfo.mallCustomer.balance });
      } else {
        that.setData({ inputValue: str })
      }
    }

    if (that.data.inputValue.length > 0) {
      if (that.data.isInputPoint) {
        var point = (parseInt(that.data.inputValue) * that.data.memberInfo.integralTrade.money) / that.data.memberInfo.integralTrade.integral_sum;
        that.setData({ inputDiscountValue: point });
      } else {
        that.setData({ inputDiscountValue: that.data.inputValue })
      }
    } else {
      that.setData({ inputDiscountValue: "0.00" });
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
    that.setData({ totalPrice: price });
    that.getShouldPayAmount();
  },
  //计算剩余应付金额
  getShouldPayAmount: function () {
    var that = this;
    var shouldPay = parseFloat(that.data.totalPrice) - parseFloat(that.data.discountPrice) - parseFloat(that.data.balancePrice) - parseFloat(that.data.pointPrice);
    that.setData({ shouldPayPrice: shouldPay });
  }
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