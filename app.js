const express=require('express');
const path=require('path');
const router=require('./router');
let app=express();
//设置静态资源请求
app.use('/public/',express.static(path.join(__dirname,'./public/')));
//配置模板引擎
app.engine('html',require('express-art-template'));
//配置默认模板渲染路径
app.set('views',path.join(__dirname,'./views'));
//把路由挂在到app中
app.use(router);
app.listen(3000,function() {
  console.log('服务器启动...');
});
