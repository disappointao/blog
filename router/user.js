const  express=require('express');
const User=require('../models/user');
const md5=require('blueimp-md5');
let user=express.Router();
user.get('/',function(req,res) {
  res.render('index.html',{
    user:req.session.user
  });
});
user.get('/index',(req,res)=>{
  res.redirect('/');
});
user.get('/login',function(req,res){
  res.render('login.html');
});
user.post('/login',function(req,res){
  let body=req.body;
  User.findOne({
    email: body.email,
    password:md5(md5(body.password))
  },(err,data)=>{
    if(err){
      return res.status(500).json({
        status:500,
        message:'服务器很忙，请稍后重试'
      })
    }
    if(!data){
      return res.status(200).json({
        status:1,
        message:'账号密码错误，请重新输入'
      })
    }
    req.session.user=data;
    return res.status(200).json({
      status:0,
      message:'登录成功'
    })
  })
});
user.get('/register',function(req,res){
  res.render('register.html');
});
user.post('/register',function(req,res){
  let body=req.body;
  User.findOne({
    $or:[
      {email:body.email},
      {nickname:body.nickname}
    ]
  },(err,data)=>{
    if(err){
      return res.status(500).json({
        status:500,
        message:'服务器忙稍后重试'
      })
    }
    if(data){
      return res.status(200).json({
        status:1,
        message:'邮箱或昵称已存在，请重新注册！'
      })
    }
    body.password=md5(md5(body.password));
    new User(body).save((err,data)=>{
      if(err){
        return res.status(500).json({
          status:500,
          message:'服务器忙请稍后重试'
        })
      }
      req.session.user=data;
      return res.status(200).json({
        status:0,
        message:'注册成功'
      });
    })
  })
});
user.get('/logout',(req,res)=>{
  req.session.user=null;
  res.redirect('/login');
});
module.exports=user;