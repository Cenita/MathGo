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
      cut_top:0,
      cut_left:0,
      status:'camera'
  },
  getIndex(e){
    let tabIndex = e.detail.index;
    this.setData({
      index: tabIndex
    })
  },
  onLoad: function (options) {
    let info = wx.getSystemInfoSync()
    if(options.types == 'panel')
    {
      let num = 300
      let cut_top = (info.windowHeight - num) * 0.3;
      let cut_left = (info.windowWidth - num) * 0.5;
       this.setData({
          status:'panel',
          width:num,
          height:num,
          imgWidth:num,
          imgHeight:num,
          cut_top:cut_top,
          cut_left:cut_left
       })
       
    }else {
     
        var allwidth  = options.allwidth 
        var allheight = options.allheight
        this.setData({
            width:allwidth*0.8,
            allheight:allheight*0.2,
            imgWidth:allwidth,
            imgHeight:allheight,
            
        })
    }
    
   

    let that = this;
    http.getModeStuts().then(res=>{
        that.setData({
            modeList:res
        })
    })
      
     
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
    if(this.data.status == 'xiangji'){
      this.cropper.imgReset();
    }
    wx.hideLoading();
  },
  clickcut(e) {
      // let url = JSON.stringify({
      //     "url":e.detail.operation
      // });
      let url = e.detail.operation;
      url = url.replace("?","%1")
      url = url.replace("=","%2")
      var tempImagePaths = e.detail.url
      let status = this.data.status
      // let types = e.detail.name;
      let types   =  "四则运算";
      console.log(`/pages/result/index?operation=${url}&src=${tempImagePaths}&width=${e.detail.width}&height=${e.detail.height}&type=${types}&status=${status}`)
        wx.navigateTo({
            url: `/pages/result/index?operation=${url}&src=${tempImagePaths}&width=${e.detail.width}&height=${e.detail.height}&type=${types}&status=${status}`
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