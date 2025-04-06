export interface IZaprunDetails {
    id: string;
    zapId: string;
    metadata: IWebhookMetadata;
}

export interface IZap {
    id: string;
    name: string;
    userId: number;
    triggerId: string;
    lastModified: Date;
    status: string;
    actions: IAction[];
}

export interface IAction {
    id: string;
    zapId: string;
    actionId: string;
    // metadata: JsonValue;
    metadata: IEmailMetadata | IPhonepeMetadata;
    sortingOrder: number;
    type: IActionType;
}

export interface IActionType {
    id: string;
    name: string;
    image: string;
}

export interface IWebhookMetadata {
    userName?: string;
    commentId?: string;
    userEmail?: string;
    commentBody?: string;
    githubUsername?: string;
    receiverName?: string;
    receiverEmail?: string;
}

export interface ICommentBody {
    name: string;
    upiId?: string;
    amount?: string;
    email: string;
}

export interface IEmailMetadata {
    body: string;
    senderEmail: string;
    receiverEmail: string;
}

export interface IPhonepeMetadata {
    fromUPI: string;
    toUpi: string;
    amount: string;
}