import detectEthereumProvider from "@metamask/detect-provider";
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";
import { formatBalance } from "../utils/format";

interface WalletState {
  accounts: any[];
  balance: string;
  chainId: string;
}

interface MetaMaskContextData {
  wallet: WalletState;
  hasProvider: boolean | null;
  error: boolean;
  errorMessage: string;
  isConnecting: boolean;
  isDisconnecting: boolean;
  connectMetaMask: () => void;
  disconnectMetaMask: () => void;
  clearError: () => void;
}

const disconnectedState: WalletState = { accounts: [], balance: "", chainId: "" };

const MetaMaskContext = createContext<MetaMaskContextData>({} as MetaMaskContextData);

export const MetaMaskContextProvider = ({ children }: PropsWithChildren) => {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);

  const [isConnecting, setIsConnecting] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const clearError = () => setErrorMessage("");

  const [wallet, setWallet] = useState(disconnectedState);
  // useCallback ensures that you don't uselessly recreate the _updateWallet function on every render
  const _updateWallet = useCallback(async (providedAccounts?: any) => {
    const accounts = providedAccounts || (await (window as any).ethereum.request({ method: "eth_accounts" }));

    if (accounts.length === 0) {
      // If there are no accounts, then the user is disconnected
      setWallet(disconnectedState);
      return;
    }

    const balance = formatBalance(
      await (window as any).ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      }),
    );
    const chainId = await (window as any).ethereum.request({
      method: "eth_chainId",
    });

    setWallet({ accounts, balance, chainId });
  }, []);
  const updateWalletAndAccounts = useCallback(() => _updateWallet(), [_updateWallet]);
  const updateWallet = useCallback((accounts: any) => _updateWallet(accounts), [_updateWallet]);
  /**
   * This logic checks if MetaMask is installed. If it is, some event handlers are set up
   * to update the wallet state when MetaMask changes. The function returned by useEffect
   * is used as a "cleanup": it removes the event handlers whenever the MetaMaskProvider
   * is unmounted.
   */
  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));

      if (provider) {
        updateWalletAndAccounts();
        (window as any).ethereum.on("accountsChanged", updateWallet);
        (window as any).ethereum.on("chainChanged", updateWalletAndAccounts);
      }
    };

    getProvider();

    return () => {
      (window as any).ethereum?.removeListener("accountsChanged", updateWallet);
      (window as any).ethereum?.removeListener("chainChanged", updateWalletAndAccounts);
    };
  }, [updateWallet, updateWalletAndAccounts]);

  const connectMetaMask = async () => {
    setIsConnecting(true);

    try {
      const accounts = await (window as any).ethereum.request({
        method: "eth_requestAccounts",
      });
      clearError();
      updateWallet(accounts);
    } catch (err: any) {
      setErrorMessage(err.message);
    }
    setIsConnecting(false);
  };

  const disconnectMetaMask = async () => {
    setIsDisconnecting(true);
    try {
      (window as any).ethereum.on("disconnect", () => {
        console.log("MetaMask discconnected");
      });
      clearError();
      updateWallet([]);
    } catch (err: any) {
      setErrorMessage(err.message);
    }
    setIsDisconnecting(false);
  };

  return (
    <MetaMaskContext.Provider
      value={{
        wallet,
        hasProvider,
        error: !!errorMessage,
        errorMessage,
        isConnecting,
        isDisconnecting,
        connectMetaMask,
        disconnectMetaMask,
        clearError,
      }}
    >
      {children}
    </MetaMaskContext.Provider>
  );
};

export const useMetamask = () => {
  const context = useContext(MetaMaskContext);
  if (context === undefined) {
    throw new Error('useMetamask must be used within a "MetaMaskContextProvider"');
  }
  return context;
};
