// pages/searchPage/searchPage.js
var app = getApp();

Page({
  data: {
    historySearchWords: [],
    allProductList: [],
    isShowProductList: 'hide',
    isShowSearchView: 'show',
    showOrHide: 'hide',
    classList: ['镜架',
      '太阳眼镜',
      '定制类眼镜',
      '老花眼镜',
      '隐形眼镜',
      '镜片',
      '配件'],
    // currentTypeName: '',
    // allProperty: [],
    // categoryNameList: [],
    // propertyNameList: [],
    currentPage: 1,
    // keyWord: '',
    // inputKeyWord: '',
    // startPrice: '',
    // endPrice: '',
    isEndLoading: false,
    showFooterLoading: 'hide'
  },
  onLoad: function (options) {

  },

  onShow: function () {
    var that = this;
    that.setData({ currentTypeName: "镜架" });
  },

  onLastesItem: function () {
    var that = this;

    that.setData({ isShowProductList: 'show', isShowSearchView: 'hide' });
  },

  onClassClicked: function () {
    var that = this;

    that.setData({ showOrHide: 'show' });
  },
  onSelectedClass: function () {
    var that = this;

    that.setData({ isShowProductList: 'show', isShowSearchView: 'hide' });
    that.setData({ showOrHide: 'hide' });

    // var object = {
    //   minPrice: 10
    // }

    let options = {
      companyId: app.globalData.companyId,
      pageNumber: that.data.currentPage,
      pageSize: 10,
      // queryCondition: object
    }

    app.globalData.request.queryProductList(options, function (data) {
      console.log(data);

      if (data.resultList.count > 0) {
        that.setData({ allProductList: that.data.allProductList.concat(data.resultList) });
      }

      if (that.data.allProductList.count > 0 && data.rowCount == 0) {
        that.setData({ isEndLoading: true, showFooterLoading: 'show' });
      }
    })
  },
  onBgClicked: function () {
    this.setData({ showOrHide: 'hide' });
  },
  onProductDetail: function () {
    wx.navigateTo({
      url: '../productDetail/productDetail',
    })
  },
  onLoadMore: function () {

  },
  onSureFilterProducts: function () {
    // var that = this;
    // this.setData({ showOrHide: 'hide', currentPage: 0 });
    // that.data.allProductList.splice(0, that.data.allProductList.length);
    // that.queryCategorys();
  },
  onResetProperty: function () {
    // var that = this;
    // that.setData({ currentTypeName: "镜架", startPrice: '', endPrice: '', currentPage: 0, scrollTop: 0, keyWord: '' });
    // that.data.selectedPropertys.splice(0, that.data.selectedPropertys.length);
    // that.data.allProductList.splice(0, that.data.allProductList.length);
    // that.queryCategorys();
  },
  //--------------输入价格操作----------------//
  onStartPriceClicked: function (event) {
    // if (parseFloat(event.detail.value) > parseFloat(this.data.endPrice)) {
    //   this.setData({ startPrice: '' });
    //   return;
    // }
    // this.setData({ startPrice: event.detail.value });
  },
  onEndPriceClicked: function (event) {
    // this.setData({ endPrice: event.detail.value });
  },
})