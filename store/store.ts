import { IData, IExperience, IPersonalInfo } from "@/type/type";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserDataState {
  hasHydrated: boolean;
  personalInfo: IPersonalInfo;
  updatePersonalInfo: <K extends keyof IPersonalInfo>(
    field: K,
    value: IPersonalInfo[K]
  ) => void;

  experiences: IExperience[];
  addExperience: (data: IExperience) => void;
  removeExperience: (id: string) => void;
  updateExperience: (id: string, data: Partial<IExperience>) => void;
  reorderExperiences: (reorderedExperiences: IExperience[]) => void;
}

const initialPersonalInfo: IPersonalInfo = {
  name: "",
  email: "",
  phone: "",
  title: "",
  location: "",
  linkedin: "",
  portfolio: "",
  aboutMe: "",
};

export const useData = create<UserDataState>()(
  persist(
    (set) => ({
      hasHydrated: false,
      personalInfo: initialPersonalInfo,
      updatePersonalInfo: (field, value) =>
        set((state) => ({
          personalInfo: { ...state.personalInfo, [field]: value },
        })),
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
      reorderExperiences: (reorderedExperiences) =>
        set(() => ({
          experiences: reorderedExperiences,
        })),
    }),

    {
      name: "cv-maker",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.hasHydrated && null;
        state && (state.hasHydrated = true);
      },
    }
  )
);
