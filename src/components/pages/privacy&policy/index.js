'use client';

import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Common/Breadcrumb';

const Privacy = () => {
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    // Mock last updated date
    setLastUpdated('January 26, 2025');
  }, []);

  const sections = [
    {
      title: 'Introduction',
      content:
        'We value your privacy and are committed to protecting your personal information. This privacy policy explains how we collect, use, and protect your data.',
    },
    {
      title: 'Information We Collect',
      content:
        'We may collect personal information such as your name, email address, and usage data to improve our services.',
    },
    {
      title: 'How We Use Your Information',
      content:
        'Your information is used to provide and improve our services, communicate with you, and ensure a safe experience.',
    },
    {
      title: 'Sharing Your Information',
      content:
        'We do not share your personal information with third parties except as required by law or to provide our services.',
    },
    {
      title: 'Your Rights',
      content:
        'You have the right to access, update, or delete your personal data. Contact us to exercise these rights.',
    },
    {
      title: 'Contact Us',
      content:
        'If you have any questions about this privacy policy, please contact us at privacy@example.com.',
    },
  ];

  return (
    <div className="container">
      <Breadcrumb title={'About'} pages={['Privacy-Policy']} />
      <div className="min-h-screen text-gray-800 p-6 mb-10">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-center text-gray-900">Privacy Policy</h1>
            {/* <p className="text-center text-gray-600 mt-2">
                            Last updated: {lastUpdated}
                        </p> */}
          </header>

          <div className="flex gap-6">
            {/* Main Content */}
            <main className="flex-1 bg-white p-6 rounded-xl shadow">
              {sections.map((section, index) => (
                <section id={`section-${index}`} key={index} className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900">{section.title}</h2>
                  <p className="mt-2 text-gray-700">{section.content}</p>
                </section>
              ))}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
