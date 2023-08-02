import { useContext } from 'react';
import WalletContext from '../providers/wallet-context';
// import WalletContext from '@/providers/wallet-context';

const useWallet = () => {
    return useContext(WalletContext);
};

export default useWallet;
