import { useState } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import SkillPalette from "./components/skill/SkillPalette";
import MacroBuilder from "./components/macro/MacroBuilder";
import MacroSummary from "./components/macro/MacroSummary";
import MacroOutput from "./components/macro/MacroOutput";
import MacroImportModal from "./components/macro/MacroImportModal";
import PresetPanel from "./components/macro/PresetPanel";
import useMacroBuilder from "./hooks/useMacroBuilder";
import { downloadMacroTxt } from "./utils/macroExporter";

function App() {
  const {
    steps,
    addSkill,
    removeStep,
    moveStep,
    clearAll,
    duplicateStep,
    importSkills,
    loadPreset,
    totalCp,
  } = useMacroBuilder();

  const [showImport, setShowImport] = useState(false);
  const [showPreset, setShowPreset] = useState(false);

  const handleSkillClick = (skill) => {
    addSkill(skill.id);
  };

  return (
    <div className="h-screen bg-gray-950 text-gray-100 flex flex-col overflow-hidden">
      <Header />

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0">
        {/* 좌측: 스킬 팔레트 */}
        <aside className="w-full lg:w-72 xl:w-80 border-b lg:border-b-0 lg:border-r border-gray-800 bg-gray-900/50 overflow-hidden p-3 sm:p-4 flex flex-col max-h-[35vh] lg:max-h-none">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            스킬 목록
          </h2>
          <SkillPalette onSkillClick={handleSkillClick} />
        </aside>

        {/* 중앙: 매크로 빌더 */}
        <main className="flex-1 overflow-hidden p-3 sm:p-4 flex flex-col min-h-0">
          {/* 헤더 바 */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              매크로 빌더
            </h2>
            <div className="flex gap-1.5">
              <button
                onClick={() => setShowPreset((v) => !v)}
                className={`text-[11px] px-2 py-0.5 rounded border transition-colors ${
                  showPreset
                    ? "border-sky-700 text-sky-400 bg-sky-950/30"
                    : "border-gray-700 text-gray-500 hover:text-gray-300"
                }`}
              >
                프리셋
              </button>
              <button
                onClick={() => setShowImport(true)}
                className="text-[11px] text-gray-500 hover:text-gray-300 border border-gray-700 rounded px-2 py-0.5"
              >
                가져오기
              </button>
              {steps.length > 0 && (
                <button
                  onClick={() => downloadMacroTxt(steps)}
                  className="text-[11px] text-gray-500 hover:text-gray-300 border border-gray-700 rounded px-2 py-0.5"
                >
                  .txt
                </button>
              )}
            </div>
          </div>

          {/* 요약 패널 */}
          <div className="mb-2">
            <MacroSummary steps={steps} totalCp={totalCp} />
          </div>

          {/* 프리셋 패널 (토글) */}
          {showPreset && (
            <div className="mb-2">
              <PresetPanel steps={steps} onLoad={loadPreset} />
            </div>
          )}

          {/* 빌더 */}
          <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
            <MacroBuilder
              steps={steps}
              totalCp={totalCp}
              onMove={moveStep}
              onRemove={removeStep}
              onDuplicate={duplicateStep}
              onClear={clearAll}
            />
          </div>
        </main>

        {/* 우측: 매크로 출력 */}
        <aside className="w-full lg:w-72 xl:w-80 border-t lg:border-t-0 lg:border-l border-gray-800 bg-gray-900/50 overflow-hidden p-3 sm:p-4 flex flex-col max-h-[35vh] lg:max-h-none">
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            매크로 출력
          </h2>
          <MacroOutput steps={steps} />
        </aside>
      </div>

      <Footer />

      {/* 가져오기 모달 */}
      {showImport && (
        <MacroImportModal
          onImport={importSkills}
          onClose={() => setShowImport(false)}
        />
      )}
    </div>
  );
}

export default App;
