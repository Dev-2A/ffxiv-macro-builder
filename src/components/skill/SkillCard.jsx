import { CATEGORIES } from "../../data/skills";

const colorMap = {
  blue: "border-blue-800/60 bg-blue-950/30 hover:bg-blue-950/50 hover:border-blue-700/60",
  green:
    "border-green-800/60 bg-green-950/30 hover:bg-green-950/50 hover:border-green-700/60",
  yellow:
    "border-yellow-800/60 bg-yellow-950/30 hover:bg-yellow-950/50 hover:border-yellow-700/60",
  orange:
    "border-orange-800/60 bg-orange-950/30 hover:bg-orange-950/50 hover:border-orange-700/60",
  purple:
    "border-purple-800/60 bg-purple-950/30 hover:bg-purple-950/50 hover:border-purple-700/60",
};

const badgeMap = {
  blue: "bg-blue-900/80 text-blue-300",
  green: "bg-green-900/80 text-green-300",
  yellow: "bg-yellow-900/80 text-yellow-300",
  orange: "bg-orange-900/80 text-orange-300",
  purple: "bg-purple-900/80 text-purple-300",
};

export default function SkillCard({ skill, compact = false, onClick }) {
  const cat = CATEGORIES[skill.category];
  const color = cat.color;

  if (compact) {
    return (
      <button
        onClick={() => onClick?.(skill)}
        className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-left text-xs w-full
          transition-all cursor-pointer active:scale-[0.98] ${colorMap[color]}`}
        title={`${skill.nameEn} (Lv.${skill.level}) — CP ${skill.cp}`}
      >
        <span className="font-medium text-gray-200 truncate flex-1">
          {skill.nameKo}
        </span>
        <span className="text-[10px] text-gray-500 shrink-0">
          Lv.{skill.level}
        </span>
        <span className="text-[10px] text-gray-500 shrink-0 w-6 text-right tabular-nums">
          {skill.cp > 0 ? skill.cp : "-"}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={() => onClick?.(skill)}
      className={`rounded-lg border p-3 text-left w-full
        transition-all cursor-pointer active:scale-[0.98] ${colorMap[color]}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="font-semibold text-sm text-gray-100 truncate">
            {skill.nameKo}
          </p>
          <p className="text-[11px] text-gray-500 truncate">{skill.nameEn}</p>
        </div>
        <span
          className={`text-[10px] px-1.5 py-0.5 rounded font-medium shrink-0 ${badgeMap[color]}`}
        >
          {cat.label}
        </span>
      </div>

      <div className="mt-2 flex items-center gap-3 text-[11px] text-gray-400">
        <span>Lv.{skill.level}</span>
        <span className="tabular-nums">CP {skill.cp}</span>
        <span className="tabular-nums">내구 {skill.durabilityCost}</span>
        <span>wait.{skill.wait}</span>
      </div>

      {skill.description && (
        <p className="mt-1.5 text-[11px] text-gray-500 leading-relaxed">
          {skill.description}
        </p>
      )}

      <div className="mt-1.5 flex gap-1 flex-wrap">
        {skill.firstOnly && (
          <span className="text-[10px] bg-gray-800 text-amber-400/80 px-1.5 py-0.5 rounded">
            첫 턴
          </span>
        )}
        {skill.requireGood && (
          <span className="text-[10px] bg-gray-800 text-cyan-400/80 px-1.5 py-0.5 rounded">
            고품질
          </span>
        )}
        {skill.specialist && (
          <span className="text-[10px] bg-gray-800 text-pink-400/80 px-1.5 py-0.5 rounded">
            전문장인
          </span>
        )}
        {skill.successRate < 100 && (
          <span className="text-[10px] bg-red-900/40 text-red-400 px-1.5 py-0.5 rounded">
            {skill.successRate}%
          </span>
        )}
      </div>
    </button>
  );
}
