var utils = require('../../utils/util.js');
var that;
Page({
  //*********相关数据**********//
  data: {
    isShowTip:true,
    scale: 15,//当前缩放值
    city: '',//当前城市
    //屏幕的高度，默认的
    scheight: 667,
    //经度
    longitude: '',
    //纬度
    latitude: '',
    //根据当前位置获取的附件的货车列表
    markers: [],
    controls:[],
    //门店详情信息
    store: [{
      isShowDetail: false, 
      isOther: true,       
      //门店信息
      storeDetal:{
        name: '上海盛大汽车服务有限公司',
        address:'上海市闸北区灵石路656号3楼',
        weekTime:'0',
        monthTime:'10',
        storeTab:[]//{'高价值客户','优质出单点','五星好评点','可信耐客户','快捷出单点'}
      },
      //拜访内容
      visitList:{
        visitTime:"2017-12-13 08:09",
        person:"张三",
        visitImage:"/resources/images/shouye/tu-1@2x.jpg",
        visitContent:"今天去了上海马戏城灵石路，拜访了这家门店，和老板谈了业务，谈了业务上的一些信息，成为代理门店的可能性很大，下周将继续进行二次洽谈及商量合作事项，在做准备，在做准备，在做准备，在做准备，在做准备，在做准备，在做准备，在做准备，在做准备，在做准备，在做准备，在做准备............."
      }
    }]
  },
  //*********页面相关回调函数**********//
  //监听页面加载
  onLoad: function () {
    that = this;
    refreshmaph();
    refreshLocation();
  },
  bindcontroltap: function(e){
    // 判断点击的是哪个控件 e.controlId代表控件的id，在页面加载时的第3步设置的id
    switch(e.controlId){
      // 点击定位控件
      case 1: this.backLocation();
        break;      
      case 2: this.backLocation();
        break;
      case 3: wx.navigateTo({
        url: '/pages/store/store'
        });
        break; 
      case 4: wx.navigateTo({  // 点击签到
        url: '/pages/qiandao/qiandao'
      });
        break;  
      case 5: wx.navigateTo({
        url: '/pages/store/store'
      });
        break;    
      default: break;
    }
  },
  //视野发生变化时触发
  regionchange(e) {
    console.log(e.type)
  },
//点击了门店图标的回调函数
  markertap(e) {
  // console.log(e.markerId);let _markers = this.data.markers;
    // var index = e.markerId;
    // var mark = this.data.markers[index];
    // var markWidth = mark.width;
    // let markHeight = mark[index].height;
    // console.log(index + "===" + markWidth + "=====" + markHeight);
    // this.setData({
    //   markWidth: 60,
    //   markHeigh: 76    
    // });
    this.setData({
      'store.isShowDetail': true,
      'store.isOther': false,
      'store.storeDetal.name':'上海盛大汽车服务有限公司',
      'store.storeDetal.address':'上海市闸北区灵石路656号3楼',
      'store.storeDetal.weekTime':e.markerId,
      'store.storeDetal.monthTime':'10',
      'store.visitList.visitTime':'2017-12-13 08:09',
      'store.visitList.person':'陈明',
      'store.visitList.visitImage':'/resources/images/shouye/tu-1@2x.jpg',
      'store.visitList.visitContent':'今天去了上海马戏城灵石路，拜访了这家门店，和老板谈了业务，谈了业务上的一些信息，成为代理门店的可能性很大，下周将继续进行二次洽谈及商量合作事项，在做准备',
      'scale:':18
      
    });
  console.log(this.data.markers[e.markerId]);
     //this.data.markers[e.markerId].width=60;
    // this.data.markers[e.markerId].height=76;
  },
  //控制器点击的回调函数
  controltap(e) {
    console.log(e.controlId);
  },
  //*********自定义的相关监听事件**********//
  //进入列表
  toCarList: function () {
    console.log('toCarList');
    var murl = "/pages/carlist/carlist?longitude=" + this.data.longitude
      + "&latitude=" + this.data.latitude;
    wx.navigateTo({
      url: murl
    });
  },

  //缩小地图
  mapPlus: function () {
    var ss = this.data.scale;
    if (5 === ss) {
      return;
    }
    ss--;
    this.setData({
      scale: ss
    });
  },
  //放大地图
  mapAdd: function () {
    console.log(this.data.markers.length);
    var ss = this.data.scale;
    if (18 === ss) {
      return;
    }
    ss++;
    this.setData({
      scale: ss
    });
  },
  //返回地图中心
  backLocation:function (){
    this.setData({
      scale: 16
    });
    refreshLocation();
  },

  //关闭门店详情信息
  closeDetail: function () {
    this.setData({
      'store.isShowDetail': false
    });
  },
  //选择车辆长度
  selectCarLength: function () {
    var murl = "/pages/carlength/carlength";
    wx.navigateTo({
      url: murl
    });
  },
  //跳转到我的门店
  toStore: function () {
    var murl = "/pages/store/store";
    wx.navigateTo({
      url: murl
    });
  },
  //打开地图我的门店信息mapstore
  mapStore: function(){
    var surl="/pages/mapstore/mapstore";
    wx.navigateTo({
      url:surl
    })
  }
})

