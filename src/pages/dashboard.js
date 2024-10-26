import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [wordList, setWordList] = useState([]);
  const [newWord, setNewWord] = useState('');
  const [newMeaning, setNewMeaning] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push('/auth'); // ログインしていない場合はログインページへリダイレクト
      } else {
        setUser(data.session.user);
        fetchWords(data.session.user.id); // ユーザーの単語を取得
      }
    };
    getUserInfo();
  }, [router]);

  // 単語リストを取得
  const fetchWords = async (userId) => {
    const { data, error } = await supabase
      .from('words')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      setErrorMessage(error.message);
    } else {
      setWordList(data);
    }
  };

  // 新しい単語を追加
  const handleAddWord = async () => {
    if (!newWord || !newMeaning) {
      setErrorMessage('単語と意味を入力してください');
      return;
    }

    const { data, error } = await supabase
      .from('words')
      .insert([{ word: newWord, meaning: newMeaning, user_id: user.id }]);

    if (error) {
      setErrorMessage(error.message);
    } else {
      setWordList([...wordList, ...data]);
      setNewWord('');
      setNewMeaning('');
    }
  };

  // 単語を削除
  const handleDeleteWord = async (id) => {
    const { error } = await supabase.from('words').delete().eq('id', id);

    if (error) {
      setErrorMessage(error.message);
    } else {
      setWordList(wordList.filter((word) => word.id !== id));
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>ダッシュボード</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {user && (
        <div>
          <h2>新しい単語を追加</h2>
          <input
            type="text"
            placeholder="単語"
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
            style={{ margin: '5px', padding: '10px' }}
          />
          <input
            type="text"
            placeholder="意味"
            value={newMeaning}
            onChange={(e) => setNewMeaning(e.target.value)}
            style={{ margin: '5px', padding: '10px' }}
          />
          <button onClick={handleAddWord} style={{ margin: '5px', padding: '10px' }}>
            追加
          </button>

          <h2>単語リスト</h2>
          <ul>
            {wordList.map((word) => (
              <li key={word.id}>
                {word.word} - {word.meaning}
                <button onClick={() => handleDeleteWord(word.id)} style={{ marginLeft: '10px' }}>
                  削除
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
