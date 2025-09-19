import * as zod from 'zod'


export const ForgetPasswordSchema =zod.object({
    email:zod.string().nonempty('Email Is Required')
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ ,'Email is InValid'),
    
})
