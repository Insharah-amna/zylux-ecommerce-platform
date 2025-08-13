'use client';

import {useEffect, useState} from 'react';
import {SideContentExpandHookProps} from '@/interfaces/hooks';

const useSideContentExpand = ({
  open,
  delay = 200,
}: SideContentExpandHookProps) => {
  const [shouldExpand, setShouldExpand] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (open) {
      timeout = setTimeout(() => {
        setShouldExpand(true);
      }, delay);
    } else {
      setShouldExpand(false);
    }

    return () => clearTimeout(timeout);
  }, [open]);

  return {shouldExpand};
};

export default useSideContentExpand;
