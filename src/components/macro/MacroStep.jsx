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

const borderColor = {
  blue: "border-blue-800/50",
  green: "border-green-800/50",
  yellow: "border-yellow-800/50",
  orange: "border-orange-800/50",
  purple: "border-purple-800/50",
};

export default function MacroStep({ step, index, onRemove, onDuplicate }) {
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
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg border bg-gray-900/60
        group transition-colors ${borderColor[color]}`}
    >
      {/* 드래그 핸들 */}
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-gray-600 hover:text-gray-400 shrink-0 touch-none"
        title="드래그하여 순서 변경"
      >
        ⠿
      </button>

      {/* 번호 */}
      <span className="text-xs text-gray-600 w-5 text-right shrink-0">
        {index + 1}
      </span>

      {/* 카테고리 점 */}
      <span className={`w-2 h-2 rounded-full shrink-0 ${dotColor[color]}`} />

      {/* 스킬명 */}
      <span className="text-sm text-gray-200 flex-1 truncate">
        {skill.nameKo}
      </span>

      {/* CP */}
      <span className="text-xs text-gray-500 shrink-0">
        {skill.cp > 0 ? `${skill.cp}CP` : ""}
      </span>

      {/* 액션 버튼 */}
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
        <button
          onClick={() => onDuplicate(step.uid)}
          className="text-xs text-gray-500 hover:text-gray-300 px-1"
          title="복제"
        >
          ⧉
        </button>
        <button
          onClick={() => onRemove(step.uid)}
          className="text-xs text-red-600 hover:text-red-400 px-1"
          title="삭제"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
