const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:'',
    type:'',
    math:{},
    hua:{},
    result:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let a = decodeURIComponent(options.math)
    let b = decodeURIComponent(options.hua)
    let c = decodeURIComponent(options.result)
    let type = options.type
    let img  = options.img
    let math = app.towxml("$"+a+"$", 'markdown');
    let hua = app.towxml("$"+b+"$", 'markdown');
    let result = app.towxml("$"+c+"$", 'markdown');
    console.log(math)
    this.setData({
      type,
      img,
      math,
      hua,
      result
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})