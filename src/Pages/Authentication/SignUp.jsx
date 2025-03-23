// import React from 'react';

// import { Mail, Lock, ArrowLeft } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const SignUp = () => {
//   return (
//     <div className="min-h-screen flex flex-col md:flex-row">
 
//       <div className="w-full md:w-1/2 h-[30vh] md:h-screen relative">
//         <div 
//           className="absolute inset-0 bg-cover bg-center"
//           style={{
//             backgroundImage: "url('https://content3.jdmagicbox.com/v2/comp/pathanamthitta/h8/9999px468.x468.241026170405.s9h8/catalogue/luxe-luminary-wellness-thiruvalla-market-junction-thiruvalla-body-massage-centres-7ga6cf7vi9.jpg')",
//           }}
//         >
//           <div className="absolute inset-0 bg-black/40"></div>
//         </div>
//         <button className="absolute top-4 left-4 text-white z-10">
//           <ArrowLeft size={24} />
//         </button>
//         <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
//           <div className="flex flex-col space-y-2">
//             <div className="w-16 h-1 bg-white rounded"></div>
//             <div className="w-12 h-1 bg-white/60 rounded"></div>
//             <div className="w-8 h-1 bg-white/40 rounded"></div>
//           </div>
//         </div>
//       </div>


//       <div className="w-full md:w-1/2 min-h-[100vh] md:h-screen relative">
//         <div 
//           className="absolute inset-0 bg-cover bg-center opacity-40"
//           style={{
//             backgroundImage: "url('https://i.ibb.co.com/cctYrsKY/Group-1686551056.png')",
//           }}
//         >
//         </div>
        
//         <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] md:h-screen p-8">
//           <div className="w-full max-w-xl space-y-8">
//             <div className="text-center">
//               <img 
//                 src="https://i.ibb.co.com/sp5JLnkF/Whats-App-Image-2025-02-22-at-9-25-22-AM-3.png" 
//                 alt="Logo" 
//                 className="mx-auto mb-16 w-3/4" 
//               />
//             </div>

//             <form className="space-y-6 backdrop-blur-sm bg-white/10 p-10 mb-10 rounded-lg border border-gray-200 shadow-lg">
//               <h2 className="text-3xl font-bold text-[#B28D28] mb-10 text-center">Sign up</h2>
//               <div className="form-control w-full">
//                 <div className="relative">
//                   <input 
//                     type="email" 
//                     placeholder="Enter your email" 
//                     className="input input-bordered border-[#B28D2866]/40 w-full pl-10 bg-white/20  text-white placeholder-gray-300" 
//                   />
//                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                 </div>
//               </div>

//               <div className="form-control w-full">
//                 <div className="relative">
//                   <input 
//                     type="password" 
//                     placeholder="Enter your password" 
//                     className="input input-bordered w-full pl-10 bg-white/20 border-[#B28D2866]/40 text-white placeholder-gray-300" 
//                   />
//                   <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                 </div>
//                </div>
                          
//                <div className="form-control w-full">
//                 <div className="relative">
//                   <input 
//                     type="confirm_password" 
//                     placeholder="Re-Type your password" 
//                     className="input input-bordered w-full pl-10 bg-white/20 border-[#B28D2866]/40 text-white placeholder-gray-300" 
//                   />
//                   <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//                 </div>
//               </div>

//               {/* <div className="form-control">
//                 <label className="label cursor-pointer justify-start gap-2">
//                   <input type="checkbox" className="checkbox border-[#B28D2866]/40" />
//                   <span className="label-text text-gray-700">I agree to the Terms and Conditions</span>
//                 </label>
//               </div> */}

//               <button className="btn bg-[#B28D28] text-white rounded-full w-full text-base">Next</button>

//               <p className="text-center text-gray-900">
//                 Already have an account? 
//                 <Link to="/login" className="text-[#8F5E0A] font-semibold ml-1 hover:underline">Login</Link>
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SignUp;




import React, { useState } from 'react';
import { Mail, Lock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  // State to manage the selected country code
  const [countryCode, setCountryCode] = useState('+1');

  // List of country codes (you can expand this as needed)
  const countryCodes = [
    { code: '+1', flag: '🇺🇸', name: 'United States' },
    { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
    { code: '+91', flag: '🇮🇳', name: 'India' },
    { code: '+33', flag: '🇫🇷', name: 'France' },
    { code: '+61', flag: '🇦🇺', name: 'Australia' },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
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

            <form className="space-y-6 backdrop-blur-sm bg-white/10 p-10 mb-10 rounded-lg border border-gray-200 shadow-lg">
              <h2 className="text-3xl font-bold text-[#B28D28] mb-10 text-center">Sign up</h2>
              <div className="form-control w-full">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="input input-bordered border-[#B28D2866]/40 w-full pl-10 bg-white/20 text-white placeholder-gray-300"
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>

              <div className="form-control w-full">
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="input input-bordered w-full pl-10 bg-white/20 border-[#B28D2866]/40 text-white placeholder-gray-300"
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>

              {/* Replaced "Re-Type your password" with phone number input */}
              <div className="form-control w-full">
                <div className="relative flex items-center">
                  <div className="flex items-center bg-white/20 border-[#B28D2866]/40 border rounded-l-lg h-12 px-3">
                    <span className="mr-1">
                      {countryCodes.find((c) => c.code === countryCode)?.flag}
                    </span>
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="bg-transparent  focus:outline-none"
                    >
                      {countryCodes.map((country) => (
                        <option key={country.code} value={country.code} className="text-black">
                          {country.code}
                        </option>
                      ))}
                    </select>
                  </div>
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    className="input input-bordered w-full h-12 bg-white/20 border-[#B28D2866]/40 text-black placeholder-gray-300 rounded-l-none border-l-0"
                  />
                </div>
              </div>


              <button className="btn bg-[#B28D28] text-white rounded-full w-full text-base">Next</button>

              <p className="text-center text-gray-900">
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

