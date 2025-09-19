import * as zod from 'zod';

export const ResetCodeSchema = zod.object({
    resetCode: zod
        .string()
        .nonempty('Reset code is required')
        .regex(/^\d{6}$/, 'Reset code must be 6 digits'), 
});
