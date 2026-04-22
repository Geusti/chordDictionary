import { Menu, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Header() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="bg-[#0F172A]/90 backdrop-blur-md text-[#8B5CF6] font-['Lexend'] font-medium tracking-tight docked full-width top-0 border-b border-slate-800/50 shadow-none flex justify-between items-center w-full px-6 py-4 sticky z-50">
      <div className="flex items-center gap-4">
        <Menu className="text-on-surface w-6 h-6" />
        <h1 className="text-xl font-black text-white tracking-tighter">Chord Library</h1>
      </div>
      <div className="flex items-center gap-3">
        <button 
          onClick={handleLogout}
          className="text-slate-400 hover:text-error transition-colors p-2"
          title="Sair"
        >
          <LogOut className="w-5 h-5" />
        </button>
        <div className="w-10 h-10 rounded-full bg-surface-container-high border border-slate-700 flex items-center justify-center overflow-hidden">
          <img 
            alt="User Profile" 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPypNUawxjGwFA8btG1wpW-HKvjycy5FxTTP4yc3xy979j8mip6XRsEJfIoePGwt0anXPpUB_sG90jOcOApOlD55L7mQv4PQRyn_kJzGm2zf4epCLLRa1yzo_hwIUmPwfIZrTuf8PrkKZEvOS531tS6coZzJJpztHHVh7v1DenQxy2IWTpt3a1q0YHwli_z9yeIYMI4lXClVTzobASSdAhZwk5C48lghOCIzGswFfW0aUF26jyr-ocJr5EnWH9AFP6q3GG191LWg"
          />
        </div>
      </div>
    </header>
  );
}
