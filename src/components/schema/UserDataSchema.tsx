
import * as zod from 'zod'

export const updateDataSchema=zod.object({
    name: zod.string().nonempty('Name Is Required')
        .min(3 ,  'Name must be at least 3 characteres')
        .max(10 , 'Name must be at most 10 characteres'),
    
    email:zod.string().nonempty('Email Is Required')
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ ,'Email must be a valid address (e.g. name@example.com)'),

    phone: zod
      .string()
      .nonempty("Phone is required")
      .regex(
        /^(?:\+2|002)?01[0125][0-9]{8}$/,
        "Phone must be a valid Egyptian number starting with +2 or 002 (e.g. +201xxxxxxxx)"
      ),


})
