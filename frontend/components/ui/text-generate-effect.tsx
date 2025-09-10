"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "@/lib/utils";

interface TextGenerateEffectProps {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  highlightWords?: string[];
}

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
  highlightWords = ["Metal Craft", "heavy metal pollution"],
}: TextGenerateEffectProps) => {
  const [scope, animate] = useAnimate();

  // ✅ use const instead of let
  const wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration ?? 1,
        delay: stagger(0.2),
      }
    );
    // ✅ Proper dependencies
  }, [animate, filter, duration, scope]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          const isHighlight = highlightWords.some((hw) =>
            hw.split(" ").includes(word)
          );
          return (
            <motion.span
              key={word + idx}
              className={cn(
                "opacity-0",
                isHighlight ? "text-purple-200" : "text-white dark:text-white"
              )}
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return <div className={cn("font-bold", className)}>{renderWords()}</div>;
};
