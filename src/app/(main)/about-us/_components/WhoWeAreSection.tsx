import React from "react";
import { motion } from "motion/react";

interface WhoWeAreSectionProps {
  whoWeAre: {
    title: string;
    intro: string;
    points: Array<{
      label: string;
      content: string;
    }>;
    quote: string;
  };
}

const WhoWeAreSection: React.FC<WhoWeAreSectionProps> = ({ whoWeAre }) => {
  return (
    <section className="py-12 sm:py-16 lg:py-2 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6 lg:space-y-8"
        >
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
              हमारे बारे में
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-5 leading-tight"
            >
              {whoWeAre.title}
            </motion.h2>
          </div>

          <div className="text-base sm:text-lg text-muted-foreground leading-relaxed font-medium mb-6">
            {whoWeAre.intro.split("*").map((part, idx) =>
              idx % 2 === 1 ? (
                <strong key={idx} className="text-foreground font-bold">
                  {part}
                </strong>
              ) : (
                part
              )
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6"
          >
            {whoWeAre.points.map((point, index) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                key={index}
                className="group p-5 sm:p-6 border border-gray-200 bg-gradient-to-br from-background to-muted/30 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-2.5 h-2.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-sm sm:text-base text-muted-foreground leading-relaxed"
                  >
                    <strong className="text-foreground font-bold">
                      {point.label}
                    </strong>{" "}
                    {point.content.split("*").map((part, idx) =>
                      idx % 2 === 1 ? (
                        <strong key={idx} className="text-foreground font-bold">
                          {part}
                        </strong>
                      ) : (
                        part
                      )
                    )}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-8 p-6 sm:p-8 border-l-4 border-primary bg-gradient-to-r from-primary/5 to-transparent rounded-r-xl"
          >
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-base sm:text-lg text-foreground leading-relaxed font-medium italic"
            >
              &quot;{whoWeAre.quote}&quot;
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoWeAreSection;
