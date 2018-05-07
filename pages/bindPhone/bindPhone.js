// pages/bindPhone/bindPhone.js
var total_micro_second = 60 * 1000;

/* 毫秒级倒计时 */
function count_down(that) {
  // 渲染倒计时时钟
  that.setData({
    clock: date_format(total_micro_second),
  });

  if (total_micro_second <= 0) {
    total_micro_second = 60 * 1000;
    that.setData({
      clock: "获取验证码",
      isSendCode: false
    });
  } else {
    setTimeout(function () {
      total_micro_second -= 10;
      count_down(that);
    }
      , 10)
  }
}

function date_format(micro_second) {
  // 秒数
  var second = Math.floor(micro_second / 1000);
  // 小时位
  var hr = Math.floor(second / 3600);
  // 分钟位
  var min = fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
  // 秒位
  var sec = (second - hr * 3600 - min * 60);// equal to => var sec = second % 60;
  // 毫秒位，保留2位
  var micro_sec = fill_zero_prefix(Math.floor((micro_second % 1000) / 10));
  return sec + 'S'
}

function fill_zero_prefix(num) {
  return num < 10 ? "0" + num : num
}

var app = getApp();

Page({
  data: {
    isSendCode: false,
    isCanBind: false,
    bindPhone: '',
    bindCode: '',
    clock: '获取验证码',
    userInfo: null,
    isShowMemberRightsMemo: 'hide'
  },
  onLoad: function () {

  },
  onShow: function () {
    var that = this;

    app.getUserInfo(function (userInfo) {
      if (userInfo != null) {
        that.setData({
          userInfo: userInfo,
        })
      } else {
        wx.showModal({
          content: '检测到您未打开微信用户信息授权，开启后即可进行登录',
          confirmText: '去开启',
          success: function (res) {
            if (res.confirm) {
              wx.openSetting({
                success: (res) => {

                }
              })
            } else if (res.cancel) {
              wx.navigateBack();
            }
          }
        })
      }
    })
  },
  onBindPhone: function (e) {
    var that = this;

    if (that.data.isCanBind) {
      let options = {
        validCode: that.data.bindCode,
        phone: that.data.bindPhone,
        userAccount: app.globalData.weChatUser.openId,
        weChatAccount: app.globalData.weChatAccountObject.wechatAccount
      };

      app.globalData.request.verityPhoneCode(options, function (data) {
        wx.showModal({
          content: '用户绑定手机号成功!',
          showCancel: false,
          success: function (res) {
            //重新登录
            app.userLogin(function () {
              wx.navigateBack()
            })
          }
        })
      })
    }
  },
  onSendCode: function () {
    var that = this;

    if (that.data.bindPhone.length == 0) {
      wx.showToast({
        title: '请输入有效手机号',
        icon: 'none'
      })
      return
    }

    console.log(app.globalData.weChatUser);

    if (!that.data.isSendCode) {
      let options = {
        phone: that.data.bindPhone,
        userAccount: app.globalData.weChatUser.openId,
        weChatAccount: app.globalData.weChatAccountObject.wechatAccount
      };

      app.globalData.request.sendVerityCode(options, function (data) {
        count_down(that);
        that.setData({ isSendCode: true })

        wx.showModal({
          showCancel: false,
          content: '手机验证码发送成功，请注意查收短信!'
        })
      })
    }
  },
  onPhoneTextFieldChange: function (e) {
    var that = this;
    that.setData({ bindPhone: e.detail.value })
    that.onCheckBindStatus()
  },
  onCodeTextFieldChange: function (e) {
    var that = this;
    that.setData({ bindCode: e.detail.value })
    that.onCheckBindStatus()
  },
  onCheckBindStatus: function () {
    var that = this;
    if (that.data.bindPhone.length > 0 && that.data.bindCode.length > 0) {
      that.setData({ isCanBind: true })
    } else {
      that.setData({ isCanBind: false })
    }
  },
  onLookMemberRightsMemo: function () {
    this.setData({ isShowMemberRightsMemo: 'show' })
  },
  onCloseMemberRightBg: function () {
    this.setData({ isShowMemberRightsMemo: 'hide' })
  }
})