// pages/cart/cart.js
var app = getApp();

Page({
  data: {
    cartList: null,
    canEdit: false,
    totalPrice: null
  },
  onShow: function () {
    var that = this;
    that.queryCartList();
  },
  onTapEdit: function () {
    this.setData({
      canEdit: !this.data.canEdit
    })
  },
  onCancel: function () {
    this.setData({
      canEdit: !this.data.canEdit
    })
  },
  onReduce: function (event) {
    var that = this;
    var value = event.currentTarget.dataset.key;
    value.shoppingCart.count -= 1;
    that.updateCartNum(value.shoppingCart.cartId, value.shoppingCart.count);
  },
  onCrease: function (event) {
    var that = this;
    var value = event.currentTarget.dataset.key;
    value.shoppingCart.count += 1;
    that.updateCartNum(value.shoppingCart.cartId, value.shoppingCart.count);
  },
  onDeleteCart: function (event) {
    var that = this;
    var value = event.currentTarget.dataset.key;

    that.updateCartNum(value.shoppingCart.cartId, 0);
  },
  onSelectCart: function (e) {
    var that = this;
    var value = e.currentTarget.dataset.key;

    if (value.goods.isShelves){
      for (var i = 0; i < that.data.cartList.length; i++) {
        var object = that.data.cartList[i];
        if (object.shoppingCart.cartId == value.shoppingCart.cartId) {
          object.selected = !object.selected;
        }
      }
      that.setData({ cartList: that.data.cartList });
      that.updateCartTotalPrice();
    }else{
      wx.showToast({
        title: '该商品已下架',
        icon:'none'
      })
    }
  },
  onBook: function () {
    var that = this;

    var productList = [];

    for (var i = 0; i < that.data.cartList.length; i++) {
      var item = that.data.cartList[i];
      if (item.selected) {
        productList.push(item);
      }
    }

    if (productList.length > 0){
      app.globalData.orderProducts = productList;

      wx.navigateTo({
        url: '../bookOrder/bookOrder?isFromCart=1'
      })
    }else{
      wx.showToast({
        title: '购物车未选中任何商品!',
        icon:'none'
      })
    }
  },
  onCleanCart: function () {
    var that = this;

    app.globalData.request.clearCart(function (data) {
      that.queryCartList();
    });
  },
  //查询购物车列表
  queryCartList: function () {
    var that = this;
    wx.showLoading();

    app.globalData.request.queryCartList(function (data) {
      if (data.result != null) {
        if (data.result.length > 0) {
          for (var i = 0; i < data.result.length; i++) {
            var object = data.result[i];

            if (object.status == "NORMAL"){
              object.selected = true;
            }
            
            if (object.specifications != null) {
              var specificationStr = object.specifications.groupValues;
              var specifications = JSON.parse(specificationStr);

              var appendStr = '';
              for (var j = 0; j < specifications.length; j++) {
                var spec = specifications[j];
                appendStr += spec.specificationValue + ';';
              }
              object.specification = appendStr;
            }
          }
          that.setData({ cartList: data.result });
          that.updateCartTotalPrice();
          wx.hideLoading();
        }
      } else {
        wx.showToast({
          title: '购物车未添加任何商品!',
          icon: "none"
        })
        that.setData({ cartList: null });
      }
    });
  },
  //更新购物车信息
  updateCartNum: function (cartId, count) {
    var that = this;

    let options = {
      cartId: cartId,
      count: count
    };
    app.globalData.request.updateCart(options, function (data) {
      that.queryCartList();
    });
  },
  //刷新购物车已选商品总价
  updateCartTotalPrice: function () {
    var that = this;
    var price = 0;

    for (var i = 0; i < that.data.cartList.length; i++) {
      var object = that.data.cartList[i];
      if (object.selected) {
        if (object.specifications != null) {
          price += object.shoppingCart.count * object.specifications.price;
        } else {
          price += object.shoppingCart.count * object.goods.goodsRetailPrice;
        }
      }
    }
    that.setData({ totalPrice: price });
  }
})