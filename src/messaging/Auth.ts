import HttpClient from './HttpClient';
import { AxiosRequestConfig } from 'axios';
import { API_URL, Constants } from './Constants';
import { URLSearchParams } from 'url';
import { getConfig, setConfig } from './config';
import { AuthError, remap } from './Errors';
export class Auth extends HttpClient {
    public constructor() {
        super(API_URL);
        this._initializeRequestInterceptor();
    }

    public _initializeRequestInterceptor = () => {
        this.instance.interceptors.request.use(
            this._handleRequest,
            this._handleError
        );
    };

    public _handleRequest = (config: AxiosRequestConfig) => {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        return config;
    };

    private tokenFromEnvVars(): boolean {
        if (
            process.env.TELSTRA_MESSAGING_CLIENT_ID &&
            process.env.TELSTRA_MESSAGING_CLIENT_SECRET
        ) {
            setConfig({
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

    private tokenFromSharedCredentials(): boolean {
        return false;
    }

    private tokenFromFileImport(): boolean {
        return false;
    }

    public getToken = async () => {
        try {
            if (
                !this.tokenFromEnvVars() &&
                !this.tokenFromSharedCredentials() &&
                !this.tokenFromFileImport()
            ) {
                throw new AuthError(Constants.ERRORS.AUTH_ERROR);
            }

            const authConfig = await getConfig();
            const {
                telstra_messaging_client_id,
                telstra_messaging_client_secret,
            } = JSON.parse(authConfig);

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
            if (!auth) return false;
            const { access_token } = auth;
            return access_token;
        } catch (error) {
            throw remap(error);
        }
    };
}
