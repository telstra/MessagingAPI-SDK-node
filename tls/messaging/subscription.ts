import HttpClient from './http-client';
import { AxiosRequestConfig } from 'axios';
import OAUTH from './oauth';
import { TSubscriptionCreateRequest, TSubscriptionCreateResponse, TSubscriptionRetrieveResponse, TSubscriptionDeleteRequest } from './types';
import { API_URL } from './constants'

export class Subscription extends HttpClient {
    private static classInstance?: Subscription;
    
    private constructor() {
      super(API_URL);
      this._initializeRequestInterceptor();
    }

    private _initializeRequestInterceptor = () => {
        this.instance.interceptors.request.use(
          this._handleRequest,
          this._handleError,
        );
    };

    private _handleRequest = async (config: AxiosRequestConfig) => {
        const oauth = new OAUTH;
        const authToken = await oauth.getToken();
        config.headers['Content-Type'] = `application/json`;
        config.headers['Authorization'] = `Bearer ${authToken}`;
        return config;
    };
  
    public static getInstance() {
      if (!this.classInstance) {
        this.classInstance = new Subscription();
      }
      return this.classInstance;
    }
   
    public create = async (body: TSubscriptionCreateRequest) => {
        const result = await this.instance.post<TSubscriptionCreateResponse>(`/v2/messages/provisioning/subscriptions`, body);
        console.log(result);
    }

    public get = async () => {
      const result = await this.instance.get<TSubscriptionRetrieveResponse>(`/v2/messages/provisioning/subscriptions`);
      console.log(result);
    };

    // public delete = async (body: TSubscriptionDeleteRequest) => {
    //   const result = await this.instance.delete<TSubscriptionDeleteRequest>(`/v2/messages/provisioning/subscriptions`, body);
    //   console.log(result);
    // }
}