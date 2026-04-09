import { generateFullText } from "./macroGenerator";

/**
 * 매크로를 .txt 파일로 다운로드
 */
export function downloadMacroTxt(steps, options = {}) {
  const text = generateFullText(steps, options);
  if (!text) return;

  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `ffxiv-macro-${Date.now()}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
