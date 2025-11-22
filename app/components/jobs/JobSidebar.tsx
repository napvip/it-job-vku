"use client";

import { X } from "lucide-react";
import { useState } from "react";

export function JobSidebar() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const skills = [
    "JavaScript", "TypeScript", "React", "Vue.js", "Angular",
    "Node.js", "Python", "Java", "C#", "PHP",
    "AWS", "Docker", "Kubernetes", "MongoDB", "PostgreSQL"
  ];

  const levels = ["Fresher", "Junior", "Middle", "Senior", "Lead"];
  const workTypes = ["Full-time", "Part-time", "Remote", "Hybrid", "Freelance"];
  const categories = [
    "Backend Developer",
    "Frontend Developer",
    "Full-stack Developer",
    "Mobile Developer",
    "DevOps Engineer",
    "QA/Tester",
    "AI/ML Engineer",
    "Data Engineer",
    "UI/UX Designer"
  ];

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const toggleLevel = (level: string) => {
    setSelectedLevels(prev =>
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const clearAllFilters = () => {
    setSelectedSkills([]);
    setSelectedLevels([]);
    setSelectedTypes([]);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#9AD0C2] p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[#265073] text-lg">Bộ lọc nâng cao</h3>
        {(selectedSkills.length > 0 || selectedLevels.length > 0 || selectedTypes.length > 0) && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-[#2D9596] hover:underline"
          >
            Xóa tất cả
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Mức lương slider */}
        <div>
          <h4 className="text-[#265073] mb-3 text-sm">Mức lương (triệu VNĐ)</h4>
          <div className="space-y-3">
            <input
              type="range"
              min="0"
              max="100"
              className="w-full accent-[#2D9596]"
            />
            <div className="flex justify-between text-sm text-[#265073]">
              <span>0</span>
              <span>100+</span>
            </div>
          </div>
        </div>

        {/* Kỹ năng */}
        <div>
          <h4 className="text-[#265073] mb-3 text-sm">Kỹ năng</h4>
          <div className="max-h-48 overflow-y-auto space-y-2">
            {skills.map((skill) => (
              <label key={skill} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedSkills.includes(skill)}
                  onChange={() => toggleSkill(skill)}
                  className="w-4 h-4 accent-[#2D9596] cursor-pointer"
                />
                <span className="text-sm text-[#265073] group-hover:text-[#2D9596]">
                  {skill}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Cấp độ */}
        <div>
          <h4 className="text-[#265073] mb-3 text-sm">Cấp độ</h4>
          <div className="space-y-2">
            {levels.map((level) => (
              <label key={level} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedLevels.includes(level)}
                  onChange={() => toggleLevel(level)}
                  className="w-4 h-4 accent-[#2D9596] cursor-pointer"
                />
                <span className="text-sm text-[#265073] group-hover:text-[#2D9596]">
                  {level}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Hình thức làm việc */}
        <div>
          <h4 className="text-[#265073] mb-3 text-sm">Hình thức làm việc</h4>
          <div className="space-y-2">
            {workTypes.map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => toggleType(type)}
                  className="w-4 h-4 accent-[#2D9596] cursor-pointer"
                />
                <span className="text-sm text-[#265073] group-hover:text-[#2D9596]">
                  {type}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Ngành nghề */}
        <div>
          <h4 className="text-[#265073] mb-3 text-sm">Ngành nghề IT</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-[#2D9596] cursor-pointer"
                />
                <span className="text-sm text-[#265073] group-hover:text-[#2D9596]">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 space-y-3">
        <button className="w-full py-2 bg-[#265073] text-white rounded-lg hover:bg-[#2D9596] transition-colors text-sm">
          Áp dụng bộ lọc
        </button>
        <button
          onClick={clearAllFilters}
          className="w-full py-2 border border-[#2D9596] text-[#2D9596] rounded-lg hover:bg-[#2D9596] hover:text-white transition-all text-sm"
        >
          Đặt lại
        </button>
      </div>
    </div>
  );
}


