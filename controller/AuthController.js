const authClient=require("../client/authClient")
const AuthService=require("../service/AuthService")
function Login(req,res){
    try {
        const {username,password}=req.body
        authClient.checkLogin({ username,password }, (error, response) => {
        if (!error) {
            res.status(200).json({message:response.message,username:response.username+"sample change"})
        } else {
            console.error(error);
        }
        });        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'internal server error occured'})
    }
}

function Signup(req,res){
    try {
        const {username,password}=req.body
        authClient.userSignup({ username,password }, (error, response) => {
        if (!error) {
            res.status(200).json({message:response.message})
        } else {
            console.error(error);
        }
        });        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'internal server error occured'})
    }
}

module.exports={
    Login,
    Signup
}