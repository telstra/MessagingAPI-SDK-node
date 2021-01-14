import HttpClient from './http-client';
import { AxiosRequestConfig } from 'axios';
import OAUTH from './oauth';
import { TMessageSendRequest } from './types';
import { API_URL } from './constants'

export class SMS extends HttpClient {
    private static classInstance?: SMS;
    
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
        this.classInstance = new SMS();
      }
      return this.classInstance;
    }
   
    public send = async (body: TMessageSendRequest) => {
        const result = await this.instance.post<TMessageSendRequest>(`/v2/messages/sms`, body);
        console.log(result);
    }

    public get_next_unread_reply = async (messageId: string) => {
        const result = await this.instance.get<TMessageSendRequest>(`/v2/messages/sms`)
        console.log(result);
    };

    public status = async (messageId: string) => {
        const result = await this.instance.get<TMessageSendRequest>(`/v2/messages/sms/${messageId}/status`)
        console.log(result);
    };    
}