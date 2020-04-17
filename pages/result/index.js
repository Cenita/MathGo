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
    
    



    let arr = [
      '0','8','1','1','3','e','dxaasddd'
    ]
    
    
    let str = `$\\frac{5}{3} + \\frac{6}{5} =$`
    let result = app.towxml(str, 'markdown', {
      events: {					// 为元素绑定的事件方法
        tap: (e) => {
          console.log('tap', e);
        }
      }
    });
    let str1 = `$\\frac{43}{15}$`
    let result1 = app.towxml(str1, 'markdown', {
        events: {					// 为元素绑定的事件方法
            tap: (e) => {
                console.log('tap', e);
            }
        }
    });
    // 更新解析数据
    // this.setData({
    //     article: result,
    //     isLoading: false,
    //     result_text:result1
    // });
    this.setData({
      width:options.width,
      height:options.height,
      imgsrc:options.src
    })

    var that = this
    setTimeout(function () {
      wx.hideLoading()
      that.setData({
        mask:false
      })
    }, 2000)
    console.log(that.data.imgsrc)
    file.inferImage(that.data.imgsrc).then(res=>{
        let math = app.towxml("$"+res.latex+"$", 'markdown');
        let result = app.towxml("$"+res.result+"$", 'markdown');
        that.setData({
            math: math,
            result:result
        })
    }).catch(res=>{
        console.log(res)
    })
    // wx.uploadFile(
    //     {
    //         url:"http://192.168.1.185:12005/infer",
    //         filePath:that.data.imgsrc,
    //         name:"input",
    //         success:function (res) {
    //             let data = JSON.parse(res.data)
    //             console.log(data)
    //             console.log(data.latex)
    //             let math = app.towxml("$"+data.latex+"$", 'markdown');
    //             let result = app.towxml("$"+data.result+"$", 'markdown');
    //             that.setData({
    //                 math: math,
    //                 result:result
    //             })
    //         },
    //         fail:function (res) {
    //             console.log(res)
    //         }
    //     }
    // )
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  start(e){
    console.log(e)
  },
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

