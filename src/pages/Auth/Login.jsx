import React, { useState } from 'react';
import { Mail, Lock, LogIn, Fingerprint } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Authenticating...',
      timer: 1000,
      timerProgressBar: true,
      showConfirmButton: false,
      didOpen: () => Swal.showLoading()
    }).then(() => {
      navigate('/');
    });
  };

  return (
    <div className="min-h-screen w-full flex bg-white font-sans animate-in fade-in duration-500">
      
      {/* Left Split - Branding (Hidden on mobile) */}
      <div className="hidden lg:flex w-full lg:w-1/2 bg-blue-600 relative overflow-hidden flex-col justify-center items-center p-12">
         {/* Abstract Shapes */}
         <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" style={{ animationDelay: '2s' }}></div>
         
         <div className="relative z-10 text-center text-white">
            <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl mx-auto flex items-center justify-center border border-white/20 mb-8 shadow-2xl">
               <Fingerprint size={48} className="text-white" />
            </div>
            <h1 className="text-5xl font-black mb-6 tracking-tight leading-tight">Attendance,<br/>Reimagined.</h1>
            <p className="text-blue-100 text-lg font-medium max-w-md mx-auto leading-relaxed">
               Secure cloud-based workforce management, AI face verification, and geofence tracking in one unified interface.
            </p>
         </div>
      </div>

      {/* Right Split - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-24 bg-gray-50/50">
         <div className="w-full max-w-md space-y-8">
            <div className="text-center lg:text-left">
               <div className="lg:hidden w-16 h-16 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg mb-6 text-white font-black text-xl">SVG</div>
               <h2 className="text-3xl font-black text-gray-900 tracking-tight">Admin Portal</h2>
               <p className="text-gray-500 mt-2 font-medium">Log in to manage your workforce.</p>
            </div>

            <form onSubmit={handleLogin} className="mt-10 space-y-6">
               <div className="space-y-4">
                  <div>
                     <label className="block text-sm font-bold text-gray-700 mb-1.5">Email or Admin ID</label>
                     <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                           <Mail size={18} className="text-gray-400" />
                        </div>
                        <input 
                          type="text" 
                          value={email}
                          onChange={(e)=>setEmail(e.target.value)}
                          className="block w-full pl-11 pr-3 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-900 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm outline-none transition-all" 
                          placeholder="admin" 
                        />
                     </div>
                  </div>

                  <div>
                     <label className="block text-sm font-bold text-gray-700 mb-1.5">Password</label>
                     <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                           <Lock size={18} className="text-gray-400" />
                        </div>
                        <input 
                          type="password"
                          value={password}
                          onChange={(e)=>setPassword(e.target.value)}
                          className="block w-full pl-11 pr-3 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-900 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm outline-none transition-all" 
                          placeholder="••••••••" 
                        />
                     </div>
                  </div>
               </div>

               <div className="flex items-center justify-between">
                  <div className="flex items-center">
                     <input id="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                     <label htmlFor="remember-me" className="ml-2 block text-sm font-bold text-gray-600">Remember me</label>
                  </div>
                  <div className="text-sm">
                     <a href="#" className="font-bold text-blue-600 hover:text-blue-500 transition-colors">Forgot password?</a>
                  </div>
               </div>

               <button type="submit" className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all">
                  <LogIn size={18} className="mr-2" />
                  Sign in to Dashboard
               </button>
            </form>
            
            <p className="text-center text-xs font-bold text-gray-400">
               Secured by SVG ERP Systems v2.1
            </p>
         </div>
      </div>
    </div>
  );
};

export default Login;
