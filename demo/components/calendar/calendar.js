// components/calendar/calendar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    currentYear: { //显示当前年
      type: Number,
      value: new Date().getFullYear()
    },
    currentMonth: { //显示当前月
      type: Number,
      value: new Date().getMonth() + 1
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
    currentMonthDateLen: 0, // 当月天数
    preMonthDateLen: 0, // 当月中，上月多余天数
    allArr: [], // 当月所有数据
    className: ''
  },

  ready() {
    this.getAllArr();
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //获取某年某月总共多少天
    getDateLen(year, month) {
      let actualMonth = month - 1;
      let timeDistance = +new Date(year, month) - +new Date(year, actualMonth);
      return timeDistance / (1000 * 60 * 60 * 24);
    },

    //获取某月1号是周几
    getFirstDateWeek(year, month) {
      return new Date(year, month - 1, 1).getDay();
    },

    //获取当月数据，返回数组
    getCurrentArr() {
      let currentMonthDateLen = this.getDateLen(this.data.currentYear, this.data.currentMonth);
      let currentMonthDateArr = [];
      let _date = new Date();
      let _year = _date.getFullYear();
      let _month = _date.getMonth() + 1;
      let _day;
      if (_year == this.data.currentYear && _month == this.data.currentMonth) {
        _day = Number(_date.getDate());
      }
      let className = 'current';
      if (currentMonthDateLen > 0) {
        for (let i = 1; i <= currentMonthDateLen; i++) {
          if (_day == i) {
            className = 'current here';
          } else {
            className = 'current';
          }
          currentMonthDateArr.push({
            month: className, //添加的标识，区分不是本月的天数
            date: i
          })
        }
        this.setData({
          currentMonthDateLen
        })
        return currentMonthDateArr;
      }
    },

    //上月   年月
    preMonth(year, month) {
      if (month == 1) {
        return {
          year: --year,
          month: 12
        }
      } else {
        return {
          year: year,
          month: --month
        }
      }
    },

    //获取当月中，上月多余数据，返回数组
    getPreArr() {
      let preMonthDateLen = this.getFirstDateWeek(this.data.currentYear, this.data.currentMonth) - 1; // 当月1号是周几-1 == 上月残余天数）
      let preMonthDateArr = [];
      if (preMonthDateLen <= 0) {
        preMonthDateLen = 7;
      }
      let {
        year,
        month
      } = this.preMonth(this.data.currentYear, this.data.currentMonth); //上月 年月
      let date = this.getDateLen(year, month); //获取上月天数
      for (let i = 0; i < preMonthDateLen; i++) {
        preMonthDateArr.unshift({ //从前面追加元素
          month: 'pre', // 只是为了增加标识，区分当、下月
          date: date
        })
        date--;
      }
      this.setData({
        preMonthDateLen: preMonthDateLen
      })
      return preMonthDateArr
    },

    //下月 年月
    nextMonth(year, month) {
      if (month == 12) {
        return {
          year: ++year,
          month: 1
        }
      } else {
        return {
          year: year,
          month: ++month
        }
      }
    },

    //获取当月中，下月多余数据，返回数组
    getNextArr() { //6*7=42
      let nextMonthDateLen = 42 - this.data.preMonthDateLen - this.data.currentMonthDateLen; // 下月多余天数
      let nextMonthDateArr = [] // 定义空数组
      if (nextMonthDateLen > 0) {
        for (let i = 1; i <= nextMonthDateLen; i++) {
          nextMonthDateArr.push({
            month: 'next', // 只是为了增加标识，区分当、下月
            date: i
          })
        }
      }
      return nextMonthDateArr;
    },

    //获取当月要展示的所有数据
    getAllArr() {
      let preArr = this.getPreArr();
      let currentArr = this.getCurrentArr();
      let nextArr = this.getNextArr();
      let allArr = [...preArr, ...currentArr, ...nextArr];
      this.setData({
        allArr
      })
      let sendObj = {
        currentYear: this.data.currentYear,
        currentMonth: this.data.currentMonth,
        allArr: allArr
      }
      // 微信小程序中是通过triggerEvent来给父组件传递信息的
      this.triggerEvent('sendObj', sendObj) // 将sendObj通过参数的形式传递给父组件
    },

    //点击 上月
    gotoPreMonth() {
      let {
        year,
        month
      } = this.preMonth(this.data.currentYear, this.data.currentMonth);

      this.setData({
        currentYear: year,
        currentMonth: month
      })
      this.getAllArr();
    },

    //点击 下月
    gotoNextMonth() {
      let {
        year,
        month
      } = this.nextMonth(this.data.currentYear, this.data.currentMonth);
      this.setData({
        currentYear: year,
        currentMonth: month
      })
      this.getAllArr();
    }
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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