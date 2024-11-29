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
    lastModifiedDate: string;
    status: string;
    trigger: string;
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
    name: string;
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
    actionMetadata: any;
    sortingOrder: number;
}

export interface IWhizzData {
    availableTriggerId: string;
    triggerMetadata?: any;
    actions: IActionData[];
}
