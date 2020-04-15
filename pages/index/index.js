
Page({
  data:{
    light:false,
    flash:'off',
    borderwidth:0,
    borderheight:0,
    allwidth:0,
    allheight:0,
    show:false,
    groups:[
        { text: '从相册选择图片', value: 1 },
        { text: '从聊天记录中选择', value: 2 }
    ]
  },
  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        wx.navigateTo({
          url: `/pages/pic/index?src=${res.tempImagePath}`+
          `&width=${this.data.borderwidth}`+
          `&height=${this.data.borderheight}`+
          `&allwidth=${this.data.allwidth}`+
          `&allheight=${this.data.allheight}`
        })
      }
    })
  },
  imgBtn(e){
    var e = e.detail.index
    if(e == 0)
    {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          const tempFilePaths = res.tempFilePaths
          wx.navigateTo({
            url: `/pages/pic/index?src=${tempFilePaths}`
          })
          console.log(tempFilePaths)
        },
      })
      this.setData({
        show: false
      })
    }
    else {
      wx.chooseMessageFile({
        count: 1,
        type: 'image',
        success(res) {
          
          var  temp = res.tempFiles[0].path
          
          wx.navigateTo({
            url: `/pages/pic/index?src=${temp}`
          })
        }
      })
      this.setData({
        show: false
      })
    }
  },
  backhome(){
    wx.navigateBack({
      delta: 1,
    })
  },
  openmask(){
    this.setData({
      show:true
    })
  },
  closemask(){
    this.setData({
      show:false
    })
  },
  lightshow(){
    let flash = this.data.flash == 'on' ? 'off' : 'on'
    
    this.setData({
      light:!this.data.light,
      flash:flash
    })
  },
  chooseimg(){
    
    
  },
  onLoad(){
    this.setData({
      width: wx.getSystemInfoSync().screenWidth,
      height: wx.getSystemInfoSync().screenHeight
    })
      // 获取相框的宽高给裁剪页面
    var query = wx.createSelectorQuery();
    var that = this;
    query.select('.border_s').boundingClientRect(function (rect) {
      that.setData({
        borderwidth: rect.width,
        borderheight:rect.height
      })
    }).exec();

    query.select('.camera').boundingClientRect(function (rect) {
     
      that.setData({
        allwidth: rect.width,
        allheight:rect.height
      })
    }).exec();



  },
  
  
})

