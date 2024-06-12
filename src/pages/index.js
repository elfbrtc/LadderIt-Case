import { useState } from 'react';
import { supabase } from '../utils/supabase/supabase';
import useSupabaseStore from '../stores/supabaseStore';

export default function LoginForm() {
  const supabaseStore = useSupabaseStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const data = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (data.data.user) {
        console.log('User successfully logged in:', data.data.user);
        supabaseStore.setUser(data.data.user);
      
      } else {
        console.error('User object is undefined');
        setError('User object is undefined');
      }
    } catch (error) {
      console.error('Error signing in:', error.message);
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}