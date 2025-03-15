import { createContext } from 'react';

export default createContext<{
  setBreadcrumb: (val: string) => void;
}>({
  setBreadcrumb: () => {},
});
