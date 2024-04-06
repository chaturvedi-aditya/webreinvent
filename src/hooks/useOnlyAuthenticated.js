import { useGlobalContext } from '@/context/globalContext';
import { useRouter } from 'next/navigation';

const useOnlyAuthenticated = () => {
  const router = useRouter();
  const { auth } = useGlobalContext();
  const isLoggedIn = !!auth?.token;
  if (!isLoggedIn) {
    router.replace('/login');
  }
};

export default useOnlyAuthenticated;
