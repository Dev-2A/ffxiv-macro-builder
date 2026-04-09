import Header from "./components/layout/Header";
import SkillPalette from "./components/skill/SkillPalette";
import MacroBuilder from "./components/macro/MacroBuilder";
import useMacroBuilder from "./hooks/useMacroBuilder";
import MacroOutput from "./components/macro/MacroOutput";

function App() {
  const {
    steps,
    addSkill,
    removeStep,
    moveStep,
    clearAll,
    duplicateStep,
    totalCp,
  } = useMacroBuilder();

  const handleSkillClick = (skill) => {
    addSkill(skill.id);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      <Header />

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* 좌측: 스킬 팔레트 */}
        <aside className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-gray-800 bg-gray-900/50 overflow-hidden p-4 flex flex-col max-h-[40vh] lg:max-h-none">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            스킬 목록
          </h2>
          <SkillPalette onSkillClick={handleSkillClick} />
        </aside>

        {/* 중앙: 매크로 빌더 */}
        <main className="flex-1 overflow-hidden p-4 flex flex-col">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            매크로 빌더
          </h2>
          <MacroBuilder
            steps={steps}
            totalCp={totalCp}
            onMove={moveStep}
            onRemove={removeStep}
            onDuplicate={duplicateStep}
            onClear={clearAll}
          />
        </main>

        {/* 우측: 매크로 출력 */}
        <aside className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-gray-800 bg-gray-900/50 overflow-hidden p-4 flex flex-col max-h-[40vh] lg:max-h-none">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            매크로 출력
          </h2>
          <MacroOutput steps={steps} />
        </aside>
      </div>
    </div>
  );
}

export default App;
