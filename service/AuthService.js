const db=require("./db")
async function LoginUser(username,password){
    try {
        const query=`
         SELECT * FROM users WHERE username = $1 AND password = $2;
        `
        const result=await db.query(query,[username,password])
        console.log(result.rows)
        if(result.rows.length!==0){
            return result.rows[0]
        }else{
            return null
        }
    } catch (error) {
        console.log(error)
        return null
    }
}

async function SignUpUser(table,username,password){
    try {
        //sql injection but who cares
        const query=`
        INSERT INTO ${table} (username,password) values ($1,$2) RETURNING*;
        `
        const result=await db.query(query,[username,password])
        if(result.rows.length!==0){
            return result.rows[0]
        }else{
            return null
        }
    } catch (error) {
        console.log(error)
        return null
    }
}

module.exports = {
    LoginUser,
    SignUpUser
}