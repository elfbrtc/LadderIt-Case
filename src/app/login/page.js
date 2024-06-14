'use client'; 

import LoginForm from '../../components/LoginForm';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {    
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if(isLoggedIn)    
        router.push('/main');
    else
      setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <LoginForm />
    </div>
  );
}
