var app = getApp();

Page({
  data: {
    productList: [],
    isShowMemberRights: 'hide',
    isExtractEmail: 'show',
    isExtractSelf: 'hide',
    //自提或邮寄标签判定是否选择地址选项
    isShowStore: 'hide'
  },
  onLoad: function (options) {
    var that = this;

    var list = new Array();

    for (var i = 0; i < 5; i++) {
      var productObj = new Object()
      list.push(productObj)
    }
    that.setData({ productList: list })
  },

  onShow: function () {

  },

  onSelectAddress: function () {
    wx.navigateTo({
      url: '../address/address',
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
  offerOrder: function () {
    var that = this;

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
  },

  // paySignData: function(data,date){
  //   var stringA = "appId=" + data.appid + "&nonceStr=" + data.nonce_str + "&package=prepay_id=" + data.prepay_id + "&signType=MD5" + "&timeStamp=" + date;

  //   var stringSignTemp = stringA + "&key=5eef8283dc4c421484229a59449e11c2";

  //   console.log(stringSignTemp);

  //   var sign = app.globalData.MD5.hexMD5(stringSignTemp).toUpperCase();

  //   console.log(sign);

  //   return sign;
  // },

  onShowMemberRightsView: function () {
    var that = this;

    wx.showActionSheet({
      itemList: ['会员折扣', '储值折扣', '积分'],
      itemColor: '#63a0d4',
      success: function (res) {
        that.setData({ isShowMemberRights: 'show' });
      },
      fail: function (res) {

      }
    })
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
  }
})