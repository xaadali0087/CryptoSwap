import React from 'react'
import { useAccount, usePublicClient, useWalletClient } from 'wagmi';

const UseForTrustWallet = () => {

  const { isConnected } = useAccount();
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const [TrustWalletAccount, setTrustWalletAccount] = useState("")
  const handleGetAccount = async () => {
    try {

      const [account] = await walletClient.getAddresses();
      setTrustWalletAccount(account)
      console.log("🚀 ~ file: index.jsx:14 ~ handleGetAccount ~ account:", account)
    } catch (error) {
      console.log("🚀 ~ file: index.jsx:13 ~ handleGetAccount ~ error:", error)

    }
  }

  useEffect(() => {
    handleGetAccount()
  }, [])
  return {
    TrustWalletAccount, isConnected
  }
}

export default UseForTrustWallet