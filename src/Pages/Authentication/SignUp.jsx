

import { Mail, Lock, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useCreateUserMutation } from '../redux/features/baseAPI/baseApi';
import { toast, ToastContainer } from 'react-toastify';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isSubmitting }
  } = useForm();

  const navigate = useNavigate()
  const [createUser, {isLoading}] = useCreateUserMutation();

  const onSubmit = async (userData) => {
    console.log(userData);

    const payload = {
      ...userData,
      role: "admin"
    }

  try {
    const response = await createUser(payload).unwrap();
    console.log(response)
    navigate('/login')
    
  } catch (error) {
    toast.error(error)
  }


  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <ToastContainer />
      <div className="w-full md:w-1/2 h-[30vh] md:h-screen relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://content3.jdmagicbox.com/v2/comp/pathanamthitta/h8/9999px468.x468.241026170405.s9h8/catalogue/luxe-luminary-wellness-thiruvalla-market-junction-thiruvalla-body-massage-centres-7ga6cf7vi9.jpg')"
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <Link to="/" className="absolute top-4 left-4 text-white z-10">
          <ArrowLeft size={24} />
        </Link>
      </div>

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
              className="space-y-6 backdrop-blur-sm bg-white/10 p-10 mb-10 rounded-lg border border-gray-200 shadow-lg"
            >
              <h2 className="text-3xl font-bold text-[#B28D28] mb-10 text-center">Sign up</h2>

            {/* full name */}

                    <div className="form-control w-full">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter your Name"
                    className={`input input-bordered border-[#B28D2866]/40 w-full pl-10 bg-white/20 text-black placeholder-gray-300 ${errors.email ? 'border-red-500' : ''}`}
                    {...register('full_name', {
                      required: 'Name is required',})}
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>

              {/* Email */}
              <div className="form-control w-full">
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
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>


              {/* Password */}
              <div className="form-control w-full">
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
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
              </div>


                   {/* Phone Number */}
              <div className="form-control w-full">
                <PhoneInput
                  country={'us'}
                  inputClass="!w-full !bg-white/20 !text-black !pl-14 !border-[#B28D2866]/40 !placeholder-gray-300"
                  buttonClass="!bg-white/20"
                  containerClass="!w-full"
                  dropdownClass="!bg-white text-black"
                  placeholder="Enter phone number"
                  enableSearch
                  onChange={(value) => {
                    setValue('phone_number', value);
                    trigger('phone_number');
                  }}
                  inputProps={{
                    name: 'phone_number',
                    required: true
                  }}
                />
                {errors.phone_number && <p className="text-red-500 text-sm mt-1">{errors.phone_number.message}</p>}
              </div>

              {/* Submit Button */}
       <button
  type="submit"
  disabled={isSubmitting}
  className={`rounded-full w-full text-base text-white
    ${isLoading ? 'hover:bg-[#be892d] cursor-not-allowed' : 'bg-[#B28D28]'}
    ${isLoading ? '' : 'hover:bg-[#be8c35]'}
    px-4 py-2 transition duration-300 font-semibold shadow-md`}
>
  {isLoading ? 
    <span className="loading loading-bars loading-sm"></span> 
    : 'Sign Up'}
</button>



              <p className="text-center text-gray-900 mt-4">
                Already have an account?
                <Link to="/login" className="text-[#8F5E0A] font-semibold ml-1 hover:underline">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default SignUp;
