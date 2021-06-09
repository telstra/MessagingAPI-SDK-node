/* eslint-disable */
import axios from 'axios'

let mockingEnabled = false

const mocks: any = {}

export function addMock(url: string, data: any) {
  mocks[url] = data
}

export function enableMocking(state: boolean) {
  mockingEnabled = state
}

const isUrlMocked = (url: any) => url in mocks

const getMockError = (config: any) => {
  const mockError: any = new Error()
  mockError.mockData = mocks[config.url]
  mockError.config = config
  return Promise.reject(mockError)
}

const isMockError = (error: any) => Boolean(error.mockData)

const getMockResponse = (mockError: any) => {
  const {mockData, config} = mockError
  // Handle mocked error (any non-2xx status code)
  if (mockData.status && String(mockData.status)[0] !== '2') {
    const err: any = new Error(mockData.message || 'mock error')
    err.code = mockData.status
    return Promise.reject(err)
  }
  // Handle mocked success
  return Promise.resolve(Object.assign({
    data: {},
    status: 200,
    statusText: 'OK',
    headers: {},
    config,
    isMock: true
  }, mockData))
}

// Add a request interceptor
axios.interceptors.request.use(config => {
  if (mockingEnabled && isUrlMocked(config.url)) {
    console.log('axios mocking ' + config.url)
    return getMockError(config)
  }
  return config
}, error => Promise.reject(error))

// Add a response interceptor
axios.interceptors.response.use(response => response, error => {
  if (isMockError(error)) {
    return getMockResponse(error)
  }
  return Promise.reject(error)
})