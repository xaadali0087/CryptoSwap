import React from 'react'
import Modal from '../modal'
import {
  useAccount,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
} from 'wagmi'
const WalletConnection = ({ visible, onClose }) => {

  const { address, connector, isConnected } = useAccount()
  const { data: ensAvatar } = useEnsAvatar({ address })
  const { data: ensName } = useEnsName({ address })
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
  const { disconnect } = useDisconnect()



  return (
    <>
      <Modal visible={visible} onClose={onClose} btn={true}>
        {isConnected ?
          <div className='w-full flex flex-col items-center justify-center h-full'>
            <img src={ensAvatar} alt="ENS Avatar" className='h-10 w-10' />
            <div className='w-full text-center pt-20'>User Address: {ensName ? `${ensName} (${address})` : address}</div>
            <div className='w-full text-center mt-10'>Connected to {connector.name}</div>
            <button onClick={disconnect} className='mt-10 px-10 py-5 rounded-full bg-red-600 text-white'>Disconnect</button>
          </div>
          :

          <div className='w-full flex flex-col items-center gap-x-3'>
            {connectors.map((connector) => (
              <button
                className='w-full py-6 bg-yellow-600 text-white font-semibold text-lg'
                disabled={!connector.ready}
                key={connector.id}
                onClick={() => connect({ connector })}
              >
                {connector.name}
                {!connector.ready && ' (unsupported)'}
                {isLoading &&
                  connector.id === pendingConnector?.id &&
                  ' (connecting)'}
              </button>
            ))}

            {error && <div className='text-red-600'>{error.message}</div>}
          </div>
        }
      </Modal>
    </>
  )
}

export default WalletConnection