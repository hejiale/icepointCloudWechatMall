function http(msg) {
  // var HostURL = 'https://dev.icepointcloud.com';
  var HostURL = 'http://guirong.private.icepointcloud.com';

  return new Promise((resolve, reject) => {
    wx.request({
      url: HostURL + msg.url,
      data: msg.data,
      header: {
        'content-type': 'application/json'
      },
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

function queryProductList(options, callBack){
  var that = this;

  let msg = {
    data: options,
    url: '/wechat/mall/getGoodsList',
    method: 'GET'
  }

  http(msg).then(
    data => {
      typeof callBack == "function" && callBack(data)
    }).catch(e => {
      console.log(e)
    })
}

module.exports = {
  payOrder: payOrder,
  queryProductList: queryProductList
}


