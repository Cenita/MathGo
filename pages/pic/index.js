import { MathModel } from '../../models/math.js'
const mathModel = new MathModel()

Page({
  data: {
      src:'',
      width:400,//裁剪框初始宽度
      height: 200,//裁剪框初始高度
      imgWidth:400, // 图片宽
      imgHeight: 600, // 图片高
      picimg:'',
      array: ['微积分', '三角函数', '线性方程', '矩阵','分数表达式'],
      index:0,
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  onLoad: function (options) {
        console.log(options)
        if (options.width == undefined)
        {
            console.log("我是空的")
        }
        else {
                var allwidth  = options.allwidth 
                var allheight = options.allheight
                this.setData({
                    width:allwidth,
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
        wx.compressImage({
            src: tempImagePaths, // 图片路径
            quality: 80, // 压缩质量
            success(res){
                console.log(res.tempFilePath) 
            }
        })
        let type =  this.data.array[this.data.index]
        var exprs = wx.getStorageSync("storage") || []
        var expr = { type: type, img: tempImagePaths}
        exprs.push(expr)
        //将添加的元素存储到本地
        wx.setStorageSync("storage", exprs)
        wx.navigateTo({
            url: `/pages/result/index?src=${tempImagePaths}`+`&width=${this.data.width}`+`&height=${this.data.height}`
        })
  }
})