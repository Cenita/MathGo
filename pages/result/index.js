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
        hua:{},
        imgsrc:'../../images/bgc.png',
        loading:true,
        result:{},
        scanAni:"",
        scanXunHuan:"",
        trackingBox:{
            top:'0px',
            left:"0px",
            width:'50px',
            height:'50px'
        },
        showTrack:false,
        mode:"four"
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
            imgsrc:options.src,
            mode:options.operation
        })
        console.log()
        if(options.operation==='four'){
            console.log(that.data.imgsrc)
            file.inferImage(that.data.imgsrc).then(res=>{
                let math = app.towxml("$"+res.latex+"$", 'markdown');
                let result = app.towxml("$= "+res.result+"$", 'markdown');
                let hua = app.towxml("$= "+res.hua+"$", 'markdown');
                that.setLocation(res.location);
                that.stopLoading();
                that.setData({
                    math: math,
                    result:result,
                    loading:false,
                    hua:hua
                })
                if(math=='识别错误'){
                    Notify({ type: 'warning', message: '识别错误',duration:1500 });
                }
                else if(result!='计算错误')
                    Notify({ type: 'success', message: '识别成功',duration:1500 });
            }).catch(res=>{

                Notify({ type: 'warning', message: '发生错误',duration:3000 });
                console.log("发生错误",res)
            })
        }
            // else if(options.operation==='ju'){
        //     setTimeout(()=>{
        //         let math = app.towxml("$\\begin{bmatrix}3&2&1\\\\9&2&6\\end{bmatrix}+\\begin{bmatrix}2&5&1\\\\3&4&2\\end{bmatrix}$", 'markdown');
        //         let result = app.towxml("$= \\begin{bmatrix}5&7&2\\\\12&6&8\\end{bmatrix}$", 'markdown');
        //         that.setData({
        //             math: math,
        //             result:result,
        //             loading:false
        //         })
        //         Notify({ type: 'success', message: '识别成功',duration:1500 });
        //     },1000)
        // }else if(options.operation==='eryuan'){
        //     setTimeout(()=>{
        //         let math = app.towxml("$\\left\\{\\begin{matrix}x+y=7 \\\\ 2x+3y=18\\end{matrix}\\right.$", 'markdown');
        //         let result = app.towxml("$= \\left\\{\\begin{matrix}x=3 \\\\ y=4\\end{matrix}\\right.$", 'markdown');
        //         that.setData({
        //             math: math,
        //             result:result,
        //             loading:false
        //         })
        //         Notify({ type: 'success', message: '识别成功',duration:1500 });
        //     },1000)
        // }else if(options.operation==='yiyuan'){
        //     setTimeout(()=>{
        //         let math = app.towxml("$x^{2}+2x+1=0$", 'markdown');
        //         let result = app.towxml("$= \\left\\{\\begin{matrix}x=+2 \\\\ x=-2\\end{matrix}\\right.$", 'markdown');
        //         that.setData({
        //             math: math,
        //             result:result,
        //             loading:false
        //         })
        //         Notify({ type: 'success', message: '识别成功',duration:1500 });
        //     },1000)
        // }else if(options.operation==='he'){
        //     setTimeout(()=>{
        //         let math = app.towxml("$\\sum_{i=1}^{4}{2X}$", 'markdown');
        //         let result = app.towxml("$= 20$", 'markdown');
        //         that.setData({
        //             math: math,
        //             result:result,
        //             loading:false
        //         })
        //         Notify({ type: 'success', message: '识别成功',duration:1500 });
        //     },1000)
        // }else if(options.operation==='pannel'){
        //     setTimeout(()=>{
        //         let math = app.towxml("$2+6$", 'markdown');
        //         let result = app.towxml("$= 8$", 'markdown');
        //         that.setData({
        //             math: math,
        //             result:result,
        //             loading:false
        //         })
        //         Notify({ type: 'success', message: '识别成功',duration:1500 });
        //     },1000)
        // }
    },
    onReady(){
        let scanAnimation = wx.createAnimation({
            duration:2000,
            timingFunction:'ease-in-out',
            delay:0
        })
        scanAnimation.top('160px').opacity(0).step().top("-40px").opacity(1).step({duration:0});
        this.setData({
            scanAni:scanAnimation.export()
        })
        let xh = setInterval(function () {
            this.setData({
                scanAni:"",
            })
            let scanAnimation = wx.createAnimation({
                duration:2000,
                timingFunction:'ease-in-out',
                delay:0,
            })
            scanAnimation.top('160px').opacity(0).step().top("-40px").opacity(1).step({duration:0});
            this.setData({
                scanAni:scanAnimation.export()
            })
        }.bind(this),2000)
        this.setData({
            scanXunHuan:xh
        })
    },
    methods:{

    },
    setLocation:function(location){
        let zuobiao = location;
        let width = wx.getSystemInfoSync().windowWidth;
        if((this.data.height/this.data.width)*width>200) {
            let b = this.data.height / 200;
            let w = this.data.width / b;
            let lx = width / 2 - w / 2;
            let tb = {
                top: zuobiao.y / b + 'px',
                left: lx + zuobiao.x / b + 'px',
                width: zuobiao.width / b + 'px',
                height: zuobiao.height / b + 'px'
            }
            this.setData({
                trackingBox: tb
            })
        }else{
            let b = this.data.width / width;
            console.log(this.data.width,width,b)
            let h = this.data.height / b;
            let lx = 100 - h / 2;
            let tb = {
                top: lx + zuobiao.y / b + 'px',
                left: zuobiao.x / b + 'px',
                width: zuobiao.width / b + 'px',
                height: zuobiao.height / b + 'px'
            }
            this.setData({
                trackingBox: tb
            })
        }
        this.setData({
            showTrack: true
        })
    }
    ,
    stopLoading:function () {
        clearInterval(this.data.scanXunHuan)
        this.setData({
            loading:false,
            scanAni:""
        })
    },
    /**
    * 生命周期函数--监听页面初次渲染完成
    */
    start(e){
    console.log("123")
    },
})

