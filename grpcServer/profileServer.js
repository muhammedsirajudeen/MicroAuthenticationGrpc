const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const AuthService=require("../service/AuthService")
const protoPath = path.join(__dirname, '../proto/profile.proto');
const packageDefinition = protoLoader.loadSync(protoPath, {});
const userProto = grpc.loadPackageDefinition(packageDefinition).user;

async function addProfile(call, callback) {
  console.log(call.request)
  const {username,password}=call.request
  const res=await AuthService.SignUpUser('profiles',username,password)
  if(res){
    callback(null, {message:'success'});
  }else{
    callback(null, {message:'failed to create profile'});

  }

}

const server = new grpc.Server();
server.addService(userProto.ProfileService.service, { AddProfile: addProfile });

const PORT = '50052';
server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`);
});
