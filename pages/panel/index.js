import { httpGet } from '../../models/math.js'
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
const http = new httpGet();
Page({
  data: {
    penWidth: 2, // 画笔的大小
    penColor: '#333',
    activeIndex: 0,
    revoke: [],
    clear:false
  },
  onLoad: function () {
      // http.getPannelStatus().then(res=>{
      //   if(!res.pannel){
      //       wx.showModal({
      //           title: '提示',
      //           showCancel: false,//是否显示取消按钮
      //           content: '绘画功能正在上线中',
      //           success: function (res) {
      //               if (res.confirm) {//这里是点击了确定以后
      //                   wx.navigateTo({
      //                       url: `/pages/first/index`
      //                   })
      //               } else {//这里是点击了取消以后
      //                   console.log('用户点击取消')
      //               }
      //           }
      //       })
      //   }
      // })
      const query = wx.createSelectorQuery()
      this.canvas = query.select('#myCanvas')
      console.log(this.canvas)
      query.select('#myCanvas').fields({ node: true, size: true }).exec((res)=>{
        const canvas = res[0].node   // 
        this.canvas = canvas
        console.log(res)
        this.ctx  = canvas.getContext('2d')
        this.canvas.width = res[0].width
        this.canvas.height  = res[0].height
        this.ctx.fillStyle = "#fff"
        this.ctx.fillRect(0, 0, 750, 600)
        
        
      })
    
    
   
  },
  startX: 0,
  startY: 0,
  begin: false,
  canvasHistory :[],  // 绘制历史
  step : -1,
  touchStart: function (e) {
    if(this.data.clear == false)
    {
      this.setStyle();
      this.startX = e.changedTouches[0].x;
      this.startY = e.changedTouches[0].y;
      this.ctx.beginPath();
    }else {
      
    }
  },
  touchMove: function (e) {
   
    if(this.data.clear == false)
    {
      this.ctx.moveTo(this.startX,this.startY)
       this.startX = e.changedTouches[0].x;
      this.startY = e.changedTouches[0].y;
      this.ctx.lineTo(this.startX, this.startY);
      this.ctx.stroke();
    }else {
      this.startX = e.changedTouches[0].x;
      this.startY = e.changedTouches[0].y;
      // this.ctx.clearRect(this.startX-5,this.startY-5,10,10);
      this.ctx.beginPath();
      this.ctx.arc(this.startX ,  this.startY, 10, 0, 2 * Math.PI);
      this.ctx.closePath();
      this.ctx.fillStyle = 'white';
      this.ctx.fill();
    }
    
  },
  touchEnd: function (e) {
    // wx.setStorageSync('draft', this.actions)
    this.step++;
    if (this.step < this.canvasHistory.length) {
    	this.canvasHistory.length = this.step; // 截断数组
    }
    this.canvasHistory.push(this.canvas.toDataURL()); 
    this.ctx.closePath();
  },
  // 撤回
  revokeCanvas:function (e) {
    console.log(this.step)
    if(this.step > 0 )
    {
      this.step--;
      let canvasPic = this.canvas.createImage()
      canvasPic.src = this.canvasHistory[this.step];
      canvasPic.onload = ()=>{
        this.ctx.drawImage(canvasPic, 0, 0);
      }
    }else {
     
      wx.showModal({
        title: '不能继续撤销了',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  
    
  },
  setStyle: function () {
    
    this.ctx.lineWidth = this.data.penWidth
    this.ctx.lineCap="round"
  },
  //画笔
  selectPenWidthTap(e){
    const i = e.currentTarget.dataset.index

      this.setData({
        clear:false,
        activeIndex:0,
        penColor: '#333',
        penWidth:2
      })
  },
  // 橡皮
  clearTap: function (e) {
    const i = e.currentTarget.dataset.index

    this.setData({
      clear:true,
      penWidth:4,
      penColor: '#fff',
      activeIndex:2
    })
  },
  // 清除
  deleteTap:function (e) {
      const i = e.currentTarget.dataset.index
      this.setData({
        activeIndex:3
      })
      this.ctx.clearRect(0, 0, 750, 750);
      this.ctx.fillStyle = '#fff';
      this.ctx.fillRect(0, 0, 750, 750);
  },
  confirmTap: function () {
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      fileType: 'jpg',
      width: 750,
      height: 750,
      destWidth: 300,
      destHeight: 300,
      canvas:this.canvas,
      success: function (res) {
        var tempImagePaths = res.tempFilePath;
        wx.navigateTo({
          // url: `/pages/result/index?src=${tempImagePaths}&operation=pannel`
          
            url: `/pages/pic/index?src=${tempImagePaths}`+'&types=panel'
          
          
        })
      },fail:function(err){
        console.log(err)
      }
    },this)
  }, 
})