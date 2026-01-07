import {
  ICV,
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

  // All CVs
  cvs: ICV[];
  activeCVId: string | null;

  // === Getters for Active CV Data ===
  personalInfo: IPersonalInfo;
  experiences: IExperience[];
  educations: IEducation[];
  skills: ISkills;
  languages: ILanguage[];
  projects: IProject[];
  activeCV: ICV | null;

  // === CV Management ===
  addCV: (cv?: Partial<ICV>) => string;
  removeCV: (id: string) => void;
  updateCV: (id: string, data: Partial<ICV>) => void;
  duplicateCV: (id: string) => void;
  setActiveCV: (id: string) => void;

  // === Direct ID-based Operations (Explicit) ===
  updatePersonalInfoInCV: (cvId: string, data: Partial<IPersonalInfo>) => void;
  addExperienceToCV: (cvId: string, data: IExperience) => void;
  removeExperienceFromCV: (cvId: string, expId: string) => void;
  updateExperienceInCV: (
    cvId: string,
    expId: string,
    data: Partial<IExperience>
  ) => void;
  addEducationToCV: (cvId: string, data: IEducation) => void;
  removeEducationFromCV: (cvId: string, eduId: string) => void;
  updateEducationInCV: (
    cvId: string,
    eduId: string,
    data: Partial<IEducation>
  ) => void;
  updateSkillsInCV: (cvId: string, data: ISkills) => void;
  updateLanguagesInCV: (cvId: string, data: ILanguage[]) => void;
  addProjectToCV: (cvId: string, data: IProject) => void;
  removeProjectFromCV: (cvId: string, projectId: string) => void;
  updateProjectInCV: (
    cvId: string,
    projectId: string,
    data: Partial<IProject>
  ) => void;
  importDataToCV: (cvId: string, data: Partial<ICV>) => void;

  // === Active CV Convenience Methods (Implicit) ===
  updatePersonalInfo: <K extends keyof IPersonalInfo>(
    field: K,
    value: IPersonalInfo[K]
  ) => void;
  addExperience: (data: IExperience) => void;
  removeExperience: (expId: string) => void;
  updateExperience: (expId: string, data: Partial<IExperience>) => void;
  addEducation: (data: IEducation) => void;
  removeEducation: (eduId: string) => void;
  updateEducation: (eduId: string, data: Partial<IEducation>) => void;
  updateSkills: (data: ISkills) => void;
  updateLanguages: (data: ILanguage[]) => void;
  addProject: (data: IProject) => void;
  removeProject: (projectId: string) => void;
  updateProject: (projectId: string, data: Partial<IProject>) => void;
  importData: (data: Partial<ICV>) => void;
}

