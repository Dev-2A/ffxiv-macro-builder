import { useState, useMemo } from "react";
import { skills, CATEGORIES } from "../../data/skills";
import SkillCard from "./SkillCard";

const tabs = [
  { key: "all", label: "전체 " },
  ...Object.entries(CATEGORIES).map(([key, val]) => ({
    key,
    label: val.label,
  })),
];

const tabColorMap = {
  all: "border-gray-500 text-gray-300",
  progress: "border-blue-500 text-blue-300",
  quality: "border-green-500 text-green-300",
  buff: "border-yellow-500 text-yellow-300",
  repair: "border-orange-500 text-orange-300",
  other: "border-purple-500 text-purple-300",
};

const tabInactiveClass = "border-transparent text-gray-600 hover:text-gray-400";

export default function SkillPalette({ onSkillClick }) {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [compact, setCompact] = useState(true);
  const [maxLevel, setMaxLevel] = useState(100);

  const filtered = useMemo(() => {
    return skills.filter((s) => {
      if (activeTab !== "all" && s.category !== activeTab) return false;
      if (s.level > maxLevel) return false;
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        return (
          s.nameKo.toLowerCase().includes(q) ||
          s.nameEn.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeTab, search, maxLevel]);

  return (
    <div className="flex flex-col h-full">
      {/* 검색 */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="스킬 검색 (한/영)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm
            text-gray-200 placeholder-gray-600 focus:outline-none focus:border-gray-500"
        />
      </div>

      {/* 레벨 필터 + compact 토글 */}
      <div className="flex items-center gap-2 mb-3">
        <label className="text-xs text-gray-500 shrink-0">Lv.</label>
        <input
          type="range"
          min={1}
          max={100}
          value={maxLevel}
          onChange={(e) => setMaxLevel(Number(e.target.value))}
          className="flex-1 accent-gray-500 h-1"
        />
        <span className="text-xs text-gray-400 w-7 text-right">{maxLevel}</span>
        <button
          onClick={() => setCompact((v) => !v)}
          className="text-xs text-gray-500 hover:text-gray-300 border border-gray-700 rounded px-2 py-0.5 shrink-0"
          title={compact ? "카드 보기로 전환" : "목록 보기로 전환"}
        >
          {compact ? "카드" : "목록"}
        </button>
      </div>

      {/* 카테고리 탭 */}
      <div className="flex gap-1 mb-3 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`text-xs px-2.5 py-1 rounded-full border whitespace-nowrap transition-colors
              ${activeTab === tab.key ? tabColorMap[tab.key] : tabInactiveClass}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 스킬 목록 */}
      <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 min-h-0">
        {filtered.length === 0 ? (
          <p className="text-xs text-gray-600 text-center py-8">
            조건에 맞는 스킬이 없습니다
          </p>
        ) : (
          filtered.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              compact={compact}
              onClick={onSkillClick}
            />
          ))
        )}
      </div>

      {/* 카운트 */}
      <div className="mt-2 pt-2 border-t border-gray-800">
        <p className="text-[11px] text-gray-600 text-center">
          {filtered.length}개 스킬 표시 중
        </p>
      </div>
    </div>
  );
}
