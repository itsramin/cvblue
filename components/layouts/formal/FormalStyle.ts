import { StyleSheet, Font } from "@react-pdf/renderer";

Font.register({
  family: "Montserrat",
  fonts: [
    {
      src: "/fonts/Montserrat-Regular.ttf",
      fontWeight: "normal",
    },
    {
      src: "/fonts/Montserrat-Bold.ttf",
      fontWeight: "bold",
    },
    {
      src: "/fonts/Montserrat-Italic.ttf",
      fontWeight: "normal",
      fontStyle: "italic",
    },
    {
      src: "/fonts/Montserrat-Black.ttf",
      fontWeight: "heavy",
    },
    {
      src: "/fonts/Montserrat-SemiBold.ttf",
      fontWeight: "semibold",
    },
    {
      src: "/fonts/Montserrat-Light.ttf",
      fontWeight: "light",
    },
  ],
});

Font.registerHyphenationCallback((word) => [word]);

export const createFormalStyles = (colors?: {
  primary: string;
  secondary: string;
  accent: string;
  border: string;
}) => {
  const customColors = {
    primary: colors?.primary,
    secondary: colors?.secondary,
    accent: colors?.accent,
    lightBg: `${colors?.primary}10`,
    border: colors?.border,
  };

  return StyleSheet.create({
    // Page
    page: {
      flexDirection: "column",
      backgroundColor: "#FFFFFF",
      padding: 40,
      fontFamily: "Montserrat",
      fontSize: 10,
      color: "#2D3748",
      lineHeight: 1.4,
    },

    // Main Layout
    mainColumn: {
      width: "100%",
    },

    // Header Section
    header: {
      marginBottom: 20,
      paddingBottom: 15,
      borderBottomWidth: 2,
      borderBottomColor: customColors.primary,
      borderBottomStyle: "solid",
      textAlign: "center",
    },
    name: {
      fontSize: 22,
      fontWeight: "bold",
      color: customColors.primary,
      marginBottom: 4,
      letterSpacing: 0.5,
    },
    title: {
      fontSize: 13,
      color: customColors.accent,
      marginTop: 8,
      marginBottom: 12,
      fontWeight: "600",
    },
    contactInfo: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 10,
      marginTop: 8,
    },
    contactItem: {
      flexDirection: "row",
      alignItems: "center",
    },
    contactText: {
      fontSize: 9,
      color: customColors.secondary,
    },
    contactLink: {
      fontSize: 9,
      color: customColors.accent,
      textDecoration: "none",
    },

    // Common Sections
    section: {
      marginBottom: 18,
    },
    sectionTitle: {
      fontSize: 12,
      fontWeight: "bold",
      color: customColors.primary,
      marginBottom: 10,
      paddingBottom: 4,
      borderBottomWidth: 1,
      borderBottomColor: customColors.border,
      borderBottomStyle: "solid",
      letterSpacing: 0.5,
    },
    subsectionTitle: {
      fontSize: 10,
      fontWeight: "600",
      color: customColors.primary,
      marginTop: 8,
      marginBottom: 4,
    },

    // About Section
    aboutText: {
      fontSize: 10,
      lineHeight: 1.5,
      textAlign: "justify",
      color: "#4A5568",
    },

    // Skills Section
    skillsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 6,
      marginTop: 4,
    },
    skillTag: {
      padding: 6,
      paddingBottom: 1,
      borderRadius: 4,
      fontSize: 8,
      backgroundColor: customColors.lightBg,
      color: customColors.primary,
      marginBottom: 5,
    },

    // Experience Section
    experienceItem: {
      marginBottom: 16,
      paddingLeft: 4,
    },
    experienceHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 6,
    },
    companyPosition: {
      flex: 1,
    },
    company: {
      fontSize: 11,
      fontWeight: "bold",
      color: customColors.primary,
    },
    position: {
      fontSize: 10,
      color: customColors.accent,
      fontWeight: "600",
    },
    dateRange: {
      fontSize: 9,
      color: customColors.secondary,
      fontStyle: "italic",
    },
    description: {
      marginTop: 6,
    },
    responsibilities: {
      marginTop: 6,
    },
    achievements: {
      marginTop: 6,
    },
    bulletPoint: {
      fontSize: 9,
      lineHeight: 1.4,
      color: "#4A5568",
      marginLeft: 10,
      marginTop: 2,
    },

    // Projects Section
    projectItem: {
      marginBottom: 16,
      padding: 12,
      backgroundColor: customColors.lightBg,
      borderRadius: 6,
    },
    projectHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: 8,
    },
    projectTitleContainer: {
      flex: 1,
    },
    projectName: {
      fontSize: 11,
      fontWeight: "bold",
      color: customColors.primary,
    },
    projectRole: {
      fontSize: 9,
      color: customColors.accent,
      fontStyle: "italic",
      marginTop: 2,
    },
    projectDate: {
      fontSize: 8,
      color: customColors.secondary,
      fontStyle: "italic",
    },
    projectDescription: {
      fontSize: 9,
      lineHeight: 1.4,
      color: "#4A5568",
      marginBottom: 8,
    },
    technologiesContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 5,
      marginBottom: 8,
    },
    technologyTag: {
      paddingHorizontal: 6,
      paddingTop: 6,
      paddingBottom: 1,
      borderRadius: 3,
      fontSize: 7,
      backgroundColor: customColors.lightBg,
      color: customColors.accent,
    },
    projectImagesContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 6,
      marginBottom: 8,
    },
    projectImage: {
      height: 70,
      borderRadius: 4,
      objectFit: "contain",
      borderWidth: 1,
      borderColor: customColors.border,
    },
    projectLink: {
      fontSize: 8,
      color: customColors.accent,
      textDecoration: "none",
      fontWeight: "500",
    },

    // Education Section
    educationItem: {
      marginBottom: 12,
      paddingLeft: 4,
    },
    educationTitle: {
      fontSize: 10,
      fontWeight: "bold",
      color: customColors.primary,
      marginBottom: 2,
    },
    institution: {
      fontSize: 9,
      color: customColors.accent,
      fontWeight: "600",
      marginBottom: 2,
    },
    educationDetails: {
      fontSize: 8,
      color: customColors.secondary,
      fontStyle: "italic",
      marginBottom: 4,
    },
    educationDescription: {
      fontSize: 8,
      color: "#4A5568",
      lineHeight: 1.3,
    },

    // Languages Section
    languageItem: {
      fontSize: 9,
      marginBottom: 3,
      color: "#4A5568",
      paddingLeft: 4,
    },

    // Utility
    divider: {
      height: 1,
      backgroundColor: customColors.border,
      marginVertical: 12,
    },
    compactSection: {
      marginBottom: 14,
    },
  });
};
