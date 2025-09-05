"use client";

import { useState } from "react";

interface Section {
  id: string;
  title: string;
}

const AboutClient: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("mission");

  const sections: Section[] = [
    { id: "mission", title: "Our Mission" },
    { id: "vision", title: "Our Vision" },
    { id: "team", title: "Our Team" },
    { id: "contact", title: "Contact Us" },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sidebar */}
      <aside className="lg:w-1/4">
        <div className="bg-base-100 rounded-xl shadow-sm sticky top-24">
          <div className="p-6 border-b border-base-300">
            <h2 className="text-xl font-bold">About Sections</h2>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      activeSection === section.id
                        ? "bg-primary/10 text-primary font-medium"
                        : "hover:bg-base-300"
                    }`}
                  >
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:w-3/4">
        <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
          {/* Mission */}
          {activeSection === "mission" && (
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold mb-6">Our Mission</h2>
              <p className="mb-6">
                We strive to make renting simple, transparent, and reliable. Our
                platform connects people with the right homes and property
                owners with trustworthy tenants.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide a seamless rental experience</li>
                <li>Build trust between property owners and tenants</li>
                <li>Use technology to simplify rental agreements</li>
              </ul>
            </div>
          )}

          {/* Vision */}
          {activeSection === "vision" && (
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold mb-6">Our Vision</h2>
              <p className="mb-6">
                We envision a future where property rentals are hassle-free,
                digital-first, and accessible to everyone.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-base-200 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Innovation</h4>
                  <p className="text-sm">
                    Constantly evolving our platform with modern technology.
                  </p>
                </div>
                <div className="bg-base-200 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Trust</h4>
                  <p className="text-sm">
                    Ensuring safety and reliability for all transactions.
                  </p>
                </div>
                <div className="bg-base-200 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Community</h4>
                  <p className="text-sm">
                    Building a strong network of owners, members, and renters.
                  </p>
                </div>
                <div className="bg-base-200 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Sustainability</h4>
                  <p className="text-sm">
                    Promoting eco-friendly and long-lasting rental practices.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Team */}
          {activeSection === "team" && (
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold mb-6">Our Team</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-base-200 p-4 rounded-lg text-center">
                  <div className="w-20 h-20 bg-primary/20 rounded-full mx-auto mb-4" />
                  <h4 className="font-semibold">Nazmul</h4>
                  <p className="text-sm text-gray-500">Team Lead / Developer</p>
                </div>

                <div className="bg-base-200 p-4 rounded-lg text-center">
                  <div className="w-20 h-20 bg-primary/20 rounded-full mx-auto mb-4" />
                  <h4 className="font-semibold">Sauda Tus Sahadia</h4>
                  <p className="text-sm text-gray-500">Full Stack Developer</p>
                </div>

                <div className="bg-base-200 p-4 rounded-lg text-center">
                  <div className="w-20 h-20 bg-primary/20 rounded-full mx-auto mb-4" />
                  <h4 className="font-semibold">Mohammad Raihan Gazi</h4>
                  <p className="text-sm text-gray-500">Full Stack Developer</p>
                </div>
                <div className="bg-base-200 p-4 rounded-lg text-center">
                  <div className="w-20 h-20 bg-primary/20 rounded-full mx-auto mb-4" />
                  <h4 className="font-semibold">A H M Saif Smran</h4>
                  <p className="text-sm text-gray-500">Full Stack Developer</p>
                </div>

                <div className="bg-base-200 p-4 rounded-lg text-center">
                  <div className="w-20 h-20 bg-primary/20 rounded-full mx-auto mb-4" />
                  <h4 className="font-semibold">AI Ifran</h4>
                  <p className="text-sm text-gray-500">Full Stack Developer</p>
                </div>
              </div>
            </div>
          )}

          {/* Contact */}
          {activeSection === "contact" && (
            <div className="p-6 sm:p-8">
              <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
              <ul className="space-y-3">
                <li>
                  📧 Email:{" "}
                  <span className="text-primary">
                    support@rentalmarketplace.com
                  </span>
                </li>
                <li>📞 Phone: +880 1234 567890</li>
                <li>📍 Address: Dhaka, Bangladesh</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutClient;
