import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { skillMap, CATEGORIES } from "../../data/skills";

const dotColor = {
  blue: "bg-blue-500",
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  orange: "bg-orange-500",
  purple: "bg-purple-500",
};

const rowBg = {
  blue: "hover:bg-blue-950/20",
  green: "hover:bg-green-950/20",
  yellow: "hover:bg-yellow-950/20",
  orange: "hover:bg-orange-950/20",
  purple: "hover:bg-purple-950/20",
};

export default function MacroStep({
  step,
  index,
  onRemove,
  onDuplicate,
  isLast,
}) {
  const skill = skillMap.get(step.skillId);
  const cat = CATEGORIES[skill.category];
  const color = cat.color;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: step.uid });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
    zIndex: isDragging ? 50 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-800/60 bg-gray-900/40
        group transition-all ${rowBg[color]} ${isDragging ? "shadow-lg shadow-black/40 ring-1 ring-gray-600" : ""}`}
    >
      {/* 드래그 핸들 */}
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-gray-700 hover:text-gray-400 shrink-0 touch-none text-sm"
        title="드래그하여 순서 변경"
      >
        ⠿
      </button>

      {/* 번호 */}
      <span className="text-[11px] text-gray-600 w-5 text-right shrink-0 tabular-nums">
        {index + 1}
      </span>

      {/* 카테고리 점 */}
      <span className={`w-2 h-2 rounded-full shrink-0 ${dotColor[color]}`} />

      {/* 스킬명 + 영문 */}
      <div className="flex-1 min-w-0">
        <span className="text-sm text-gray-200 truncate block leading-tight">
          {skill.nameKo}
        </span>
        <span className="text-[10px] text-gray-600 truncate block leading-tight">
          {skill.nameEn}
        </span>
      </div>

      {/* wait */}
      <span className="text-[10px] text-gray-600 shrink-0 tabular-nums">
        w.{skill.wait}
      </span>

      {/* CP */}
      <span className="text-[11px] text-gray-500 shrink-0 w-8 text-right tabular-nums">
        {skill.cp > 0 ? `${skill.cp}` : "-"}
      </span>

      {/* 액션 버튼 */}
      <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1">
        <button
          onClick={() => onDuplicate(step.uid)}
          className="text-xs text-gray-600 hover:text-gray-300 px-1 py-0.5 rounded hover:bg-gray-800"
          title="복제"
        >
          ⧉
        </button>
        <button
          onClick={() => onRemove(step.uid)}
          className="text-xs text-gray-600 hover:text-red-400 px-1 py-0.5 rounded hover:bg-gray-800"
          title="삭제"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
