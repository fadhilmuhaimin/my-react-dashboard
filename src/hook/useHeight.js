import { useState, useEffect } from 'react';

export const useHeight = (height = 230) => {
  const [tableHeight, setHeight] = useState(
    parseInt(window.innerHeight) - height
  );

  useEffect(() => {
    const handleResize = () => {
      setHeight(parseInt(window.innerHeight) - height);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return tableHeight;
};