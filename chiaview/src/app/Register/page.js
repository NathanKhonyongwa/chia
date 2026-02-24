"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Your Firebase configuration - Replace with your actual config
const firebaseConfig = {
  apiKey: "AIzaSyBSSOHiggIEicwiZRz4UnjREv1tLJ1YQ08",
  authDomain: "chia-6131e.firebaseapp.com",
  projectId: "chia-6131e",
  storageBucket: "chia-6131e.firebasestorage.app",
  messagingSenderId: "1068128182398",
  appId: "1:1068128182398:web:4894b228e7822eba70782f",
  measurementId: "G-WS0KYMY1XX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function RegistrationPage() {
  const [groupMembers, setGroupMembers] = useState([]);
  const [newMember, setNewMember] = useState({ name: "", gender: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });
  
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const comingAsGroup = watch("comingAsGroup");
  const prepareOwnFood = watch("prepareOwnFood");

  const addGroupMember = () => {
    if (newMember.name && newMember.gender) {
      setGroupMembers([...groupMembers, newMember]);
      setNewMember({ name: "", gender: "" });
    }
  };

  const removeGroupMember = (index) => {
    setGroupMembers(groupMembers.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: "", message: "" });
    
    try {
      // Prepare the form data
      const formData = {
        // Personal Details
        fullName: data.fullName,
        gender: data.gender,
        phoneNumber: data.phoneNumber,
        ageGroup: data.ageGroup,
        
        // Church Information
        localChurch: data.localChurch,
        district: data.district,
        zone: data.zone,
        districtPastor: data.districtPastor,
        pastorPhone: data.pastorPhone,
        
        // Accommodation & Meals
        hasTent: data.hasTent,
        willCook: data.willCook,
        comingAsGroup: data.comingAsGroup,
        groupSpecification: data.groupSpecification || "",
        prepareOwnFood: data.prepareOwnFood,
        dietSpecifications: data.dietSpecifications || "",
        
        // Travel Information
        travelAsGroup: data.travelAsGroup,
        publicTransport: data.publicTransport,
        privateTransport: data.privateTransport,
        
        // Group Members
        groupMembers: data.comingAsGroup === "Yes" ? groupMembers : [],
        
        // Metadata
        registrationDate: new Date().toISOString(),
        eventDate: "25th - 29th August 2026",
        eventLocation: "GUMA VILLAGE, DOWA",
        timestamp: new Date()
      };

      // Save to Firestore
      const docRef = await addDoc(collection(db, "campMeetingRegistrations"), formData);
      
      console.log("Document written with ID: ", docRef.id);
      
      // Show success message
      setSubmitStatus({ 
        type: "success", 
        message: `Registration submitted successfully! Your registration ID: ${docRef.id}` 
      });
      
      // Reset form
      reset();
      setGroupMembers([]);
      
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
    } catch (error) {
      console.error("Error adding document: ", error);
      setSubmitStatus({ 
        type: "error", 
        message: "Failed to submit registration. Please check your Firebase configuration and try again." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden mt-8 mt-30">
        {/* Header */}
        <div className="bg-blue-900 text-white px-6 py-4">
          <h1 className="text-2xl font-bold text-center">
            CENTRAL MALAWI CONFERENCE
          </h1>
          <h2 className="text-xl text-center mt-2">
            SPECIAL CAMP MEETING - CHIA VIEW MISSION SITE
          </h2>
          <p className="text-center mt-2">
            25th - 29th August 2026, GUMA VILLAGE, DOWA
          </p>
          <p className="text-center font-semibold mt-4">
            ---------------------Theme TBD---------------------
          </p>
        </div>

        {/* Status Message */}
        {submitStatus.message && (
          <div className={`mx-6 mt-4 p-4 rounded-md ${
            submitStatus.type === "success" 
              ? "bg-green-50 text-green-800 border border-green-200" 
              : "bg-red-50 text-red-800 border border-red-200"
          }`}>
            <div className="flex items-center">
              {submitStatus.type === "success" ? (
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              )}
              <span>{submitStatus.message}</span>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-4 space-y-6">
          {/* Personal Details Section */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold mb-4">PERSONAL DETAILS</h3>
            
            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                1. Full Name *
              </label>
              <input
                type="text"
                {...register("fullName", { required: "Full name is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isSubmitting}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
              )}
            </div>

            {/* Gender */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                2. Gender *
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="Woman"
                    {...register("gender", { required: "Gender is required" })}
                    className="mr-2"
                    disabled={isSubmitting}
                  />
                  Woman
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="Man"
                    {...register("gender", { required: "Gender is required" })}
                    className="mr-2"
                    disabled={isSubmitting}
                  />
                  Man
                </label>
              </div>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                3. Phone Number *
              </label>
              <input
                type="tel"
                {...register("phoneNumber", { 
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9+\-\s]+$/,
                    message: "Please enter a valid phone number"
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isSubmitting}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
              )}
            </div>

            {/* Age Group */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                4. Age Group *
              </label>
              <select
                {...register("ageGroup", { required: "Age group is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isSubmitting}
              >
                <option value="">Select age group</option>
                <option value="5-15">5-15</option>
                <option value="16-30">16-30</option>
                <option value="31+">31 and above</option>
              </select>
              {errors.ageGroup && (
                <p className="text-red-500 text-sm mt-1">{errors.ageGroup.message}</p>
              )}
            </div>
          </div>

          {/* Church Information Section */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold mb-4">CHURCH INFORMATION</h3>

            {/* Local Church */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                5. Local Church *
              </label>
              <input
                type="text"
                {...register("localChurch", { required: "Local church is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isSubmitting}
              />
              {errors.localChurch && (
                <p className="text-red-500 text-sm mt-1">{errors.localChurch.message}</p>
              )}
            </div>

            {/* District */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                6. District *
              </label>
              <input
                type="text"
                {...register("district", { required: "District is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isSubmitting}
              />
              {errors.district && (
                <p className="text-red-500 text-sm mt-1">{errors.district.message}</p>
              )}
            </div>

            {/* Zone */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                7. Zone *
              </label>
              <input
                type="text"
                {...register("zone", { required: "Zone is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isSubmitting}
              />
              {errors.zone && (
                <p className="text-red-500 text-sm mt-1">{errors.zone.message}</p>
              )}
            </div>

            {/* District Pastor */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                8. District Pastor *
              </label>
              <input
                type="text"
                {...register("districtPastor", { required: "District pastor is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isSubmitting}
              />
              {errors.districtPastor && (
                <p className="text-red-500 text-sm mt-1">{errors.districtPastor.message}</p>
              )}
            </div>

            {/* Pastor's Phone Number */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                9. Pastor's Phone Number *
              </label>
              <input
                type="tel"
                {...register("pastorPhone", { 
                  required: "Pastor's phone number is required",
                  pattern: {
                    value: /^[0-9+\-\s]+$/,
                    message: "Please enter a valid phone number"
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isSubmitting}
              />
              {errors.pastorPhone && (
                <p className="text-red-500 text-sm mt-1">{errors.pastorPhone.message}</p>
              )}
            </div>
          </div>

          {/* Accommodation Section */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold mb-4">ACCOMMODATION & MEALS</h3>

            {/* I have a tent */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                10. I have a tent *
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="Yes"
                    {...register("hasTent", { required: "Please select an option" })}
                    className="mr-2"
                    disabled={isSubmitting}
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="No"
                    {...register("hasTent", { required: "Please select an option" })}
                    className="mr-2"
                    disabled={isSubmitting}
                  />
                  No
                </label>
              </div>
              {errors.hasTent && (
                <p className="text-red-500 text-sm mt-1">{errors.hasTent.message}</p>
              )}
            </div>

            {/* I will be cooking */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                11. I will be cooking *
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="Yes"
                    {...register("willCook", { required: "Please select an option" })}
                    className="mr-2"
                    disabled={isSubmitting}
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="No"
                    {...register("willCook", { required: "Please select an option" })}
                    className="mr-2"
                    disabled={isSubmitting}
                  />
                  No
                </label>
              </div>
              {errors.willCook && (
                <p className="text-red-500 text-sm mt-1">{errors.willCook.message}</p>
              )}
            </div>

            {/* Coming as a group */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                12. Coming as a group *
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="Yes"
                    {...register("comingAsGroup", { required: "Please select an option" })}
                    className="mr-2"
                    disabled={isSubmitting}
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="No"
                    {...register("comingAsGroup", { required: "Please select an option" })}
                    className="mr-2"
                    disabled={isSubmitting}
                  />
                  No
                </label>
              </div>
              {errors.comingAsGroup && (
                <p className="text-red-500 text-sm mt-1">{errors.comingAsGroup.message}</p>
              )}
            </div>

            {/* Group Specification - shown only if coming as group */}
            {comingAsGroup === "Yes" && (
              <div className="mb-4 ml-4 p-4 bg-gray-50 rounded-md">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  13. Specify group (optional)
                </label>
                <input
                  type="text"
                  {...register("groupSpecification")}
                  placeholder="e.g., Family, Church Choir, Youth Group"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSubmitting}
                />
              </div>
            )}

            {/* We will be preparing our own food */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                14. We will be preparing our own food *
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="Yes"
                    {...register("prepareOwnFood", { required: "Please select an option" })}
                    className="mr-2"
                    disabled={isSubmitting}
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="No"
                    {...register("prepareOwnFood", { required: "Please select an option" })}
                    className="mr-2"
                    disabled={isSubmitting}
                  />
                  No
                </label>
              </div>
              {errors.prepareOwnFood && (
                <p className="text-red-500 text-sm mt-1">{errors.prepareOwnFood.message}</p>
              )}
            </div>

            {/* Diet Specifications - shown if preparing own food */}
            {prepareOwnFood === "Yes" && (
              <div className="mb-4 ml-4 p-4 bg-gray-50 rounded-md">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  15. Diet Specifications (optional)
                </label>
                <textarea
                  {...register("dietSpecifications")}
                  placeholder="e.g., Vegetarian, Gluten-free, Allergies, etc."
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isSubmitting}
                />
              </div>
            )}
          </div>

          {/* Travel Section */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-semibold mb-4">TRAVEL INFORMATION</h3>

            {/* We will travel as a group */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                16. We will travel as a group *
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="Yes"
                    {...register("travelAsGroup", { required: "Please select an option" })}
                    className="mr-2"
                    disabled={isSubmitting}
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="No"
                    {...register("travelAsGroup", { required: "Please select an option" })}
                    className="mr-2"
                    disabled={isSubmitting}
                  />
                  No
                </label>
              </div>
              {errors.travelAsGroup && (
                <p className="text-red-500 text-sm mt-1">{errors.travelAsGroup.message}</p>
              )}
            </div>

            {/* We will use public transport */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                17. We will use Public transport *
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="Yes"
                    {...register("publicTransport", { required: "Please select an option" })}
                    className="mr-2"
                    disabled={isSubmitting}
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="No"
                    {...register("publicTransport", { required: "Please select an option" })}
                    className="mr-2"
                    disabled={isSubmitting}
                  />
                  No
                </label>
              </div>
              {errors.publicTransport && (
                <p className="text-red-500 text-sm mt-1">{errors.publicTransport.message}</p>
              )}
            </div>

            {/* We have private transport */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                18. We have private transport *
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="Yes"
                    {...register("privateTransport", { required: "Please select an option" })}
                    className="mr-2"
                    disabled={isSubmitting}
                  />
                  Yes
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="No"
                    {...register("privateTransport", { required: "Please select an option" })}
                    className="mr-2"
                    disabled={isSubmitting}
                  />
                  No
                </label>
              </div>
              {errors.privateTransport && (
                <p className="text-red-500 text-sm mt-1">{errors.privateTransport.message}</p>
              )}
            </div>
          </div>

          {/* Group Members Section */}
          <div className="pb-6">
            <h3 className="text-lg font-semibold mb-4">
              19. Group Members (if applicable)
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Write the names of the group members, and specify if they are male or female
            </p>

            {/* Add Group Member Form */}
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={newMember.name}
                    onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    value={newMember.gender}
                    onChange={(e) => setNewMember({...newMember, gender: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isSubmitting}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={addGroupMember}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    Add Member
                  </button>
                </div>
              </div>
            </div>

            {/* Group Members List */}
            {groupMembers.length > 0 && (
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Gender
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {groupMembers.map((member, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">{member.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{member.gender}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => removeGroupMember(index)}
                            className="text-red-600 hover:text-red-900 disabled:opacity-50"
                            disabled={isSubmitting}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="bg-green-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit Registration"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}