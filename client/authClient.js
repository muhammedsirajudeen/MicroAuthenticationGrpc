const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Load the protobuf
const protoPath = path.join(__dirname, '../proto/auth.proto');
const packageDefinition = protoLoader.loadSync(protoPath, {});
const userProto = grpc.loadPackageDefinition(packageDefinition).user;

// Create a client
const client = new userProto.UserService('localhost:50051', grpc.credentials.createInsecure());

// client.GetUser({ userId }, (error, response) => {
//   if (!error) {
//     console.log('User Info:', response);
//   } else {
//     console.error(error);
//   }
// });
module.exports = client