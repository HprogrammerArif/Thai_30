import React from "react";
import { Mail, Lock, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useRequestPasswordResetMutation } from "../redux/features/baseAPI/baseApi";
import { toast, ToastContainer } from "react-toastify";

const Forget_Password = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [requestPasswordReset, { isLoading, error }] =
    useRequestPasswordResetMutation();

  const onSubmit = async (emailData) => {
    console.log({emailData})
    const data = {email: emailData.email}
    try {
      const res = await requestPasswordReset(data).unwrap();
      console.log({res})
      toast.success("OTP send successfully!")
      navigate("/verification", { state: { email: emailData.email } });
    } catch (err) {
      // error handled below
      toast.error("Something went wrong!", err)
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
              "url('https://content3.jdmagicbox.com/v2/comp/pathanamthitta/h8/9999px468.x468.241026170405.s9h8/catalogue/luxe-luminary-wellness-thiruvalla-market-junction-thiruvalla-body-massage-centres-7ga6cf7vi9.jpg')",
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
        ></div>

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
              <h2 className="text-3xl font-bold text-[#B28D28] mb-10 text-center">
                Enter your Email
              </h2>

              <div className="form-control w-full mb-6">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={`input input-bordered w-full pl-10 bg-white/20 text-gray-950 placeholder-gray-300 ${
                      errors.email ? 'border-red-500' : 'border-[#B28D2866]/40'
                    }`}
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: 'Invalid email format',
                      },
                    })}
                  />
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div className="pb-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn bg-[#B28D28] text-white rounded-full w-full text-base"
                >
                  {isLoading ? 'Sending...' : 'Next'}
                </button>
                <div className="flex mx-auto justify-center">
                  <Link
                    to="/login"
                    className="font-semibold mt-4 text-sm text-[#B28D28] hover:underline"
                  >
                    Back to Login
                  </Link>
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-center mt-4">
                  {error?.data?.message || 'Failed to send email'}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  
  );
};

export default Forget_Password;
