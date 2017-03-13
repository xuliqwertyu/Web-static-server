var path =require('path');
var express =require('express');
var app=express();
var viewsPath=path.join(__dirname,'views');
app.use('/',express.static(viewsPath));
var publicPath=path.join(__dirname,'public');
app.use('/public',express.static(publicPath));
app.listen(9999,function(){
	console.log('server run at port 9999');
})
var sha1 = require("sha1");
    //定义验证接口
    app.use('/wexin', function(req, res){
        //获取get传递数据
        var obj = req.query;
        console.log("weixin", obj);
        //将数据添加到一个数组
        var arr = ["tasktest", obj.timestamp, obj.nonce];
        //排序
        arr.sort();

        //拼接字符串，并进行 sha1 加密
        var str = sha1(arr.join(""));
        console.log('sha1   ', str);

        console.log('signature', obj.signature === str)
        //匹配是否是微信请求
        if( obj.signature === str){
            //成功返回 echostr 随机字符串
            res.send(obj.echostr).end();
        }else{
            res.send("验证失败").end();
        }
    });


module.exports=app;