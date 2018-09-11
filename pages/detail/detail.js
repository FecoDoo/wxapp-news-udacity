// pages/detail/detail.js

let indexIsHidden;

Page({

  /**
   * 页面的初始数据
   */
	data: {
		detail: '',
		id: '',
		indexIsHidden: indexIsHidden
	},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取传递的新闻id
	newsid = options.newsid;
    
	this.setData({
		id: newsid,
		indexIsHidden: false
	})

	this.getContent();
  },


	//获取新闻内容
	getContent(callback){
		wx.request({
			url: 'https://test-miniprogram.com/api/news/detail',
			data:{
				id: this.data.id
			},
			success: res=>{
				let result = res.data.result
				this.setData({
					detail: result,
					indexIsHidden: true
				})
			},
			fail: res=>{
				console.log(res);
			},
			complete: ()=>{
				callback && callback();
			}
		})
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
	  this.getContent(()=>{
		  wx.stopPullDownRefresh();
	  })
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