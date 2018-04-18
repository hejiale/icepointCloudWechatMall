// pages/editAddress/editAddress.js

var address = require('../../utils/city.js')
var animation
var app = getApp();

Page({
  data: {
    showOrHide: 'hide',
    contacter: '',
    contactPhone: '',
    locationStr: '',
    contactAddress: '',
    addressId: '',
    currentAddressObject: null,
    menuType: 0,
    begin: null,
    status: 1,
    end: null,
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
    var animation = wx.createAnimation({
      duration: 500,
      transformOrigin: "50% 50%",
      timingFunction: 'ease',
    })
    this.animation = animation;
    // 默认联动显示北京
    var id = address.provinces[0].id
    this.setData({
      provinces: address.provinces,
      citys: address.citys[id],
      areas: address.areas[address.citys[id][0].id],
    })
  },
  // 显示
  showMenuTap: function (e) {
    console.log('selectState')
    //获取点击菜单的类型 1点击状态 2点击时间 
    var menuType = e.currentTarget.dataset.type
    // 如果当前已经显示，再次点击时隐藏
    if (this.data.isVisible == true) {
      this.startAnimation(false, -200)
      return
    }
    this.setData({
      menuType: menuType
    })
    this.startAnimation(true, 0)
  },
  hideMenuTap: function (e) {
    this.startAnimation(false, -200)
  },
  // 执行动画
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
  // 点击所在地区弹出选择框
  selectDistrict: function (e) {
    var that = this
    console.log('111111111')
    if (that.data.addressMenuIsShow) {
      return
    }
    that.startAddressAnimation(true)
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
    this.startAddressAnimation(false)
  },
  // 点击地区选择确定按钮
  citySure: function (e) {
    var that = this
    var city = that.data.city
    var value = that.data.value
    that.startAddressAnimation(false)
    // 将选择的城市信息显示到输入框
    var areaInfo = that.data.provinces[value[0]].name + ' ' + that.data.citys[value[1]].name + ' ' + that.data.areas[value[2]].name
    that.setData({
      areaInfo: areaInfo,
    })
  },
  hideCitySelected: function (e) {
    console.log(e)
    this.startAddressAnimation(false)
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
    console.log(this.data)
  },
  onSaveAddress: function () {
    var contactName = this.data.contacter.length > 0 ? this.data.contacter : this.data.currentAddressObject.contactorName
    var phone = this.data.contactPhone.length > 0 ? this.data.contactPhone : this.data.currentAddressObject.contactorPhone
    var address = this.data.contactAddress.length > 0 ? this.data.contactAddress : this.data.currentAddressObject.detailAdress

    if (contactName.length > 0 && phone.length > 0 && address.length > 0) {
      if (this.data.currentAddressObject) {
        wx.request({
          url: app.HostURL + '/wechat/webapp/user/updateAddress',
          data: {
            sessionId: app.globalData.ipcApp.getSessionID(),
            contactorName: contactName,
            contactorPhone: phone,
            detailAdress: address,
            id: this.data.addressId
          },
          method: 'POST',
          header: { 'content-type': 'application/json' },
          success: function (res) {
            console.log(res)
            if (res.data.retCode == 0) {
              wx.showToast({
                title: '更新地址成功'
              })
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })
      } else {
        console.log(app.globalData.ipcApp.getSessionID())

        wx.request({
          url: app.HostURL + '/wechat/webapp/user/saveAddress',
          data: {
            sessionId: app.globalData.ipcApp.getSessionID(),
            contactorName: contactName,
            contactorPhone: phone,
            detailAdress: address
          },
          method: 'POST',
          header: { 'content-type': 'application/json' },
          success: function (res) {
            console.log(res)
            if (res.data.retCode == 0) {
              wx.showToast({
                title: '新建地址成功'
              })
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })
      }
    }
  },
  
  onInputFocus: function (e){
    this.startAddressAnimation(false)
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
  }
})