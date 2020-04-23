// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navlist:['全部','四则运算','一元二次','二元一次','矩阵运算','求和运算'],
    activeIndex:0,
    detail:[
      [],[],[],[],[],[]
    ],
    itemsHeight:0,
    show:false
  },
  changeTab(e){
    const i = e.currentTarget.dataset.index
    this.setData({
      activeIndex:i
    })
  },
  changeSwiper(e){
    let tempHeight = this.data.itemsHeight * (this.data.detail[e.detail.current].length)
    var   show = false
    if(tempHeight == 0)
    {
      tempHeight = 0 // 屏幕的高度
      show = true
    }

    this.setData({
      winHeight:tempHeight,
      activeIndex:e.detail.current,
      show
    })
  },
  // 跳转到搜索详情
  goDetail(e){
    const group = e.currentTarget.dataset.group
    const index = e.currentTarget.dataset.index

    let data = this.data.detail[group][index]
    let type =  data.type
    let img  =   data.img
    let math = data.math
    let hua = data.hua
    let result = data.result
    console.log(data)
    wx.navigateTo({
      url: `/pages/searchdetail/index?type=${type}&img=${img}&math=${math}&hua=${hua}&result=${result}`,
    })
  },
  onLoad: function (options) {
   
    this._formatData()
    
    this._initHeight()
    
  },
  // 分类筛选
  _formatData(){

    var exprs = wx.getStorageSync("storage") || []
    
    

    for (let i = 0,len=this.data.navlist.length;i<=len;i++)
    {
      for(let j=0,len2 = exprs.length;j<len2;j++)
      {
          if(exprs[j].type === this.data.navlist[i])
          {
              let  array = this.data.detail[i]
              array.unshift(exprs[j])
              this.setData({
                  detail: this.data.detail
              })
          }
          
      }
    }
   
    for (var i of exprs)
    {
      let array = this.data.detail[0]
        array.unshift(i)
        this.setData({
          detail: this.data.detail
        })
    }
   


    
    
  },
  // 初始化宽高
  _initHeight(){
    var query = wx.createSelectorQuery();
    query.selectAll('.query-0 .items').boundingClientRect( (rect) => {
      
      var windowheight = 0;
      if(rect[0] == null){
        this.setData({
          show:true
        })
        return
      }

      var itemsHeight = rect[0].height;
      
      
      for (var i = 0; i < rect.length;i++)
      { 
        windowheight += rect[i].height
      }
     
      this.setData({
        itemsHeight: itemsHeight,
        winHeight: windowheight,
      })
      
    }).exec();
    
  }
})

