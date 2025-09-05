import React from "react";
import AboutClient from "../../components/about/AboutUs";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <header className="bg-primary text-primary-content py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold sm:text-5xl mb-4">About Us</h1>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Learn more about who we are, what drives us, and how we work
            together to serve you better.
          </p>
        </div>
      </header>

      {/* Client Section */}
      <main className="max-w-screen-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <AboutClient />
      </main>
    </div>
  );
};

export default AboutUs;
