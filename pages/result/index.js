// pages/result/index.js
import { fileUpload } from '../../models/math.js'
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
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
          imgsrc:options.src
      })
      console.log(options)
    if(options.operation==='four'){
        console.log(that.data.imgsrc)
        file.inferImage(that.data.imgsrc).then(res=>{
            let math = app.towxml("$"+res.latex+"$", 'markdown');
            let result = app.towxml("$= "+res.result+"$", 'markdown');
            that.setData({
                math: math,
                result:result,
                loading:false
            })
            if(result!='计算错误')
                Notify({ type: 'success', message: '识别成功',duration:1500 });
        }).catch(res=>{
            Notify({ type: 'warning', message: '发生错误',duration:3000 });
            console.log("发生错误")
        })
    }else if(options.operation==='ju'){
        setTimeout(()=>{
            let math = app.towxml("$\\begin{bmatrix}3&2&1\\\\9&2&6\\end{bmatrix}+\\begin{bmatrix}2&5&1\\\\3&4&2\\end{bmatrix}$", 'markdown');
            let result = app.towxml("$\\begin{bmatrix}5&7&2\\\\12&6&8\\end{bmatrix}$", 'markdown');
            that.setData({
                math: math,
                result:result,
                loading:false
            })
            Notify({ type: 'success', message: '识别成功',duration:1500 });
        },1000)
    }else if(options.operation==='eryuan'){
        setTimeout(()=>{
            let math = app.towxml("$\\left\\{\\begin{matrix}x+y=7 \\\\ 2x+3y=18\\end{matrix}\\right.$", 'markdown');
            let result = app.towxml("$\\left\\{\\begin{matrix}x=3 \\\\ y=4\\end{matrix}\\right.$", 'markdown');
            that.setData({
                math: math,
                result:result,
                loading:false
            })
            Notify({ type: 'success', message: '识别成功',duration:1500 });
        },1000)
    }else if(options.operation==='yiyuan'){
        setTimeout(()=>{
            let math = app.towxml("$x^{2}+2x+1=0$", 'markdown');
            let result = app.towxml("$\\left\\{\\begin{matrix}x=+2 \\\\ x=-2\\end{matrix}\\right.$", 'markdown');
            that.setData({
                math: math,
                result:result,
                loading:false
            })
            Notify({ type: 'success', message: '识别成功',duration:1500 });
        },1000)
    }else if(options.operation==='he'){
        setTimeout(()=>{
            let math = app.towxml("$\\sum_{i=1}^{4}{2X}$", 'markdown');
            let result = app.towxml("$20$", 'markdown');
            that.setData({
                math: math,
                result:result,
                loading:false
            })
            Notify({ type: 'success', message: '识别成功',duration:1500 });
        },1000)
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  start(e){
    console.log("123")
  },
})

