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
        hua:"",
        imgsrc:'../../images/bgc.png',
        loading:false,
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
        mode:"four",
        type:'',
        showHua:false,
        error_result:[],
        modification:["空","0","1","2","3","4","5","6","7","8","9","(",")","+","-","×","/","."],
        modifiView:false,
        nowChangeChar:""
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
            mode:options.operation,
            type:options.type
        })
        if(options.operation==='four'){
            file.inferImage(that.data.imgsrc).then(res=>{
                console.log(res)
                let math = app.towxml("$"+res.latex+"$", 'markdown');
                let result = app.towxml("$= "+res.result+"$", 'markdown');
                if(res.hua!=""){
                    let hua = app.towxml("$= "+res.hua+"$", 'markdown');
                    that.setData({
                      showHua:true,
                      hua:hua
                    })
                }
                that.setLocation(res.location);
                that.stopLoading();
                that.setData({
                    originLetex:res.result,
                    math: math,
                    result:result,
                    loading:false,
                    error_result:res.mayError_char
                })
                var exprs = wx.getStorageSync("storage") || []
                var expr = { 
                    type: this.data.type,
                    img: this.data.imgsrc,
                    math:res.latex,
                    hua:res.hua,
                    result:res.result
                }
                exprs.push(expr)
                //将添加的元素存储到本地
                wx.setStorageSync("storage", exprs)
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
    showModify:function (c) {
        c = c.currentTarget.dataset
        this.setData({ modifiView: true,nowChangeChar:c });
    },
    modifyClose:function(){
        this.setData({ modifiView: false });
    },
    modifyConfirm:function(e){
        let val = e.detail.value;
        let er = `error_result[${this.data.nowChangeChar.index}][2]`;
        this.setData({
            [er]:val,
            modifiView: false
        })
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

