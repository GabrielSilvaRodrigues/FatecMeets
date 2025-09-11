import axios from 'axios';
import Constants from 'expo-constants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const process: any;

const expoExtra: any = (Constants.expoConfig as any)?.extra ?? (Constants.manifest as any)?.extra ?? {};
const publicEnv = (typeof process !== 'undefined' && (process as any).env) || {};
const baseURL: string = publicEnv.EXPO_PUBLIC_API_BASE_URL || expoExtra.apiBaseUrl || 'http://localhost:3000';

export const api = axios.create({ baseURL, timeout: 10000 });

export function setAuthToken(token?: string) {
  if (token) api.defaults.headers.common.Authorization = `Bearer ${token}`;
  else delete (api.defaults.headers.common as any).Authorization;
}
