const express=require('express');
const path=require('path');
const user=require('./router/user');//user登录路由
const bodyParser=require('body-parser');
const session=require('express-session');
let app=express();
//设置静态资源请求
app.use('/public/',express.static(path.join(__dirname,'./public/')));
//配置模板引擎
app.engine('html',require('express-art-template'));
//配置默认模板渲染路径
app.set('views',path.join(__dirname,'./views'));

//配置bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret:'itcast',
  resave:false,
  saveUninitialized:true
}));
app.use(user);
app.listen(3000,function() {
  console.log('服务器启动...');
});
