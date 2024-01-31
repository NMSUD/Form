import { useEffect, useState } from 'react';

import { NetworkState } from '@constants/enum/networkState';

export const usePromise = <T>(promise: () => Promise<T>, dependencies: Array<any> = []) => {
  const [result, setResult] = useState<T>();
  const [error, setError] = useState<string>();
  const [networkState, setNetworkState] = useState<NetworkState>(NetworkState.Pending);

  const handlePromise = async () => {
    setNetworkState(NetworkState.Loading);

    try {
      const result = await promise();
      setNetworkState(NetworkState.Success);
      setResult(result);
    } catch (ex) {
      setNetworkState(NetworkState.Error);
      setError(ex?.toString?.());
    }
  };

  useEffect(() => {
    handlePromise();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return [result, error, networkState, setResult];
};
