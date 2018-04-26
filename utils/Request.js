// var HostURL = 'https://dev.icepointcloud.com';
var HostURL = 'http://guirong.private.icepointcloud.com';
var port = '/wechat/api/mall';

//登录
function login(options, callBack) {
  var that = this;

  let msg = {
    data: options,
    url: port + '/login',
    method: 'GET'
  }

  http(msg).then(
    data => {
      typeof callBack == "function" && callBack(data)
    }).catch(e => {

    })
}

//客户会员信息
function getMemberInfo(options, callBack) {
  var that = this;

  let msg = {
    data: options,
    url: port + '/customerInfo',
    method: 'GET'
  }

  http(msg).then(
    data => {
      typeof callBack == "function" && callBack(data)
    }).catch(e => {

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
    data: parameterJson,
    url: port + '/goods/specifications',
    method: 'POST'
  }

  http(msg).then(
    data => {
      typeof callBack == "function" && callBack(data)
    }).catch(e => {

    })
}

//添加购物车
function addShoppingCart(options, callBack) {
  var that = this;

  let msg = {
    data: options,
    url: port + '/addShopping',
    method: 'POST'
  }

  http(msg).then(
    data => {
      typeof callBack == "function" && callBack(data)
    }).catch(e => {

    })
}

//查询购物车列表
function queryCartList(options, callBack) {
  var that = this;

  let msg = {
    data: options,
    url: port + '/listShoppingCart',
    method: 'GET'
  }

  http(msg).then(
    data => {
      typeof callBack == "function" && callBack(data)
    }).catch(e => {

    })
}

//修改购物车数量
function updateCart(options, callBack) {
  var that = this;

  let msg = {
    data: options,
    url: port + '/updateShoppingCart',
    method: 'POST'
  }

  http(msg).then(
    data => {
      typeof callBack == "function" && callBack(data)
    }).catch(e => {

    })
}

//删除购物车商品
function deleteCart(options, callBack) {
  var that = this;

  let msg = {
    data: options,
    url: port + '/removeShoppingCarts',
    method: 'GET'
  }

  http(msg).then(
    data => {
      typeof callBack == "function" && callBack(data)
    }).catch(e => {

    })
}

//清空购物车
function clearCart(options, callBack) {
  var that = this;

  let msg = {
    data: options,
    url: port + '/cleanShoppingCart',
    method: 'GET'
  }

  http(msg).then(
    data => {
      typeof callBack == "function" && callBack(data)
    }).catch(e => {

    })
}

//门店列表
function queryStoreList(options, callBack) {
  var that = this;

  let msg = {
    data: options,
    url: '/api/wechat/store',
    method: 'GET'
  }

  http(msg).then(
    data => {
      typeof callBack == "function" && callBack(data)
    }).catch(e => {

    })
}

//查询地址列表
function queryAddressList(options, callBack) {
  var that = this;

  let msg = {
    data: options.data,
    url: port + '/listUserAddress?sessionId=' + options.sessionId,
    method: 'POST'
  }

  http(msg).then(
    data => {
      typeof callBack == "function" && callBack(data)
    }).catch(e => {

    })
}

//新增地址
function saveAddress(options, callBack) {
  var that = this;

  let msg = {
    data: options,
    url: port + '/saveUserAddress',
    method: 'POST'
  }

  http(msg).then(
    data => {
      typeof callBack == "function" && callBack(data)
    }).catch(e => {

    })
}

//删除地址
function deleteAddress(options, callBack) {
  var that = this;

  let msg = {
    data: options,
    url: port + '/delUserAddress',
    method: 'GET'
  }

  http(msg).then(
    data => {
      typeof callBack == "function" && callBack(data)
    }).catch(e => {

    })
}

//设置默认地址
function setDefaultAddress(options, callBack) {
  var that = this;

  let msg = {
    data: options,
    url: port + '/setDefaultUserAddress',
    method: 'GET'
  }

  http(msg).then(
    data => {
      typeof callBack == "function" && callBack(data)
    }).catch(e => {

    })
}

//获取默认地址
function getDefaultAddress(options, callBack) {
  var that = this;

  let msg = {
    data: options,
    url: port + '/getDefaultUserAddress',
    method: 'GET'
  }

  http(msg).then(
    data => {
      typeof callBack == "function" && callBack(data)
    }).catch(e => {

    })
}

//获取地址详情
function getDetailAddress(options, callBack) {
  var that = this;

  let msg = {
    data: options,
    url: port + '/getUserAddressById',
    method: 'GET'
  }

  http(msg).then(
    data => {
      typeof callBack == "function" && callBack(data)
    }).catch(e => {

    })
}

//下单
function payOrder(options, callBack) {
  var that = this;

  let msg = {
    data: options,
    url: port + '/order/placeOrder',
    method: 'POST'
  }

  http(msg).then(
    data => {
      typeof callBack == "function" && callBack(data)
    }).catch(e => {

    })
}

//订单列表
function queryOrderList(options, callBack) {
  var that = this;

  let msg = {
    data: options,
    url: port + '/order/listOrderInfo',
    method: 'POST'
  }

  http(msg).then(
    data => {
      typeof callBack == "function" && callBack(data)
    }).catch(e => {

    })
}

//后台请求
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
        if (res.statusCode == 200) {
          console.log(res);
          resolve(res.data);
        }
      },
      fail: function (res) {
        console.log(res);
        reject(res);
      }
    })
  })
}


module.exports = {
  login: login,
  getMemberInfo: getMemberInfo,
  payOrder: payOrder,
  queryProductList: queryProductList,
  queryProductCategory: queryProductCategory,
  queryProductDetail: queryProductDetail,
  queryProductDetailParameter: queryProductDetailParameter,
  addShoppingCart: addShoppingCart,
  queryCartList: queryCartList,
  updateCart: updateCart,
  clearCart: clearCart,
  deleteCart: deleteCart,
  queryStoreList: queryStoreList,
  saveAddress: saveAddress,
  deleteAddress: deleteAddress,
  setDefaultAddress: setDefaultAddress,
  queryAddressList: queryAddressList,
  getDefaultAddress: getDefaultAddress,
  getDetailAddress: getDetailAddress,
  queryOrderList: queryOrderList
}


