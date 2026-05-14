import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';
import { Platform } from 'react-native';

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

interface JwtPayload {
  exp: number;
}

export const setAccessToken = async (token: string) => {
  if (Platform.OS === 'web') {
    localStorage.setItem(ACCESS_TOKEN_KEY, token)
  } else {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token)
  }
}

export const getAccessToken = async () => {
  if (Platform.OS === 'web') {
    return localStorage.getItem(ACCESS_TOKEN_KEY)
  }
  return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY)
}

export const setRefreshToken = async (token: string) => {
  if (Platform.OS === 'web') {
    localStorage.setItem(REFRESH_TOKEN_KEY, token)
  } else {
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, token)
  }
}

export const getRefreshToken = async () => {
  if (Platform.OS === 'web') {
    return localStorage.getItem(REFRESH_TOKEN_KEY)
  }
  return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY)
}

export const clearAccessToken = async () => {
  if (Platform.OS === 'web') {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
  } else {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY)
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY)
  }
}

export const isTokenExpired = (token?: string) => {
  if (!token) return true;
  try {
    const decoded: JwtPayload = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.exp < now;
  } catch (err) {
    console.log('JWT decode error:', err);
    return true; // if decoding fails, treat as expired
  }
};

// ========================
// REFRESH ACCESS TOKEN
// ========================
export const refreshAccessToken = async (refreshToken: string) => {
  const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  const data = await response.json();
  const newAccessToken = data.accessToken;

  await setAccessToken(newAccessToken);
  return newAccessToken;
};