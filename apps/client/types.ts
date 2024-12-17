// -------------------------  SIGN UP  -------------------------------------------
export interface SignUp {
    username: string;
    email: string;
    password: string;
}

export interface SignUpResponse {
    userId: string;
    username: string;
    email: string;
    token: string;
}


// -------------------------  LOGIN  --------------------------------------------------

export interface Login {
    email: string;
    password: string;
}

export interface LoginResponse {
    userId: string;
    username: string;
    email: string;
    token: string;
}


// ------------------------  WHIZZ  ----------------------------------------------------

export interface WhizzList {
    id: string;
    zap_name: string;
    lastModified: string;
    status: string;
    triggerId: string;
    webhookUrl: string;
    userId: number;
    trigger: {
        id: string;
        zapId: string;
        triggerId: string;
        metadata: JSON;
        type: {
            id: string;
            name: string;
            image: string;
        }
    },
    actions: {
        actionId: string;
        id: string;
        metadata: JSON;
        sortingOrder: number;
        zapId: string;
        type: {
            id: string;
            name: string;
            image: string;
        }
    }[]
}

export interface Trigger {
    id: string;
    zap_id: string;
    type: string;
    metadata: JSON;
}

export interface AvailableTrigger {
    id: string;
    name: string;
    image: string;
}

export interface Action {
    id: string;
    type: string;
    metadata: JSON;
    sortingOrder: number;
}

export interface AvailableAction {
    id: string;
    name: string;
    image: string;
}

export interface IAvailableActionsAndTriggers {
    availableActions: [AvailableAction],
    availableTriggers: [AvailableTrigger]
}

export interface IWhizzBlock {
    heading: string;
    text?: string;
    index: number;
    type?: string;
    onClick: () => void;
}

export interface ISelectedActions {
    index: number;
    availableActionId: string;
    availableActionName: string;
    metadata: IMetadata;
    image?: string;
}

export interface ISelectedTrigger {
    index: number;
    id?: string;
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    metadata?: any;
    image?: string;
}


export interface IMetadata {
    email?: string;
    body?: string;
    amount?: number;
    address?: string;
}

export interface IActionData {
    availableActionId: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    actionMetadata: any;
    sortingOrder: number;
}

export interface IWhizzData {
    availableTriggerId: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    triggerMetadata?: any;
    actions: IActionData[];
}
