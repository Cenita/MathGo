// pages/result/index.js
import { fileUpload } from '../../models/math.js'
import {config} from "../../config";
const file = new fileUpload();
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
      isLoading: true,					// 判断是否尚在加载中
      math: {},						// 内容数据
      mask:false,
      width:0,
      height:0,
      imgsrc:'../../images/bgc.png',
      loading:true,
      result:{}
  },
  edit(){
      wx.navigateTo({
        url: '/pages/edit/index',
      })
  },
  back(){
      wx.navigateBack({
        delta:2
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      width:options.width,
      height:options.height,
      // math: app.towxml("$2+59=as$", 'markdown'),
      // result:app.towxml("$15a=$", 'markdown'),
      imgsrc:options.src
    })
    console.log(that.data.imgsrc)
    file.inferImage(that.data.imgsrc).then(res=>{
        let math = app.towxml("$"+res.latex+"$", 'markdown');
        let result = app.towxml("$"+res.result+"$", 'markdown');
        that.setData({
            math: math,
            result:result,
            loading:false
        })
    }).catch(res=>{
        console.log(res)
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  start(e){
    console.log("123")
  },
})

