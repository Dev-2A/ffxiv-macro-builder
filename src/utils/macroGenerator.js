import { skillMap } from "../data/skills";

/**
 * 스텝 배열을 FFXIV 매크로 텍스트로 변환
 * - /ac "스킬명" <wait.N> 형식
 * - 15줄 초과 시 자동 분할
 * - 각 매크로 끝에 /echo 알림 추가
 */
export function generateMacroText(
  steps,
  { language = "ko", addEcho = true } = {},
) {
  if (!steps || steps.length === 0) return [];

  const lines = steps.map((step) => {
    const skill = skillMap.get(step.skillId);
    if (!skill) return "";
    const name = language === "ko" ? skill.nameKo : skill.nameEn;
    return `/ac "${name}" <wait.${skill.wait}>`;
  });

  // 15줄 단위로 분할
  const macros = [];
  const linesPerMacro = addEcho ? 14 : 15;

  for (let i = 0; i < lines.length; i += linesPerMacro) {
    const chunk = lines.slice(i, i + linesPerMacro);
    const macroIndex = Math.floor(i / linesPerMacro) + 1;
    const totalMacros = Math.ceil(lines.length / linesPerMacro);

    if (addEcho) {
      if (macroIndex < totalMacros) {
        chunk.push(`/echo 매크로 #${macroIndex} 완료 <se.1>`);
      } else {
        chunk.push("/echo 제작 완료! <se.2>");
      }
    }

    macros.push({
      index: macroIndex,
      lines: chunk,
      text: chunk.join("\n"),
    });
  }

  return macros;
}

/**
 * 전체 매크로를 하나의 텍스트로 합치기 (복사용)
 */
export function generateFullText(steps, options) {
  const macros = generateMacroText(steps, options);
  return macros
    .map((m, i) =>
      macros.length > 1 ? `// ── 매크로 #${m.index} ──\n${m.text}` : m.text,
    )
    .join("\n\n");
}
