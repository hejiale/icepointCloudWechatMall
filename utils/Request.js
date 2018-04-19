function http(msg) {
  // var HostURL = 'https://dev.icepointcloud.com';
  var HostURL = 'http://guirong.private.icepointcloud.com/wechat/api/mall';

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

//查询商品
function queryProductList(options, callBack) {
  var that = this;

  let msg = {
    data: options,
    url: '/goods',
    method: 'GET'
  }

  http(msg).then(
    data => {
      typeof callBack == "function" && callBack(data)
    }).catch(e => {
      console.log(e)
    })
}

//查询商品分类信息
function queryProductCategory(callBack) {
  var that = this;

  let msg = {
    url: '/companys/60/searchInfos',
    method: 'GET'
  }

  http(msg).then(
    data => {
      typeof callBack == "function" && callBack(data)
    }).catch(e => {
      console.log(e)
    })
}

//查询商品详情
function queryProductDetail(id, callBack) {
  var that = this;

  let msg = {
    url: '/goods/' + id,
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
  queryProductList: queryProductList,
  queryProductCategory: queryProductCategory,
  queryProductDetail: queryProductDetail
}


