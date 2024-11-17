import axios from 'axios';

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const REDIRECT_URI = `${window.location.origin}/auth_oauth/signin`;

export function getAuthUrl() {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'token',
    scope: 'https://www.googleapis.com/auth/spreadsheets.readonly',
    access_type: 'offline',
    prompt: 'consent',
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export async function validateToken(accessToken: string) {
  try {
    const response = await axios.get(
      'https://www.googleapis.com/oauth2/v3/tokeninfo',
      {
        params: { access_token: accessToken },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Token validation error:', error);
    return null;
  }
}

export function setAccessToken(token: string) {
  localStorage.setItem('google_access_token', token);
}

export function getAccessToken() {
  return localStorage.getItem('google_access_token');
}

export function removeAccessToken() {
  localStorage.removeItem('google_access_token');
}