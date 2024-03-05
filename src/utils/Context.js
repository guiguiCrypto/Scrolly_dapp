import { createContext } from 'react';

export const ConnectionContext = createContext({
    isConnected: false,
    userAddress: undefined
});