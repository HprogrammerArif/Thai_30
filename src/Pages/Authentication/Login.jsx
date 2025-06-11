

// import { useState } from 'react';
// import { Mail, Lock, ArrowLeft } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { useLoginUserMutation } from '../redux/features/baseAPI/baseApi';

// const Login = () => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();
//   const { register, handleSubmit, formState: { errors } } = useForm({
//     defaultValues: {
//       email: '',
//       password: ''
//     }
//   });
//   const [loginUser, { isLoading }] = useLoginUserMutation();

//   const onSubmit = async (userData) => {
//     setIsSubmitting(true);
//     try {

//       console.log('Form submitted:', userData);

//       const response = await loginUser(userData).unwrap();
//       console.log('Login response:', response);
//       navigate('/dashboard/home');

//       localStorage.setItem("access_token", response?.access);
//       localStorage.setItem("refresh_token", response?.refresh);
  
//     } catch (error) {
//       console.error('Login error:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row">
//       <div className="w-full md:w-1/2 h-[30vh] md:h-screen relative">
//         <div 
//           className="absolute inset-0 bg-cover bg-center"
//           style={{
//             backgroundImage: "url('https://content3.jdmagicbox.com/v2/comp/pathanamthitta/h8/9999px468.x468.241026170405.s9h8/catalogue/luxe-luminary-wellness-thiruvalla-market-junction-thiruvalla-body-massage-centres-7ga6cf7vi9.jpg')"
//           }}
//         >
//           <div className="absolute inset-0 bg-black/40"></div>
//         </div>
//         <Link to="/" className="absolute top-4 left-4 text-white z-10">
//           <ArrowLeft size={24} />
//         </Link>
//       </div>

//       <div className="w-full md:w-1/2 min-h-[100vh] md:h-screen relative">
//         <div 
//           className="absolute inset-0 bg-cover bg-center opacity-40"
//           style={{
//             backgroundImage: "url('https://i.ibb.co/cctYrsKY/Group-1686551056.png')"
//           }}
//         />
        
//         <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] md:h-screen p-8">
//           <div className="w-full max-w-xl space-y-8">
//             <div className="text-center">
//               <img 
//                 src="https://i.ibb.co/sp5JLnkF/Whats-App-Image-2025-02-22-at-9-25-22-AM-3.png" 
//                 alt="Logo" 
//                 className="mx-auto mb-16 w-3/4" 
//               />
//             </div>

//             <form 
//               onSubmit={handleSubmit(onSubmit)}
//               className="backdrop-blur-sm bg-white/10 p-10 mb-10 rounded-lg border border-gray-200 shadow-lg"
//             >
//               <h2 className="text-3xl font-bold text-[#B28D28] mb-10 text-center">Login</h2>
              
//               <div className="form-control w-full mb-6">
//                 <div className="relative">
//                   <input 
//                     type="email" 
//                     placeholder="Enter your email" 
//                     className={`input input-bordered border-[#B28D2866]/40 w-full pl-10 bg-white/20 text-black placeholder-gray-300 ${errors.email ? 'border-red-500' : ''}`}
//                     {...register('email', {
//                       required: 'Email is required',
//                       pattern: {
//                         value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                         message: 'Invalid email address'
//                       }
//                     })}
//                   />
//                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                 </div>
//                 {errors.email && (
//                   <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
//                 )}
//               </div>

//               <div className="form-control w-full mb-6">
//                 <div className="relative">
//                   <input 
//                     type="password" 
//                     placeholder="Enter your password" 
//                     className={`input input-bordered w-full pl-10 bg-white/20 border-[#B28D2866]/40 text-black placeholder-gray-300 ${errors.password ? 'border-red-500' : ''}`}
//                     {...register('password', {
//                       required: 'Password is required',
//                       minLength: {
//                         value: 5,
//                         message: 'Password must be at least 6 characters'
//                       }
//                     })}
//                   />
//                   <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                 </div>
//                 {errors.password && (
//                   <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
//                 )}
//               </div>
              
//               <div className="flex justify-end mb-10">
//                 <Link 
//                   to="/email_varification"
//                   className="text-[#8F5E0A] font-semibold cursor-pointer hover:underline pt-2"
//                 >
//                   Forgot Password?
//                 </Link>
//               </div>

        

