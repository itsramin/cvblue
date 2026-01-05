import { StyleSheet } from "@react-pdf/renderer";

export const CLASSIC_COLORS = {
  primary: "#2C3E50", // Dark blue
  secondary: "#7F8C8D", // Gray
  accent: "#3498DB", // Blue accent
  lightBg: "#F8F9FA", // Light background
  border: "#ECF0F1", // Border color
  projectBg: "#F5F7FA", // Project background
  technologyBg: "#E8F4FC", // Technology tag background
};

export const classic_styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 40,
    fontFamily: "Arial",
    fontSize: 11,
    color: "#333333",
  },
  // Two-column layout
  twoColumn: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  leftColumn: {
    width: "65%",
    paddingRight: 20,
  },
  rightColumn: {
    width: "35%",
  },
  // Header Section
  header: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: CLASSIC_COLORS.primary,
    borderBottomStyle: "solid",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: CLASSIC_COLORS.primary,
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    color: CLASSIC_COLORS.accent,
    marginBottom: 12,
    fontWeight: "600",
  },
  contactInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    marginTop: 5,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  contactText: {
    fontSize: 10,
    color: CLASSIC_COLORS.secondary,
  },
  contactLink: {
    fontSize: 10,
    color: CLASSIC_COLORS.accent,
    textDecoration: "none",
  },
  // Sections
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: CLASSIC_COLORS.primary,
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: CLASSIC_COLORS.border,
    borderBottomStyle: "solid",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  // Subsection titles
  subsectionTitle: {
    fontSize: 11,
    fontWeight: "600",
    color: CLASSIC_COLORS.primary,
    marginTop: 6,
    marginBottom: 4,
  },
  // About Section
  aboutText: {
    fontSize: 11,
    lineHeight: 1.5,
    textAlign: "justify",
    color: "#444444",
  },
  // Experience Section
  experienceItem: {
    marginBottom: 16,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  companyPosition: {
    flex: 1,
  },
  company: {
    fontSize: 13,
    fontWeight: "bold",
    color: CLASSIC_COLORS.primary,
  },
  position: {
    fontSize: 11,
    color: CLASSIC_COLORS.accent,
    fontWeight: "600",
  },
  dateRange: {
    fontSize: 10,
    color: CLASSIC_COLORS.secondary,
    fontStyle: "italic",
  },
  description: {
    fontSize: 10,
    lineHeight: 1.4,
    color: "#444444",
    marginTop: 6,
  },
  responsibilities: {
    marginTop: 4,
  },
  achievements: {
    marginTop: 4,
  },
  bulletPoint: {
    fontSize: 10,
    lineHeight: 1.4,
    color: "#444444",
    marginLeft: 10,
    marginTop: 2,
  },
  // Skills Section
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  skillTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 3,
    fontSize: 9,
    backgroundColor: CLASSIC_COLORS.lightBg,
    color: CLASSIC_COLORS.primary,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: CLASSIC_COLORS.border,
  },
  // Education Section
  educationItem: {
    marginBottom: 12,
  },
  educationTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: CLASSIC_COLORS.primary,
    marginBottom: 2,
  },
  institution: {
    fontSize: 10,
    color: CLASSIC_COLORS.accent,
    fontWeight: "600",
    marginBottom: 2,
  },
  educationDetails: {
    fontSize: 9,
    color: CLASSIC_COLORS.secondary,
    fontStyle: "italic",
    marginBottom: 3,
  },
  educationDescription: {
    fontSize: 9,
    color: "#444444",
    lineHeight: 1.3,
  },
  // Projects Section
  projectItem: {
    marginBottom: 16,
    padding: 10,
    backgroundColor: CLASSIC_COLORS.projectBg,
    borderRadius: 5,
  },
  projectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  projectTitleContainer: {
    flex: 1,
  },
  projectName: {
    fontSize: 12,
    fontWeight: "bold",
    color: CLASSIC_COLORS.primary,
  },
  projectRole: {
    fontSize: 10,
    color: CLASSIC_COLORS.accent,
    fontStyle: "italic",
    marginTop: 2,
  },
  projectDate: {
    fontSize: 9,
    color: CLASSIC_COLORS.secondary,
    fontStyle: "italic",
  },
  projectDescription: {
    fontSize: 10,
    lineHeight: 1.4,
    color: "#444444",
    marginBottom: 8,
  },
  technologiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    marginBottom: 8,
  },
  technologyTag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
    fontSize: 8,
    backgroundColor: CLASSIC_COLORS.technologyBg,
    color: CLASSIC_COLORS.accent,
  },
  projectImagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    marginBottom: 8,
  },
  projectImage: {
    height: 80,
    borderRadius: 3,
    objectFit: "contain",
  },
  projectLink: {
    fontSize: 9,
    color: CLASSIC_COLORS.accent,
    textDecoration: "none",
  },
  // Sidebar Section
  sidebarSection: {
    marginBottom: 20,
  },
  sidebarTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: CLASSIC_COLORS.primary,
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: CLASSIC_COLORS.border,
    borderBottomStyle: "solid",
  },
  sidebarItem: {
    fontSize: 10,
    marginBottom: 4,
    color: "#444444",
    lineHeight: 1.4,
  },
  // Divider
  divider: {
    height: 1,
    backgroundColor: CLASSIC_COLORS.border,
    marginVertical: 8,
  },
});
