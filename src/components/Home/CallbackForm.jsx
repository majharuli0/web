"use client";

import { useUserService } from "@/services/userService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { callbackSchema } from "../../../schema";

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
      first_name: "",
      last_name: "",
      selectedDialCode: "+1",
    },
  });

  useEffect(() => {
    fetch("/countryData.json")
      .then((response) => response.json())
      .then((data) => {
        setCountryData(data)
      })
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
        full_name: formData.first_name + " " + formData.last_name,
        phone_number: fullPhone,
      };

      delete payload.selectedDialCode; 
      delete payload.first_name; 
      delete payload.last_name; 

      console.log("Final Payload:", payload);

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
  useEffect(()=>{
    console.log(errors);
    
  },[errors])

  const [selectedCode, setSelectedCode] = useState("");
const [isChecked, setIsChecked] = useState(false);

  
  return (
    <div className="flex flex-row md:flex-col gap-4 w-full h-fit overflow-hidden px-20 md:px-2 mb-5">
      {/* LEFT SIDE */}
      <div className="basis-[40%] md:w-full  bg-[#3EA174] p-6  py-10 rounded-lg text-white flex flex-col justify-between">
        <div className="flex flex-col gap-28">
          <div className="flex flex-col  gap-3">
            {/* <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
              <path d="M2 3l20 9-20 9v-6l15-3-15-3V3z" />
            </svg> */}
            <h1 className="text-3xl font-bold">Reach Us</h1>
            <p className="text-sm">
            Reach out anytime—our team is here to help with expert support and seamless service.
          </p>
          </div>
          

          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.53.76 3.88.76a1 1 0 011 1v3.5a1 1 0 01-1 1C10.07 22 2 13.93 2 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.21 1.11l-2.43 2.43z" />
              </svg>
              <span>+1 425 697 9780</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
                <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm0 2v.01L12 13 4 6.01V6h16zM4 18V8l8 5 8-5v10H4z" />
              </svg>
              <span>Support@seenyor.com</span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-8 h-8 fill-white" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
              </svg>
              <span>Unit 2, 2 Bridge St, Athlone, Co. Westmeath, N37 F1W4</span>
            </div>
          </div>
          
           {/* <div className="flex gap-8">
          <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8v-6.93H7v-2.87h3V9.41c0-2.97 1.76-4.6 4.45-4.6 1.29 0 2.64.23 2.64.23v2.9h-1.49c-1.47 0-1.93.91-1.93 1.84v2.2h3.29l-.53 2.87h-2.76v6.93c4.56-.93 8-4.96 8-9.8z" />
          </svg>
          <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
            <path d="M7 2C4.79 2 3 3.79 3 6v12c0 2.21 1.79 4 4 4h10c2.21 0 4-1.79 4-4V6c0-2.21-1.79-4-4-4H7zm10 2c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h10zm-5 3c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" />
          </svg>
          <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.29c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.29h-3v-4.5c0-1.07-.93-1.5-1.5-1.5s-1.5.43-1.5 1.5v4.5h-3v-9h3v1.29c.42-.77 1.5-1.29 2.5-1.29 1.93 0 3.5 1.57 3.5 3.5v5.5z" />
          </svg>
          <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
            <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04 4.28 4.28 0 00-7.29 3.9A12.13 12.13 0 013 4.79a4.28 4.28 0 001.32 5.71 4.27 4.27 0 01-1.94-.54v.05a4.28 4.28 0 003.43 4.2 4.3 4.3 0 01-1.93.07 4.28 4.28 0 004 2.97A8.6 8.6 0 012 19.54a12.14 12.14 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19-.01-.38-.02-.57A8.7 8.7 0 0022.46 6z" />
          </svg>
        </div> */}

        <div className="flex gap-8">
  <a href="https://www.facebook.com/profile.php?id=61558380786778" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
    <svg className="w-5 h-5 fill-white hover:fill-blue-500 transition" viewBox="0 0 24 24">
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8v-6.93H7v-2.87h3V9.41c0-2.97 1.76-4.6 4.45-4.6 1.29 0 2.64.23 2.64.23v2.9h-1.49c-1.47 0-1.93.91-1.93 1.84v2.2h3.29l-.53 2.87h-2.76v6.93c4.56-.93 8-4.96 8-9.8z" />
    </svg>
  </a>

  <a href="https://www.instagram.com/seenyorcare/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
    <svg className="w-5 h-5 fill-white hover:fill-pink-500 transition" viewBox="0 0 24 24">
      <path d="M7 2C4.79 2 3 3.79 3 6v12c0 2.21 1.79 4 4 4h10c2.21 0 4-1.79 4-4V6c0-2.21-1.79-4-4-4H7zm10 2c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h10zm-5 3c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" />
    </svg>
  </a>

  <a href="https://www.linkedin.com/company/seenyor/?viewAsMember=true" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
    <svg className="w-5 h-5 fill-white hover:fill-blue-700 transition" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.29c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.29h-3v-4.5c0-1.07-.93-1.5-1.5-1.5s-1.5.43-1.5 1.5v4.5h-3v-9h3v1.29c.42-.77 1.5-1.29 2.5-1.29 1.93 0 3.5 1.57 3.5 3.5v5.5z" />
    </svg>
  </a>

  <a href="https://twitter.com/seenyor_care" target="_blank" rel="noopener noreferrer" aria-label="X">
    <svg className="w-5 h-5 fill-white hover:fill-gray-400 transition" viewBox="0 0 24 24">
      <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04 4.28 4.28 0 00-7.29 3.9A12.13 12.13 0 013 4.79a4.28 4.28 0 001.32 5.71 4.27 4.27 0 01-1.94-.54v.05a4.28 4.28 0 003.43 4.2 4.3 4.3 0 01-1.93.07 4.28 4.28 0 004 2.97A8.6 8.6 0 012 19.54a12.14 12.14 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19-.01-.38-.02-.57A8.7 8.7 0 0022.46 6z" />
    </svg>
  </a>
</div>
        </div>

       
      </div>

      <div className="basis-[60%] md:basis-full bg-white p-8 rounded-lg flex flex-col justify-between">

        <div className=" flex flex-col justify-start items-center gap-0 mb-6 ">
          <h2 className="text-2xl font-bold text-[#3EA174] mb-2">
            Request a Call-Back
          </h2>
          <p>Please fill in the form below to get in touch with us</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex gap-4">

            <div className="w-1/2">
            <input
              {...register("first_name")}
              type="text"
              placeholder="First Name"
              className="w-full h-14 border bg-[#F5F6F8] outline-[#E4E5E6] rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3EA174]"
              />
               <p className="text-red-500 text-sm pt-1">{errors.first_name?.message}</p>
              </div>
              <div className="w-1/2">
            <input
              {...register("last_name")}
              type="text"
              placeholder="Last Name"
              className="w-full h-14 bg-[#F5F6F8] outline-[#E4E5E6] border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3EA174]"
            />
               <p className="text-red-500 text-sm pt-1">{errors.last_name?.message}</p>
            </div>
          </div>


<div className="w-full">

          <input
            {...register("email")}
            type="email"
            placeholder="Email Address"
            className="w-full h-14 bg-[#F5F6F8] outline-[#E4E5E6] border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3EA174]"
            />
           <p className="text-red-500 text-sm pt-1">{errors.email?.message}</p>
            </div>
    <div>

          <div className="flex gap-4 h-14  bg-[#ffffff] ">
            {/* <select
  {...register("selectedDialCode")}
  className="w-1/2 border-gray-300 rounded-md px-4 py-2 bg-[#e2e2e2] focus:outline-none focus:ring-2 focus:ring-[#3EA174]"
>
  {countryData.map((country) => (
    <option key={country.code} value={country.dial_code}>
      {country.name} ({country.dial_code})
    </option>
  ))}
</select> */}


<select
  {...register("selectedDialCode")}
  value={selectedCode}
  onChange={(e) => setSelectedCode(e.target.value)}
  className="w-1/4 md:w-1/4 border-gray-300 rounded-md px-4 py-2 bg-[#F5F6F8] outline-[#E4E5E6]  focus:outline-none focus:ring-2 focus:ring-[#3EA174] appearance-none text-gray-800"
>
  {selectedCode ? (
    <option value={selectedCode}>{selectedCode}</option>
  ) : (
    <option value="">Select country</option>
  )}

  {countryData.map((country) => (
    <option key={country.code} value={country.dial_code}>
      {country.name} ({country.dial_code})
    </option>
  ))}
</select>

            <input
              {...register("phone_number")}
              type="tel"
              placeholder="Phone Number"
              className="w-full h-14 border bg-[#F5F6F8] outline-[#E4E5E6] border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3EA174]"
            />
          </div>
           <p className="text-red-500 text-sm pt-1">{errors.phone_number?.message}</p>

           </div>
           <div>

          <textarea
            {...register("message")}
            placeholder="Message"
            rows="4"
            className="w-full h-24 border bg-[#F5F6F8] outline-[#E4E5E6] border-gray-300 rounded-md px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#3EA174]"
            ></textarea>
           <p className="text-red-500 text-sm pt-1">{errors.message?.message}</p>

            </div>
           <label className="flex items-start gap-2 text-sm text-gray-600">
  <input
    type="checkbox"
    checked={isChecked}
    onChange={(e) => setIsChecked(e.target.checked)}
    className="mt-1 w-fit accent-[#3EA174] cursor-pointer"
  />
  <span className="flex flex-wrap gap-1">
    I've read and agree with{" "}
    <a
      href="https://seenyor.com/terms-and-conditions"
      className="text-[#3EA174] underline"
    >
      Terms of Service
    </a>{" "}
    and{" "}
    <a
      href="https://seenyor.com/privacy-policy"
      className="text-[#3EA174] underline"
    >
      Privacy Policy
    </a>
    .
  </span>
</label>

<button
  type="submit"
  disabled={!isChecked || loading}
  className={`mt-4 px-6 py-3 rounded-md flex items-center justify-center gap-2 transition 
    ${
      isChecked
        ? "bg-[#3EA174] hover:bg-[#319165] text-white"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }
    ${loading ? "opacity-60" : ""}`}
>
  {loading ? "Submitting..." : "Submit"}
  {!loading && (
    <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  )}
</button>
        </form>
      </div>
    </div>
  );
};

export default CallbackForm;
