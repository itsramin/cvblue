import { NamePath } from "antd/es/form/interface";

export interface ILink {
  url: string;
  title: string;
}

export interface IPersonalInfo {
  name: string;
  email: string;
  phone: string;
  title: string;
  location: string;
  linkedin: string;
  links: ILink[];
  aboutMe: string;
}
export interface IExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  responsibilities: string[];
  achievements: string[];
}
export interface IEducation {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa?: string;
  description: string;
}
export type ISkills = string[];

export interface ILanguage {
  id: number;
  name: string;
  level: number;
}

export interface IProject {
  id: string;
  name: string;
  description: string;
  role?: string;
  technologies?: string[];
  link?: string;
  date: string;
  images?: string[];
}

export interface IStyleOptions {
  fontFamily: string;
  fontSize: number;
  primaryColor: string;
  secondaryColor: string;
}

export interface EditableItem {
  id: string;
  content: string;
  isEditing: boolean;
}

export interface IData {
  // Personal Info
  name: string;
  email: string;
  phone: string;
  title: string;
  location: string;
  linkedin: string;
  portfolio: string;
  aboutMe: string;

  // Experience
  experiences: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
  }>;

  // Education
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    gpa?: string;
    description: string;
  }>;

  // Skills
  skills: string[];

  // Projects
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string[];
    link?: string;
  }>;

  // Certifications
  certifications: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
    link?: string;
  }>;
}

export interface IFieldData {
  errors: string[];
  warnings: string[];
  name: NamePath[];
  touched: boolean;
  validating: boolean;
  value: any;
}
