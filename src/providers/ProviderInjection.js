import AuthContextProvider from '@/contexts/AuthContextProvider';
import GlobalContextProvider from '@/contexts/GlobalContextProvider';

const providers = [AuthContextProvider, GlobalContextProvider];

const ProviderInjection = ({ children }) => {
  return providers.reduce((acc, Provider) => {
    if (!Provider) {
      console.error('Encountered undefined provider in ProviderInjection');
      return acc;
    }
    return <Provider>{acc}</Provider>;
  }, children);
};

export default ProviderInjection;
