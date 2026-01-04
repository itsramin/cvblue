import { useData } from "@/store/store";
import { IStyleOptions } from "@/type/type";
import {
  Document,
  Page,
  Text as PdfText,
  View,
  StyleSheet,
  Font,
  Link,
} from "@react-pdf/renderer";

Font.register({
  family: "Arial",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/arial/v18/6acePwNk6EfR8jB9Jb1.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://fonts.gstatic.com/s/arial/v18/6ac-wkFm6QkJVQpQ.ttf",
      fontWeight: "bold",
    },
  ],
});

Font.registerHyphenationCallback((word) => [word]);

// Professional color scheme
const PROFESSIONAL_COLORS = {
  primary: "#2C3E50", // Dark blue
  secondary: "#7F8C8D", // Gray
  accent: "#3498DB", // Blue accent
  lightBg: "#F8F9FA", // Light background
  border: "#ECF0F1", // Border color
};

export default function CVPDFDocument({
  styleOptions,
}: {
  styleOptions: IStyleOptions;
}) {
  const { personalInfo, experiences } = useData();
  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      backgroundColor: "#FFFFFF",
      padding: 40,
      fontFamily: styleOptions.fontFamily || "Arial",
      fontSize: styleOptions.fontSize || 11,
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
      borderBottomColor: PROFESSIONAL_COLORS.primary,
      borderBottomStyle: "solid",
    },
    name: {
      fontSize: 28,
      fontWeight: "bold",
      color: PROFESSIONAL_COLORS.primary,
      marginBottom: 4,
    },
    title: {
      fontSize: 16,
      color: PROFESSIONAL_COLORS.accent,
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
      color: PROFESSIONAL_COLORS.secondary,
    },
    contactLink: {
      fontSize: 10,
      color: PROFESSIONAL_COLORS.accent,
      textDecoration: "none",
    },
    // Sections
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: "bold",
      color: PROFESSIONAL_COLORS.primary,
      marginBottom: 10,
      paddingBottom: 5,
      borderBottomWidth: 1,
      borderBottomColor: PROFESSIONAL_COLORS.border,
      borderBottomStyle: "solid",
      textTransform: "uppercase",
      letterSpacing: 1,
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
      color: PROFESSIONAL_COLORS.primary,
    },
    position: {
      fontSize: 11,
      color: PROFESSIONAL_COLORS.accent,
      fontWeight: "600",
    },
    dateRange: {
      fontSize: 10,
      color: PROFESSIONAL_COLORS.secondary,
      fontStyle: "italic",
    },
    description: {
      fontSize: 10,
      lineHeight: 1.4,
      color: "#444444",
      marginTop: 6,
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
      backgroundColor: PROFESSIONAL_COLORS.lightBg,
      color: PROFESSIONAL_COLORS.primary,
      marginBottom: 5,
      borderWidth: 1,
      borderColor: PROFESSIONAL_COLORS.border,
    },
    // Education Section
    educationItem: {
      marginBottom: 12,
    },
    educationTitle: {
      fontSize: 11,
      fontWeight: "bold",
      color: PROFESSIONAL_COLORS.primary,
      marginBottom: 2,
    },
    institution: {
      fontSize: 10,
      color: PROFESSIONAL_COLORS.accent,
      fontWeight: "600",
      marginBottom: 2,
    },
    educationDetails: {
      fontSize: 9,
      color: PROFESSIONAL_COLORS.secondary,
      fontStyle: "italic",
    },
    // Sidebar Section
    sidebarSection: {
      marginBottom: 20,
    },
    sidebarTitle: {
      fontSize: 12,
      fontWeight: "bold",
      color: PROFESSIONAL_COLORS.primary,
      marginBottom: 8,
      paddingBottom: 4,
      borderBottomWidth: 1,
      borderBottomColor: PROFESSIONAL_COLORS.border,
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
      backgroundColor: PROFESSIONAL_COLORS.border,
      marginVertical: 8,
    },
  });

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  // Split experiences into bullet points
  const renderDescription = (description: string) => {
    const points = description.split("\n").filter((point) => point.trim());
    return points.map((point, index) => (
      <PdfText key={index} style={styles.bulletPoint}>
        • {point.trim()}
      </PdfText>
    ));
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <PdfText style={styles.name}>
            {personalInfo.name || "Professional Name"}
          </PdfText>
          <PdfText style={styles.title}>
            {personalInfo.title || "Professional Title"}
          </PdfText>

          <View style={styles.contactInfo}>
            {personalInfo.email && (
              <View style={styles.contactItem}>
                <Link
                  src={`mailto:${personalInfo.email}`}
                  style={styles.contactLink}
                >
                  {personalInfo.email}
                </Link>
              </View>
            )}
            {personalInfo.phone && (
              <View style={styles.contactItem}>
                <PdfText style={styles.contactText}>
                  {personalInfo.phone}
                </PdfText>
              </View>
            )}
            {personalInfo.location && (
              <View style={styles.contactItem}>
                <PdfText style={styles.contactText}>
                  {personalInfo.location}
                </PdfText>
              </View>
            )}
            {personalInfo.linkedin && (
              <View style={styles.contactItem}>
                <Link src={personalInfo.linkedin} style={styles.contactLink}>
                  LinkedIn
                </Link>
              </View>
            )}
            {personalInfo.portfolio && (
              <View style={styles.contactItem}>
                <Link src={personalInfo.portfolio} style={styles.contactLink}>
                  Portfolio
                </Link>
              </View>
            )}
          </View>
        </View>

        {/* Two-column layout */}
        <View style={styles.twoColumn}>
          {/* Left Column - Main Content */}
          <View style={styles.leftColumn}>
            {/* About Me Section */}
            {personalInfo.aboutMe && (
              <View style={styles.section}>
                <PdfText style={styles.sectionTitle}>
                  Professional Summary
                </PdfText>
                <PdfText style={styles.aboutText}>
                  {personalInfo.aboutMe}
                </PdfText>
              </View>
            )}

            {/* Experience Section */}
            {experiences.length > 0 && (
              <View style={styles.section}>
                <PdfText style={styles.sectionTitle}>
                  Professional Experience
                </PdfText>
                {experiences.map((experience) => (
                  <View key={experience.id} style={styles.experienceItem}>
                    <View style={styles.experienceHeader}>
                      <View style={styles.companyPosition}>
                        <PdfText style={styles.company}>
                          {experience.company}
                        </PdfText>
                        <PdfText style={styles.position}>
                          {experience.position}
                        </PdfText>
                      </View>
                      <PdfText style={styles.dateRange}>
                        {formatDate(experience.startDate)} -{" "}
                        {experience.current
                          ? "Present"
                          : formatDate(experience.endDate)}
                      </PdfText>
                    </View>
                    {experience.description && (
                      <View>{renderDescription(experience.description)}</View>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Right Column - Sidebar */}
          <View style={styles.rightColumn}>
            {/* Skills Section */}
            <View style={styles.sidebarSection}>
              <PdfText style={styles.sidebarTitle}>Core Competencies</PdfText>
              <View style={styles.skillsContainer}>
                <PdfText style={styles.skillTag}>React</PdfText>
                <PdfText style={styles.skillTag}>TypeScript</PdfText>
                <PdfText style={styles.skillTag}>JavaScript</PdfText>
                <PdfText style={styles.skillTag}>Node.js</PdfText>
                <PdfText style={styles.skillTag}>Next.js</PdfText>
                <PdfText style={styles.skillTag}>HTML/CSS</PdfText>
                <PdfText style={styles.skillTag}>Git</PdfText>
                <PdfText style={styles.skillTag}>AWS</PdfText>
                <PdfText style={styles.skillTag}>MongoDB</PdfText>
                <PdfText style={styles.skillTag}>REST APIs</PdfText>
                <PdfText style={styles.skillTag}>Agile/Scrum</PdfText>
                <PdfText style={styles.skillTag}>UI/UX Design</PdfText>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Education Section */}
            <View style={styles.sidebarSection}>
              <PdfText style={styles.sidebarTitle}>Education</PdfText>
              <View style={styles.educationItem}>
                <PdfText style={styles.educationTitle}>
                  Bachelor of Science in Computer Science
                </PdfText>
                <PdfText style={styles.institution}>
                  University of Technology
                </PdfText>
                <PdfText style={styles.educationDetails}>
                  2018 - 2022 | GPA: 3.8/4.0
                </PdfText>
              </View>
              <View style={styles.educationItem}>
                <PdfText style={styles.educationTitle}>
                  Full Stack Web Development
                </PdfText>
                <PdfText style={styles.institution}>Tech Bootcamp</PdfText>
                <PdfText style={styles.educationDetails}>
                  2022 | Certification
                </PdfText>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Languages Section */}
            <View style={styles.sidebarSection}>
              <PdfText style={styles.sidebarTitle}>Languages</PdfText>
              <PdfText style={styles.sidebarItem}>• English (Fluent)</PdfText>
              <PdfText style={styles.sidebarItem}>
                • Spanish (Intermediate)
              </PdfText>
            </View>

            <View style={styles.divider} />

            {/* Certifications Section */}
            <View style={styles.sidebarSection}>
              <PdfText style={styles.sidebarTitle}>Certifications</PdfText>
              <PdfText style={styles.sidebarItem}>
                • AWS Certified Developer
              </PdfText>
              <PdfText style={styles.sidebarItem}>
                • React Advanced Certification
              </PdfText>
              <PdfText style={styles.sidebarItem}>
                • Scrum Master Certified
              </PdfText>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
