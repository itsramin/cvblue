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
    {
      src: "https://fonts.gstatic.com/s/arial/v18/6acePwNk6EfR8jB9Jb1.ttf",
      fontWeight: "light",
      fontStyle: "italic",
    },
  ],
});

Font.registerHyphenationCallback((word) => [word]);

// Modern color scheme
const MODERN_COLORS = {
  primary: "#1A365D", // Deep navy
  secondary: "#2D3748", // Dark gray
  accent: "#3182CE", // Bright blue
  highlight: "#ED8936", // Orange accent
  lightBg: "#F7FAFC", // Very light blue-gray
  text: "#4A5568", // Gray text
  lightText: "#718096", // Lighter gray
};

export default function ModernLayout({
  styleOptions,
}: {
  styleOptions: IStyleOptions;
}) {
  const { personalInfo, experiences } = useData();
  const styles = StyleSheet.create({
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
    // Projects/Certifications
    projectItem: {
      marginBottom: 12,
      paddingLeft: 10,
      borderLeftWidth: 2,
      borderLeftColor: MODERN_COLORS.accent,
      borderLeftStyle: "solid",
    },
    projectTitle: {
      fontSize: 11,
      fontWeight: "bold",
      color: MODERN_COLORS.primary,
      marginBottom: 2,
    },
    projectDescription: {
      fontSize: 9,
      color: MODERN_COLORS.text,
      lineHeight: 1.4,
    },
    // Divider
    divider: {
      height: 1,
      backgroundColor: "#E2E8F0",
      marginVertical: 15,
    },
    // Quote or highlight
    highlightQuote: {
      padding: 15,
      backgroundColor: MODERN_COLORS.lightBg,
      borderLeftWidth: 4,
      borderLeftColor: MODERN_COLORS.highlight,
      borderLeftStyle: "solid",
      marginBottom: 20,
    },
    quoteText: {
      fontSize: 10,
      fontStyle: "italic",
      color: MODERN_COLORS.primary,
      lineHeight: 1.6,
    },
  });

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const renderBulletPoints = (text: string) => {
    if (!text) return null;
    const points = text.split("\n").filter((point) => point.trim());
    return (
      <View style={styles.bulletList}>
        {points.map((point, index) => (
          <View key={index} style={{ flexDirection: "row", marginBottom: 4 }}>
            <PdfText style={styles.bullet}>•</PdfText>
            <PdfText style={styles.bulletItem}>{point.trim()}</PdfText>
          </View>
        ))}
      </View>
    );
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Left Sidebar */}
        <View style={styles.sidebar}>
          {/* Profile */}
          <View style={styles.profileSection}>
            <PdfText style={styles.name}>
              {personalInfo.name.toUpperCase() || "JOHN DOE"}
            </PdfText>
            <PdfText style={styles.title}>
              {personalInfo.title || "Senior Software Engineer"}
            </PdfText>
          </View>

          {/* Contact */}
          <View style={styles.contactSection}>
            <PdfText style={styles.contactTitle}>Contact</PdfText>
            {personalInfo.email && (
              <View style={styles.contactItem}>
                <PdfText style={styles.contactText}>
                  {personalInfo.email}
                </PdfText>
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
                  linkedin.com/in/username
                </Link>
              </View>
            )}
            {personalInfo.portfolio && (
              <View style={styles.contactItem}>
                <Link src={personalInfo.portfolio} style={styles.contactLink}>
                  portfolio-website.com
                </Link>
              </View>
            )}
          </View>

          {/* Skills */}
          <View style={styles.skillsSection}>
            <PdfText style={styles.contactTitle}>Technical Skills</PdfText>
            <View style={styles.skillCategory}>
              <PdfText style={styles.skillCategoryTitle}>Frontend</PdfText>
              <PdfText style={styles.skillItem}>• React & Next.js</PdfText>
              <PdfText style={styles.skillItem}>
                • TypeScript/JavaScript
              </PdfText>
              <PdfText style={styles.skillItem}>• HTML5/CSS3/SASS</PdfText>
              <PdfText style={styles.skillItem}>• Redux & Context API</PdfText>
            </View>
            <View style={styles.skillCategory}>
              <PdfText style={styles.skillCategoryTitle}>Backend</PdfText>
              <PdfText style={styles.skillItem}>• Node.js & Express</PdfText>
              <PdfText style={styles.skillItem}>• REST & GraphQL APIs</PdfText>
              <PdfText style={styles.skillItem}>• MongoDB & PostgreSQL</PdfText>
              <PdfText style={styles.skillItem}>• AWS & Docker</PdfText>
            </View>
            <View style={styles.skillCategory}>
              <PdfText style={styles.skillCategoryTitle}>Tools</PdfText>
              <PdfText style={styles.skillItem}>• Git & GitHub</PdfText>
              <PdfText style={styles.skillItem}>• Jest & Cypress</PdfText>
              <PdfText style={styles.skillItem}>• Webpack & Vite</PdfText>
              <PdfText style={styles.skillItem}>• Agile & Jira</PdfText>
            </View>
          </View>

          {/* Languages */}
          <View style={styles.languagesSection}>
            <PdfText style={styles.contactTitle}>Languages</PdfText>
            <View style={styles.languageItem}>
              <PdfText style={styles.languageName}>English</PdfText>
              <PdfText style={styles.languageLevel}>Native</PdfText>
            </View>
            <View style={styles.languageItem}>
              <PdfText style={styles.languageName}>Spanish</PdfText>
              <PdfText style={styles.languageLevel}>Professional</PdfText>
            </View>
            <View style={styles.languageItem}>
              <PdfText style={styles.languageName}>French</PdfText>
              <PdfText style={styles.languageLevel}>Intermediate</PdfText>
            </View>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Professional Summary */}
          {personalInfo.aboutMe && (
            <View style={styles.section}>
              <View style={styles.sectionTitle}>
                <PdfText>Professional Profile</PdfText>
                <View style={styles.sectionTitleAccent} />
              </View>
              <PdfText style={styles.aboutText}>{personalInfo.aboutMe}</PdfText>
            </View>
          )}

          {/* Highlight Quote */}
          <View style={styles.highlightQuote}>
            <PdfText style={styles.quoteText}>
              "Passionate about creating efficient, scalable solutions with
              clean code. Over 5 years of experience delivering high-impact web
              applications."
            </PdfText>
          </View>

          {/* Work Experience */}
          {experiences.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionTitle}>
                <PdfText>Work Experience</PdfText>
                <View style={styles.sectionTitleAccent} />
              </View>
              {experiences.map((experience) => (
                <View key={experience.id} style={styles.experienceItem}>
                  <View style={styles.experienceHeader}>
                    <View style={styles.companyRow}>
                      <PdfText style={styles.company}>
                        {experience.company}
                      </PdfText>
                      <PdfText style={styles.dateBadge}>
                        {formatDate(experience.startDate)} -{" "}
                        {experience.current
                          ? "Present"
                          : formatDate(experience.endDate)}
                      </PdfText>
                    </View>
                    <PdfText style={styles.position}>
                      {experience.position}
                    </PdfText>
                  </View>
                  {experience.description && (
                    <View>{renderBulletPoints(experience.description)}</View>
                  )}
                </View>
              ))}
            </View>
          )}

          <View style={styles.divider} />

          {/* Education */}
          <View style={styles.section}>
            <View style={styles.sectionTitle}>
              <PdfText>Education & Certification</PdfText>
              <View style={styles.sectionTitleAccent} />
            </View>
            <View style={styles.educationItem}>
              <View style={styles.educationHeader}>
                <PdfText style={styles.educationTitle}>
                  MSc Computer Science
                </PdfText>
                <PdfText style={styles.educationDate}>2020 - 2022</PdfText>
              </View>
              <PdfText style={styles.educationDetails}>
                Stanford University
              </PdfText>
              <PdfText style={styles.educationDetails}>
                GPA: 3.9/4.0 | Specialization in AI
              </PdfText>
            </View>
            <View style={styles.educationItem}>
              <View style={styles.educationHeader}>
                <PdfText style={styles.educationTitle}>
                  AWS Certified Solutions Architect
                </PdfText>
                <PdfText style={styles.educationDate}>2023</PdfText>
              </View>
              <PdfText style={styles.educationDetails}>
                Amazon Web Services
              </PdfText>
            </View>
          </View>

          {/* Key Projects */}
          <View style={styles.section}>
            <View style={styles.sectionTitle}>
              <PdfText>Notable Projects</PdfText>
              <View style={styles.sectionTitleAccent} />
            </View>
            <View style={styles.projectItem}>
              <PdfText style={styles.projectTitle}>
                E-commerce Platform Migration
              </PdfText>
              <PdfText style={styles.projectDescription}>
                Led migration of legacy system to modern React/Node.js stack,
                improving performance by 300% and reducing server costs by 40%.
              </PdfText>
            </View>
            <View style={styles.projectItem}>
              <PdfText style={styles.projectTitle}>
                Real-time Analytics Dashboard
              </PdfText>
              <PdfText style={styles.projectDescription}>
                Built dashboard processing 1M+ daily events with WebSocket
                connections and D3.js visualizations.
              </PdfText>
            </View>
            <View style={styles.projectItem}>
              <PdfText style={styles.projectTitle}>Mobile Banking App</PdfText>
              <PdfText style={styles.projectDescription}>
                Developed React Native application serving 50K+ users with 99.9%
                uptime and secure transaction processing.
              </PdfText>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
