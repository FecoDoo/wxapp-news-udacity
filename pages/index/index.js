//index.js

let contentNewsList;
let indexIsHidden;
let topList = [
    { image: '', id: '1', source: '', title: '', date: ''},
	{ image: '', id: '2', source: '', title: '', date: ''},
];


Page({
  data: {
    headerTitleName: [
      { name: '国内', newsType: 'gn' },
      { name: '国际', newsType: 'gj' },
      { name: '财经', newsType: 'cj' },
      { name: '娱乐', newsType: 'yl' },
      { name: '军事', newsType: 'js' },
      { name: '体育', newsType: 'ty' },
      { name: '其他', newsType: 'other' },
    ],

    contentNewsList: contentNewsList,

	indexIsHidden: indexIsHidden,
	newsType: 'gn', //默认请求国内数据
  },

  //事件处理函数

	//获取新闻列表
	getList(callback){
		wx.request({
			url: 'https://test-miniprogram.com/api/news/list',
			data: {
				// type: this.data.newsType
				type: this.data.newsType
			},
			method: 'GET',
			success: res => {
				let resultData = res.data.result;
				
				//增加了数据为空的判断
				if(resultData==undefined){
					wx.showToast({
						title: '无法获取数据'
					})
					this.setData({
						indexIsHidden: true
					})
				} else if (resultData.length == 1){
					for(let n = 0;n < 2;n++){
						topList[n].image = resultData[n].firstImage == '' ? '../image/default.jpg' : resultData[n].firstImage;
						topList[n].id = resultData[n].id;
						topList[n].source = resultData[n].source == '' ? '未知' : resultData[n].source;
						topList[n].date = resultData[n].date.substring(0, 10);
						topList[n].title = resultData[n].title;
					}

					this.setData({
						contentNewsList: resultData.shift(),
						indexIsHidden: true,
						topList: topList
					})
					
				} else {
					let length = resultData.length
					//截取了部分时间
					for (let n = 0; n < length; n++) {
						resultData[n].date = resultData[n].date.substring(0, 10)
					}

					//获取头条图片
					for (let n = 0; n < length-1 && n < 2; ++n) {
						//增加了默认图片调用
						topList[n].image = resultData[n].firstImage == '' ? '../image/default.jpg' : resultData[n].firstImage;
						topList[n].id = resultData[n].id;
						topList[n].source = resultData[n].source == '' ? '未知' : resultData[n].source;
						topList[n].date = resultData[n].date;
						topList[n].title = resultData[n].title;
					}
					
					this.setData({
						//删除数组前二条新闻
						contentNewsList: resultData.slice(2),
						indexIsHidden: true,
						topList: topList
					})
				}
			},
			fail: error => {
				//获取失败反馈
				console.log(res)
				wx.showToast({
					title: '数据获取失败',
				})
			},
			complete: () => {
				callback && callback()
			}
		})
	},
	
  	//headerBar 点击响应函数
    headerTitleClick: function (e) {
        newsType = e.currentTarget.dataset.newstype;
		
		this.setData({
            indexIsHidden: false,
            newsType: newsType
        })
		this.getList();
    },

	//跳转到新闻详情页
	viewDetail: function(e) {
		// 获取当前新闻的id
		newsid = e.currentTarget.dataset.newsid;
		wx.navigateTo({
			url: '../detail/detail?newsid=' + newsid
		})
	},

	onLoad: function () {
		//请求头条数据
		this.getList();
	},

	onPullDownRefresh() {
		this.getList(()=>{
			wx.stopPullDownRefresh()
		});
	},

	// wx.stopPullDownRefresh(())
})
