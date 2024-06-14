'use client'; 

import LoginForm from '../../components/LoginForm';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {    
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if(isLoggedIn)    
        router.push('/main');
  }, [router]);

  return (
    <div>
      <LoginForm />
    </div>
  );
}
