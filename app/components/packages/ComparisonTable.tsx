"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { comparisonFeatures } from './packagesData';

const ComparisonTable: React.FC = () => {
  const renderCell = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="w-5 h-5 text-[#2D9596] mx-auto" />
      ) : (
        <X className="w-5 h-5 text-red-400 mx-auto" />
      );
    }
    return <span className="text-[#265073]">{value}</span>;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-6 border-2 border-[#9AD0C2] overflow-x-auto"
    >
      <h2 className="text-[#265073] mb-6">So sánh các gói</h2>

      <div className="min-w-[800px]">
        {/* Table Header */}
        <div className="grid grid-cols-5 gap-4 mb-4 pb-4 border-b-2 border-[#9AD0C2]">
          <div className="text-[#265073]">Tính năng</div>
          <div className="text-center text-[#265073]">Free</div>
          <div className="text-center text-[#265073]">Standard</div>
          <div className="text-center text-[#2D9596]">Premium</div>
          <div className="text-center text-[#265073]">Premium+</div>
        </div>

        {/* Table Rows */}
        <div className="space-y-3">
          {comparisonFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="grid grid-cols-5 gap-4 p-4 rounded-lg hover:bg-[#ECF4D6] transition-colors"
            >
              <div className="text-sm text-[#265073]">{feature.name}</div>
              <div className="text-center text-sm">{renderCell(feature.free)}</div>
              <div className="text-center text-sm">{renderCell(feature.standard)}</div>
              <div className="text-center text-sm font-medium">
                {renderCell(feature.premium)}
              </div>
              <div className="text-center text-sm">{renderCell(feature.premiumPlus)}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ComparisonTable;


