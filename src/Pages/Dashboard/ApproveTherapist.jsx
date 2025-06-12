// import React, { useState } from 'react';
// import { FaCheck } from 'react-icons/fa';
// import { useGetMassageTypeQuery } from '../redux/features/baseAPI/baseApi';

// const ApproveTherapist = ({ therapistId, handleApprove, isApproving }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const {data:messageType} = useGetMassageTypeQuery();
//   console.log("messageType", messageType)

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

// //   const confirmApprove = () => {
// //     handleApprove(therapistId);
// //     console.log(therapistId, "555")

// //     closeModal();
// //   };

// const approveTherapistMessage = (messageId) =>{
//     console.log("messageId", messageId)
// }

//   return (
//     <>
//       <button
//         className="px-4 py-2 bg-[#4AB228] text-white rounded-lg hover:bg-green-600 flex items-center justify-center gap-1"
//         onClick={openModal}
//         disabled={isApproving}
//       >
//         {isApproving ? 'Approving...' : (
//           <>
//             <FaCheck size={12} />
//             Approve
//           </>
//         )}
//       </button>

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl p-6 w-full max-w-xl">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-bold text-gray-800">Therapist Request</h3>
//               <button
//                 onClick={closeModal}
//                 className="text-gray-500 hover:text-red-700 font-semibold"
//               >
//                 ✕
//               </button>
//             </div>
   
//                <div className='w-full'>
//                  <fieldset className="fieldset flex items-center justify-center">
//                 <legend className="fieldset-legend text-[16px] w-2/3 text-start mx-auto">Massage Type</legend>
//                 <select defaultValue="" className="select">
//                     <option disabled value="">Pick a massage type</option>
//                     {messageType?.map((type) => (
//                     <option key={type.id} value={type.name}>
//                         {type.name}
//                     </option>
//                     ))}
//                 </select>

//                 </fieldset>
//                </div>

//             <div className="flex justify-center gap-3 mt-5">
           
//               <button
//                 className="px-4 py-2 bg-[#4AB228] text-white rounded-lg hover:bg-green-600"
//                 // onClick={confirmApprove}
//                 onClick={approveTherapistMessage(type?.id)}
//                 disabled={isApproving}
//               >
//                 {isApproving ? 'Approving...' : 'Approve'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ApproveTherapist;



// import React, { useState, useRef } from 'react';
// import { FaCheck } from 'react-icons/fa';
// import { useApproveTherapistMutation, useGetMassageTypeQuery } from '../redux/features/baseAPI/baseApi';

// const ApproveTherapist = ({ therapistId, handleApprove, isApproving }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const messageTypeRef = useRef(null); 
//   const { data: messageType } = useGetMassageTypeQuery();
//   const [approveTherapist] = useApproveTherapistMutation()

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const approveTherapistMessage = () => {
//     const selectedId = messageTypeRef.current?.value;
//     console.log("Selected message type ID:", selectedId);
//     console.log("Therapist ID:", therapistId);

//     if (selectedId) {
//       handleApprove(therapistId, selectedId); 
//       closeModal();
//     } else {
//       alert("Please select a massage type");
//     }
//   };

//   return (
//     <>
//       <button
//         className="px-4 py-2 bg-[#4AB228] text-white rounded-lg hover:bg-green-600 flex items-center justify-center gap-1"
//         onClick={openModal}
//         disabled={isApproving}
//       >
//         {isApproving ? 'Approving...' : (
//           <>
//             <FaCheck size={12} />
//             Approve
//           </>
//         )}
//       </button>

//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl p-6 w-full max-w-xl">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-bold text-gray-800">Therapist Request</h3>
//               <button
//                 onClick={closeModal}
//                 className="text-gray-500 hover:text-red-700 font-semibold"
//               >
//                 ✕
//               </button>
//             </div>

//             <div className="w-full">
//               <fieldset className="fieldset flex items-center justify-center">
//                 <legend className="fieldset-legend text-[16px] w-2/3 text-start mx-auto">Massage Type</legend>
//                 <select
//                   ref={messageTypeRef}
//                   defaultValue=""
//                   className="select"
//                 >
//                   <option disabled value="">Pick a massage type</option>
//                   {messageType?.map((type) => (
//                     <option key={type.id} value={type.id}>
//                       {type.name}
//                     </option>
//                   ))}
//                 </select>
//               </fieldset>
//             </div>

//             <div className="flex justify-center gap-3 mt-5">
//               <button
//                 className="px-4 py-2 bg-[#4AB228] text-white rounded-lg hover:bg-green-600"
//                 onClick={approveTherapistMessage}
//                 disabled={isApproving}
//               >
//                 {isApproving ? 'Approving...' : 'Approve'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ApproveTherapist;



import React, { useState, useRef } from 'react';
import { FaCheck } from 'react-icons/fa';
import { useApproveTherapistMutation, useGetMassageTypeQuery } from '../redux/features/baseAPI/baseApi';

const ApproveTherapist = ({ therapistId, isApproving }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const messageTypeRef = useRef(null);
  const { data: messageType } = useGetMassageTypeQuery();
  const [approveTherapist, { isLoading }] = useApproveTherapistMutation();
console.log("adffasdfd",messageType)
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const approveTherapistMessage = async () => {
    const selectedId = messageTypeRef.current?.value;
    if (!selectedId) {
      alert("Please select a massage type");
      return;
    }

    try {
     const response =  await approveTherapist({
  profileId: therapistId,
  body: {
    assign_role: Number(selectedId),
    is_approved: true,
  },
}).unwrap();

console.log(response, "approve req")
      closeModal();
    } catch (error) {
      console.error("Error approving therapist:", error);
      alert("Failed to approve therapist, please try again.");
    }
  };

  return (
    <>
      <button
        className="px-4 py-2 bg-[#4AB228] text-white rounded-lg hover:bg-green-600 flex items-center justify-center gap-1"
        onClick={openModal}
        disabled={isApproving || isLoading}
      >
        {(isApproving || isLoading) ? 'Approving...' : (
          <>
            <FaCheck size={12} />
            Approve
          </>
        )}
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Therapist Request</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-red-700 font-semibold"
              >
                ✕
              </button>
            </div>

            <div className="w-full">
              <fieldset className="fieldset flex items-center justify-center">
                <legend className="fieldset-legend text-[16px] w-2/3 text-start mx-auto">Massage Type</legend>
                <select ref={messageTypeRef} defaultValue="" className="select">
                  <option disabled value="">Pick a massage type</option>
                  {messageType?.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </fieldset>
            </div>

            <div className="flex justify-center gap-3 mt-5">
              <button
                className="px-4 py-2 bg-[#4AB228] text-white rounded-lg hover:bg-green-600"
                onClick={approveTherapistMessage}
                disabled={isApproving || isLoading}
              >
                {(isApproving || isLoading) ? 'Approving...' : 'Approve'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ApproveTherapist;

