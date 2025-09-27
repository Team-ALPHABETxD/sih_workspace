"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function TeamPage() {
  const teamMembers = [
    {
      id: 1,
      name: "Antik Mondal",
      role: "Leader & Research Analyst",
      image: "/team1.jpg", // You can replace with actual team member photos
      
    },
    {
      id: 2,
      name: "Dipman Majumdar",
      role: "Frontend Developer",
      image: "/team2.jpg",
      
    },
    {
      id: 3,
      name: "Annesha Bhakta",
      role: "UI/UX Designer & Frontend developer",
      image: "/team3.jpg",
 
    },
    {
      id: 4,
      name: "Anjali Ray",
      role: "Frontend-Developer",
      image: "/team4.jpg",
 
    },
    {
      id: 5,
      name: "Soumyojeet Samajdar",
      role: "Backend Developer & ML Enthusiast",
      image: "/team5.jpg",
      
    },
    {
      id: 6,
      name: "Shourjya Mojumder",
      role: "Project Manager & Research Analyst",
      image: "/team6.jpg",
      
    }
  ];


  const getRoleColor = (role: string) => {
    const colors = {
      "Frontend Developer": "from-blue-500 to-blue-600",
      "Frontend-Developer": "from-green-500 to-green-600", 
      "Leader & Research Analyst": "from-purple-500 to-purple-600",
      "UI/UX Designer & Frontend developer": "from-pink-500 to-pink-600",
      "Backend Developer & ML Enthusias": "from-orange-500 to-orange-600",
      "Project Manager & Research Analyst": "from-indigo-500 to-indigo-600"
    };
    return colors[role as keyof typeof colors] || "from-gray-500 to-gray-600";
  };


  const getRoleIcon = (role: string) => {
    const icons = {
      "Leader & Research Analyst": (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      "Frontend Developer": (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      ),
      "UI/UX Designer & Frontend developer": (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      "Frontend-Developer": (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
      ),
      "Backend Developer & ML Enthusiast": (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
        </svg>
      ),
      "Project Manager & Research Analyst": (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    };
    return icons[role as keyof typeof icons] || null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              Our Team
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Meet the talented individuals behind our environmental monitoring platform. 
              Together, we are building the future of water quality analysis.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Team Members with Alternating Layout */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {teamMembers.map((member, index) => (
          <motion.div 
            key={member.id}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 ${index % 2 === 0 ? '' : 'lg:grid-flow-col-dense'}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Image Section */}
            <div className={`${index % 2 === 0 ? 'order-2 lg:order-1' : 'order-2 lg:order-2'}`}>
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                {/* Role Badge Overlay */}
                <div className="absolute top-6 right-6">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${getRoleColor(member.role)} text-white text-sm font-medium rounded-full shadow-lg backdrop-blur-sm`}>
                    {getRoleIcon(member.role)}
                    {member.role}
                  </div>
                </div>
              </div>
            </div>

            {/* Information Section */}
            <div className={`${index % 2 === 0 ? 'order-1 lg:order-2' : 'order-1 lg:order-1'}`}>
              <div className="space-y-6">
                <div>
                  <h2 className="text-4xl font-bold text-gray-800 mb-4">{member.name}</h2>
                  <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${getRoleColor(member.role)} text-white rounded-full text-sm font-medium mb-6`}>
                    {getRoleIcon(member.role)}
                    <span className="ml-2">{member.role}</span>
                  </div>
                </div>
                
               

                

                {/* Additional Info Card */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-gray-800 mb-2">Contribution to the Project</h4>
                  <p className="text-gray-600 text-sm">
                    {member.role === "Leader & Research Analyst" && "Coordinated the hackathon workflow and managed task distribution & Set deadlines, ensured timely progress, and resolved blockers & Represented the team during presentations and pitching sessions."}
                    {member.role === "Frontend Developer" && "Built the project’s user interface using Next JS , Tailwind CSS & Shadcn UI & Integrated APIs to fetch and display real-time water quality data."}
                    {member.role === "UI/UX Designer & Frontend developer" && "Designed wireframes and prototypes to map user journeys & Ensured accessibility, aesthetics, and usability in the final design & also Worked with frontend devs to maintain design consistency across pages.."}
                    {member.role === "Frontend-Developer" && "Created the visual design system and user experience flows, ensuring the platform is both beautiful and functional & Implemented responsive layouts, animations, and smooth navigation for a better user experience."}
                    {member.role === "Backend Developer & ML Enthusiast" && "Designed and developed the project’s server-side architecture & Handled database integration, authentication, and API endpoints& also Researched and implemented machine learning models relevant to the project."}
                    {member.role === "Project Manager & Research Analyst" && "Conducted in-depth research on problem statements and existing solutions & Analyzed data to inform feature development and platform improvements."}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Team Stats Section */}
      <motion.div 
        className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Collective Impact
            </h2>
            <p className="text-xl text-blue-100">
              Together, we had built something remarkable
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">6</div>
              <div className="text-blue-100">Team Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">1000+</div>
              <div className="text-blue-100">Hours of Development</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <div className="text-blue-100">Features Implemented</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-blue-100">Dedication to Excellence</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Call to Action */}
      <div className="py-16 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Ready to Join Our Mission?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We are always looking for passionate individuals who want to make a difference 
              in environmental protection and data science.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/about" 
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Learn More
              </a>
              <a 
                href="/dashboard" 
                className="px-8 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-200"
              >
                Explore Platform
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
