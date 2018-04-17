function http(msg) {
  var HostURL = 'https://dev.icepointcloud.com';

  return new Promise((resolve, reject) => {
    wx.request({
      url: HostURL + msg.url,
      data: msg.data,
      method: msg.method,
      success: function (res) {
        resolve(res.data);
      },
      fail: function (res) {
        reject(res);
      }
    })
  })
}

//微信支付预付款
function payOrder(options, callBack) {
  var that = this;

  let msg = {
    data: options,
    url: '/api/wechat/pay/unifiedOrder',
    method: 'GET'
  }

  http(msg).then(
    data => {
      typeof callBack == "function" && callBack(data)
    }).catch(e => {
      console.log(e)
    })
}

// onLogin: function (cb) {
  //   var that = this;
  //   wx.request({
  //     url: that.HostURL + '/wechat/webapp/login',
  //     data: { code: that.globalData.loginCode },
  //     method: 'POST',
  //     header: { 'content-type': 'application/json' },
  //     success: function (res) {
  //       if (res.data.result) {
  //         that.globalData.ipcApp.setSessionID(res.data.result.sessionId)
  //         that.globalData.ipcApp.setBindPhone(res.data.result.phone)
  //       }
  //       typeof cb == "function" && cb()
  //     }
  //   })
  // },
  // onBindLogin: function (cb) {
  //   var that = this;
  //   if (that.globalData.loginInfo) {
  //     typeof cb == "function" && cb(that.globalData.loginInfo)
  //   } else {
  //     wx.login({
  //       success: function (res) {
  //         wx.request({
  //           url: that.HostURL + '/wechat/webapp/login',
  //           data: { code: res.code },
  //           method: 'POST',
  //           header: { 'content-type': 'application/json' },
  //           success: function (res) {
  //             that.globalData.loginInfo = res
  //             typeof cb == "function" && cb(that.globalData.loginInfo)
  //           }
  //         })
  //       }
  //     })
  //   }
  // },

module.exports = {
  payOrder: payOrder
}