/**
 * 动态设置地图的高度添加控件
 */
function refreshmaph() {
  wx.getSystemInfo({
    success: function (res) {
      that.setData({
        scheight: res.windowHeight,
        controls: [
          {
            id: 1,//中心
            iconPath: '/resources/images/shouye/gprs-4@2x.png',
            position: {
              left: res.windowWidth / 2 - 11,
              top: res.windowHeight / 2 - 32,
              width: 22,
              height: 32
            },
            clickable: true
          }, {
            id: 2,//定位
            iconPath: '/resources/images/shouye/2icon-3@2x.png',
            position: {
              left: 16,
              top: res.windowHeight - 157,
              width: 52,
              height: 65
            },
            clickable: true
          },
          {//拜访足迹
            id: 3,
            iconPath: '/resources/images/shouye/2icon-2@2x.png',
            position: {
              left: res.windowWidth - 61,
              top: res.windowHeight - 157,
              width: 52,
              height: 65
            },
            clickable: true
          },
          {//签到
            id: 4,
            iconPath: '/resources/images/shouye/qd@2x.png',
            position: {
              left: res.windowWidth / 2 - 59,
              top: res.windowHeight - 159,
              width: 118,
              height: 118
            },
            clickable: true
          },
          {//我的门店
            id: 5,
            iconPath: '/resources/images/shouye/2icon-1@2x.png',
            position: {
              left: 16,
              top: res.windowHeight - 95,
              width: 52,
              height: 65
            },
            clickable: true
          },
          {//个人信息
            id: 6,
            iconPath: '/resources/images/shouye/icon-me@2x.png',
            position: {
              left: res.windowWidth - 61,
              top: res.windowHeight - 98,
              width: 61,
              height: 57
            },
            clickable: true
          }]
      })
   
    }
  });
}
 
/**
 * 刷新定位位置
 */
function refreshLocation() {
  wx.getLocation({
    type: 'gcj02',
    success: function (res) {
      that.setData({
        longitude: res.longitude,
        latitude: res.latitude
      });     
      // console.log(res.longitude + " " + res.latitude);
      //定位成功后重新获取附近的门店
      getNearStoreByLocation();     
    }
  })
}

/**
 * 根据定位点获取附近的附近的门店
 */
function getNearStoreByLocation() {
  that.setData({
    markers: []   
  });
  //模拟数据,未拜访门店数据
  for (var i = 0; i < 5; i++) {
    var mark = {};
    mark.iconPath = "/resources/images/shouye/gprs-1@2x.png";
    mark.id = i;
    mark.latitude = that.data.latitude + (Math.random() / 250);
    mark.longitude = that.data.longitude + (Math.random() / 250);
    mark.width = 30;
    mark.height = 38;
    that.data.markers.push(mark);
    //  模拟数据,已拜访门店数据
    var mark2 = {};
    mark2.iconPath = "/resources/images/shouye/gprs-2@2x.png";
    mark2.id = i;
    mark2.latitude = that.data.latitude - (Math.random() / 250);
    mark2.longitude = that.data.longitude - (Math.random() / 250);
    mark2.width = 30;
    mark2.height = 38;
    that.data.markers.push(mark2);   
    //  模拟数据,它人门店
    var mark3 = {};
    mark3.iconPath = "/resources/images/shouye/gprs-3@2x.png";
    mark3.id = i;
    mark3.latitude = that.data.latitude + (Math.random() / 250);
    mark3.longitude = that.data.longitude + (Math.random() / 250);
    mark3.width = 30;
    mark3.height = 38;
    that.data.markers.push(mark3);  
  };
  that.setData({
    markers: that.data.markers
  });
}
