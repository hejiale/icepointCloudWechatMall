var HostURL = 'https://dev.icepointcloud.com';
// var HostURL = 'http://guirong.private.icepointcloud.com';
// var HostURL = 'http://192.168.1.45:8080';
var port = '/wechat/api/mall';
var sessionId = null;

function setSessionId(id) {
  var that = this;
  that.sessionId = id;
}

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

//获取公司信息
function getCompanyInfo(options, callBack) {
  var that = this;

  let msg = {
    data: options,
    url: port + '/getCompanyInfo',
    method: 'GET'
  }

  http(msg).then(
    data => {
      typeof callBack == "function" && callBack(data)
    }).catch(e => {

    })
}

//获取公司首页模板
function getCompanyTemplate(options, callBack) {
  var that = this;

  let msg = {
    data: options,
    url: port + '/getWechatAccountDefaultMallTemplate',
    method: 'GET'
  }

  http(msg).then(
    data => {
      typeof callBack == "function" && callBack(data)
    }).catch(e => {

    })
}


//验证手机验证码并绑定手机号
function verityPhoneCode(options, callBack) {
  var that = this;

  let msg = {
    data: options,
    url: port + '/confirmLoginValidateCode',
    method: 'POST',
    sessionId: 'JSESSIONID=' + that.sessionId
  }

  http(msg).then(
    data => {
      typeof callBack == "function" && callBack(data)
    }).catch(e => {

    })
}

//发送验证码
function sendVerityCode(options, callBack) {
  var that = this;

  let msg = {
    data: options,
    url: port + '/sendLoginValidateCode',
    method: 'POST',
    sessionId: 'JSESSIONID=' + that.sessionId
  }

  http(msg).then(
    data => {
      typeof callBack == "function" && callBack(data)
    }).catch(e => {

    })
}


//客户会员信息
function getMemberInfo(callBack) {
  var that = this;

  let msg = {
    url: port + '/customerInfo',
    method: 'GET',
    sessionId: 'JSESSIONID=' + that.sessionId
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
function queryProductCategory(options, callBack) {
  var that = this;

  let msg = {
    data: options,
    url: port + "/company/searchInfos",
    method: 'GET'
  }

  http(msg).then(
    data => {
      typeof callBack == "function" && callBack(data)
    }).catch(e => {

    })
}

//查询商品详情
function queryProductDetail(options, callBack) {
  var that = this;

  let msg = {
    data: options,
    url: port + '/goods/detail',
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
    method: 'POST',
    sessionId: 'JSESSIONID=' + that.sessionId
  }

  http(msg).then(
    data => {
      typeof callBack == "function" && callBack(data)
    }).catch(e => {

    })
}

//查询购物车列表
function queryCartList(callBack) {
  var that = this;

  let msg = {
    url: port + '/listShoppingCart',
    method: 'GET',
    sessionId: 'JSESSIONID=' + that.sessionId
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
function clearCart(callBack) {
  var that = this;

  let msg = {
    url: port + '/cleanShoppingCart',
    method: 'GET',
    sessionId: 'JSESSIONID=' + that.sessionId
  }

  http(msg).then(
    data => {
      typeof callBack == "function" && callBack(data)
    }).catch(e => {

    })
}

//验证购物车库存数量
function valityCartStock(options, callBack) {
  var that = this;

  let msg = {
    url: port + '/validationShoppingStatus',
    method: 'POST',
    data: options,
    sessionId: 'JSESSIONID=' + that.sessionId
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
    data: options,
    url: port + '/listUserAddress',
    method: 'POST',
    sessionId: 'JSESSIONID=' + that.sessionId
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
    method: 'POST',
    sessionId: 'JSESSIONID=' + that.sessionId
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
function getDefaultAddress(callBack) {
  var that = this;

  let msg = {
    url: port + '/getDefaultUserAddress',
    method: 'GET',
    sessionId: 'JSESSIONID=' + that.sessionId
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
    method: 'POST',
    sessionId: 'JSESSIONID=' + that.sessionId
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
    method: 'POST',
    sessionId: 'JSESSIONID=' + that.sessionId
  }

  http(msg).then(
    data => {
      typeof callBack == "function" && callBack(data)
    }).catch(e => {

    })
}

//查询订单详情
function queryOrderDetail(options, callBack) {
  var that = this;

  let msg = {
    data: options,
    url: port + '/order/getOrderDetail',
    method: 'GET',
    sessionId: 'JSESSIONID=' + that.sessionId
  }

  http(msg).then(
    data => {
      typeof callBack == "function" && callBack(data)
    }).catch(e => {

    })
}

//后台请求
function http(msg) {
  var header = {
    'content-type': 'application/json'
  };

  if (msg.sessionId != null) {
    header.Cookie = msg.sessionId;
  }

  return new Promise((resolve, reject) => {
    wx.request({
      url: HostURL + msg.url,
      data: msg.data,
      header: header,
      method: msg.method,
      success: function (res) {
        if (res.statusCode == 200 && res != null) {
          resolve(res.data);
          console.log(res);
        } else {
          wx.showToast({
            title: '请求服务器端数据出错，请稍后重试',
            icon: 'none'
          })
        }
      },
      fail: function (res) {
        reject(res);
      }
    })
  })
}


module.exports = {
  login: login,
  getCompanyInfo: getCompanyInfo,
  getMemberInfo: getMemberInfo,
  getCompanyTemplate: getCompanyTemplate,
  payOrder: payOrder,
  queryProductList: queryProductList,
  queryProductCategory: queryProductCategory,
  queryProductDetail: queryProductDetail,
  queryProductDetailParameter: queryProductDetailParameter,
  addShoppingCart: addShoppingCart,
  queryCartList: queryCartList,
  updateCart: updateCart,
  clearCart: clearCart,
  valityCartStock: valityCartStock,
  deleteCart: deleteCart,
  queryStoreList: queryStoreList,
  saveAddress: saveAddress,
  deleteAddress: deleteAddress,
  setDefaultAddress: setDefaultAddress,
  queryAddressList: queryAddressList,
  getDefaultAddress: getDefaultAddress,
  getDetailAddress: getDetailAddress,
  queryOrderList: queryOrderList,
  queryOrderDetail: queryOrderDetail,
  setSessionId: setSessionId,
  sessionId: sessionId,
  verityPhoneCode: verityPhoneCode,
  sendVerityCode: sendVerityCode
}


