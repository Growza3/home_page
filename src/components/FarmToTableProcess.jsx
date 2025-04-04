import React from "react";
import { motion } from "framer-motion";

const FarmToTableProcess = ({ processSteps }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h2 className="text-3xl font-bold mb-4 text-green-700">Farm-to-Table Journey</h2>

      <div className="relative w-full max-w-2xl">
        {processSteps.map((step, index) => (
          <motion.div
            key={step._id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.3, duration: 0.5 }}
            className="flex items-center mb-6"
          >
            <div className="w-16 h-16 bg-green-500 text-white flex items-center justify-center rounded-full shadow-lg">
              {index + 1}
            </div>
            <div className="ml-4 p-4 border-l-4 border-green-500">
              <h3 className="text-xl font-semibold">{step.step}</h3>
              <p className="text-gray-600">{step.details}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FarmToTableProcess;
