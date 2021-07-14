import { Constants } from '../constants';
import { getAuthConfig, setAuthConfig } from '../utils';
import { AuthError } from './Errors';
import { AuthConfigProps, AuthCredentials, TAuthConfig } from '../types';

const fs = require('fs');

export class Auth {
    protected hasCredentials: boolean = false;

    protected authCredentials: AuthCredentials = {
        client_id: '',
        client_secret: '',
    };

    public constructor(public authConfig?: AuthConfigProps) {}

    private async credentialsFromFileImport(): Promise<boolean> {
        if (!this.authConfig) return false;

        const { TELSTRA_CLIENT_ID, TELSTRA_CLIENT_SECRET } = this.authConfig;

        if (!TELSTRA_CLIENT_ID || !TELSTRA_CLIENT_SECRET) return false;

        await setAuthConfig({
            telstra_client_id: TELSTRA_CLIENT_ID,
            telstra_client_secret: TELSTRA_CLIENT_SECRET,
        });
        this.hasCredentials = true;

        return true;
    }

    private async credentialsFromEnvVars(): Promise<boolean> {
        if (
            process.env.TELSTRA_CLIENT_ID &&
            process.env.TELSTRA_CLIENT_SECRET
        ) {
            if (!this.hasCredentials) {
                await setAuthConfig({
                    telstra_client_id: process.env.TELSTRA_CLIENT_ID,
                    telstra_client_secret: process.env.TELSTRA_CLIENT_SECRET,
                });
                this.hasCredentials = true;
            }
            return true;
        } else {
            return false;
        }
    }

    private async credentialsFromSharedFile(): Promise<boolean> {
        try {
            let telstra_client_id: string | undefined;
            let telstra_client_secret: string | undefined;
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
                            case 'TELSTRA_CLIENT_ID': {
                                telstra_client_id = lineIndex[1];
                                break;
                            }
                            case 'TELSTRA_CLIENT_SECRET': {
                                telstra_client_secret = lineIndex[1];
                                break;
                            }
                            default: {
                                break;
                            }
                        }
                    });
                }
            });

            if (telstra_client_id && telstra_client_secret) {
                if (!this.hasCredentials) {
                    await setAuthConfig({
                        telstra_client_id,
                        telstra_client_secret,
                    });
                    this.hasCredentials = true;
                }
                return true;
            }

            return false;
        } catch (err) {
            return false;
        }
    }

    public async getCredentials(): Promise<AuthCredentials> {
        /**
         * Order of precedence;
         * - Defined in constructor
         * - Defined in imported json file
         * - Defined in environment variables
         * - Defined in shared credentials file
         * First match wins!
         */
        await Promise.all([
            this.credentialsFromFileImport(),
            this.credentialsFromEnvVars(),
            this.credentialsFromSharedFile(),
        ]);

        if (!this.hasCredentials) {
            throw new AuthError(Constants.ERRORS.AUTH_ERROR);
        }

        const credentialsFromStorage = (await getAuthConfig()) as TAuthConfig;
        if (!credentialsFromStorage) {
            throw new AuthError(Constants.ERRORS.AUTH_ERROR);
        }

        const {
            telstra_client_id,
            telstra_client_secret,
        } = credentialsFromStorage;

        if (!telstra_client_id || !telstra_client_secret) {
            throw new AuthError(Constants.ERRORS.AUTH_ERROR);
        }

        this.authCredentials.client_id = telstra_client_id;
        this.authCredentials.client_secret = telstra_client_secret;

        return this.authCredentials;
    }
}
