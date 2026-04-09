export default function Header() {
  return (
    <header className="border-b border-gray-800 bg-gray-900 px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-2xl shrink-0">🔨</span>
        <div className="min-w-0">
          <h1 className="text-base sm:text-lg font-bold text-gray-100 truncate">
            FFXIV 제작 매크로 빌더
          </h1>
          <p className="text-[11px] text-gray-500 hidden sm:block">
            드래그 &amp; 드롭으로 매크로를 조립하세요 · Dawntrail 7.x 기준
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-[10px] text-gray-700 hidden md:inline">
          Made with 🥤 and 💙
        </span>
        <a
          href="https://github.com/Dev-2A/ffxiv-macro-builder"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gray-500 hover:text-gray-300 transition-colors border border-gray-700 rounded-lg px-2.5 py-1"
        >
          GitHub ↗
        </a>
      </div>
    </header>
  );
}
