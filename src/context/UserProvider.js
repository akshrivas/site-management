import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from './AuthProvider';
import PageSpinner from '../components/PageSpinner'

const UserProvider = ({ children }) => {
  const { authUser, loading } = useAuth();
  const router = useRouter();

  // Listen for changes on loading and authUser, redirect if needed
  useEffect(() => {
    if (!loading && !authUser){
      localStorage.setItem('authUser', JSON.stringify(authUser))
      router.push('/login')
    }
  }, [authUser, loading])

  return (
    <>
      {
        !loading && authUser ?
          // <PageSpinner />
          <>
            {children}
          </>
          : <PageSpinner />
      }
    </>
  )
}

export default UserProvider;