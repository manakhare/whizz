import { z } from "zod";

const WhizzCreateSchema = z.object({
    zap_name: z.string().optional(),
    availableTriggerId: z.string(),
    triggerMetadata: z.any().optional(),
    actions: z.array(z.object({
        availableActionId: z.string(),
        actionMetadata: z.any().optional(),
        // actionMetadata: z.object({
        //     email: z.string().optional(),
        //     body: z.string().optional(),
        //     amount: z.number().optional(),
        //     address: z.string().optional()
        // }).optional(),
        sortingOrder: z.number().optional()
    }))
})

const TriggerType = z.object({

})

const ActionType = z.object({

})

export {
    WhizzCreateSchema,
    TriggerType,
    ActionType
}