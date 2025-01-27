'use client';
import React, { useState } from 'react';
import Breadcrumb from '../Common/Breadcrumb';
import axios from 'axios';
import { SUBMIT_CONTACT } from '@/helpers/apiUrl';

const ContactPage = () => {
  const initialFormData = {
    firstName: '',
    lastName: '',
    subject: '',
    phone: '',
    message: '',
  };
  const [formData, setFormData] = useState(initialFormData);

  const [status, setStatus] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    try {
      const data = {
        name: formData.firstName + ' ' + formData.lastName,
        email: formData.email,
        mobileNumber: formData.phone,
        subject: formData.subject,
        message: formData.message,
      };
      const response = await axios.post(`${SUBMIT_CONTACT}`, data);
      setStatus({ type: 'success', message: 'Message sent successfully!' });

      setFormData(initialFormData);

      setShowModal(true);
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to send the message. Try again later.' });
      alert(error.message);
    }
  };

  const closeModal = () => setShowModal(false);

  return (
    <>
      <div className="container">
        <Breadcrumb title={'Contact'} pages={['contact']} />

        <section className="overflow-hidden py-10">
          <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
            <div className="w-full text-center mb-8">
              <h2 className="font-bold text-2xl">&quot;We&apos;re Here to Help!&quot;</h2>
              <p>Stay connected and Contact-us</p>
            </div>
            <div className="flex flex-col justify-center xl:flex-row gap-7">
              <div className="xl:max-w-[770px] w-full bg-gray-100 rounded-xl shadow-1 p-4 sm:p-7.5 xl:p-10">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
                    <div className="w-full">
                      <label htmlFor="firstName" className="block mb-2.5">
                        First Name <span className="text-red">*</span>
                      </label>

                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="Jhon"
                        className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="w-full">
                      <label htmlFor="lastName" className="block mb-2.5">
                        Last Name <span className="text-red">*</span>
                      </label>

                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Deo"
                        className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-col lg:flex-row gap-5 sm:gap-8 mb-5">
                    <div className="w-full">
                      <label htmlFor="subject" className="block mb-2.5">
                        Subject
                      </label>

                      <input
                        type="text"
                        name="subject"
                        id="subject"
                        placeholder="Type your subject"
                        className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="w-full">
                      <label htmlFor="phone" className="block mb-2.5">
                        Phone
                      </label>

                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        placeholder="Enter your phone"
                        className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="mb-7.5">
                    <label htmlFor="message" className="block mb-2.5">
                      Message
                    </label>

                    <textarea
                      name="message"
                      id="message"
                      rows={5}
                      placeholder="Type your message"
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full p-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex font-medium text-white bg-black border py-3 px-7 mt-3 rounded-md ease-out duration-200 hover:bg-white hover:text-black"
                  >
                    Send Message
                  </button>
                </form>

                {showModal && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-8 shadow-lg w-full max-w-md text-center">
                      {/* Success Icon */}
                      <div className="flex justify-center mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-12 w-12 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>

                      {/* Heading */}
                      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Thank You!</h2>

                      {/* Message */}
                      <p className="text-gray-600 mb-6">
                        Your information has been successfully submitted. We will contact you soon!
                      </p>

                      {/* Close Button */}
                      <button
                        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                        onClick={closeModal}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactPage;
