import io  from 'socket.io-client';
import urls from './constants/urls';

// "undefined" means the URL will be computed from the `window.location` object
const URL = urls.socketUrl;

export const socket = io(URL);
