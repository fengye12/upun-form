/*
* @Author: anchen
* @Date:   2017-08-28 11:05:28
* @Last Modified by:   anchen
* @Last Modified time: 2017-08-29 10:05:25
*/
// var systemUrl="https://wxqy.myspzh.com";
var systemUrl="http://192.168.2.110:8097";
function Upyun (options) {
  this.bucket = "meyoung";//又拍云服务空间
  this.operator = "meyoungwx";//操作员
  this.getSignatureUrl =systemUrl+"/upyun/getSignature";//签名服务器地址
}
Upyun.prototype.upload = function (options) {
  var self = this
  var date = (new Date()).toGMTString()
  var imgpath = GetReDate("{$Year}/{$Month}/{$Day}/");
  var fname = "/shianyun_qy/" +imgpath+ GetReDate("{$Year}{$Month}{$Day}{$Hours}{$Minutes}{$Seconds}{$Ms}{$Ran}")+options.localName;
  var opts = {
    'save-key': fname,
    bucket: self.bucket,
    expiration: Math.round(new Date().getTime() / 1000) + 3600,
    date: date
  }
  var policy =  window.btoa(JSON.stringify(opts))
  var form_api_secret = 'ZDu7KK+/IZbe58DDm4/lRxALgmk=';
   // var dataup = [ 'POST', '/' + self.bucket, date, policy ].join('&');
  var signature = md5(policy + '&' + form_api_secret);
  // self.getSignature(dataup, function (err, signature) {
  if(signature){
    // if (err) {
    //   options.fail && options.fail(err)
    //   options.complete && options.complete(err)
    //   return
    // }
     var data = new FormData();
        data.append('policy', policy);
        data.append('signature', signature);
        data.append('file', options.localPath);
    console.log(`https://v0.api.upyun.com/${self.bucket}`)
    $.ajax({
  type:'POST',
  url:'https://v0.api.upyun.com/'+self.bucket,
   data: data,
           cache: false,
           processData: false,
           contentType: false,
  beforeSend:options.beforeSend,
  success:options.success,
  complete:options.complete,
  error:options.fail
});
}

    // wx.uploadFile({
    //   url: `https://v0.api.upyun.com/${self.bucket}`,
    //   filePath: options.localPath,
    //   name: 'file',
    //   formData: {
    //     authorization: `UPYUN ${self.operator}:${signature}`,
    //     policy: policy
    //   },
    //   success: options.success,
    //   fail: options.fail,
    //   complete: options.complete
    // })
  // })

}

Upyun.prototype.getSignature = function (data, cb) {
  // wx.request({
  //   url: this.getSignatureUrl,
  //   data: {
  //     data: data
  //   },
  //   success: function (res) {
  //     cb(null, res.data.signature)
  //   },
  //   fail: function (err) {
  //     cb(err)
  //   }
  // })
     $.ajax({
  type:'POST',
  url:this.getSignatureUrl,
   data: data,
  beforeSend:function(XMLHttpRequest){
    //ShowLoading();
  },
  success:function(res){
    cb(null, res.data.signature)
  },
  complete:function(XMLHttpRequest,textStatus){
    //HideLoading();
  },
  error:function(err){
    cb(err)
  }
});
}
function GetImageUrl(imsrc) {
 return  "https://meyoung.b0.upaiyun.com" + imsrc;

}