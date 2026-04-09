const STORAGE_KEY = "ffxiv-macro-presets";

/**
 * 프리셋 목록 불러오기
 * @returns {{ id: string, name: string, skillIds: string[], createdAt: string }[]}
 */
export function loadPresets() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * 프리셋 저장
 */
export function savePreset(name, skillIds) {
  const presets = loadPresets();
  const newPreset = {
    id: `preset_${Date.now()}`,
    name,
    skillIds,
    createdAt: new Date().toISOString(),
  };
  presets.unshift(newPreset);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
  return newPreset;
}

/**
 * 프리셋 삭제
 */
export function deletePreset(id) {
  const presets = loadPresets().filter((p) => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
  return presets;
}

/**
 * 프리셋 이름 변경
 */
export function renamePreset(id, newName) {
  const presets = loadPresets().map((p) =>
    p.id === id ? { ...p, name: newName } : p,
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
  return presets;
}
