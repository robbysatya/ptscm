import type { Auth } from '@/types/auth';

export type ContactSettings = {
    address: string;
    whatsapp_numbers: string[];
    emails: string[];
};

declare module 'react' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface InputHTMLAttributes<T> {
        passwordrules?: string;
    }
}

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            auth: Auth;
            contactSettings: ContactSettings;
            sidebarOpen: boolean;
            [key: string]: unknown;
        };
    }
}
