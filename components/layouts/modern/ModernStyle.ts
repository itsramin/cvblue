import { StyleSheet } from "@react-pdf/renderer";

export const MODERN_COLORS = {
  primary: "#1A365D", // Deep navy
  secondary: "#2D3748", // Dark gray
  accent: "#3182CE", // Bright blue
  highlight: "#ED8936", // Orange accent
  lightBg: "#F7FAFC", // Very light blue-gray
  text: "#4A5568", // Gray text
  lightText: "#718096", // Lighter gray
};

const styleOptions = {
  fontFamily: "Montserrat",
  fontSize: 12,
  primaryColor: "#1890ff",
  secondaryColor: "#52c41a",
};

export const modern_styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    fontFamily: styleOptions.fontFamily || "Arial",
    fontSize: styleOptions.fontSize || 10,
  },
  // Left sidebar with accent background
  sidebar: {
    width: "30%",
    backgroundColor: MODERN_COLORS.primary,
    padding: 30,
    color: "#FFFFFF",
    paddingTop: 40,
  },
  // Main content area
  mainContent: {
    width: "70%",
    padding: 40,
    paddingTop: 50,
  },
  // Profile section in sidebar
  profileSection: {
    marginBottom: 40,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 14,
    color: MODERN_COLORS.accent,
    marginBottom: 20,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  // Contact info in sidebar
  contactSection: {
    marginBottom: 35,
  },
  contactTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: MODERN_COLORS.accent,
    marginBottom: 15,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  contactIcon: {
    width: 12,
    height: 12,
    marginRight: 8,
  },
  contactText: {
    fontSize: 9,
    color: "#E2E8F0",
    lineHeight: 1.3,
  },
  contactLink: {
    fontSize: 9,
    color: "#E2E8F0",
    textDecoration: "none",
  },
  // Skills in sidebar
  skillsSection: {
    marginBottom: 35,
  },
  skillsTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: MODERN_COLORS.accent,
    marginBottom: 15,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  skillCategory: {
    marginBottom: 15,
  },
  skillCategoryTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#CBD5E0",
    marginBottom: 6,
  },
  skillItem: {
    fontSize: 9,
    color: "#E2E8F0",
    marginBottom: 3,
    paddingLeft: 8,
  },
  // Languages in sidebar
  languagesSection: {
    marginBottom: 35,
  },
  languageItem: {
    fontSize: 9,
    color: "#E2E8F0",
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  languageName: {
    color: "#CBD5E0",
  },
  languageLevel: {
    color: MODERN_COLORS.accent,
  },
  // Main content sections
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: MODERN_COLORS.primary,
    marginBottom: 15,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: MODERN_COLORS.highlight,
    borderBottomStyle: "solid",
    position: "relative",
  },
  sectionTitleAccent: {
    position: "absolute",
    bottom: -2,
    left: 0,
    width: 40,
    height: 2,
    backgroundColor: MODERN_COLORS.accent,
  },
  // About section
  aboutText: {
    fontSize: 11,
    lineHeight: 1.6,
    color: MODERN_COLORS.text,
    textAlign: "justify",
  },
  // Experience items
  experienceItem: {
    marginBottom: 20,
  },
  experienceHeader: {
    marginBottom: 8,
  },
  companyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  company: {
    fontSize: 13,
    fontWeight: "bold",
    color: MODERN_COLORS.primary,
  },
  position: {
    fontSize: 11,
    color: MODERN_COLORS.accent,
    fontWeight: "600",
    marginTop: 2,
  },
  dateBadge: {
    backgroundColor: MODERN_COLORS.lightBg,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 3,
    fontSize: 8,
    color: MODERN_COLORS.primary,
    fontWeight: "bold",
  },
  description: {
    fontSize: 10,
    lineHeight: 1.5,
    color: MODERN_COLORS.text,
    marginTop: 6,
  },
  bulletList: {
    marginLeft: 15,
  },
  bulletItem: {
    fontSize: 10,
    lineHeight: 1.5,
    color: MODERN_COLORS.text,
    marginBottom: 4,
  },
  bullet: {
    fontSize: 10,
    marginRight: 5,
  },
  // Education items
  educationItem: {
    marginBottom: 15,
    padding: 12,
    backgroundColor: MODERN_COLORS.lightBg,
    borderRadius: 4,
  },
  educationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  educationTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: MODERN_COLORS.primary,
  },
  educationDate: {
    fontSize: 9,
    color: MODERN_COLORS.lightText,
    fontStyle: "italic",
  },
  educationDetails: {
    fontSize: 10,
    color: MODERN_COLORS.text,
    marginBottom: 3,
  },
  // Projects
  projectItem: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: MODERN_COLORS.lightBg,
    borderRadius: 6,
    borderLeftWidth: 4,
    borderLeftColor: MODERN_COLORS.accent,
    borderLeftStyle: "solid",
  },
  projectHeader: {
    marginBottom: 10,
  },
  projectTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: MODERN_COLORS.primary,
    marginBottom: 4,
  },
  projectRole: {
    fontSize: 11,
    color: MODERN_COLORS.accent,
    fontStyle: "italic",
    marginBottom: 4,
  },
  projectDate: {
    fontSize: 9,
    color: MODERN_COLORS.lightText,
    marginBottom: 8,
  },
  projectDescription: {
    fontSize: 10,
    color: MODERN_COLORS.text,
    lineHeight: 1.5,
    marginBottom: 10,
  },
  projectTech: {
    fontSize: 9,
    color: MODERN_COLORS.secondary,
    backgroundColor: "#E2E8F0",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 3,
    marginRight: 5,
    marginBottom: 5,
  },
  techContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  // Project images
  projectImagesContainer: {
    marginTop: 10,
  },
  projectImageRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 8,
  },
  projectImage: {
    height: 80,
    borderRadius: 4,
    objectFit: "contain",
    marginRight: 8,
    marginBottom: 8,
  },
  // Divider
  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 15,
  },
});
