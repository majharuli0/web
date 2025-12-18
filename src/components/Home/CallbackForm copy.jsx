"use client";

import { useUserService } from "@/services/userService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "..";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { callbackSchema } from "../../../schema";
import {
  User,
  Mail,
  Building2,
  ChevronDown,
  Phone,
  Globe,
  MapPin,
  Calendar,
  MessageSquare,
} from "lucide-react";

const CallbackForm = ({ accessToken }) => {
  const [countryData, setCountryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { sendContactInfo } = useUserService();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(callbackSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      // type: "",
      full_name: "",
      email: "",
      // company_name: "",
      phone_number: "",
      // country: "",
      // city: "",
      // preferred_time: "",
      message: "",
    },
  });

  useEffect(() => {
    fetch("/countryData.json")
      .then((response) => response.json())
      .then((data) => setCountryData(data))
      .catch((error) => console.error("Error loading country data:", error));
  }, []);

  const onSubmit = async (formData) => {
    // setLoading(true);
    // //remove selectedDialCode feilds from data
    // try {
    //   const payload = { ...formData };
    //   delete payload.selectedDialCode;
    //   console.log(formData);

    //   await sendContactInfo(payload);
    //   reset();
    setLoading(true);
    try {
      // Combine country code + phone into one
      const fullPhone =
        (formData.selectedDialCode || "") + (formData.phone_number || "");

      const payload = {
        ...formData,
        phone_number: fullPhone, // overwrite with full number
      };

      delete payload.selectedDialCode; // no need to send separately

      // console.log("Final Payload:", payload);

      await sendContactInfo(payload);
      reset();
      toast.success(
        "Form submitted successfully! We will get back to you soon."
      );
    } catch (err) {
      if (err.errors && Array.isArray(err.errors)) {
        err.errors.forEach((err) => {
          const field = err.property;
          const errorMessage =
            Object.values(err.message)?.[0] || "Invalid value";

          setError(field, {
            type: "server",
            message: errorMessage,
          });
        });
      }
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const userTypeOptions = [
    { label: "End User", value: "end_user" },
    { label: "Monitoring Company", value: "monitoring_station" },
    { label: "Nursing Home", value: "nursing_home" },
    { label: "Distributor", value: "distributor" },
    { label: "Other", value: "other" },
  ];

  return (
    
    

    <div className="flex flex-row md:flex-col gap-4 w-full h-fit overflow-hidden px-20 mb-5
    ">
  <div className="basis-[40%] md:basis-full bg-[#3EA174] p-6 rounded-lg text-white flex flex-col justify-between">
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24"><path d="M2 3l20 9-20 9v-6l15-3-15-3V3z"/></svg>
        <h1 className="text-3xl font-bold">Reach Us</h1>
      </div>
      <p className="text-sm">
        Reach out anytime—our team is here to help with expert support and seamless service.
      </p>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1v3.5a1 1 0 01-1 1C10.07 22 2 13.93 2 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.21 1.11l-2.43 2.43z"/></svg>
          <span>+1 425 697 9780</span>
        </div>
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 18V8l8 5 8-5v10H4z"/></svg>
          <span>Support@seenyor.com</span>
        </div>
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/></svg>
          <span>Unit 2, 2 Bridge St, Athlone, Co. Westmeath, N37 F1W4</span>
        </div>
      </div>
    </div>

    <div className="flex gap-4">
      <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8v-6.93H7v-2.87h3V9.41c0-2.97 1.76-4.6 4.45-4.6 1.29 0 2.64.23 2.64.23v2.9h-1.49c-1.47 0-1.93.91-1.93 1.84v2.2h3.29l-.53 2.87h-2.76v6.93c4.56-.93 8-4.96 8-9.8z"/></svg>
      <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M7 2C4.79 2 3 3.79 3 6v12c0 2.21 1.79 4 4 4h10c2.21 0 4-1.79 4-4V6c0-2.21-1.79-4-4-4H7zm10 2c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h10zm-5 3c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/></svg>
      <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.29c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.29h-3v-4.5c0-1.07-.93-1.5-1.5-1.5s-1.5.43-1.5 1.5v4.5h-3v-9h3v1.29c.42-.77 1.5-1.29 2.5-1.29 1.93 0 3.5 1.57 3.5 3.5v5.5z"/></svg>
      <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04 4.28 4.28 0 00-7.29 3.9A12.13 12.13 0 013 4.79a4.28 4.28 0 001.32 5.71 4.27 4.27 0 01-1.94-.54v.05a4.28 4.28 0 003.43 4.2 4.3 4.3 0 01-1.93.07 4.28 4.28 0 004 2.97A8.6 8.6 0 012 19.54a12.14 12.14 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19-.01-.38-.02-.57A8.7 8.7 0 0022.46 6z"/></svg>
    </div>
  </div>

 
    <div className="basis-[60%] md:basis-full bg-white p-8 rounded-lg  flex flex-col justify-between">
  
<div className=" align-middle items-center">

<h2 className="text-2xl font-bold text-[#3EA174] mb-6">Request a Call-Back</h2>
  <p> Please fill in the form below to get in touch with us</p>
</div>
  <form className="flex flex-col gap-4">
    <div className="flex gap-4">
      <input
        type="text"
        placeholder="First Name"
        className="w-1/2 h-14 border bg-[#F5F6F8]  outline-[#E4E5E6] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3EA174]"
      />
      <input
        type="text"
        placeholder="Last Name"
        className="w-1/2 h-14 bg-[#F5F6F8]  outline-[#E4E5E6]  border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3EA174]"
      />
    </div>

    <input
      type="email"
      placeholder="Email Address"
      className="w-full h-14  bg-[#F5F6F8]  outline-[#E4E5E6]  border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3EA174]"
    />

    <div className="flex gap-4 h-14 border bg-[#F5F6F8]  outline-[#E4E5E6] ">
      <select className="w-1/3  border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#3EA174]">
        <option value="+44">🇬🇧 +44</option>
        <option value="+1">🇺🇸 +1</option>
        <option value="+880">🇧🇩 +880</option>
      </select>
      <input
        type="tel"
        placeholder="Phone Number"
        className="w-2/3  h-14 border bg-[#F5F6F8]  outline-[#E4E5E6]  border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3EA174]"
      />
    </div>

    <textarea
      placeholder="Message"
      rows="4"
      className="w-full h-14 border bg-[#F5F6F8]  outline-[#E4E5E6]  border-gray-300 rounded-md px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#3EA174]"
    ></textarea>

    <label className="flex items-start gap-2 text-sm text-gray-600">
      <input type="checkbox" className="mt-1 w-fit" />
      <span className="flex flex-wrap gap-1">
        I've read and agree with{" "}
        <a href="#" className="text-[#3EA174] underline">Terms of Service</a> and{" "}
        <a href="#" className="text-[#3EA174] underline">Privacy Policy</a>.
      </span>
    </label>
    

    <button
      type="submit"
      className="mt-4 bg-[#3EA174] text-white px-6 py-3 rounded-md flex items-center justify-center gap-2 hover:bg-[#319165] transition"
    >
      Submit
      <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
    </button>
  </form>
</div>
  </div>






    // <div
    //   id="call_back_form"
    //   className="max-w-[1320px] my-0 mx-auto w-full p-5 rounded-xl md:p-5 sm:p-0"
    // >
    //   <p className="text-[40px] md:text-3xl tab:text-2xl font-semibold text-center py-2">
    //     Request a Call-Back
    //   </p>
    //   <p className="text-center text-xl md:text-2xl tab:text-lg">
    //     Tell us a little about your needs, and our team will{" "}
    //     <br className="tab:hidden" /> reach out to provide the best solution for
    //     you.
    //   </p>

    //   <div className="w-full max-w-5xl mx-auto p-4">
    //     <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
    //       {/* User type */}
    //       <div className="flex text-sm mb-4">
    //         <span className=" text-xl md:text-base tab:text-xs w-1/5 font-semibold">
    //           I am a
    //         </span>
    //         <div className="w-4/5 sm:w-full">
    //           <div className="flex tab:flex-col flex-wrap gap-2 w-full">
    //             {userTypeOptions.map(({ label, value }) => (
    //               <label key={value} className="inline-flex items-center">
    //                 <input
    //                   type="radio"
    //                   className="form-radio h-4 w-4 text-gray-600"
    //                   value={value}
    //                   {...register("type")}
    //                 />
    //                 <span className="ml-2 text-base md:text-sm tab:text-xs">
    //                   {label}
    //                 </span>
    //               </label>
    //             ))}
    //           </div>
    //           {errors.type && (
    //             <p className="text-red-500 text-sm mt-1">
    //               {errors.type.message}
    //             </p>
    //           )}
    //         </div>
    //       </div>

    //       {/* Full name, Email, Company */}
    //       {[
    //         {
    //           id: "full-name",
    //           label: "Full name:",
    //           placeholder: "Enter a Full Name",
    //           name: "full_name",
    //         },
    //         {
    //           id: "email",
    //           label: "E-Mail:",
    //           placeholder: "Enter your E-Mail address",
    //           name: "email",
    //         },
    //         {
    //           id: "company",
    //           label: "Company:",
    //           placeholder: "Enter a Company name if applicable",
    //           name: "company_name",
    //         },
    //       ].map((field) => (
    //         <div key={field.id} className="flex flex-row tab:items-center">
    //           <label
    //             htmlFor={field.id}
    //             className="w-1/5 text-xl md:text-base tab:text-xs font-semibold mb-1 sm:mb-0"
    //           >
    //             {field.label}
    //           </label>
    //           <div className="w-4/5">
    //             <input
    //               id={field.id}
    //               type="text"
    //               placeholder={field.placeholder}
    //               {...register(field.name)}
    //               className="w-full px-3 py-3 md:py-2 text-sm bg-[#f5f5f5] rounded placeholder-gray-400 focus:outline-none"
    //             />
    //             {errors[field.name] && (
    //               <p className="text-red-500 text-sm mt-1">
    //                 {errors[field.name]?.message}
    //               </p>
    //             )}
    //           </div>
    //         </div>
    //       ))}

    //       {/* Phone */}
    //       <div className="flex items-center">
    //         <label
    //           htmlFor="phone"
    //           className="w-1/5 text-xl tab:text-xs md:text-base font-semibold mb-1 sm:mb-0"
    //         >
    //           Phone:
    //         </label>
    //         <div className="w-4/5">
    //           <div className="flex items-center w-full">
    //             <select
    //               className="px-3 py-3 md:py-2 w-[20%] bg-[#f5f5f5] rounded-l text-sm focus:outline-none"
    //               {...register("selectedDialCode")}
    //             >
    //               <option value="">Country Code</option>
    //               {countryData.map((country, i) => (
    //                 <option key={i} value={country.dial_code}>
    //                   {country.dial_code} ({country.name})
    //                 </option>
    //               ))}
    //             </select>
    //             <input
    //               id="phone"
    //               type="number"
    //               placeholder="Enter phone number"
    //               {...register("phone_number")}
    //               className="w-full px-3 py-3 md:py-2 text-sm bg-[#f5f5f5] rounded-r placeholder-gray-400 focus:outline-none"
    //             />
    //           </div>
    //           {errors.phone_number && (
    //             <p className="text-red-500 text-sm mt-1">
    //               {errors.phone_number.message}
    //             </p>
    //           )}
    //         </div>
    //       </div>

    //       {/* Country + City */}
    //       <div className="flex items-center">
    //         <label className="w-1/4 text-xl tab:text-xs md:text-base font-semibold mb-1 sm:mb-0">
    //           Country
    //         </label>
    //         <div className="w-full flex gap-4">
    //           <div className="sm:w-full w-4/5">
    //             <select
    //               className="w-full px-3 py-2 text-sm bg-[#f5f5f5] rounded focus:outline-none"
    //               {...register("country")}
    //             >
    //               <option value="">Select Country</option>
    //               {countryData.map((country, i) => (
    //                 <option key={i} value={country.name}>
    //                   {country.name}
    //                 </option>
    //               ))}
    //             </select>
    //             {errors.country && (
    //               <p className="text-red-500 text-sm mt-1">
    //                 {errors.country.message}
    //               </p>
    //             )}
    //           </div>
    //           <div className="w-full flex items-center">
    //             <label className="tab:text-xs w-1/4 text-xl md:text-base font-semibold mb-1 sm:mb-0">
    //               City
    //             </label>
    //             <div className="w-full">
    //               <input
    //                 type="text"
    //                 placeholder="Enter a city"
    //                 {...register("city")}
    //                 className="sm:w-full w-full px-3 py-3 md:py-2 text-sm bg-[#f5f5f5] rounded placeholder-gray-400 focus:outline-none"
    //               />
    //               {errors.city && (
    //                 <p className="text-red-500 text-sm mt-1">
    //                   {errors.city.message}
    //                 </p>
    //               )}
    //             </div>
    //           </div>
    //         </div>
    //       </div>

    //       {/* Preferred time */}
    //       <div className="flex items-center">
    //         <label
    //           htmlFor="preferred-time"
    //           className="w-1/5 text-xl tab:text-xs md:text-base font-semibold mb-1 sm:mb-0"
    //         >
    //           Time:
    //         </label>
    //         <div className="w-4/5">
    //           <input
    //             id="preferred-time"
    //             type="date"
    //             min={new Date().toISOString().split("T")[0]}
    //             {...register("preferred_time", {
    //               required: "Preferred time is required",
    //               validate: (value) => {
    //                 const today = new Date();
    //                 today.setHours(0, 0, 0, 0); // remove time part
    //                 const selectedDate = new Date(value);
    //                 return (
    //                   selectedDate >= today || "You cannot select a past date"
    //                 );
    //               },
    //             })}
    //             className="w-full px-3 py-3 md:py-2 text-sm bg-[#f5f5f5] rounded placeholder-gray-400 focus:outline-none"
    //           />
    //           {errors.preferred_time && (
    //             <p className="text-red-500 text-sm mt-1">
    //               {errors.preferred_time.message}
    //             </p>
    //           )}
    //         </div>
    //       </div>

    //       {/* Message */}
    //       <div className="flex items-start">
    //         <label className="tab:text-xs w-1/5 text-xl md:text-base font-semibold mb-1 sm:mb-0 pt-2">
    //           Message:
    //         </label>
    //         <div className="w-4/5">
    //           <textarea
    //             placeholder="Write a message"
    //             {...register("message")}
    //             className="w-full px-3 py-3 md:py-2 text-sm bg-[#f5f5f5] rounded placeholder-gray-400 focus:outline-none resize-none"
    //             rows={4}
    //           />
    //           {errors.message && (
    //             <p className="text-red-500 text-sm mt-1">
    //               {errors.message.message}
    //             </p>
    //           )}
    //         </div>
    //       </div>

    //       {/* Submit */}
    //       <div className="flex justify-center mt-6">
    //         <Button
    //           loading={loading}
    //           type="submit"
    //           shape="round"
    //           color="green_200_green_400_01"
    //           className="w-[300px] rounded-[14px] px-[2.13rem] font-semibold"
    //         >
    //           Submit
    //         </Button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
  );
};

export default CallbackForm;
