export default function Header() {
  return (
    <header className="border-b border-gray-800 bg-gray-900 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="text-2xl">🔨</span>
        <div>
          <h1 className="text-lg font-bold text-gray-100">
            FFXIV 제작 매크로 빌더
          </h1>
          <p className="text-xs text-gray-500">
            드래그 &amp; 드롭으로 매크로를 조립하세요
          </p>
        </div>
      </div>
      <a
        href="https://github.com/Dev-2A/ffxiv-macro-builder"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-500 hover:text-gray-300 transition-colors text-sm"
      >
        GitHub ↗
      </a>
    </header>
  );
}
