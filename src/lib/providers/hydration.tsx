import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { ReactNode } from 'react';

import getQueryClient from './getQueryClient';

interface Props {
  children: ReactNode;
}

const HydrationBoundaryWrapper = ({ children }: Props) => {
  return <HydrationBoundary state={dehydrate(getQueryClient())}>{children}</HydrationBoundary>;
};

export default HydrationBoundaryWrapper;
