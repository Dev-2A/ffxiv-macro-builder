import { skills } from "../data/skills";

/**
 * /ac "스킬명" <wait.N> 형식의 텍스트를 파싱하여 skillId 배열로 변환
 * 한국어/영어 스킬명 모두 지원
 */
export function parseMacroText(text) {
  if (!text || !text.trim()) return [];

  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  const result = [];

  // 스킬명 → id 역방향 맵 (한/영 모두)
  const nameToId = new Map();
  skills.forEach((s) => {
    nameToId.set(s.nameKo.toLowerCase(), s.id);
    nameToId.set(s.nameEn.toLowerCase(), s.id);
  });

  for (const line of lines) {
    // /ac 줄만 처리, /echo 등은 무시
    const match = line.match(/^\/ac\s+"([^"]+)"/i);
    if (!match) continue;

    const skillName = match[1].trim().toLowerCase();
    const skillId = nameToId.get(skillName);
    if (skillId) {
      result.push(skillId);
    }
  }

  return result;
}
