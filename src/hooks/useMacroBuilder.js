import { useState, useCallback, useMemo } from "react";
import { skillMap } from "../data/skills";

let nextUid = 1;
const uid = () => `step_${nextUid++}`;

export default function useMacroBuilder() {
  const [steps, setSteps] = useState([]);

  const addSkill = useCallback((skillId) => {
    const skill = skillMap.get(skillId);
    if (!skill) return;
    setSteps((prev) => [...(prev || []), { uid: uid(), skillId: skill.id }]);
  }, []);

  const insertSkill = useCallback((skillId, index) => {
    const skill = skillMap.get(skillId);
    if (!skill) return;
    setSteps((prev) => {
      const next = [...(prev || [])];
      next.splice(index, 0, { uid: uid(), skillId: skill.id });
      return next;
    });
  }, []);

  const removeStep = useCallback((targetUid) => {
    setSteps((prev) => (prev || []).filter((s) => s.uid !== targetUid));
  }, []);

  const moveStep = useCallback((fromIndex, toIndex) => {
    setSteps((prev) => {
      const next = [...(prev || [])];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setSteps([]);
  }, []);

  const duplicateStep = useCallback((targetUid) => {
    setSteps((prev) => {
      const arr = prev || [];
      const idx = arr.findIndex((s) => s.uid === targetUid);
      if (idx === -1) return arr;
      const next = [...arr];
      next.splice(idx + 1, 0, { uid: uid(), skillId: arr[idx].skillId });
      return next;
    });
  }, []);

  const totalCp = useMemo(() => {
    return (steps || []).reduce((sum, step) => {
      const skill = skillMap.get(step.skillId);
      return sum + (skill?.cp ?? 0);
    }, 0);
  }, [steps]);

  return {
    steps: steps || [],
    setSteps,
    addSkill,
    insertSkill,
    removeStep,
    moveStep,
    clearAll,
    duplicateStep,
    totalCp,
  };
}
