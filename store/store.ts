import {
  IEducation,
  IExperience,
  ILanguage,
  IPersonalInfo,
  IProject,
  ISkills,
} from "@/type/type";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserDataState {
  hasHydrated: boolean;

  ////// personalInfo
  personalInfo: IPersonalInfo;
  updatePersonalInfo: <K extends keyof IPersonalInfo>(
    field: K,
    value: IPersonalInfo[K]
  ) => void;

  ////// experiences
  experiences: IExperience[];
  addExperience: (data: IExperience) => void;
  removeExperience: (id: string) => void;
  updateExperience: (id: string, data: Partial<IExperience>) => void;

  ////// educations
  educations: IEducation[];
  addEducation: (data: IEducation) => void;
  removeEducation: (id: string) => void;
  updateEducation: (id: string, data: Partial<IEducation>) => void;

  ////// skills
  skills: ISkills;
  updateSkills: (data: ISkills) => void;

  ///// languages
  languages: ILanguage[];
  updateLanguages: (data: ILanguage[]) => void;

  //// Projects
  projects: IProject[];
  addProject: (data: IProject) => void;
  removeProject: (id: string) => void;
  updateProject: (id: string, data: Partial<IProject>) => void;

  //// imports
  importPersonalInfo: (data: IPersonalInfo) => void;
  importExperiences: (data: IExperience[]) => void;
  importEducations: (data: IEducation[]) => void;
  importProjects: (data: IProject[]) => void;
}

const initialPersonalInfo: IPersonalInfo = {
  name: "",
  email: "",
  phone: "",
  title: "",
  location: "",
  linkedin: "",
  links: [{ url: "", title: "" }],
  aboutMe: "",
};

export const useData = create<UserDataState>()(
  persist(
    (set) => ({
      hasHydrated: false,

      ////// personalInfo
      personalInfo: initialPersonalInfo,
      updatePersonalInfo: (field, value) =>
        set((state) => ({
          personalInfo: { ...state.personalInfo, [field]: value },
        })),

      ///////// experiences
      experiences: [],
      addExperience: (data) =>
        set((state) => ({ experiences: [...state.experiences, data] })),
      removeExperience: (id) =>
        set((state) => ({
          experiences: [...state.experiences.filter((exp) => exp.id !== id)],
        })),
      updateExperience: (id, data) =>
        set((state) => ({
          experiences: state.experiences.map((exp) =>
            exp.id === id ? { ...exp, ...data } : exp
          ),
        })),

      //// educations
      educations: [],
      addEducation: (data) =>
        set((state) => ({ educations: [...state.educations, data] })),
      removeEducation: (id) =>
        set((state) => ({
          educations: [...state.educations.filter((edu) => edu.id !== id)],
        })),
      updateEducation: (id, data) =>
        set((state) => ({
          educations: state.educations.map((edu) =>
            edu.id === id ? { ...edu, ...data } : edu
          ),
        })),

      //// skills
      skills: [],
      updateSkills: (data) => set(() => ({ skills: data })),

      ////// languages
      languages: [],
      updateLanguages: (data) => set(() => ({ languages: data })),

      ////// projects
      projects: [],
      addProject: (data) =>
        set((state) => ({ projects: [...state.projects, data] })),
      removeProject: (id) =>
        set((state) => ({
          projects: [...state.projects.filter((proj) => proj.id !== id)],
        })),
      updateProject: (id, data) =>
        set((state) => ({
          projects: state.projects.map((proj) =>
            proj.id === id ? { ...proj, ...data } : proj
          ),
        })),

      //// imports
      importPersonalInfo: (data) => set(() => ({ personalInfo: data })),
      importExperiences: (data) => set(() => ({ experiences: data })),
      importEducations: (data) => set(() => ({ educations: data })),
      importProjects: (data) => set(() => ({ projects: data })),
    }),

    {
      name: "cv-blue",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.hasHydrated && null;
        state && (state.hasHydrated = true);
      },
    }
  )
);
