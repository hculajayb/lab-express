import { labExpress } from "../config/axios/interceptors"


export const getAllUsers = async()=> {
    const response = await labExpress.get("/usuarios");
    console.log(response)
    return response;
}

export const createUser = async(user)=> {
    const response = await labExpress.post("/usuarios",user);
    console.log(response)
    return response;
}