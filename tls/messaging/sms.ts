import HttpClient from './http-client';
import { AxiosRequestConfig } from 'axios';
import OAUTH from './oauth';
import { TMessageSendRequest, TMessageSendResponse } from './types';
import { API_URL } from './constants'
import { validateError } from './validate';
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
      try {
        const result = await this.instance.post<TMessageSendResponse>(`/v2/messages/sms`, body);
        return result;
      } catch (error) {
        return validateError(error);
      }
    }

    public get_next_unread_reply = async (messageId: string) => {
        try {
          const result = await this.instance.get<TMessageSendRequest>(`/v2/messages/sms`)
          return result;
        } catch (error) {
          return validateError(error);
        }
    };

    public status = async (messageId: string) => {
      try {
        const result = await this.instance.get<TMessageSendRequest>(`/v2/messages/sms/${messageId}/status`)
        return result;
      } catch (error) {
        return validateError(error);
      }
    };    
}