// pages/edit/inde.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    KeyboardKeys: ['a', 'b', 'c', 'd', 'e', 6, 7, 8, 9, '·', 0, '<'],
    keyShow: false,
    isLoading: true,					// 判断是否尚在加载中
    article: {},
    string: [
      {
        type: 'int', content: [
          { value: '0' },
          { value: '8' }
        ]
      },
      {
        type: 'frac', content: [
          { value: 'asd' },
          { value: '1+1e' }
        ]
      },
      {
        type: 'frac', content: [
          { value: 'aaa' },
          { value: '1+bb' }
        ]
      },
    ],
    img:[
      '/images/math/jifen.png',
      '/images/math/frac.png',
      '/images/math/frac.png',
    ]
  },
  //点击界面键盘消失
  hindKeyboard() {
    this.setData({
      keyShow: false
    });
  },
  //点击输入框，键盘显示
  showKeyboard() {
    this.setData({
      keyShow: true
    });
  },
  ok(){
    let t = this.data.string
    console.log(this.data.string[1].content[0].value)
  },
  bindblur(e){
    
    // let groups = e.currentTarget.dataset.groupindex
    // let index = e.currentTarget.dataset.index
    // let value = e.detail.value
    // let temp = this.data.string[groups].content[index].value
    // this.data.string[groups].content[index].value = value
    // this.setData({
    //   string:this.data.string
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let arr = [
      '0', '8', '1', '1', '3', 'e', 'dxaasddd'
    ]


    let str = `$\\int_{${arr[0]}}^${arr[1]}\\frac{${arr[2]}}{${arr[3]}+{${arr[5]}}}${arr[6]}=3\\ln3$`
    // this.setData({
    //   string:arr
    // })
    let result = app.towxml(str, 'markdown', {
      // base: 'https://xxx.com',				// 相对资源的base路径
      // theme: 'dark',					// 主题，默认`light`
      events: {					// 为元素绑定的事件方法
        tap: (e) => {
          console.log('tap', e);
        }
      }
    });

    // 更新解析数据
    this.setData({
      article: result,
      isLoading: false
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
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