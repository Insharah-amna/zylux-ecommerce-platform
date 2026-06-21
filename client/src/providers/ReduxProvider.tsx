'use client';

import {NodeChildrenProps} from '@/interfaces/common';
import {store} from '@/redux/store';
import {Provider} from 'react-redux';

export const ReduxProvider = ({children}: NodeChildrenProps) => {
  return <Provider store={store}>{children}</Provider>;
};
