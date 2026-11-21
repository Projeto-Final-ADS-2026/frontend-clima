// src/services/authApi.ts

import { AuthResponse, LoginPayload, RegisterPayload, User } from '../types/auth';
import { jsonBody, request } from './http';

export const login = (payload: LoginPayload) =>
  request<AuthResponse>('/api/auth/login', jsonBody(payload));

export const register = (payload: RegisterPayload) =>
  request<AuthResponse>('/api/auth/register', jsonBody(payload));

export const getMe = () => request<User>('/api/auth/me');
