'use client';
import React, { useEffect, useState } from 'react';
import Breadcrumb from '../Common/Breadcrumb';

const Terms = () => {
  const [lastUpdated, setLastUpdated] = useState('');
  useEffect(() => {
    // Mock last updated date
    setLastUpdated('January 26, 2025');
  }, []);

  const sections = [
    {
      title: 'Introduction',
      content:
        'Welcome to our website. By accessing and using our services, you agree to comply with these terms and conditions.',
    },
    {
      title: 'Intellectual Property',
      content:
        'All content provided on this website, including text, graphics, logos, and images, is owned by us and protected by intellectual property laws.',
    },
    {
      title: 'User Obligations',
      content:
        'You agree to use the website only for lawful purposes and not engage in activities that disrupt or damage the site.',
    },
    {
      title: 'Termination',
      content:
        'We reserve the right to terminate or suspend access to our services without prior notice if these terms are violated.',
    },
    {
      title: 'Governing Law',
      content:
        'These terms and conditions are governed by the laws of the jurisdiction where our company is located.',
    },
  ];

  return (
    <div className="container">
      <Breadcrumb title={'About'} pages={['Terms-&-Conditions']} />
      <div className="min-h-screen text-gray-800 p-6 mb-10">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-center text-gray-900">Terms and Conditions</h1>
            {/* <p className="text-center text-gray-600 mt-2">
                            Last updated: {lastUpdated}
                        </p> */}
          </header>

          <div className="flex gap-6">
            {/* Sidebar Navigation */}
            {/* <aside className="hidden md:block w-1/4 sticky top-6">
                            <nav className="bg-white p-4 rounded-xl shadow">
                                <ul className="space-y-2">
                                    {sections.map((section, index) => (
                                        <li key={index}>
                                            <a
                                                href={`#section-${index}`}
                                                className="text-blue-500 hover:underline"
                                            >
                                                {section.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </aside> */}

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

export default Terms;
