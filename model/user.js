const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/blog', { useNewUrlParser: true });

let Schema=mongoose.Schema;
let userSchema=new Schema({
  email:{
    type:String,
    required:true
  },
  nickname:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  avatar:{
    type:String,
    default:'/public/img/avatar-default.png'
  },
  birthday:{
    type:Date
  },
  gender:{
    type:Number,
    enum:[-1,0,1],
    default:-1
  },
  bio:{
    type:String,
    default:''
  },
  created_time:{
    type:Date,
    default:Date.now
  },
  last_modified_time:{
    type:Date,
    default:Date.now
  }
});
module.exports = mongoose.model('User',userSchema);