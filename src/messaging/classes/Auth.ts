import { Constants } from '../constants';
import { getConfig, setConfig } from '../utils';
import { AuthError } from './Errors';
import { AuthConfigProps, AuthCredentials } from '../types';

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
        this.hasCredentials = true;

        return true;
    }

    private async credentialsFromEnvVars(): Promise<boolean> {
        if (
            process.env.TELSTRA_MESSAGING_CLIENT_ID &&
            process.env.TELSTRA_MESSAGING_CLIENT_SECRET
        ) {
            if (!this.hasCredentials) {
                await setConfig({
                    telstra_messaging_client_id:
                        process.env.TELSTRA_MESSAGING_CLIENT_ID,
                    telstra_messaging_client_secret:
                        process.env.TELSTRA_MESSAGING_CLIENT_SECRET,
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
                if (!this.hasCredentials) {
                    await setConfig({
                        telstra_messaging_client_id,
                        telstra_messaging_client_secret,
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

        const credentialsFromStorage = await getConfig();
        const {
            telstra_messaging_client_id,
            telstra_messaging_client_secret,
        } = JSON.parse(credentialsFromStorage);

        if (!telstra_messaging_client_id || !telstra_messaging_client_secret) {
            throw new AuthError(Constants.ERRORS.AUTH_ERROR);
        }

        this.authCredentials.client_id = telstra_messaging_client_id;
        this.authCredentials.client_secret = telstra_messaging_client_secret;

        return this.authCredentials;
    }
}
