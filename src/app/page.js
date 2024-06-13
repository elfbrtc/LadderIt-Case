"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const IndexPage = () => {
    const router = useRouter();

    useEffect(() => {    
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if(isLoggedIn)    
            router.push('/main');
        else
            router.push('/login');
    }, [router]);

    return null; 
};

export default IndexPage;