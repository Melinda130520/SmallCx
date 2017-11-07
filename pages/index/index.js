var utils = require('../../utils/util.js');
var that;
Page({

  //*********相关数据**********//
  data: {
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
    //门店详情信息
    store: [{
      isShowDetail: false,      
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
        visitImage:"",
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

  // //视野发生变化时触发
  regionchange(e) {
    console.log(e.type)
  },

  //点击了门店图标的回调函数
  markertap(e) {
   // console.log(e.markerId);
    this.setData({
      'store.isShowDetail': true,
      'store.storeDetal.name': '上海盛大汽车服务有限公司',
      'store.storeDetal.address':'上海市闸北区灵石路656号3楼',
      'scale:':18
    })
  },

  //控制器点击的回调函数
  controltap(e) {
    console.log(e.controlId)
  },

  //*********自定义的相关监听事件**********//

  //城市列表点击事件
  searchCity: function () {
    console.log(this.data.city);
    if ('' === this.data.city) {
      wx.showToast({
        title: '好懒啊啊，什么都没输入!',
        // icon: 'success',
        duration: 2000
      })
    }
  },

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

  //重新定位获取货车列表
  refreshLocation: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
    })
    refreshLocation();
  },

  //返回地图中心
  backLocation:function (){
    this.setData({
      scale: 16
    });
    refreshLocation();
  },

  //关闭车辆详情信息
  closeDetail: function () {
    this.setData({
      'carDetal.isShowDetail': false
    })
  },
  //选择车辆类型
  selectCarType: function () {
    var murl = "/pages/cartype/cartype?comefrom=" + 1;
    wx.navigateTo({
      url: murl
    });
  },
  //选择车辆长度
  selectCarLength: function () {
    var murl = "/pages/carlength/carlength";
    wx.navigateTo({
      url: murl
    });
  },
  //发布货源
  releaseGoods: function () {
    var murl = "/pages/releasegoods/releasegoods";
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
 * 动态设置地图的高度
 */
function refreshmaph() {
  wx.getSystemInfo({
    success: function (res) {
      that.setData({
        scheight: res.windowHeight,
      })
      console.log(res.windowWidth, );
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
        latitude: res.latitude,
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
    markers: [],
  });
  //模拟数据,未拜访门店数据
  for (var i = 0; i < 5; i++) {
    var mark = {};
    mark.iconPath = "/resources/images/shouye/gprs-1@2x.png";
    mark.id = i;
    mark.latitude = that.data.latitude + (Math.random() / 250);
    mark.longitude = that.data.longitude + (Math.random() / 250);
    mark.width = 30;
    mark.height = 35;
    that.data.markers.push(mark);
    //  模拟数据,已拜访门店数据
    var mark2 = {};
    mark2.iconPath = "/resources/images/shouye/gprs-2@2x.png";
    mark2.id = i;
    mark2.latitude = that.data.latitude - (Math.random() / 250);
    mark2.longitude = that.data.longitude - (Math.random() / 250);
    mark2.width = 30;
    mark2.height = 35;
    that.data.markers.push(mark2);   
    //  模拟数据,它人门店
    var mark3 = {};
    mark3.iconPath = "/resources/images/shouye/gprs-3@2x.png";
    mark3.id = i;
    mark3.latitude = that.data.latitude + (Math.random() / 250);
    mark3.longitude = that.data.longitude + (Math.random() / 250);
    mark3.width = 30;
    mark3.height = 35;
    that.data.markers.push(mark3);
  }


  //我的位置
  // var me = {};
  // me.iconPath = "/resources/images/shouye/gprs-5@2x.png";
  // me.id = -100;
  // me.latitude = that.data.latitude;
  // me.longitude = that.data.longitude;
  // me.width = 23;
  // me.height = 23;
  // that.data.markers.push(me);

  // for (var j = 0; j < that.data.markers.length; j++) {
  //   console.log(that.data.markers);
  // }

  // console.log(that.data.latitude);
  // console.log('me');  
  that.setData({
    markers: that.data.markers,
  });
}