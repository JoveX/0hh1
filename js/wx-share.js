/**
 * 微信分享
 * @authors 清泉古雾 (jovex.xu@gmail.com)
 * @date    2015-03-13 00:50:38
 * @version 1.0.0
 */

$(function() {
    var shareData = {
        title: '0h h1',
        desc: 'A little logic game by Q42.',
        link: 'http://game.jser.io/0hh1/dist/',
        imgUrl: 'http://game.jser.io/0hh1/dist/img/icon-180.png',
    };

    $.ajax({
        url: '/api/usercenter/getWeiXinJsSign.go',
        cache: false,
        success: function(data) {
            init(data);
        }
    });

    function init(data) {
        wx.config({
            // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名，见附录1
            jsApiList: [

                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });

        wx.ready(function() {
            wx.onMenuShareTimeline({
                title: shareData.desc, // 分享标题
                link: shareData.link, // 分享链接
                imgUrl: shareData.imgUrl, // 分享图标
                success: function() {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function() {
                    // 用户取消分享后执行的回调函数
                }
            });

            wx.onMenuShareAppMessage({
                title: shareData.title, // 分享标题
                desc: shareData.desc, // 分享描述
                link: shareData.link, // 分享链接
                imgUrl: shareData.imgUrl, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function() {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function() {
                    // 用户取消分享后执行的回调函数
                }
            });

            wx.onMenuShareQQ({
                title: shareData.title, // 分享标题
                desc: shareData.desc, // 分享描述
                link: shareData.link, // 分享链接
                imgUrl: shareData.imgUrl, // 分享图标
                success: function() {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function() {
                    // 用户取消分享后执行的回调函数
                }
            });

            wx.onMenuShareWeibo({
                title: shareData.title, // 分享标题
                desc: shareData.desc, // 分享描述
                link: shareData.link, // 分享链接
                imgUrl: shareData.imgUrl, // 分享图标
                success: function() {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function() {
                    // 用户取消分享后执行的回调函数
                }
            });

        });

        wx.error(function(res) {
            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
        });
    }

});