// components/mask/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ''
    },
    cancelText: {
      type: String,
      value: '取消'
    },
    actions: {
      type: Array,
      value: [],
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
      // title:'识别类型',
      // cancelText:'取消选择',
      // actions:[
      //   { text: '微积分', value: 1 },
      //   { text: '数学表达式', value: 2 },
      //   { text: '矩形', value: 3 }
      // ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    test(){
      
    },
    indexTap(e){
      var index = e.currentTarget.dataset.index
      this.triggerEvent('actiontap', { index: index });

    }
  }
})
