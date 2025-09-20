export interface SuccessLoginResponse{
    message:string,
    user:UserResponse,
    token:string
}
export interface FaildLoginResponse{
    message:string,
    statusMsg:string
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  apiToken?: string; // ضيفي السطر ده
}
