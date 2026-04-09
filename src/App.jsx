import Header from "./components/layout/Header";

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col">
      <Header />

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* 좌측: 스킬 팔레트 */}
        <aside className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-gray-800 bg-gray-900/50 overflow-y-auto p-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            스킬 목록
          </h2>
          <p className="text-xs text-gray-600">Step 5에서 구현</p>
        </aside>

        {/* 중앙: 매크로 빌더 */}
        <main className="flex-1 overflow-y-auto p-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            매크로 빌더
          </h2>
          <div className="min-h-48 rounded-lg border-2 border-dashed border-gray-700 flex items-center justify-center">
            <p className="text-gray-600 text-sm">
              스킬을 여기에 드래그하여 매크로를 조립하세요
            </p>
          </div>
        </main>

        {/* 우측: 매크로 출력 */}
        <aside className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-gray-800 bg-gray-900/50 overflow-y-auto p-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
            매크로 출력
          </h2>
          <p className="text-xs text-gray-600">Step 7에서 구현</p>
        </aside>
      </div>
    </div>
  );
}

export default App;
