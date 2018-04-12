// pages/home/home.js
var app = getApp()

Page({
  data: {
    // currentStoreID: 0,
    // showAlert: 'hide',
    // showContent: 'hide',
    // indicator: false,
    // template: [],
    // detailStyle: null,
    deviceWidth: 0,
    deviceHeight: 0,
    classItemList:[],
    classList: [
      '精选',
      '送女票',
      '海淘',
      '创意生活',
      '送基友',
      '送爸妈',
      '设计感',
      '文艺风',
    ],
    isShowClassView : 'hide',
    isShowProductListView:'hide',
    productList:[]
    // showFirstStyle: null,
    // showSecondStyle: null,
    // showThirdStyle: null,
    // showFourStyle: null,
    // recommendProducts: null
  },
  onLoad: function (options) {
    var ipcApp = app.globalData.ipcApp;
    ipcApp.setSessionID('');

    var that = this;
    app.getSystemInfo(function (systemInfo) {
      var winWidth = systemInfo.windowWidth;
      var winHeight = systemInfo.windowHeight;
      that.setData({
        deviceWidth: winWidth, deviceHeight: winHeight
      })
    })

    // wx.getLocation({
    //   type: 'gcj02', //返回可以用于wx.openLocation的经纬度
    //   success: function (res) {
    //     var latitude = res.latitude
    //     var longitude = res.longitude
    //     wx.openLocation({
    //       latitude: latitude,
    //       longitude: longitude,
    //       scale: 28,
    //       success: function (res) {
    //         console.log(res)
    //       }
    //     })
    //   }
    // })
  },
  onShow: function () {
    var that = this;

    var list = new Array();

    for (var i = 0; i < 10; i++) {
      var productObj = new Object()
      list.push(productObj)
    }
    that.setData({ classItemList: list })
    that.setData({ productList: list })

    // 页面显示
    // var that = this;
    
    // var store = wx.getStorageSync('store');
    // if ( !store) {
    //   that.setData({
    //     showAlert: 'show',
    //     showContent: 'hide',
    //   })
    // }

    // wx.getStorage({
    //   key: 'store',
    //   success: function (res) {
    //     if (res) {
    //       var storeID = res.data.storeId;
    //       that.setData({
    //         showAlert: 'hide',
    //         currentStoreID: storeID,
    //       })
    //       if (storeID > 0) {
    //         wx.showToast({
    //           title: '加载中...',
    //           icon: 'loading',
    //           duration: 10000
    //         })

    //         var ipcApp = app.globalData.ipcApp
    //         if (app.globalData.ipcApp.getSessionID() != '' && app.globalData.ipcApp.getSessionID()) {
    //           that.onShowTemplate(storeID);
    //         } else {
    //           app.onLogin(function () {
    //             that.onShowTemplate(storeID);
    //           })
    //         }
    //       }
    //     }
    //   }
    // })
  },
  // onShowTemplate: function (storeID) {
  //   var that = this;

  //   wx.request({
  //     url: app.HostURL + '/wechat/webapp/mall/getTemplate',
  //     data: {
  //       sessionId: app.globalData.ipcApp.getSessionID(),
  //       id: storeID
  //     },
  //     method: 'POST',
  //     header: { 'content-type': 'application/json' },
  //     success: function (res) {
  //       console.log(res.data.result.templates)
  //       var templates = res.data.result.templates;
  //       that.setData({ template: templates })

  //       //-------获取show四格页面css样式-------//
  //       //-----第一组show
  //       var window = templates[4].windowmageTemplateDetails[0];

  //       var jsonWindow = JSON.parse(window.imageContentStyle);
  //       var jsonTitles = JSON.parse(window.titles);
  //       var productInfo = window.productInfo;

  //       var showProductInfo = new Object();
  //       showProductInfo.image = jsonWindow.backgroundImage;
  //       showProductInfo.title = jsonTitles.title_1;
  //       showProductInfo.product = productInfo;
  //       that.setData({ showFirstStyle: showProductInfo });
  //       //-----第二组show
  //       var window = templates[4].windowmageTemplateDetails[1];
  //       var jsonWindow = JSON.parse(window.imageContentStyle);

  //       var showProductInfo = new Object();
  //       showProductInfo.image = jsonWindow.backgroundImage;
  //       showProductInfo.product = window.productInfo;
  //       that.setData({ showSecondStyle: showProductInfo });
  //       //------第三组show
  //       var window = templates[4].windowmageTemplateDetails[2];
  //       var jsonWindow = JSON.parse(window.imageContentStyle);

  //       var showProductInfo = new Object();
  //       showProductInfo.image = jsonWindow.backgroundImage;
  //       showProductInfo.product = window.productInfo;
  //       that.setData({ showThirdStyle: showProductInfo });
  //       //------第四组show
  //       var window = templates[4].windowmageTemplateDetails[3];
  //       var jsonWindow = JSON.parse(window.imageContentStyle);
  //       var jsonTitles = JSON.parse(window.titles);

  //       var showProductInfo = new Object();
  //       showProductInfo.image = jsonWindow.backgroundImage;
  //       showProductInfo.product = window.productInfo;
  //       showProductInfo.title = jsonTitles.title_1;
  //       that.setData({ showFourStyle: showProductInfo });
  //       //----------推荐商品-----------//
  //       var recommends = templates[5].templateDetails;
  //       that.setData({ recommendProducts: recommends, showContent: 'show' });
  //       wx.hideToast();
  //     }
  //   })
  // },
  // onStoreSelected: function () {
  //   wx.navigateTo({
  //     url: '../store/store'
  //   })
  // },
  // onClassClicked: function (e) {
  //   wx.navigateTo({
  //     url: '../productList/productList'
  //   })
  // },
  // onProductDetail: function (event) {
  //   var value = event.currentTarget.dataset.key;
  //   wx.navigateTo({
  //     url: '../productDetail/productDetail?id=' + value
  //   })
  // },
  onShoppingCart:function(){
    wx.navigateTo({
      url: '../bindPhone/bindPhone',
    })
  },
  onSearchProduct:function(){
    wx.navigateTo({
      url: '../searchPage/searchPage',
    })
  },
  onShowClassView: function(){
    this.setData({ isShowClassView : 'show'});
  },
  onCloseClassCover: function(){
    this.setData({ isShowClassView: 'hide' });
  },
  onClassItemClicked: function(){
    this.setData({ isShowProductListView: 'show' });
  }
})