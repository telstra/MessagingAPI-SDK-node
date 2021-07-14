export type TAuthConfig = {
    telstra_client_id: string;
    telstra_client_secret: string;
};

export interface AuthConfigProps {
    TELSTRA_CLIENT_ID: string;
    TELSTRA_CLIENT_SECRET: string;
}

export interface AuthCredentials {
    client_id: string;
    client_secret: string;
}

export interface AuthAccessToken {
    access_token: string;
    token_type: string;
    expires_in: string;
}

export type TAuthResponse = {
    access_token: string;
    token_type: string;
    expires_in: string;
};
