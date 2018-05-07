// pages/home/home.js
var app = getApp()

Page({
  data: {
    classList: [{ typeName: '精选' }],
    isShowClassView: 'hide',
    isShowProductListView: 'hide',
    isShowTemplateView: 'show',
    productList: [],
    templateList: null,
    currentType: "精选",
    currentPage: 1,
    pageSize: 20,
  },
  onLoad: function (options) {
    var that = this;

    wx.showLoading({});

    that.getCompanyTemplate();
    app.userLogin(function () { });
  },
  onShoppingCart: function () {
    if (app.globalData.customer != null) {
      wx.navigateTo({
        url: '../cart/cart',
      })
    } else {
      wx.navigateTo({
        url: '../bindPhone/bindPhone',
      })
    }
  },
  onSearchProduct: function () {
    wx.navigateTo({
      url: '../searchPage/searchPage',
    })
  },
  onShowClassView: function () {
    this.setData({ isShowClassView: '' });
  },
  onCloseClassCover: function () {
    this.setData({ isShowClassView: 'hide' });
  },
  onClassItemClicked: function (e) {
    var that = this;
    var item = e.currentTarget.dataset.key;

    that.setData({ currentType: item.typeName, isShowClassView: 'hide' });

    if (item.typeName == '精选') {
      that.setData({ isShowProductListView: 'hide', isShowTemplateView: '' });
    } else {
      that.setData({ isShowProductListView: '', isShowTemplateView: 'hide', productList: [] });
      that.queryProductsRequest(item.typeId);
    }
  },
  onTemplateDetail: function (e) {
    var that = this;
    var item = e.currentTarget.dataset.key;

    app.globalData.templateObject = item;

    wx.navigateTo({
      url: '../productList/productList',
    })

  },
  onGoodsDetail: function (e) {
    var that = this;
    var item = e.currentTarget.dataset.key;

    wx.navigateTo({
      url: '../productDetail/productDetail?id=' + item.goodsId,
    })
  },
  onLoadMore: function () {
    var that = this;
    that.data.currentPage += 1;
    that.queryProductsRequest();
  },
  onBottomMenuToOrder: function () {
    if (app.globalData.customer != null) {
      wx.navigateTo({
        url: '../order/order',
      })
    } else {
      wx.navigateTo({
        url: '../bindPhone/bindPhone',
      })
    }
  },
  onBottomMenuToCart: function () {
    if (app.globalData.customer != null) {
      wx.navigateTo({
        url: '../cart/cart',
      })
    } else {
      wx.navigateTo({
        url: '../bindPhone/bindPhone',
      })
    }
  },
  //获取商店展示模板
  getCompanyTemplate: function () {
    var that = this;

    app.getCompanyInfo(function () {
      let options = { companyId: app.globalData.belongCompany.id };

      app.globalData.request.getCompanyTemplate(options, function (data) {
        if (data.retCode == 401) {
          wx.showToast({
            title: data.retMsg,
            icon: 'none'
          })
        } else {
          var viewList = [];

          for (var i = 0; i < data.result.previewData.length; i++) {
            var value = data.result.previewData[i];
            if (value.type == "SESSION") {
              viewList.push(value);
            } else if (value.type == "NAVIGATION") {
              for (var j = 0; j < value.navDataBeans.length; j++) {
                var bean = value.navDataBeans[j];
                that.data.classList.push(bean);
              }
            }
          }
          that.setData({ templateList: viewList, classList: that.data.classList });
          wx.hideLoading();
        }
      })
    })
  },
  //--------------查询商品----------------//
  queryProductsRequest: function (typeId) {
    var that = this;

    let options = {
      companyId: app.globalData.belongCompany.id,
      pageNumber: that.data.currentPage,
      pageSize: that.data.pageSize,
      typeId: typeId
    };

    app.globalData.request.queryProductList(options, function (data) {
      that.setData({ productList: that.data.productList.concat(data.resultList) });
    })
  },
})