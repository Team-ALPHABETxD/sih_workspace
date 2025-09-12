"use client";
import { useEffect, useState } from "react";
import { Card, CardBody } from "@heroui/card";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

import Link from "next/link"


import { HighlightText } from "@/components/ui/shadcn-io/highlight-text";
import { ShimmeringText } from "@/components/ui/shadcn-io/shimmering-text";
import { WritingText } from "@/components/ui/shadcn-io/writing-text";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { motion } from "framer-motion";

// Import Charts
import { ChartRadarGridCircleFill } from "@/components/ui/shadcn-io/radar-chart-09";
import { ChartLineDotsCustom } from "@/components/ui/shadcn-io/line-chart-07";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fade-in white background logic
  const startFade = 200;
  const fadeDistance = 350;
  const overlayOpacity = Math.min(
    Math.max((scrollY - startFade) / fadeDistance, 0),
    1
  );

  return (
    <div className="relative min-h-screen font-serif">
      {/* Fullscreen Background */}
      <div
        className="fixed inset-0 -z-20 bg-[url('/backimg3.jpg')] bg-cover bg-center bg-no-repeat"
        style={{ filter: "blur(1.5px)" }}
      ></div>

      {/* Dark overlay */}
      <div className="fixed inset-0 -z-10 bg-black/30"></div>

      {/* White overlay (fades on scroll) */}
      <div
        className="fixed inset-0 -z-5 bg-gray-100 transition-opacity duration-300"
        style={{ opacity: overlayOpacity }}
      ></div>

      {/* Page Content */}
      <div className="flex flex-col items-center justify-start pt-32 px-4 text-center relative z-10">
        {/* Animated Text */}
        <div className="max-w-5xl text-4xl md:text-5xl font-bold leading-snug text-white">
          <TextGenerateEffect
            words="Discover, Analyze, and Act Against Heavy Metal Pollution Today!"
            highlightWords={["Heavy", "Metal", "Pollution"]}
          />
        </div>

        {/* Description */}
        <p className="mt-16 text-2xl italic text-white">
          Explore datasets, visualizations, and analytics on the environment.
        </p>

        {/* Button */}
        <Link href="/signup">
        <button className="mt-20 px-6 py-2 bg-black text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
          Explore Now →
        </button>
        </Link>

        {/* Info Card */}
        <div className="mt-32">
          <Card className="w-full max-w-xl h-16 shadow-lg rounded-2xl flex items-center justify-center bg-gray-50">
            <CardBody className="flex items-center justify-center">
              <ShimmeringText
                text="Access What You Actually Need!"
                duration={2}
                wave={true}
                shimmeringColor="hsl(var(--primary))"
                className="font-poppins font-bold text-xl text-center"
              />
            </CardBody>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="mt-16 w-full max-w-6xl px-4 space-y-20 text-slate-700">
          {/* Section 1 - Radar Chart (Left) + Paragraph (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Radar Chart */}
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-md font-semibold mb-3 text-center">
                Heavy Metal Levels (Radar Chart)
              </h3>
              <div className="h-[420px] flex items-center justify-center">
                <ChartRadarGridCircleFill />
              </div>
            </div>

            {/* Paragraph */}
            <div className="text-left">
              <h3 className="text-xl font-bold mb-4">
                <HighlightText
                  text="Understanding Heavy Metal Levels"
                  inView={true}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </h3>
              <p className="text-gray-700 leading-relaxed mt-1">
                Heavy metals such as lead, mercury, cadmium, and arsenic are
                major environmental pollutants. Our radar chart helps visualize
                their comparative presence in water samples, making it easier to
                identify critical contaminants. Such data is essential for
                targeted interventions, policy-making, and raising awareness in
                affected communities.
              </p>
            </div>
          </div>

          {/* Section 2 - Paragraph (Left) + Line Chart (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Paragraph */}
            <div className="text-left">
              <h3 className="text-xl font-bold mb-4">
                <HighlightText
                  text="Pollution Trends Over Time"
                  inView={true}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Monitoring pollution trends over time offers critical insight
                into environmental shifts and the effectiveness of mitigation
                efforts. By analyzing multi-year data through line charts, we
                can detect whether pollutant levels are rising, falling, or
                stabilizing—revealing patterns that inform government policies,
                public health strategies, and sustainable resource management.
              </p>
            </div>

            {/* Line Chart */}
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-md font-semibold mb-3 text-center">
                Pollution Trends Over Time (Line Chart)
              </h3>
              <div className="h-[420px] flex items-center justify-center">
                <ChartLineDotsCustom />
              </div>
            </div>
          </div>
        </div>

        {/* "What They Will Get From Us" Heading */}
        <div className="mt-20 flex justify-center">
          <WritingText
            text="What You Will Get From Us"
            inView={true}
            transition={{
              type: "spring",
              bounce: 0,
              duration: 2,
              delay: 0.3,
            }}
            className="text-2xl font-bold text-slate-600"
          />
        </div>

        {/* Features Section */}
        <div className="mt-12 w-full max-w-6xl px-4 flex flex-col md:flex-row justify-center items-stretch gap-6">
          {/* Card 1 */}
          <Card className="flex-1 p-4 rounded-xl shadow-lg bg-orange-50 flex flex-col min-h-[420px]">
            <div className="aspect-[4/3] rounded-md bg-gray-100 mb-4 overflow-hidden">
              <img
                src="/datasetimg.jpg"
                alt="Data visualization feature"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div>
              <h4 className="text-lg font-bold mb-2 text-center">
                Data Visualization
              </h4>
              <p className="text-gray-600 text-sm text-center leading-relaxed">
                Interactive charts and graphs to make sense of heavy metal
                pollution data.
              </p>
            </div>
          </Card>

          {/* Card 2 */}
          <Card className="flex-1 p-4 rounded-xl shadow-lg bg-orange-50 flex flex-col min-h-[420px]">
            <div className="aspect-[4/3] rounded-md bg-gray-100 mb-4 overflow-hidden">
              <img
                src="/analysis.jpg"
                alt="Analysis feature"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div>
              <h4 className="text-lg font-bold mb-2 text-center">
                Insightful Analysis
              </h4>
              <p className="text-gray-600 text-sm text-center leading-relaxed">
                Gain actionable insights from pollution trends over time for
                informed decisions.
              </p>
            </div>
          </Card>

          {/* Card 3 */}
          <Card className="flex-1 p-4 rounded-xl shadow-lg bg-orange-50 flex flex-col min-h-[420px]">
            <div className="aspect-[4/3] rounded-md bg-gray-100 mb-4 overflow-hidden">
              <img
                src="/env.jpg"
                alt="Environmental awareness feature"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
            <div>
              <h4 className="text-lg font-bold mb-2 text-center">
                Environmental Awareness
              </h4>
              <p className="text-gray-600 text-sm text-center leading-relaxed">
                Educate communities about the impact of heavy metals and
                pollution prevention.
              </p>
            </div>
          </Card>
        </div>

        {/* "Get Started!" Button Section */}
        <div className="mt-20 flex justify-center">
  <Link href="/signup">
    <button className="px-6 py-3 rounded-md border-2 border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] transition duration-200 font-bold">
      Get Started Now!
    </button>
  </Link>
</div>

        {/* Container Text Flip Section */}
        <div className="mt-16 flex justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="relative w-full max-w-2xl text-center"
            layout
          >
            <div className="inline-block px-6 py-4 bg-white/20 backdrop-blur-md rounded-xl shadow-lg overflow-hidden">
              <span className="text-gray-800 font-bold text-xl md:text-2xl">
                Make your environmental analysis{" "}
              </span>
              <ContainerTextFlip
                words={["easy", "interactive", "insightful", "visual"]}
                interval={2000}
                animationDuration={700}
                className="text-orange-600 text-xl md:text-2xl font-bold inline-block max-w-full"
                textClassName="whitespace-nowrap overflow-hidden"
              />
            </div>
          </motion.div>
        </div>

        {/* Footer Section */}
        <footer className="mt-16 w-full bg-orange-50 py-8">
          <div className="w-full mx-auto text-center">
            <p className="text-gray-800 font-bold text-lg">
              Developed By Team Alphabet
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
