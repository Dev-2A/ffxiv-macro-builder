import { CATEGORIES } from "../../data/skills";

const colorMap = {
  blue: "border-blue-700 bg-blue-950/40",
  green: "border-green-700 bg-green-950/40",
  yellow: "border-yellow-700 bg-yellow-950/40",
  orange: "border-orange-700 bg-orange-950/40",
  purple: "border-purple-700 bg-purple-950/40",
};

const badgeMap = {
  blue: "bg-blue-900 text-blue-300",
  green: "bg-green-900 text-green-300",
  yellow: "bg-yellow-900 text-yellow-300",
  orange: "bg-orange-900 text-orange-300",
  purple: "bg-purple-900 text-purple-300",
};

export default function SkillCard({ skill, compact = false, onClick }) {
  const cat = CATEGORIES[skill.category];
  const color = cat.color;

  if (compact) {
    return (
      <button
        onClick={() => onClick?.(skill)}
        className={`flex items-center gap-2 px-2 py-1.5 rounded border text-left text-xs w-full
          hover:brightness-125 transition-all cursor-pointer ${colorMap[color]}`}
        title={`${skill.nameEn} (Lv.${skill.level}) — CP ${skill.cp}`}
      >
        <span className="font-medium text-gray-200 truncate flex-1">
          {skill.nameKo}
        </span>
        <span className="text-gray-500 shrink-0">
          {skill.cp > 0 ? `${skill.cp}` : "-"}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={() => onClick?.(skill)}
      className={`rounded-lg border p-3 text-left w-full
        hover:brightness-125 transition-all cursor-pointer ${colorMap[color]}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-semibold text-sm text-gray-100 truncate">
            {skill.nameKo}
          </p>
          <p className="text-xs text-gray-500 truncate">{skill.nameEn}</p>
        </div>
        <span
          className={`text-[10px] px-1.5 py-0.5 rounded font-medium shrink-0 ${badgeMap[color]}`}
        >
          {cat.label}
        </span>
      </div>

      <div className="mt-2 flex items-center gap-3 text-xs text-gray-400">
        <span>Lv.{skill.level}</span>
        <span>CP {skill.cp}</span>
        <span>내구 {skill.durabilityCost}</span>
        <span>wait.{skill.wait}</span>
      </div>

      {skill.description && (
        <p className="mt-1.5 text-[11px] text-gray-500">{skill.description}</p>
      )}

      <div className="mt-1.5 flex gap-1 flex-wrap">
        {skill.firstOnly && (
          <span className="text-[10px] bg-gray-800 text-gray-400 px-1 rounded">
            첫 턴
          </span>
        )}
        {skill.requireGood && (
          <span className="text-[10px] bg-gray-800 text-gray-400 px-1 rounded">
            고품질
          </span>
        )}
        {skill.specialist && (
          <span className="text-[10px] bg-gray-800 text-gray-400 px-1 rounded">
            전문장인
          </span>
        )}
        {skill.successRate < 100 && (
          <span className="text-[10px] bg-red-900/50 text-red-400 px-1 rounded">
            {skill.successRate}%
          </span>
        )}
      </div>
    </button>
  );
}
