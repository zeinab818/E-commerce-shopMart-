export interface SuccessLoginResponse{
    message:string,
    user:UserResponse,
    token:string
}
export interface FaildLoginResponse{
    message:string,
    statusMsg:string
}

export interface UserResponse{
    name:string,
    email:string,
    password:string
}