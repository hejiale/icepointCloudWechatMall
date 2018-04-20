// var HostURL = 'https://dev.icepointcloud.com';
var HostURL = 'http://guirong.private.icepointcloud.com';
var port = '/wechat/api/mall';

function http(msg) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: HostURL + msg.url,
      data: msg.data,
      header: {
        'content-type': 'application/json'
      },
      method: msg.method,
      success: function (res) {
        console.log(res);
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
    url: port + '/api/wechat/pay/unifiedOrder',
    method: 'GET'
  }

  http(msg).then(
    data => {
      typeof callBack == "function" && callBack(data)
    }).catch(e => {

    })
}

//查询商品
function queryProductList(options, callBack) {
  var that = this;

  let msg = {
    data: options,
    url: port + '/goods',
    method: 'GET'
  }

  http(msg).then(
    data => {
      typeof callBack == "function" && callBack(data)
    }).catch(e => {

    })
}

//查询商品分类信息
function queryProductCategory(callBack) {
  var that = this;

  let msg = {
    url: port + "/companys/60/searchInfos",
    method: 'GET'
  }

  http(msg).then(
    data => {
      typeof callBack == "function" && callBack(data)
    }).catch(e => {

    })
}

//查询商品详情
function queryProductDetail(id, callBack) {
  var that = this;

  let msg = {
    url: port + '/goods/' + id,
    method: 'GET'
  }

  http(msg).then(
    data => {
      typeof callBack == "function" && callBack(data)
    }).catch(e => {

    })
}

//查询商品详情规格
function queryProductDetailParameter(parameterJson, callBack) {
  var that = this;

  let msg = {
    data:parameterJson,
    url: port + '/goods/specifications',
    method: 'POST'
  }

  http(msg).then(
    data => {
      typeof callBack == "function" && callBack(data)
    }).catch(e => {

    })
}

module.exports = {
  payOrder: payOrder,
  queryProductList: queryProductList,
  queryProductCategory: queryProductCategory,
  queryProductDetail: queryProductDetail,
  queryProductDetailParameter: queryProductDetailParameter
}


