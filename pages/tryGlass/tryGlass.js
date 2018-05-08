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
  }
})