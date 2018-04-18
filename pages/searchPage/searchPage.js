// pages/searchPage/searchPage.js
Page({
  data: {
    historySearchWords: [],
    allProductList: [],
    isShowProductList:'hide',
    isShowSearchView:'show',
    showOrHide:'hide',
    classList: ['镜架',
      '太阳眼镜',
      '定制类眼镜',
      '老花眼镜',
      '隐形眼镜',
      '镜片',
      '配件'],
    currentTypeName: '',
    allProperty: [],
    categoryNameList: [],
    propertyNameList: [],
    currentPage: 0,
    keyWord: '',
    inputKeyWord: '',
    startPrice: '',
    endPrice: '',
  },
  onLoad: function (options) {
    
  },
  onShow:function (){
    var that = this;

    var list = new Array();

    for (var i = 0; i < 5; i++) {
      var productObj = new Object()
      list.push(productObj)
    }
    that.setData({ historySearchWords: list })

    for (var i = 0; i < 5; i++) {
      var productObj = new Object()
      list.push(productObj)
    }
    that.setData({ allProductList: list })

    that.setData({ currentTypeName: "镜架"});
  },
  onLastesItem:function(){
    this.setData({ isShowProductList: 'show', isShowSearchView: 'hide'});
  },
  onClassClicked: function(){
    this.setData({ showOrHide: 'show'});
  },
  onBgClicked: function(){
    this.setData({ showOrHide: 'hide' });
  },
  onProductDetail: function(){
    wx.navigateTo({
      url: '../productDetail/productDetail',
    })
  },
  onLoadMore: function(){
    var that = this;
    var list = new Array();

    for (var i = 0; i < 5; i++) {
      var productObj = new Object()
      list.push(productObj);
    }

    that.setData({ allProductList: that.data.allProductList.concat(list) });
  }
})