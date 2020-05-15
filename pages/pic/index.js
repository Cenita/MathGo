import { httpGet } from '../../models/math.js'
const http = new httpGet();
Page({
  data: {
      src:'',
      width:300,//裁剪框初始宽度
      height: 200,//裁剪框初始高度
      minWidth:20,
      minHeight:20,
      imgWidth:400, // 图片宽
      imgHeight: 600, // 图片高
      picimg:'',
      modeList: [],
      index:0,
  },
  getIndex(e){
    let tabIndex = e.detail.index
    this.setData({
      index: tabIndex
    })
  },
  onLoad: function (options) {
      let that = this;
      http.getModeStuts().then(res=>{
          that.setData({
              modeList:res
          })
      })
        console.log(options)
        if (options.width == undefined)
        {
            console.log("我是空的")
        }
        else {
                var allwidth  = options.allwidth 
                var allheight = options.allheight
                this.setData({
                    width:allwidth*0.8,
                    allheight:allheight*0.2,
                    imgWidth:allwidth,
                    imgHeight:allheight
                })
        }
      const img = options.src;
      this.cropper = this.selectComponent("#image-cropper");
      //开始裁剪
      this.setData({
          src:img
      });
  },
  cropperload(e){
      console.log("cropper初始化完成");
  },
  loadimage(e){
        // 重置图片角度、缩放、位置
    this.cropper.imgReset();
    wx.hideLoading();
  },
  clickcut(e) {
        var tempImagePaths = e.detail.url
        let type =  this.data.modeList[this.data.index]
        // var exprs = wx.getStorageSync("storage") || []
        // var expr = { type: type, img: tempImagePaths}
        // exprs.push(expr)
        // //将添加的元素存储到本地
        // wx.setStorageSync("storage", exprs)
        wx.navigateTo({
            url: `/pages/result/index?operation=${e.detail.operation}&src=${tempImagePaths}&width=${e.detail.width}&height=${e.detail.height}&type=${type}`
        })
  },
    returnToCamera(e){
        // wx.navigateTo({
        //     url: `/pages/index/index`
        // })
        wx.navigateBack({
          delta:1
        })
    }
})