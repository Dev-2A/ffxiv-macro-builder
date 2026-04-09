import { useState } from "react";
import { parseMacroText } from "../../utils/macroParser";

export default function MacroImportModal({ onImport, onClose }) {
  const [text, setText] = useState("");

  const parsed = parseMacroText(text);

  const handleImport = () => {
    if (parsed.length === 0) return;
    onImport(parsed);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-lg mx-4 shadow-xl">
        {/* 헤더 */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-800">
          <h3 className="text-sm font-semibold text-gray-200">
            매크로 가져오기
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-300 text-lg"
          >
            ✕
          </button>
        </div>

        {/* 본문 */}
        <div className="p-5 space-y-3">
          <p className="text-xs text-gray-400">
            기존 FFXIV 매크로 텍스트를 붙여넣으세요.{" "}
            <code className="text-gray-500">/ac "스킬명" &lt;wait.N&gt;</code>{" "}
            형식을 인식합니다.
          </p>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`/ac "정신 집중" <wait.3>\n/ac "장기절약" <wait.2>\n/ac "혁신" <wait.2>\n/ac "사전 가공" <wait.3>\n...`}
            rows={10}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs
              text-gray-300 font-mono placeholder-gray-600 focus:outline-none focus:border-gray-500 resize-none"
          />

          {/* 파싱 결과 미리보기 */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              {text.trim()
                ? `${parsed.length}개 스킬 인식됨`
                : "텍스트를 입력해 주세요"}
            </span>
            {text.trim() && parsed.length === 0 && (
              <span className="text-xs text-red-400">
                인식된 스킬이 없습니다
              </span>
            )}
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex justify-end gap-2 px-5 py-3 border-t border-gray-800">
          <button
            onClick={onClose}
            className="text-xs text-gray-400 hover:text-gray-200 px-3 py-1.5 rounded border border-gray-700"
          >
            취소
          </button>
          <button
            onClick={handleImport}
            disabled={parsed.length === 0}
            className="text-xs font-medium px-3 py-1.5 rounded transition-colors
              disabled:opacity-30 disabled:cursor-not-allowed
              bg-sky-700 hover:bg-sky-600 text-white"
          >
            {parsed.length}개 스킬 가져오기
          </button>
        </div>
      </div>
    </div>
  );
}
