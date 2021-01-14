import HttpClient from './http-client';
import { AxiosRequestConfig } from 'axios';
import OAUTH from './oauth';
import { TBnumRetrieveResponse, TBnumRegisterRequest, TBnumRegisterResponse } from './types';
import { API_URL } from './constants'

export class BNUM extends HttpClient {
    private static classInstance?: BNUM;
    
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
        this.classInstance = new BNUM();
      }
      return this.classInstance;
    }
   
    public register = async (body: TBnumRegisterRequest) => {
        const result = await this.instance.post<TBnumRegisterResponse>(`/v2/messages/freetrial/bnum`, body);
        console.log(result);
    }

    public get = async () => {
        const result = await this.instance.get<TBnumRetrieveResponse>(`/v2/messages/freetrial/bnum`)
        console.log(result);
    };    
  }