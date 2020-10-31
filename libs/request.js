// 授权登录
const url =
    "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc41b8414d2bf9933&redirect_uri=" +
    location
    .href
    .split('#')[0] + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
/**
 * @method WechatLogin() 授权登录;
 * @param {object} window 页面信息;
 *   
 */
function WechatLogin(window) {
    return new Promise((resolve, reject) => {
        if (sessionStorage.getItem('tokens')) {
            resolve(1)
        } else {
            function getUrlParam(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            };
            var code = getUrlParam("code");
            if (code) {
                resolve(code)
            } else {
                // reject();
                window.location = url;
            }
        }
    })
}

const http = 'https://bwc.leexf.club/api';
let is_show ={};

const updateResturant = param => {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            url: http + param.url,
            data: param.data,
            dataType: "json",
            headers: {
                tokens: sessionStorage.getItem('token')
            },
            success: (res) => {
                if (res.code) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }
        })
    })
};

const updateResturantGet = param => {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "get",
            url: http + param.url,
            data: param.data,
            dataType: "json",
            headers: {
                tokens: sessionStorage.getItem('token')
            },
            success: (res) => {
                if (res.code) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }
        })
    })
};
