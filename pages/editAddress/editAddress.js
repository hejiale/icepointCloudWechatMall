// pages/editAddress/editAddress.js

var address = require('../../utils/city.js')
var animation
var app = getApp();

Page({
  data: {
    contacter: '',
    contactPhone: '',
    contactAddress: '',
    isVisible: false,
    animationData: {},
    animationAddressMenu: {},
    addressMenuIsShow: false,
    value: [0, 0, 0],
    provinces: [],
    citys: [],
    areas: [],
    province: '',
    city: '',
    area: ''
  },
  onLoad: function (options) {
    var that = this;

    //初始化省市区pickerView选择数据
    var animation = wx.createAnimation({
      duration: 500,
      transformOrigin: "50% 50%",
      timingFunction: 'ease',
    })
    that.animation = animation;
    // 默认联动显示北京
    var id = address.provinces[0].id
    that.setData({
      provinces: address.provinces,
      citys: address.citys[id],
      areas: address.areas[address.citys[id][0].id],
    })
  },
  // 点击所在地区弹出选择框
  selectDistrict: function (e) {
    var that = this

    if (that.data.addressMenuIsShow) {
      return
    }
    that.startAddressAnimation(true, 0);
  },
  onSaveAddress: function () {

  },
  onInputFocus: function (e) {
    this.startAddressAnimation(false, -200);
  },
  bindContacterInput: function (e) {
    var that = this;
    that.setData({ contacter: e.detail.value })
  },
  bindContacterPhoneInput: function (e) {
    var that = this;
    that.setData({ contactPhone: e.detail.value })
  },
  bindContacterAddressInput: function (e) {
    var that = this;
    that.setData({ contactAddress: e.detail.value })
  },
  //执行省市区选择pickerView动画
  startAnimation: function (isShow, offset) {
    var that = this
    var offsetTem
    if (offset == 0) {
      offsetTem = offset
    } else {
      offsetTem = offset + 'rpx'
    }
    this.animation.translateY(offset).step()
    this.setData({
      animationData: this.animation.export(),
      isVisible: isShow
    })
    console.log(that.data)
  },
  // 执行动画
  startAddressAnimation: function (isShow) {
    console.log(isShow)
    var that = this
    if (isShow) {
      that.animation.translateY(0 + 'vh').step()
    } else {
      that.animation.translateY(40 + 'vh').step()
    }
    that.setData({
      animationAddressMenu: that.animation.export(),
      addressMenuIsShow: isShow,
    })
  },
  // 点击地区选择取消按钮
  cityCancel: function (e) {
    this.startAddressAnimation(false, -200)
  },
  // 点击地区选择确定按钮
  citySure: function (e) {
    var that = this
    var city = that.data.city
    var value = that.data.value
    that.startAddressAnimation(false, -200);
    // 将选择的城市信息显示到输入框
    var areaInfo = that.data.provinces[value[0]].name + ' ' + that.data.citys[value[1]].name + ' ' + that.data.areas[value[2]].name
    that.setData({
      areaInfo: areaInfo,
    })
  },
  hideCitySelected: function (e) {
    console.log(e)
    this.startAddressAnimation(false, -200)
  },
  // 处理省市县联动逻辑
  cityChange: function (e) {
    console.log(e)
    var value = e.detail.value
    var provinces = this.data.provinces
    var citys = this.data.citys
    var areas = this.data.areas
    var provinceNum = value[0]
    var cityNum = value[1]
    var countyNum = value[2]
    if (this.data.value[0] != provinceNum) {
      var id = provinces[provinceNum].id
      this.setData({
        value: [provinceNum, 0, 0],
        citys: address.citys[id],
        areas: address.areas[address.citys[id][0].id],
      })
    } else if (this.data.value[1] != cityNum) {
      var id = citys[cityNum].id
      this.setData({
        value: [provinceNum, cityNum, 0],
        areas: address.areas[citys[cityNum].id],
      })
    } else {
      this.setData({
        value: [provinceNum, cityNum, countyNum]
      })
    }
  }
})