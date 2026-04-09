import { useState, useEffect } from "react";
import {
  loadPresets,
  savePreset,
  deletePreset,
  renamePreset,
} from "../../utils/presetStorage";

export default function PresetPanel({ steps, onLoad }) {
  const [presets, setPresets] = useState([]);
  const [saveName, setSaveName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // 초기 로드
  useEffect(() => {
    setPresets(loadPresets());
  }, []);

  // 저장
  const handleSave = () => {
    const name = saveName.trim();
    if (!name || !steps || steps.length === 0) return;

    const skillIds = steps.map((s) => s.skillId);
    savePreset(name, skillIds);
    setPresets(loadPresets());
    setSaveName("");
  };

  // 불러오기
  const handleLoad = (preset) => {
    onLoad(preset.skillIds);
  };

  // 삭제
  const handleDelete = (id) => {
    const updated = deletePreset(id);
    setPresets(updated);
    setConfirmDeleteId(null);
  };

  // 이름 변경
  const handleRename = (id) => {
    const name = editName.trim();
    if (!name) return;
    const updated = renamePreset(id, name);
    setPresets(updated);
    setEditingId(null);
    setEditName("");
  };

  const formatDate = (iso) => {
    try {
      const d = new Date(iso);
      return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`;
    } catch {
      return "";
    }
  };

  return (
    <div className="rounded-lg border border-gray-800 bg-gray-900/60 overflow-hidden">
      {/* 저장 영역 */}
      <div className="px-3 py-2.5 border-b border-gray-800">
        <p className="text-[11px] text-gray-500 mb-1.5">
          현재 매크로를 프리셋으로 저장
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="프리셋 이름..."
            value={saveName}
            onChange={(e) => setSaveName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            maxLength={30}
            className="flex-1 bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs
              text-gray-200 placeholder-gray-600 focus:outline-none focus:border-gray-500"
          />
          <button
            onClick={handleSave}
            disabled={!saveName.trim() || !steps || steps.length === 0}
            className="text-xs px-3 py-1 rounded transition-colors
              disabled:opacity-30 disabled:cursor-not-allowed
              bg-sky-700 hover:bg-sky-600 text-white shrink-0"
          >
            저장
          </button>
        </div>
      </div>

      {/* 프리셋 목록 */}
      <div className="max-h-52 overflow-y-auto">
        {presets.length === 0 ? (
          <p className="text-xs text-gray-600 text-center py-6">
            저장된 프리셋이 없습니다
          </p>
        ) : (
          <div className="divide-y divide-gray-800/50">
            {presets.map((preset) => (
              <div
                key={preset.id}
                className="px-3 py-2 hover:bg-gray-800/30 transition-colors group"
              >
                {/* 이름 변경 모드 */}
                {editingId === preset.id ? (
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleRename(preset.id);
                        if (e.key === "Escape") setEditingId(null);
                      }}
                      autoFocus
                      maxLength={30}
                      className="flex-1 bg-gray-800 border border-gray-600 rounded px-2 py-0.5 text-xs
                        text-gray-200 focus:outline-none"
                    />
                    <button
                      onClick={() => handleRename(preset.id)}
                      className="text-xs text-green-500 hover:text-green-400 px-1"
                    >
                      ✓
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-xs text-gray-500 hover:text-gray-300 px-1"
                    >
                      ✕
                    </button>
                  </div>
                ) : confirmDeleteId === preset.id ? (
                  /* 삭제 확인 */
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-red-400">삭제할까요?</span>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => handleDelete(preset.id)}
                        className="text-xs text-red-400 hover:text-red-300 px-1"
                      >
                        삭제
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(null)}
                        className="text-xs text-gray-500 hover:text-gray-300 px-1"
                      >
                        취소
                      </button>
                    </div>
                  </div>
                ) : (
                  /* 기본 표시 */
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-200 font-medium truncate">
                        {preset.name}
                      </p>
                      <p className="text-[10px] text-gray-600">
                        {preset.skillIds.length}스텝 ·{" "}
                        {formatDate(preset.createdAt)}
                      </p>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      <button
                        onClick={() => handleLoad(preset)}
                        className="text-[10px] text-sky-500 hover:text-sky-400 border border-sky-800 rounded px-1.5 py-0.5"
                      >
                        불러오기
                      </button>
                      <button
                        onClick={() => {
                          setEditingId(preset.id);
                          setEditName(preset.name);
                        }}
                        className="text-[10px] text-gray-500 hover:text-gray-300 px-1"
                        title="이름 변경"
                      >
                        ✎
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(preset.id)}
                        className="text-[10px] text-red-600 hover:text-red-400 px-1"
                        title="삭제"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
