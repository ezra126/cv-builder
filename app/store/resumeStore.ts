import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { StateStorage } from "zustand/middleware";

enum SkillLevel {
  Novice = "Novice",
  Junior = "Junior",
  Intermediate = "Intermediate",
  Skillfull = "Skillfull",
  Expert = "Expert",
  NotSelected = "",
}

enum Level {
  Nativespeaker = "Native speaker",
  Highlyproficient = "Highly proficient",
  Verygoodcommand = "Very good command",
  WorkingKnowledge = "Working Knowledge",
  Expert = "Expert",
  C2 = "C2",
  C1 = "C1",
  B2 = "B2",
  B1 = "B1",
  A2 = "A2",
  A1 = "A1",
  SelectLevel = "",
}

type State = {
  ResumeEducation: {
    id: String;
    school: String;
    degree: String;
    start_date: String;
    end_date: String;
    city: String;
    description: String;
  }[];
  ResumeEmployement: {
    id: String;
    job_title: String;
    company: String;
    start_date: String;
    end_date: String;
    city: String;
    description: String;
  }[];
  ResumeSkills: {
    id: String;
    skill: String;
    level: SkillLevel;
  }[];
  ResumeLinks: {
    id: String;
    label: String;
    link: String;
  }[];
  ResumeLanguages: {
    id: String;
    language: String;
    level: Level;
  }[];
  ResumeObjective: String;
  ResumeTemplate: String;
};

type Action = {
  updateResumeEducation: (
    UpdatedResumeEducation: State["ResumeEducation"]
  ) => void;
  updateResumeEmployement: (
    UpdatedResumeEducation: State["ResumeEmployement"]
  ) => void;
  updateResumeSkills: (UpdatedResumeSkill: State["ResumeSkills"]) => void;
  updateResumeLinks: (UpdatedResumeLink: State["ResumeLinks"]) => void;
  updateResumeLanguages: (
    UpdatedResumeLanguage: State["ResumeLanguages"]
  ) => void;
  updateResumeObjective: (
    UpdatedResumeObjective: State["ResumeObjective"]
  ) => void;
  updateResumeTemplate: (
    UpdatedResumeTemplate: State["ResumeTemplate"]
  ) => void;
};

const useResumeStore = create<State & Action>()(
  persist(
    (set, get) => ({
      ResumeEducation: [
        // {
        //   id: "1",
        //   school: "",
        //   degree: "",
        //   start_date: "",
        //   end_date: "",
        //   city: "",
        //   description: "jrgjjrj",
        // },
      ],
      ResumeEmployement: [
        // {
        //   id: "1",
        //   job_title: "Software developer",
        //   company: "MMCYTECH",
        //   start_date: "",
        //   end_date: "",
        //   city: "",
        //   description: "mm",
        // },
        // {
        //   id: "2",
        //   job_title: "echanical",
        //   company: "MMCYTECH",
        //   start_date: "",
        //   end_date: "",
        //   city: "",
        //   description: "",
        // },
      ],
      ResumeSkills: [
        // {
        //   id: "1",
        //   skill: "",
        //   level: SkillLevel.NotSelected,
        // },
      ],
      ResumeLinks: [
        // {
        //   id: "1",
        //   label: "helo",
        //   link: "",
        // },
      ],
      ResumeLanguages: [
        // {
        //   id: "1",
        //   language: "",
        //   level: Level.SelectLevel,
        // },
      ],
      ResumeObjective: "",
      ResumeTemplate: "",
      updateResumeEducation: (UpdatedResumeEducation) =>
        set(() => ({ ResumeEducation: UpdatedResumeEducation })),
      updateResumeEmployement: (updateResumeEmployement) =>
        set(() => ({ ResumeEmployement: updateResumeEmployement })),
      updateResumeSkills: (UpdatedResumeSkill) =>
        set(() => ({ ResumeSkills: UpdatedResumeSkill })),
      updateResumeLinks: (UpdatedResumeLink) =>
        set(() => ({ ResumeLinks: UpdatedResumeLink })),
      updateResumeLanguages: (UpdatedResumeLanguage) =>
        set(() => ({ ResumeLanguages: UpdatedResumeLanguage })),
      updateResumeObjective: (UpdatedResumeObjective) =>
        set(() => ({ ResumeObjective: UpdatedResumeObjective })),
      updateResumeTemplate: (updateResumeTemplate) =>
        set(() => ({ ResumeTemplate: updateResumeTemplate })),
      //  addABear: () => set({ bears: get().bears + 1 }),
    }),
    {
      name: "Resume-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export { useResumeStore };

// <State & Action>

// {
//   ResumeEducation: [
//     {
//       id: "1",
//       school: "",
//       degree: "",
//       start_date: "",
//       end_date: "",
//       city: "",
//       description: "jrgjjrj",
//     },
//   ],
//   ResumeEmployement: [
//     {
//       id: "1",
//       job_title: "Software developer",
//       company: "MMCYTECH",
//       start_date: "",
//       end_date: "",
//       city: "",
//       description: "mm",
//     },
//     {
//       id: "2",
//       job_title: "echanical",
//       company: "MMCYTECH",
//       start_date: "",
//       end_date: "",
//       city: "",
//       description: "",
//     },
//   ],
//   ResumeSkills: [
//     {
//       id: "1",
//       skill: "",
//       level: SkillLevel.NotSelected,
//     },
//   ],
//   ResumeLinks: [
//     {
//       id: "1",
//       label: "helo",
//       link: "",
//     },
//   ],
//   ResumeLanguages: [
//     {
//       id: "1",
//       language: "",
//       level: Level.SelectLevel,
//     },
//   ],
//   ResumeObjective: "",
//   ResumeTemplate: "",
//   updateResumeEducation: (UpdatedResumeEducation) =>
//     set(() => ({ ResumeEducation: UpdatedResumeEducation })),
//   updateResumeEmployement: (updateResumeEmployement) =>
//     set(() => ({ ResumeEmployement: updateResumeEmployement })),
//   updateResumeSkills: (UpdatedResumeSkill) =>
//     set(() => ({ ResumeSkills: UpdatedResumeSkill })),
//   updateResumeLinks: (UpdatedResumeLink) =>
//     set(() => ({ ResumeLinks: UpdatedResumeLink })),
//   updateResumeLanguages: (UpdatedResumeLanguage) =>
//     set(() => ({ ResumeLanguages: UpdatedResumeLanguage })),
//   updateResumeObjective: (UpdatedResumeObjective) =>
//     set(() => ({ ResumeObjective: UpdatedResumeObjective })),
//   updateResumeTemplate: (updateResumeTemplate) =>
//     set(() => ({ ResumeTemplate: updateResumeTemplate })),
// }
