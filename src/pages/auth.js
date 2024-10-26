import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';

export default function Auth() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // ユーザー登録（サインアップ）
  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setErrorMessage(error.message);
    } else {
      router.push('/dashboard'); // 登録後、ダッシュボードに遷移
    }
  };

  // ユーザーログイン
  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setErrorMessage(error.message);
    } else {
      router.push('/dashboard'); // ログイン後、ダッシュボードに遷移
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>ユーザー登録とログイン</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <input
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ margin: '5px', padding: '10px', width: '300px' }}
      />
      <br />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ margin: '5px', padding: '10px', width: '300px' }}
      />
      <br />
      <button onClick={handleSignUp} style={{ margin: '5px', padding: '10px' }}>
        登録
      </button>
      <button onClick={handleLogin} style={{ margin: '5px', padding: '10px' }}>
        ログイン
      </button>
    </div>
  );
}
