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