// Helper to generate a unique ID
const generateId = () =>
  `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

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

const initialCV = (name?: string): ICV => ({
  id: generateId(),
  name: name || `Untitled CV ${new Date().toLocaleDateString()}`,
  personalInfo: { ...initialPersonalInfo },
  experiences: [],
  educations: [],
  skills: [],
  languages: [],
  projects: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

// Helper function to get active CV data
const getActiveCVData = (state: { cvs: ICV[]; activeCVId: string | null }) => {
  const activeCV = state.cvs.find((cv) => cv.id === state.activeCVId) || null;

  return {
    activeCV,
    personalInfo: activeCV?.personalInfo || { ...initialPersonalInfo },
    experiences: activeCV?.experiences || [],
    educations: activeCV?.educations || [],
    skills: activeCV?.skills || [],
    languages: activeCV?.languages || [],
    projects: activeCV?.projects || [],
  };
};

export const useData = create<UserDataState>()(
  persist(
    (set, get) => {
      // Initialize with computed getters
      const baseState = {
        hasHydrated: false,
        cvs: [],
        activeCVId: null,

        // These will be updated by the computed getter function
        personalInfo: { ...initialPersonalInfo },
        experiences: [],
        educations: [],
        skills: [],
        languages: [],
        projects: [],
        activeCV: null,
      };

      return {
        ...baseState,
        ...getActiveCVData(baseState),

        // === CV Management ===
        addCV: (cvData = {}) => {
          const id = generateId();
          const newCV: ICV = {
            ...initialCV(cvData.name),
            id,
            ...cvData,
            personalInfo: { ...initialPersonalInfo, ...cvData.personalInfo },
          };

          set((state) => {
            const newState = {
              cvs: [...state.cvs, newCV],
              activeCVId: id,
            };

            return {
              ...newState,
              ...getActiveCVData(newState),
            };
          });

          return id;
        },

        removeCV: (id) =>
          set((state) => {
            const newCVs = state.cvs.filter((cv) => cv.id !== id);
            let newActiveId = state.activeCVId;

            // If deleting active CV, select another if available
            if (state.activeCVId === id) {
              newActiveId = newCVs.length > 0 ? newCVs[0].id : null;
            }

            const newState = {
              cvs: newCVs,
              activeCVId: newActiveId,
            };

            return {
              ...newState,
              ...getActiveCVData(newState),
            };
          }),

        updateCV: (id, data) =>
          set((state) => {
            const newState = {
              cvs: state.cvs.map((cv) =>
                cv.id === id
                  ? { ...cv, ...data, updatedAt: new Date().toISOString() }
                  : cv
              ),
              activeCVId: state.activeCVId,
            };

            return {
              ...newState,
              ...getActiveCVData(newState),
            };
          }),

        duplicateCV: (id) => {
          const original = get().cvs.find((cv) => cv.id === id);
          if (!original) return;

          const newId = generateId();
          const duplicated: ICV = {
            ...original,
            id: newId,
            name: `${original.name} (Copy)`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          set((state) => {
            const newState = {
              cvs: [...state.cvs, duplicated],
              activeCVId: newId,
            };

            return {
              ...newState,
              ...getActiveCVData(newState),
            };
          });

          return newId;
        },

        setActiveCV: (id) =>
          set((state) => {
            const newState = {
              cvs: state.cvs,
              activeCVId: id,
            };

            return {
              ...newState,
              ...getActiveCVData(newState),
            };
          }),

        // === Direct ID-based Operations ===
        updatePersonalInfoInCV: (cvId, data) => {
          set((state) => {
            const newState = {
              cvs: state.cvs.map((c) =>
                c.id === cvId
                  ? {
                      ...c,
                      personalInfo: { ...c.personalInfo, ...data },
                      updatedAt: new Date().toISOString(),
                    }
                  : c
              ),
              activeCVId: state.activeCVId,
            };

            return {
              ...newState,
              ...getActiveCVData(newState),
            };
          });
        },

        addExperienceToCV: (cvId, data) => {
          set((state) => {
            const newState = {
              cvs: state.cvs.map((c) =>
                c.id === cvId
                  ? {
                      ...c,
                      experiences: [...c.experiences, data],
                      updatedAt: new Date().toISOString(),
                    }
                  : c
              ),
              activeCVId: state.activeCVId,
            };

            return {
              ...newState,
              ...getActiveCVData(newState),
            };
          });
        },

        removeExperienceFromCV: (cvId, expId) => {
          set((state) => {
            const newState = {
              cvs: state.cvs.map((c) =>
                c.id === cvId
                  ? {
                      ...c,
                      experiences: c.experiences.filter(
                        (exp) => exp.id !== expId
                      ),
                      updatedAt: new Date().toISOString(),
                    }
                  : c
              ),
              activeCVId: state.activeCVId,
            };

            return {
              ...newState,
              ...getActiveCVData(newState),
            };
          });
        },

        updateExperienceInCV: (cvId, expId, data) => {
          set((state) => {
            const newState = {
              cvs: state.cvs.map((c) =>
                c.id === cvId
                  ? {
                      ...c,
                      experiences: c.experiences.map((exp) =>
                        exp.id === expId ? { ...exp, ...data } : exp
                      ),
                      updatedAt: new Date().toISOString(),
                    }
                  : c
              ),
              activeCVId: state.activeCVId,
            };

            return {
              ...newState,
              ...getActiveCVData(newState),
            };
          });
        },

        addEducationToCV: (cvId, data) => {
          set((state) => {
            const newState = {
              cvs: state.cvs.map((c) =>
                c.id === cvId
                  ? {
                      ...c,
                      educations: [...c.educations, data],
                      updatedAt: new Date().toISOString(),
                    }
                  : c
              ),
              activeCVId: state.activeCVId,
            };

            return {
              ...newState,
              ...getActiveCVData(newState),
            };
          });
        },

        removeEducationFromCV: (cvId, eduId) => {
          set((state) => {
            const newState = {
              cvs: state.cvs.map((c) =>
                c.id === cvId
                  ? {
                      ...c,
                      educations: c.educations.filter(
                        (edu) => edu.id !== eduId
                      ),
                      updatedAt: new Date().toISOString(),
                    }
                  : c
              ),
              activeCVId: state.activeCVId,
            };

            return {
              ...newState,
              ...getActiveCVData(newState),
            };
          });
        },

        updateEducationInCV: (cvId, eduId, data) => {
          set((state) => {
            const newState = {
              cvs: state.cvs.map((c) =>
                c.id === cvId
                  ? {
                      ...c,
                      educations: c.educations.map((edu) =>
                        edu.id === eduId ? { ...edu, ...data } : edu
                      ),
                      updatedAt: new Date().toISOString(),
                    }
                  : c
              ),
              activeCVId: state.activeCVId,
            };

            return {
              ...newState,
              ...getActiveCVData(newState),
            };
          });
        },

        updateSkillsInCV: (cvId, data) => {
          set((state) => {
            const newState = {
              cvs: state.cvs.map((c) =>
                c.id === cvId
                  ? {
                      ...c,
                      skills: data,
                      updatedAt: new Date().toISOString(),
                    }
                  : c
              ),
              activeCVId: state.activeCVId,
            };

            return {
              ...newState,
              ...getActiveCVData(newState),
            };
          });
        },

        updateLanguagesInCV: (cvId, data) => {
          set((state) => {
            const newState = {
              cvs: state.cvs.map((c) =>
                c.id === cvId
                  ? {
                      ...c,
                      languages: data,
                      updatedAt: new Date().toISOString(),
                    }
                  : c
              ),
              activeCVId: state.activeCVId,
            };

            return {
              ...newState,
              ...getActiveCVData(newState),
            };
          });
        },

        addProjectToCV: (cvId, data) => {
          set((state) => {
            const newState = {
              cvs: state.cvs.map((c) =>
                c.id === cvId
                  ? {
                      ...c,
                      projects: [...c.projects, data],
                      updatedAt: new Date().toISOString(),
                    }
                  : c
              ),
              activeCVId: state.activeCVId,
            };

            return {
              ...newState,
              ...getActiveCVData(newState),
            };
          });
        },

        removeProjectFromCV: (cvId, projectId) => {
          set((state) => {
            const newState = {
              cvs: state.cvs.map((c) =>
                c.id === cvId
                  ? {
                      ...c,
                      projects: c.projects.filter(
                        (proj) => proj.id !== projectId
                      ),
                      updatedAt: new Date().toISOString(),
                    }
                  : c
              ),
              activeCVId: state.activeCVId,
            };

            return {
              ...newState,
              ...getActiveCVData(newState),
            };
          });
        },

        updateProjectInCV: (cvId, projectId, data) => {
          set((state) => {
            const newState = {
              cvs: state.cvs.map((c) =>
                c.id === cvId
                  ? {
                      ...c,
                      projects: c.projects.map((proj) =>
                        proj.id === projectId ? { ...proj, ...data } : proj
                      ),
                      updatedAt: new Date().toISOString(),
                    }
                  : c
              ),
              activeCVId: state.activeCVId,
            };

            return {
              ...newState,
              ...getActiveCVData(newState),
            };
          });
        },

        importDataToCV: (cvId, data) => {
          set((state) => {
            const newState = {
              cvs: state.cvs.map((c) =>
                c.id === cvId
                  ? {
                      ...c,
                      ...data,
                      updatedAt: new Date().toISOString(),
                    }
                  : c
              ),
              activeCVId: state.activeCVId,
            };

            return {
              ...newState,
              ...getActiveCVData(newState),
            };
          });
        },

        // === Active CV Convenience Methods ===
        updatePersonalInfo: (field, value) => {
          const { activeCVId } = get();
          if (!activeCVId) return;

          get().updatePersonalInfoInCV(activeCVId, { [field]: value });
        },

        addExperience: (data) => {
          const { activeCVId } = get();
          if (!activeCVId) return;

          get().addExperienceToCV(activeCVId, data);
        },

        removeExperience: (expId) => {
          const { activeCVId } = get();
          if (!activeCVId) return;

          get().removeExperienceFromCV(activeCVId, expId);
        },

        updateExperience: (expId, data) => {
          const { activeCVId } = get();
          if (!activeCVId) return;

          get().updateExperienceInCV(activeCVId, expId, data);
        },

        addEducation: (data) => {
          const { activeCVId } = get();
          if (!activeCVId) return;

          get().addEducationToCV(activeCVId, data);
        },

        removeEducation: (eduId) => {
          const { activeCVId } = get();
          if (!activeCVId) return;

          get().removeEducationFromCV(activeCVId, eduId);
        },

        updateEducation: (eduId, data) => {
          const { activeCVId } = get();
          if (!activeCVId) return;

          get().updateEducationInCV(activeCVId, eduId, data);
        },

        updateSkills: (data) => {
          const { activeCVId } = get();
          if (!activeCVId) return;

          get().updateSkillsInCV(activeCVId, data);
        },

        updateLanguages: (data) => {
          const { activeCVId } = get();
          if (!activeCVId) return;

          get().updateLanguagesInCV(activeCVId, data);
        },

        addProject: (data) => {
          const { activeCVId } = get();
          if (!activeCVId) return;

          get().addProjectToCV(activeCVId, data);
        },

        removeProject: (projectId) => {
          const { activeCVId } = get();
          if (!activeCVId) return;

          get().removeProjectFromCV(activeCVId, projectId);
        },

        updateProject: (projectId, data) => {
          const { activeCVId } = get();
          if (!activeCVId) return;

          get().updateProjectInCV(activeCVId, projectId, data);
        },

        importData: (data) => {
          const { activeCVId } = get();
          if (!activeCVId) return;

          get().importDataToCV(activeCVId, data);
        },
      };
    },
    {
      name: "cv-blue",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.hasHydrated && null;
        state && (state.hasHydrated = true);
      },
      // Initialize computed properties after rehydration
      partialize: (state) => {
        const { hasHydrated, cvs, activeCVId, ...rest } = state;
        return { cvs, activeCVId, hasHydrated };
      },
    }
  )
);
