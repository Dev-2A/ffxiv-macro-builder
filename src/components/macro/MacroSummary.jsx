import { useState, useMemo } from "react";
import { skillMap } from "../../data/skills";

export default function MacroSummary({ steps, totalCp }) {
  const [cpBudget, setCpBudget] = useState(600);

  const stats = useMemo(() => {
    const safeSteps = steps || [];
    const remainCp = cpBudget - totalCp;
    const totalWait = safeSteps.reduce((sum, s) => {
      const skill = skillMap.get(s.skillId);
      return sum + (skill?.wait ?? 0);
    }, 0);
    const totalDurability = safeSteps.reduce((sum, s) => {
      const skill = skillMap.get(s.skillId);
      return sum + (skill?.durabilityCost ?? 0);
    }, 0);
    const macroCount = Math.ceil(safeSteps.length / 14) || 0;

    // 카테고리별 카운트
    const catCount = { progress: 0, quality: 0, buff: 0, repair: 0, other: 0 };
    safeSteps.forEach((s) => {
      const skill = skillMap.get(s.skillId);
      if (skill) catCount[skill.category]++;
    });

    return { remainCp, totalWait, totalDurability, macroCount, catCount };
  }, [steps, totalCp, cpBudget]);

  const isOverBudget = stats.remainCp < 0;

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return m > 0 ? `${m}분 ${s}초` : `${s}초`;
  };

  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900/60 p-3 space-y-3">
      {/* CP 예산 */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs text-gray-400">CP 예산</label>
          <input
            type="number"
            min={0}
            max={9999}
            value={cpBudget}
            onChange={(e) => setCpBudget(Number(e.target.value) || 0)}
            className="w-20 bg-gray-800 border border-gray-700 rounded px-2 py-0.5 text-xs
              text-right text-gray-200 focus:outline-none focus:border-gray-500"
          />
        </div>

        {/* CP 게이지 바 */}
        <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              isOverBudget ? "bg-red-600" : "bg-sky-600"
            }`}
            style={{ width: `${Math.min((totalCp / cpBudget) * 100, 100)}%` }}
          />
        </div>

        <div className="flex justify-between mt-1 text-xs">
          <span className="text-gray-500">사용: {totalCp} CP</span>
          <span
            className={
              isOverBudget ? "text-red-400 font-medium" : "text-gray-400"
            }
          >
            {isOverBudget
              ? `초과 ${Math.abs(stats.remainCp)} CP`
              : `잔여 ${stats.remainCp} CP`}
          </span>
        </div>
      </div>

      {/* 주요 수치 그리드 */}
      <div className="grid grid-cols-2 gap-2">
        <StatBox label="스텝 수" value={`${(steps || []).length}개`} />
        <StatBox label="매크로 수" value={`${stats.macroCount}개`} />
        <StatBox label="내구도 소모" value={`${stats.totalDurability}`} />
        <StatBox label="예상 시간" value={formatTime(stats.totalWait)} />
      </div>

      {/* 카테고리 분포 */}
      {(steps || []).length > 0 && (
        <div>
          <p className="text-[11px] text-gray-500 mb-1.5">스킬 분포</p>
          <div className="flex gap-1 h-2 rounded-full overflow-hidden bg-gray-800">
            {stats.catCount.progress > 0 && (
              <div
                className="bg-blue-600 transition-all"
                style={{ flex: stats.catCount.progress }}
                title={`작업 ${stats.catCount.progress}`}
              />
            )}
            {stats.catCount.quality > 0 && (
              <div
                className="bg-green-600 transition-all"
                style={{ flex: stats.catCount.quality }}
                title={`가공 ${stats.catCount.quality}`}
              />
            )}
            {stats.catCount.buff > 0 && (
              <div
                className="bg-yellow-600 transition-all"
                style={{ flex: stats.catCount.buff }}
                title={`버프 ${stats.catCount.buff}`}
              />
            )}
            {stats.catCount.repair > 0 && (
              <div
                className="bg-orange-600 transition-all"
                style={{ flex: stats.catCount.repair }}
                title={`내구도 ${stats.catCount.repair}`}
              />
            )}
            {stats.catCount.other > 0 && (
              <div
                className="bg-purple-600 transition-all"
                style={{ flex: stats.catCount.other }}
                title={`기타 ${stats.catCount.other}`}
              />
            )}
          </div>
          <div className="flex gap-3 mt-1.5 flex-wrap">
            {stats.catCount.progress > 0 && (
              <CatLabel
                color="bg-blue-600"
                label="작업"
                count={stats.catCount.progress}
              />
            )}
            {stats.catCount.quality > 0 && (
              <CatLabel
                color="bg-green-600"
                label="가공"
                count={stats.catCount.quality}
              />
            )}
            {stats.catCount.buff > 0 && (
              <CatLabel
                color="bg-yellow-600"
                label="버프"
                count={stats.catCount.buff}
              />
            )}
            {stats.catCount.repair > 0 && (
              <CatLabel
                color="bg-orange-600"
                label="내구도"
                count={stats.catCount.repair}
              />
            )}
            {stats.catCount.other > 0 && (
              <CatLabel
                color="bg-purple-600"
                label="기타"
                count={stats.catCount.other}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function StatBox({ label, value }) {
  return (
    <div className="rounded border border-gray-800 bg-gray-800/30 px-2.5 py-1.5 text-center">
      <p className="text-[10px] text-gray-500">{label}</p>
      <p className="text-sm font-semibold text-gray-200">{value}</p>
    </div>
  );
}

function CatLabel({ color, label, count }) {
  return (
    <span className="flex items-center gap-1 text-[10px] text-gray-500">
      <span className={`w-1.5 h-1.5 rounded-full ${color}`} />
      {label} {count}
    </span>
  );
}
