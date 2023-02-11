export interface IProject {
    title: string;
    description: string;
    url: string;
    image: {
        alt: string;
        src: string;
        srcset: string;
        avif: string;
        webp: string;
    };
}

export interface ITech {
    name: string;
    url: string;
    icon: string;
    modifiers: string[];
}

export interface IMessage {
    message: string;
    timeout: number;
    type: string;
    id: number;
}

export interface IContactPayload {
    email: string;
    name: string;
    message: string;
}

export interface IContactErrors {
    email: string;
    message: string;
}
