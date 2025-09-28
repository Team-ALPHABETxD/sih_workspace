"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function TeamPage() {
  const teamMembers = [
    { 
      id: 1, 
      name: "Antik Mondal", 
      role: "Leader & Co-ordinator", 
      image: "/team1.jpg", 
      git: "#", 
      lin: "#",
      description: "Leading the team with strategic vision and coordination to deliver exceptional water quality solutions."
    },
    { 
      id: 5, 
      name: "Soumyojeet Samajdar", 
      role: "Backend & AI/ML Developer", 
      image: "/team8.jpg", 
      git: "https://github.com/soumyo-jeet", 
      lin: "https://www.linkedin.com/in/soumyojeet-samajdar-68022530b",
      description: "Building robust backend systems and implementing AI/ML models for intelligent water quality analysis."
    },
    { 
      id: 4, 
      name: "Anjali Ray", 
      role: "Frontend Architect", 
      image: "/team4.jpg", 
      git: "https://github.com/AnjaliRayyy", 
      lin: "https://www.linkedin.com/in/anjali-ray-592200341",
      description: "Designing and architecting scalable frontend solutions with modern frameworks and best practices."
    },
    { 
      id: 2, 
      name: "Dipman Majumdar", 
      role: "Frontend Developer", 
      image: "/team2.jpg", 
      git: "https://github.com/dipmanmajumdar", 
      lin: "https://www.linkedin.com/in/dipman-majumdar-624288341",
      description: "Creating responsive and interactive user interfaces that provide seamless user experiences."
    },
    { 
      id: 3, 
      name: "Annesha Bhakta", 
      role: "UI/UX Designer & Frontend developer", 
      image: "/team3.jpg", 
      git: "https://github.com/Anneshabhakta2005", 
      lin: "https://www.linkedin.com/in/annesha-bhakta-17b236313",
      description: "Crafting intuitive user interfaces and experiences while implementing pixel-perfect frontend code."
    },
    { 
      id: 6, 
      name: "Shourjya Mozumder", 
      role: "Research Analyst", 
      image: "/team7.jpg", 
      git: "https://github.com/shomoz", 
      lin: "https://www.linkedin.com/in/shourjya-mozumder-353741341",
      description: "Conducting in-depth research and analysis to drive data-informed decisions for water quality solutions."
    }
  ];

  const getRoleColor = (role: string) => {
    const colors = {
      "Leader & Co-ordinator": "border-yellow-500 bg-yellow-50",
      "Frontend Developer": "border-green-500 bg-green-50",
      "UI/UX Designer & Frontend developer": "border-pink-500 bg-pink-50",
      "Frontend Architect": "border-orange-500 bg-orange-50",
      "Backend Developer & AI/ML Developer": "border-blue-500 bg-blue-50",
      "Research Analyst": "border-indigo-500 bg-indigo-50"
    };
    return colors[role as keyof typeof colors] || "border-gray-500 bg-gray-50";
  };

  const leader = teamMembers[0];
  const others = teamMembers.slice(1);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      
      {/* Page Heading */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 max-w-3xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Team</h1>
        <p className="text-lg text-gray-600 leading-relaxed">
          Meet the dedicated professionals driving innovation in water quality solutions through cutting-edge technology and research.
        </p>
      </motion.div>

      {/* Leader Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16 max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8"
      >
        <div className={`relative w-40 h-40 rounded-2xl overflow-hidden border-4 ${getRoleColor(leader.role).split(' ')[0]} shadow-lg`}>
          <Image src={leader.image} alt={leader.name} fill className="object-cover" />
        </div>
        
        <div className="text-center md:text-left flex-1">
          <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getRoleColor(leader.role)} mb-3`}>
            {leader.role}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{leader.name}</h2>
          <p className="text-gray-600 mb-4 max-w-md">
            {leader.description}
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <a href={leader.git} target="_blank" className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
              <FaGithub className="w-5 h-5 text-gray-700" />
            </a>
            <a href={leader.lin} target="_blank" className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
              <FaLinkedin className="w-5 h-5 text-blue-600" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Team Members Grid - FIXED CENTERING */}
      <div className="max-w-7xl mx-auto">
        <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">Team Members</h3>
        <div className="flex flex-wrap justify-center gap-6">
          {others.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center border-t-4 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] max-w-sm"
              style={{ borderTopColor: getRoleColor(member.role).split(' ')[0].split('-')[1] }}
            >
              <div className="relative w-32 h-32 rounded-xl overflow-hidden mb-4 shadow-md">
                <Image src={member.image} alt={member.name} fill className="object-fit" />
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
              
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(member.role)} mb-3`}>
                {member.role}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                {member.description}
              </p>
              
              <div className="flex gap-3 mt-auto">
                <a href={member.git} target="_blank" className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                  <FaGithub className="w-4 h-4 text-gray-700" />
                </a>
                <a href={member.lin} target="_blank" className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                  <FaLinkedin className="w-4 h-4 text-blue-600" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}