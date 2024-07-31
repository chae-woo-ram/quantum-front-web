'use client';

import { RecoilRoot } from 'recoil';

const RecoilRootWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilRootWrapper;
