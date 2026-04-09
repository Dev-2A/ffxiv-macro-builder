import { useState, useMemo } from "react";
import { generateMacroText } from "../../utils/macroGenerator";

export default function MacroOutput({ steps }) {
  const [language, setLanguage] = useState("ko");
  const [addEcho, setAddEcho] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const macros = useMemo(
    () => generateMacroText(steps, { language, addEcho }),
    [steps, language, addEcho],
  );

  const handleCopy = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch {
      //fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    }
  };

  const handleCopyAll = () => {
    const full = macros
      .map((m, i) =>
        macros.length > 1 ? `// ── 매크로 #${m.index} ──\n${m.text}` : m.text,
      )
      .join("\n\n");
    handleCopy(full, "all");
  };

  if (!steps || steps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-600">
        <span className="text-2xl mb-2">📋</span>
        <p className="text-sm">매크로가 비어 있습니다</p>
        <p className="text-xs mt-1">스킬을 추가하면 여기에 출력됩니다</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* 옵션 바 */}
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        {/* 언어 토글 */}
        <div className="flex rounded-lg border border-gray-700 overflow-hidden text-xs">
          <button
            onClick={() => setLanguage("ko")}
            className={`px-2.5 py-1 transition-colors ${
              language === "ko"
                ? "bg-gray-700 text-gray-200"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            한국어
          </button>
          <button
            onClick={() => setLanguage("en")}
            className={`px-2.5 py-1 transition-colors ${
              language === "en"
                ? "bg-gray-700 text-gray-200"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            English
          </button>
        </div>

        {/* echo 토글 */}
        <label className="flex items-center gap-1.5 text-xs text-gray-400 cursor-pointer">
          <input
            type="checkbox"
            checked={addEcho}
            onChange={(e) => setAddEcho(e.target.checked)}
            className="accent-gray-500"
          />
          /echo 추가
        </label>
      </div>

      {/* 전체 복사 */}
      {macros.length > 1 && (
        <button
          onClick={handleCopyAll}
          className={`w-full mb-3 py-2 rounded-lg text-xs font-medium transition-colors border ${
            copiedIndex === "all"
              ? "bg-green-900/30 border-green-700 text-green-400"
              : "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
          }`}
        >
          {copiedIndex === "all"
            ? "✓ 전체 복사됨!"
            : `전체 복사 (${macros.length}개 매크로)`}
        </button>
      )}

      {/* 매크로 블록들 */}
      <div className="flex-1 overflow-y-auto space-y-3 min-h-0 pr-1">
        {macros.map((macro) => (
          <div
            key={macro.index}
            className="rounded-lg border border-gray-800 overflow-hidden"
          >
            {/* 매크로 헤더 */}
            <div className="flex items-center justify-between px-3 py-1.5 bg-gray-800/50">
              <span className="text-xs text-gray-400">
                매크로 #{macro.index}
                <span className="text-gray-600 ml-2">
                  ({macro.lines.length}줄)
                </span>
              </span>
              <button
                onClick={() => handleCopy(macro.text, macro.index)}
                className={`text-xs px-2 py-0.5 rounded transition-colors ${
                  copiedIndex === macro.index
                    ? "text-green-400"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {copiedIndex === macro.index ? "✓ 복사됨" : "복사"}
              </button>
            </div>

            {/* 매크로 본문 */}
            <pre className="px-3 py-2 text-xs leading-relaxed text-gray-300 font-mono overflow-x-auto whitespace-pre">
              {macro.lines.map((line, i) => (
                <div
                  key={i}
                  className={line.startsWith("/echo") ? "text-yellow-600" : ""}
                >
                  {line}
                </div>
              ))}
            </pre>
          </div>
        ))}
      </div>
    </div>
  );
}
