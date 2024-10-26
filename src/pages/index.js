import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>英単語学習アプリへようこそ！</h1>
      <p>このアプリを使用して、あなたの英単語リストを作成・管理できます。</p>

      <div style={{ marginTop: '20px' }}>
      <Link href="/auth">
         <span style={{ margin: '10px', padding: '10px', backgroundColor: 'blue', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
           ログイン / 新規登録
         </span>
      </Link>
      </div>
    </div>
  );
}
