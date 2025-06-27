import React, { useEffect, useState } from 'react';
import { Mail, Lock, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useResetPasswordMutation } from '../redux/features/baseAPI/baseApi';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [resetPassword, { isLoading, error }] = useResetPasswordMutation();

   useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // If no email in localStorage, redirect to forget-password
      navigate('/forget-password');
    }
  }, [navigate]);


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
     if (!email) return toast.error("Can not find email from previous page!");
    const resetData = {
      email,
      password: data.password
    }
    try {
      const res = await resetPassword(resetData).unwrap();
      console.log({res})
       toast.success("Password Reset Successful!");
      navigate('/login');
    } catch (err) {
      toast.error("Something went wrong!", err);
      console.error('Reset failed:', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
       <ToastContainer />
 
      <div className="w-full md:w-1/2 h-[30vh] md:h-screen relative">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://content3.jdmagicbox.com/v2/comp/pathanamthitta/h8/9999px468.x468.241026170405.s9h8/catalogue/luxe-luminary-wellness-thiruvalla-market-junction-thiruvalla-body-massage-centres-7ga6cf7vi9.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <button className="absolute top-4 left-4 text-white z-10">
          <ArrowLeft size={24} />
        </button>
     
      </div>


      <div className="w-full md:w-1/2 min-h-[100vh] md:h-screen relative">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: "url('https://i.ibb.co.com/cctYrsKY/Group-1686551056.png')",
          }}
        >
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] md:h-screen p-8">
          <div className="w-full max-w-xl space-y-8">
            <div className="text-center">
              <img 
                src="https://i.ibb.co.com/sp5JLnkF/Whats-App-Image-2025-02-22-at-9-25-22-AM-3.png" 
                alt="Logo" 
                className="mx-auto mb-16 w-3/4" 
              />
            </div>

           <form
              onSubmit={handleSubmit(onSubmit)}
              className="backdrop-blur-sm bg-white/10 p-10 mb-10 rounded-lg border border-gray-200 shadow-lg"
            >
              <h2 className="text-3xl font-bold text-[#B28D28] mb-10 text-center">Reset your Password</h2>

              <div className="form-control w-full mb-6">
                <div className="relative">
                  <input
                    type="password"
                    placeholder="New Password"
                    {...register('password', { required: true, minLength: 4 })}
                    className="input input-bordered border-[#B28D2866]/40 w-full pl-10 bg-white/20 text-gray-950 placeholder-gray-300"
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">Password is required (min 6 chars).</p>}
              </div>

              <div className="form-control w-full mb-6">
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    {...register('confirmPassword', {
                      required: true,
                      validate: (value) => value === watch('password') || 'Passwords do not match',
                    })}
                    className="input input-bordered border-[#B28D2866]/40 w-full pl-10 bg-white/20 text-gray-950 placeholder-gray-300"
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>

              {error && <p className="text-red-500 text-sm mb-4">Failed to reset password. Please try again.</p>}

              <button
                type="submit"
                className="btn bg-[#B28D28] text-white rounded-full w-full text-base"
                disabled={isLoading}
              >
                {isLoading ? 'Resetting...' : 'Confirm'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;