import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import MacroStep from "./MacroStep";

export default function MacroBuilder({
  steps = [],
  totalCp = 0,
  onMove,
  onRemove,
  onDuplicate,
  onClear,
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const fromIndex = steps.findIndex((s) => s.uid === active.id);
    const toIndex = steps.findIndex((s) => s.uid === over.id);
    if (fromIndex !== -1 && toIndex !== -1) {
      onMove(fromIndex, toIndex);
    }
  };

  const linesPerMacro = 14; // echo 포함 기준
  const macroCount = Math.ceil(steps.length / linesPerMacro) || 0;

  return (
    <div className="flex flex-col h-full">
      {/* 상단 요약 바 */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span>
            스텝: <strong className="text-gray-200">{steps.length}</strong>
          </span>
          <span>
            매크로: <strong className="text-gray-200">{macroCount}개</strong>
            {steps.length > 15 && (
              <span className="text-yellow-500 ml-1">
                ({Math.ceil(steps.length / 15)}분할)
              </span>
            )}
          </span>
          <span>
            CP 합계: <strong className="text-gray-200">{totalCp}</strong>
          </span>
        </div>
        {steps.length > 0 && (
          <button
            onClick={onClear}
            className="text-xs text-red-600 hover:text-red-400 border border-red-900 rounded px-2 py-0.5"
          >
            전체 삭제
          </button>
        )}
      </div>

      {/* 매크로 분할 시 구분선 포함 스텝 목록 */}
      {steps.length === 0 ? (
        <div className="flex-1 rounded-lg border-2 border-dashed border-gray-700 flex flex-col items-center justify-center gap-2 min-h-48">
          <span className="text-3xl">🔨</span>
          <p className="text-gray-600 text-sm">
            왼쪽에서 스킬을 클릭하여 추가하세요
          </p>
          <p className="text-gray-700 text-xs">
            추가 후 드래그로 순서를 변경할 수 있습니다
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto min-h-0 pr-1">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={steps.map((s) => s.uid)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-1.5">
                {steps.map((step, idx) => (
                  <div key={step.uid}>
                    {/* 매크로 분할 구분선 (15줄 단위) */}
                    {idx > 0 && idx % linesPerMacro === 0 && (
                      <div className="flex items-center gap-2 py-2">
                        <div className="flex-1 border-t border-yellow-700/50" />
                        <span className="text-[10px] text-yellow-600 shrink-0">
                          ── 매크로 #{Math.floor(idx / linesPerMacro) + 1} 시작 ──
                        </span>
                        <div className="flex-1 border-t border-yellow-700/50" />
                      </div>
                    )}
                    <MacroStep
                      step={step}
                      index={idx}
                      onRemove={onRemove}
                      onDuplicate={onDuplicate}
                    />
                  </div>
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}
    </div>
  );
}
