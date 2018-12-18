import { useEffect, useState } from 'react';

export default function useOffline() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    window.addEventListener('online', () => {
      setIsOffline(false);
    });

    window.addEventListener('offline', () => {
      setIsOffline(true);
    });
  });

  return isOffline;
}
