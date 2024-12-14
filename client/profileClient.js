const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Load the protobuf
const protoPath = path.join(__dirname, '../proto/profile.proto');
const packageDefinition = protoLoader.loadSync(protoPath, {});
const userProto = grpc.loadPackageDefinition(packageDefinition).user;

// Create a client
const client = new userProto.ProfileService('localhost:50052', grpc.credentials.createInsecure());

// client.GetUser({ userId }, (error, response) => {
//   if (!error) {
//     console.log('User Info:', response);
//   } else {
//     console.error(error);
//   }
// });
module.exports = client