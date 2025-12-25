import React from "react";
import { motion } from "motion/react";

interface GoalsSectionProps {
  goals: {
    title: string;
    categories: Array<{
      title: string;
      points: Array<{
        label: string;
        content: string;
      }>;
    }>;
  };
}

const GoalsSection: React.FC<GoalsSectionProps> = ({ goals }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-12 sm:py-16 lg:py-20 bg-muted/20"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
          >
            हमारा लक्ष्य: राष्ट्रधर्म की पूर्ति
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-5 leading-tight"
          >
            {goals.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed"
          >
            राष्ट्रीय सेवा संघ की सेवा और राष्ट्रवाद की भावना को दर्शाते हुए,
            हमारे मुख्य उद्देश्य निम्नलिखित हैं।
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {goals.categories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              className="border-2 border-gray-200 bg-white dark:bg-background rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-primary/10 to-primary/5 border-b border-gray-200 p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-lg flex items-center justify-center text-lg font-bold flex-shrink-0">
                    {categoryIndex + 1}
                  </div>
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-xl sm:text-2xl font-bold text-foreground"
                  >
                    {category.title}
                  </motion.h3>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="p-6 sm:p-8"
              >
                <div className="space-y-4">
                  {category.points.map((point, pointIndex) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      key={pointIndex}
                      className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-200"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-sm sm:text-base text-muted-foreground leading-relaxed"
                      >
                        <strong className="text-foreground font-bold">
                          {point.label}
                        </strong>{" "}
                        {point.content.split("*").map((part, idx) =>
                          idx % 2 === 1 ? (
                            <strong
                              key={idx}
                              className="text-foreground font-bold"
                            >
                              {part}
                            </strong>
                          ) : (
                            part
                          )
                        )}
                      </motion.p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default GoalsSection;
