//index.js

let contentNewsList;
let indexIsHidden;
let topPic = [
    { url: '1', ID : '1' },
    { url: '2', ID : '2' },
    { url: '3', ID : '3' },
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
    newsType: 'gn' //默认请求国内数据
  },

  //事件处理函数

  // headerBar 点击
    headerTitleClick: function (e) {
        newsType = e.currentTarget.dataset.newstype;
        console.log(newsType);
		this.setData({
            indexIsHidden: false,
            newsType: newsType
        })
        //获取新闻
        wx.request({
            url: 'https://test-miniprogram.com/api/news/list',
            data: {
                type: this.data.newsType
            },
            method: 'GET',
            success: res => {
                let resultData = res.data.result;

				//获取头条图片
                for(let n = 0;n < 3;++n){
					topPic[n].url = resultData[n].firstImage;
				}

                this.setData({
					contentNewsList: resultData,
					indexIsHidden: true,
					topPic: topPic
                })
            },
            fail: error => {

            },
            complete: () => {

            }
        })
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
    wx.request({
        url: 'https://test-miniprogram.com/api/news/list',
        data: {
            type: 'gn'
        },
        method: 'GET',
        success: res => {
            let resultData = res.data.result;
			console.log(resultData);
            //获取头部轮播图片
            for (let n = 0; n < 3; ++n) {
                topPic[n].url = resultData[n].firstImage;
            }
            this.setData({
                contentNewsList: resultData,
                indexIsHidden: true,
                topPic: topPic
            })
      },

      fail: res => {
          console.log(res);
      },
      complete: () => {

      }
    })
  },
})
