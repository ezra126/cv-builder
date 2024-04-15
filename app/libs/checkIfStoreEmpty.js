import { useUserStore } from "@/app/store/UserStore";
import { useResumeStore } from "@/app/store/resumeStore";

function isResumeStoreNotEmpty() {
  const resumeEducation = useResumeStore((state) => state.ResumeEducation);
  const resumeSkill = useResumeStore((state) => state.ResumeSkills);
  const resumeLink = useResumeStore((state) => state.ResumeLinks);
  const resumeLanguage = useResumeStore((state) => state.ResumeLanguages);
  const resumeObjective = useResumeStore((state) => state.ResumeObjective);
  const resumeEmployement = useResumeStore((state) => state.ResumeEmployement);

  if (
    resumeEducation != [] ||
    resumeLink != [] ||
    resumeLanguage != [] ||
    // resumeObjective != "" ||
    resumeSkill != [] ||
    resumeEmployement != []
  ) {
    return true;
  } else {
    return false;
  }
}

export default isResumeStoreNotEmpty;
