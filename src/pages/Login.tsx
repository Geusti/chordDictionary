import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { LogIn, UserPlus, Music, Loader2 } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        // If successful but requires email confirmation, inform the user:
        alert('Conta criada! Verifique seu e-mail ou, se a confirmação estiver desabilitada, você já será logado.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      }
    } catch (error: any) {
      setErrorMsg(error.message || 'Ocorreu um erro durante a autenticação.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-[#8B5CF6]/30 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-tertiary/20 blur-[100px] rounded-full"></div>

      <div className="glass-card w-full max-w-md p-8 rounded-3xl relative z-10 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-slate-800/50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-700">
            <Music className="w-8 h-8 text-[#8B5CF6]" />
          </div>
          <h1 className="text-3xl font-black text-white font-['Lexend'] tracking-tighter">
            Chord Library
          </h1>
          <p className="text-slate-400 mt-2 text-sm">
            {isSignUp ? 'Crie sua conta para começar' : 'Acesse seu dicionário avançado'}
          </p>
        </div>

        {errorMsg && (
          <div className="bg-error-container/20 border border-error/50 text-error px-4 py-3 rounded-xl mb-6 text-sm text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-5">
          <div className="space-y-1">
            <label className="text-slate-300 text-xs font-bold uppercase tracking-wider ml-1">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-all"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-300 text-xs font-bold uppercase tracking-wider ml-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6] transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#8B5CF6] hover:bg-[#7c4dff] text-white font-bold py-3.5 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : isSignUp ? (
              <>
                <UserPlus className="w-5 h-5" />
                Criar Conta
              </>
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                Entrar
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-slate-400 hover:text-white text-sm transition-colors"
          >
            {isSignUp
              ? 'Já tem uma conta? Faça login'
              : 'Ainda não tem conta? Cadastre-se'}
          </button>
        </div>
      </div>
    </div>
  );
}
