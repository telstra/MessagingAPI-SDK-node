import HttpClient from './HttpClient';
import { AxiosRequestConfig } from 'axios';
import { Constants } from './Constants';
import { URLSearchParams } from 'url';
import { getConfig, setConfig } from './config';
import { AuthError } from './Errors';
import { AuthConfigProps } from './types';

const fs = require('fs');

export class Auth extends HttpClient {
    public constructor(public authConfig?: AuthConfigProps) {
        super(Constants.API_URL);
        this._initializeRequestInterceptor();
    }

    private _initializeRequestInterceptor = (): void => {
        this.instance.interceptors.request.use(
            this._handleRequest,
            this._handleError
        );
    };

    private _handleRequest = (config: AxiosRequestConfig) => {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        return config;
    };

    private async credentialsFromEnvVars(): Promise<boolean> {
        if (
            process.env.TELSTRA_MESSAGING_CLIENT_ID &&
            process.env.TELSTRA_MESSAGING_CLIENT_SECRET
        ) {
            await setConfig({
                telstra_messaging_client_id:
                    process.env.TELSTRA_MESSAGING_CLIENT_ID,
                telstra_messaging_client_secret:
                    process.env.TELSTRA_MESSAGING_CLIENT_SECRET,
            });
            return true;
        } else {
            return false;
        }
    }

    private async credentialsFromSharedFile(): Promise<boolean> {
        try {
            let telstra_messaging_client_id: string | undefined;
            let telstra_messaging_client_secret: string | undefined;
            const data: string[] = fs
                .readFileSync(Constants.SHARED_CREDENTIALS, 'utf8')
                .toString()
                .split('\n');

            data.forEach((line: string, index: number): void => {
                if (line.includes('[default]')) {
                    // Iterate the next three lines past default profile
                    [1, 2, 3].forEach((item: number): void => {
                        let lineIndex = data[index + item]
                            .replace(/\s+/g, '')
                            .split('=');

                        switch (lineIndex[0]) {
                            case 'TELSTRA_MESSAGING_CLIENT_ID': {
                                telstra_messaging_client_id = lineIndex[1];
                                break;
                            }
                            case 'TELSTRA_MESSAGING_CLIENT_SECRET': {
                                telstra_messaging_client_secret = lineIndex[1];
                                break;
                            }
                            default: {
                                break;
                            }
                        }
                    });
                }
            });

            if (
                telstra_messaging_client_id &&
                telstra_messaging_client_secret
            ) {
                await setConfig({
                    telstra_messaging_client_id,
                    telstra_messaging_client_secret,
                });
                return true;
            }

            return false;
        } catch (err) {
            return false;
        }
    }

    private async credentialsFromFileImport(): Promise<boolean> {
        if (!this.authConfig) return false;

        const {
            TELSTRA_MESSAGING_CLIENT_ID,
            TELSTRA_MESSAGING_CLIENT_SECRET,
        } = this.authConfig;

        if (!TELSTRA_MESSAGING_CLIENT_ID || !TELSTRA_MESSAGING_CLIENT_SECRET)
            return false;

        await setConfig({
            telstra_messaging_client_id: TELSTRA_MESSAGING_CLIENT_ID,
            telstra_messaging_client_secret: TELSTRA_MESSAGING_CLIENT_SECRET,
        });

        return true;
    }

    public async getToken(): Promise<string> {
        try {
            /**
             * Order of precedence;
             * - Defined in constructor
             * - Defined in imported json file
             * - Defined in environment variables
             * - Defined in shared credentials file
             * First match wins!
             */
            if (
                !(await this.credentialsFromFileImport()) &&
                !(await this.credentialsFromEnvVars()) &&
                !(await this.credentialsFromSharedFile())
            ) {
                throw new AuthError(Constants.ERRORS.AUTH_ERROR);
            }

            const credentialsFromStorage = await getConfig();
            const {
                telstra_messaging_client_id,
                telstra_messaging_client_secret,
            } = JSON.parse(credentialsFromStorage);

            if (
                !telstra_messaging_client_id ||
                !telstra_messaging_client_secret
            ) {
                throw new AuthError(Constants.ERRORS.AUTH_ERROR);
            }

            const params = new URLSearchParams();
            params.append('client_id', `${telstra_messaging_client_id}`);
            params.append(
                'client_secret',
                `${telstra_messaging_client_secret}`
            );
            params.append('grant_type', 'client_credentials');
            params.append('scope', 'NSMS');

            const auth = await this.instance.post(`/v2/oauth/token`, params);
            if (!auth) throw new AuthError(Constants.ERRORS.AUTH_ERROR);
            const { access_token } = auth;
            return access_token;
        } catch (error) {
            throw error;
        }
    }
}
