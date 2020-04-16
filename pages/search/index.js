// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navlist:['全部','微积分','三角函数','线性方程','矩阵','分数表达式'],
    activeIndex:0,
    items:[],
    detail:[
      [
        {type: "微积分", img: "/images/search/int.jpg"},
        {type: "微积分", img: "/images/search/int2.jpg"},
        {type: "线性方程", img: "/images/search/fx.jpg"},
        {type: "矩阵", img: "/images/search/jz.jpg"},
        {type: "矩阵", img: "/images/search/jz2.jpg"},
      ],[
        {type: "微积分", img: "/images/search/int.jpg"},
        {type: "微积分", img: "/images/search/int2.jpg"},
      ],[

      ],[
        {type: "线性方程", img: "/images/search/fx.jpg"},
      ],[
        {type: "矩阵", img: "/images/search/jz.jpg"},
        {type: "矩阵", img: "/images/search/jz2.jpg"},
      ],[]
    ],
    itemsHeight:0,
  },
  changeTab(e){
    const i = e.currentTarget.dataset.index
    this.setData({
      activeIndex:i
    })
  },
  changeSwiper(e){
    let tempHeight = this.data.itemsHeight * (this.data.detail[e.detail.current].length)
    console.log(tempHeight)

    this.setData({
      winHeight:tempHeight,
      activeIndex:e.detail.current
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var exprs = wx.getStorageSync("storage") || []

    // this.setData({
    //   items: exprs
    // })
    // console.log(exprs)
    // let www = this.data.items
    
    // for (var i of www)
    // {
    //   // 全部
    //   let array = this.data.detail[0]
    //   array.unshift(i)
    //   this.setData({
    //     detail: this.data.detail
    //   })

    //   if (i.type == this.data.navlist[1])
    //   { 
    //     // 微积分
    //     let array  = this.data.detail[1]
    //     array.unshift(i)
    //     this.setData({
    //       detail: this.data.detail
    //     })
    //   } else if (i.type == this.data.navlist[2])
    //   {
    //     let array = this.data.detail[2]
    //     array.unshift(i)
    //     this.setData({
    //       detail: this.data.detail
    //     })
        
        
    //   } else if (i.type == this.data.navlist[3])
    //   {
    //     let array = this.data.detail[3]
    //     array.unshift(i)
    //     this.setData({
    //       detail: this.data.detail
    //     })
    //   } else if (i.type == this.data.navlist[4]) {
    //     let array = this.data.detail[4]
    //     array.unshift(i)
    //     this.setData({
    //       detail: this.data.detail
    //     })
    //   } else if (i.type == this.data.navlist[5]) {
    //     let array = this.data.detail[5]
    //     array.unshift(i)
    //     this.setData({
    //       detail: this.data.detail
    //     })
    //   } else if (i.type == this.data.navlist[6]) {
    //     let array = this.data.detail[6]
    //     array.unshift(i)
    //     this.setData({
    //       detail: this.data.detail
    //     })
    //   }
    //   else {
    //     console.log(i)
    //   }
    // }
 
    var query = wx.createSelectorQuery();
    var that = this;
    query.selectAll('.query-0 .items').boundingClientRect(function (rect) {
      
      var windowheight = 0;
      var itemsHeight = rect[0].height;
      
      
      for (var i = 0; i < rect.length;i++)
      { 
        windowheight += rect[i].height
      }
      that.setData({
        itemsHeight: itemsHeight,
        winHeight: windowheight
      })
      
    }).exec();
    
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

