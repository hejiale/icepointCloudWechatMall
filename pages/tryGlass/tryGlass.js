// pages/tryGlass/tryGlass.js
Page({
  data: {
    tryLinkURL: 'https://dev.icepointcloud.com/wechat/mall/getStartExperience.html?type=miniprogram'
  },


  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options);

    var that = this;

    that.setData({ tryLinkURL: that.data.tryLinkURL + "&key=" + encodeURIComponent("FCtwvJYVNagFHA+a0IJbNxTSsxFoLTy6CFzpKDmPnc8=") + "&photoLink=" + options.link });

    console.log(that.data.tryLinkURL);
  },
  onShow: function () {
    // 页面显示
  },
  bindGetMsg: function (e) {
    console.log(e.detail.data[0].isOrder);

    //试戴下单
    if (e.detail.data[0].isOrder == true){
      var pages = getCurrentPages()
      var prevPage = pages[pages.length - 2]

      prevPage.setData({
        tryGlassToOrder: true
      })
    }
  }
})