//             <button
//   type="submit"
//   disabled={isSubmitting || isLoading}
//   className={`rounded-full w-full text-base text-white
//     ${isLoading ? 'bg-yellow-500 cursor-not-allowed' : 'bg-[#B28D28] hover:bg-[#be892d]'}
//     px-4 py-2 font-semibold shadow-md`}
// >
//   {isLoading ? (
//     <span className="loading loading-bars loading-sm"></span>
//   ) : (
//     'Login'
//   )}
// </button>



//               <p className="text-center text-gray-900 mt-4">
//                 Don't have an account? 
//                 <Link to="/sign_up" className="text-[#8F5E0A] font-semibold ml-1 hover:underline">Sign Up</Link>
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



import { useState } from 'react';
import { Mail, Lock, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useLoginUserMutation } from '../redux/features/baseAPI/baseApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const onSubmit = async (userData) => {
    setIsSubmitting(true);
    try {
      const response = await loginUser(userData).unwrap();

      localStorage.setItem("access_token", response?.access);
      localStorage.setItem("refresh_token", response?.refresh);

      navigate('/dashboard/home');
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage =
        error?.data?.message ||
        error?.error ||
        "Invalid email or password. Please try again.";

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Image Panel */}
      <div className="w-full md:w-1/2 h-[30vh] md:h-screen relative">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://content3.jdmagicbox.com/v2/comp/pathanamthitta/h8/9999px468.x468.241026170405.s9h8/catalogue/luxe-luminary-wellness-thiruvalla-market-junction-thiruvalla-body-massage-centres-7ga6cf7vi9.jpg')"
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <Link to="/" className="absolute top-4 left-4 text-white z-10">
          <ArrowLeft size={24} />
        </Link>
      </div>

      {/* Right Form Panel */}
      <div className="w-full md:w-1/2 min-h-[100vh] md:h-screen relative">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: "url('https://i.ibb.co/cctYrsKY/Group-1686551056.png')"
          }}
        />
        
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] md:h-screen p-8">
          <div className="w-full max-w-xl space-y-8">
            <div className="text-center">
              <img 
                src="https://i.ibb.co/sp5JLnkF/Whats-App-Image-2025-02-22-at-9-25-22-AM-3.png" 
                alt="Logo" 
                className="mx-auto mb-16 w-3/4" 
              />
            </div>

            <form 
              onSubmit={handleSubmit(onSubmit)}
              className="backdrop-blur-sm bg-white/10 p-10 mb-10 rounded-lg border border-gray-200 shadow-lg"
            >
              <h2 className="text-3xl font-bold text-[#B28D28] mb-10 text-center">Login</h2>
              
              <div className="form-control w-full mb-6">
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className={`input input-bordered border-[#B28D2866]/40 w-full pl-10 bg-white/20 text-black placeholder-gray-300 ${errors.email ? 'border-red-500' : ''}`}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div className="form-control w-full mb-6">
                <div className="relative">
                  <input 
                    type="password" 
                    placeholder="Enter your password" 
                    className={`input input-bordered w-full pl-10 bg-white/20 border-[#B28D2866]/40 text-black placeholder-gray-300 ${errors.password ? 'border-red-500' : ''}`}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 5,
                        message: 'Password must be at least 6 characters'
                      }
                    })}
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>
              
              <div className="flex justify-end mb-10">
                <Link 
                  to="/email_varification"
                  className="text-[#8F5E0A] font-semibold cursor-pointer hover:underline pt-2"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className={`rounded-full w-full text-base text-white
                  ${isLoading ? 'bg-yellow-500 cursor-not-allowed' : 'bg-[#B28D28] hover:bg-[#be892d]'}
                  px-4 py-2 font-semibold shadow-md`}
              >
                {isLoading ? (
                  <span className="loading loading-bars loading-sm"></span>
                ) : (
                  'Login'
                )}
              </button>

              <p className="text-center text-gray-900 mt-4">
                Don't have an account? 
                <Link to="/sign_up" className="text-[#8F5E0A] font-semibold ml-1 hover:underline">Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Toast container for showing notifications */}
      <ToastContainer
  position="top-right"  // ← changed from "top-center"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="light"
/>

    </div>
  );
};

export default Login;
