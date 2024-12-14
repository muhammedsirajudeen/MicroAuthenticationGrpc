const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const AuthService=require("../service/AuthService");
const protoPath = path.join(__dirname, '../proto/auth.proto');
const packageDefinition = protoLoader.loadSync(protoPath, {});
const userProto = grpc.loadPackageDefinition(packageDefinition).user;
const profileClient=require("../client/profileClient");
const { error } = require('console');

async function checkLogin(call, callback) {
  const {username,password}=call.request
  const res=await AuthService.LoginUser(username,password)
  if(res){
    callback(null, {message:'success',username:username});
  }else{
    callback(null,{message:'Authentication failed'})
  }
}

async function userSignup(call,callback){
  const {username,password}=call.request
  console.log(call.request)
  const res=await AuthService.SignUpUser('users',username,password)
  if(res){
    profileClient.addProfile({username,password},(error,response)=>{
      if (!error) {
        callback(null,{message:'success'})
    } else {
        callback(null,{message:'Auth success failed to create profile'}) 
    }
    })
  }else{
    callback(null,{message:'Authentication Failed Please try again'})
  }
}

const server = new grpc.Server();
server.addService(userProto.UserService.service, { CheckLogin: checkLogin, UserSignup:userSignup });

const PORT = '50051';
server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`);
});
