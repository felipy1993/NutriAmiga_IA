import React, { useState } from 'react';
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider } from '../services/firebase';

interface LoginProps {
  onLoginSuccess: (user: any) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      onLoginSuccess(result.user);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      let result;
      if (isRegistering) {
        result = await createUserWithEmailAndPassword(auth, email, password);
      } else {
        result = await signInWithEmailAndPassword(auth, email, password);
      }
      onLoginSuccess(result.user);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#020617] text-white font-sans items-center justify-center p-6">
      <div className="fixed top-[-10%] left-[-10%] w-[80%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[60%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="z-10 w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-white/10 p-8 rounded-[3rem] shadow-2xl space-y-8 animate-in zoom-in-95 duration-500">
        <div className="text-center space-y-2">
           <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">Nutri<span className="text-emerald-400">Amiga</span></h1>
           <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">Sua saúde em primeiro lugar</p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={handleGoogleLogin} 
            disabled={loading}
            className="w-full bg-white text-slate-900 p-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
            Entrar com Google
          </button>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink mx-4 text-slate-500 text-[10px] font-bold uppercase tracking-widest">Ou com Email</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
               <input 
                 type="email" 
                 placeholder="seu@email.com" 
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 className="w-full bg-white/5 border-2 border-white/5 p-4 rounded-2xl outline-none text-white focus:border-emerald-500/50 transition-all placeholder:text-slate-600 font-medium"
                 required
               />
            </div>
            <div className="space-y-2">
               <input 
                 type="password" 
                 placeholder="Sua senha" 
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="w-full bg-white/5 border-2 border-white/5 p-4 rounded-2xl outline-none text-white focus:border-emerald-500/50 transition-all placeholder:text-slate-600 font-medium"
                 required
               />
            </div>
            
            {error && (
              <p className="text-red-400 text-xs font-bold text-center bg-red-500/10 p-2 rounded-lg">{error}</p>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-emerald-500 text-white p-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-all disabled:opacity-50 hover:shadow-emerald-500/20"
            >
              {loading ? 'Carregando...' : (isRegistering ? 'Criar Conta' : 'Entrar')}
            </button>
          </form>

          <button 
            onClick={() => setIsRegistering(!isRegistering)}
            className="w-full text-center text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-emerald-400 transition-colors"
          >
            {isRegistering ? 'Já tem uma conta? Faça login' : 'Não tem conta? Cadastre-se'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
