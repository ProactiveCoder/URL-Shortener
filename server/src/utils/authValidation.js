import jwt from "jsonwebtoken"


export const setToken= async (id,email)=>{
    try {
        const token=jwt.sign({_id:id, email:email},process.env.SECRET_KEY);
        return token;
        
    } catch (error) {
        console.log("Error in generating token",error)
    }

}

export const getToken =async(token)=>{
    try {
        const validToken=jwt.verify(token,process.env.SECRET_KEY);
        return validToken;
    } catch (error) {
        console.log("Error in getting token",error)
    }
}

