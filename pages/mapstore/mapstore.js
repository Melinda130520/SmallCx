
var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');
var util = require("../../utils/util.js"); 
var qqmapsdk;
Page({
 
    onLoad: function () {
        // 实例化API核心类
        qqmapsdk = new QQMapWX({
            key: 'B6NBZ-F6VWR-AWLW3-WFYWF-DOGE6-7WFST'
        });
    },
    onShow: function () {
        // 调用接口
        qqmapsdk.search({          
            keyword: '酒店',
            success: function (res) {
                console.log(res);
            },
            fail: function (res) {
                console.log(res);
            },
            complete: function (res) {
                console.log(res);
            }
    });
}
});