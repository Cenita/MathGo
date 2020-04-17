Page({
  data: {
    penWidth: 2, // 画笔的大小
    penColor: '#333',
    activeIndex: -1,
    revoke: [],
  },
  onLoad: function () {
    this.context = wx.createCanvasContext('myCanvas');
    this.context.setFillStyle('white')
    this.context.fillRect(0, 0, 750, 600)
    this.context.draw()
  },
  startX: 0,
  startY: 0,
  begin: false,
  actions: [],
  touchStart: function (e) {
    this.setStyle();
    this.startX = e.changedTouches[0].x;
    this.startY = e.changedTouches[0].y;
    this.context.beginPath();
    var revoke = this.data.revoke;
    revoke.push(this.actions.length);
    this.setData({
      revoke: revoke
    });
    var actions = this.context.getActions();
    this.actions = this.actions.concat(actions);
    wx.drawCanvas({
      canvasId: "myCanvas",
      actions: actions,
      reserve: true
    }) 
  },
  touchMove: function (e) {
    this.context.moveTo(this.startX, this.startY);
    this.startX = e.changedTouches[0].x;
    this.startY = e.changedTouches[0].y;
    this.context.lineTo(this.startX, this.startY);
    this.context.stroke();
    var actions = this.context.getActions();
    this.actions.push(actions[0]);
    wx.drawCanvas({
      canvasId: 'myCanvas',
      reserve: true,
      actions: actions
    })
  },
  touchEnd: function (e) {
    wx.setStorageSync('draft', this.actions)
  },
  // 撤回
  revokeCanvas:function (e) {
    const i = e.currentTarget.dataset.index

    this.setData({
      activeIndex:1
    })
    var revoke = this.data.revoke;
    if (revoke.length != 0) {
      wx.drawCanvas({
        canvasId: "myCanvas",
        actions: [],
        reserve: false
      });
      this.actions = this.actions.slice(0, revoke[revoke.length - 1]);
      wx.drawCanvas({
        canvasId: "myCanvas",
        actions: this.actions,
        reserve: true
      })
      revoke.pop();
      this.setData({
        revoke: revoke
      })
    }
  },




  setStyle: function () {
    this.context.setStrokeStyle(this.data.penColor)
    this.context.setLineWidth(this.data.penWidth)
    this.context.setLineCap('round') // 让线条圆润
    this.context.setLineJoin("round")
  },
  //画笔
  selectPenWidthTap(e){
    const i = e.currentTarget.dataset.index

      this.setData({
        activeIndex:0,
        penColor: '#333',
        penWidth:2
      })
  },
  // 橡皮
  clearTap: function (e) {
    const i = e.currentTarget.dataset.index

    var penColor = '#ffffff';
    this.setData({
      penWidth:4,
      penColor: penColor,
      activeIndex:2
    })
  },
  // 清除
  deleteTap:function (e) {
      const i = e.currentTarget.dataset.index
      this.setData({
        activeIndex:3
      })
      this.context.clearRect(0, 0, 750, 700);
      this.context.draw();
      this.context = wx.createCanvasContext('myCanvas');
      this.context.setFillStyle('white')
      this.context.fillRect(0, 0, 750, 700)
      this.context.draw()
      this.setData({
        isClear: false,
      })
  },
  confirmTap: function () {
    var that = this;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      fileType: 'jpg',
      width: 750,
      height: 700,
      destWidth: 300,
      destHeight: 300,
      canvasId: 'myCanvas',
      success: function (res) {
        var tempImagePaths = res.tempFilePath;
        wx.navigateTo({
          url: `/pages/result/index?src=${tempImagePaths}&operation=pannel`
        })
      }
    })
  }, 
})