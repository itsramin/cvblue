import { useData } from "@/store/store";
import {
  Document,
  Page,
  Text as PdfText,
  View,
  Font,
  Link,
  Image,
} from "@react-pdf/renderer";
import { MODERN_COLORS, modern_styles } from "./ModernStyle";

Font.register({
  family: "Arial",
  fonts: [
    {
      src: "/fonts/IRANSans.ttf",
      fontWeight: "normal",
    },
    {
      src: "/fonts/IRANSans_Bold.ttf",
      fontWeight: "bold",
    },
    {
      src: "/fonts/IRANSans.ttf",
      fontWeight: "normal",
      fontStyle: "italic",
    },
  ],
});

Font.registerHyphenationCallback((word) => [word]);

export default function ModernLayout() {
  const { personalInfo, experiences, educations, skills, languages, projects } =
    useData();

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

  const getLanguageLevelText = (level: number) => {
    switch (level) {
      case 1:
        return "Basic";
      case 2:
        return "Intermediate";
      case 3:
        return "Advanced";
      case 4:
        return "Native";
      case 5:
        return "Fluent";
      default:
        return "Basic";
    }
  };

  const renderBulletPoints = (text: string) => {
    if (!text) return null;
    const points = text.split("\n").filter((point) => point.trim());
    return (
      <View style={modern_styles.bulletList}>
        {points.map((point, index) => (
          <View key={index} style={{ flexDirection: "row", marginBottom: 4 }}>
            <PdfText style={modern_styles.bullet}>•</PdfText>
            <PdfText style={modern_styles.bulletItem}>{point.trim()}</PdfText>
          </View>
        ))}
      </View>
    );
  };

  // Group skills by category if they contain a colon (e.g., "Frontend: React, TypeScript")
  const groupedSkills = skills.reduce((acc, skill) => {
    if (skill.includes(":")) {
      const [category, skillList] = skill.split(":");
      if (!acc[category]) acc[category] = [];
      skillList.split(",").forEach((s) => acc[category].push(s.trim()));
    } else {
      if (!acc["Other"]) acc["Other"] = [];
      acc["Other"].push(skill);
    }
    return acc;
  }, {} as Record<string, string[]>);

  // Check if a string is a valid Base64 image
  const isValidBase64Image = (str: string): boolean => {
    if (!str) return false;
    // Check for common Base64 image prefixes
    return str.startsWith("data:image/") && str.includes("base64,");
  };

  return (
    <Document>
      <Page size="A4" style={modern_styles.page}>
        {/* Left Sidebar */}
        <View style={modern_styles.sidebar}>
          {/* Profile */}
          <View style={modern_styles.profileSection}>
            <PdfText style={modern_styles.name}>
              {personalInfo.name.toUpperCase() || "JOHN DOE"}
            </PdfText>
            <PdfText style={modern_styles.title}>
              {personalInfo.title || "Professional"}
            </PdfText>
          </View>

          {/* Contact */}
          <View style={modern_styles.contactSection}>
            <PdfText style={modern_styles.contactTitle}>Contact</PdfText>
            {personalInfo.email && (
              <View style={modern_styles.contactItem}>
                <PdfText style={modern_styles.contactText}>
                  {personalInfo.email}
                </PdfText>
              </View>
            )}
            {personalInfo.phone && (
              <View style={modern_styles.contactItem}>
                <PdfText style={modern_styles.contactText}>
                  {personalInfo.phone}
                </PdfText>
              </View>
            )}
            {personalInfo.location && (
              <View style={modern_styles.contactItem}>
                <PdfText style={modern_styles.contactText}>
                  {personalInfo.location}
                </PdfText>
              </View>
            )}
            {personalInfo.linkedin && (
              <View style={modern_styles.contactItem}>
                <Link
                  src={personalInfo.linkedin}
                  style={modern_styles.contactLink}
                >
                  LinkedIn
                </Link>
              </View>
            )}
            {personalInfo.links
              ?.filter((link) => link.url.trim())
              .map((link, index) => (
                <View key={index} style={modern_styles.contactItem}>
                  <Link src={link.url} style={modern_styles.contactLink}>
                    {link.title}
                  </Link>
                </View>
              ))}
          </View>

          {/* Skills */}
          {skills.length > 0 && (
            <View style={modern_styles.skillsSection}>
              <PdfText style={modern_styles.contactTitle}>Skills</PdfText>
              {Object.entries(groupedSkills).map(([category, skillList]) => (
                <View key={category} style={modern_styles.skillCategory}>
                  <PdfText style={modern_styles.skillCategoryTitle}>
                    {category}
                  </PdfText>
                  {skillList.map((skill, index) => (
                    <PdfText key={index} style={modern_styles.skillItem}>
                      • {skill}
                    </PdfText>
                  ))}
                </View>
              ))}
            </View>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <View style={modern_styles.languagesSection}>
              <PdfText style={modern_styles.contactTitle}>Languages</PdfText>
              {languages.map((language) => (
                <View key={language.id} style={modern_styles.languageItem}>
                  <PdfText style={modern_styles.languageName}>
                    {language.name}
                  </PdfText>
                  <PdfText style={modern_styles.languageLevel}>
                    {getLanguageLevelText(language.level)}
                  </PdfText>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Main Content */}
        <View style={modern_styles.mainContent}>
          {/* Professional Summary */}
          {personalInfo.aboutMe && (
            <View style={modern_styles.section}>
              <View style={modern_styles.sectionTitle}>
                <PdfText>Professional Profile</PdfText>
                <View style={modern_styles.sectionTitleAccent} />
              </View>
              <PdfText style={modern_styles.aboutText}>
                {personalInfo.aboutMe}
              </PdfText>
            </View>
          )}

          {/* Work Experience */}
          {experiences.length > 0 && (
            <View style={modern_styles.section}>
              <View style={modern_styles.sectionTitle}>
                <PdfText>Work Experience</PdfText>
                <View style={modern_styles.sectionTitleAccent} />
              </View>
              {experiences.map((experience) => (
                <View key={experience.id} style={modern_styles.experienceItem}>
                  <View style={modern_styles.experienceHeader}>
                    <View style={modern_styles.companyRow}>
                      <PdfText style={modern_styles.company}>
                        {experience.company}
                      </PdfText>
                      <PdfText style={modern_styles.dateBadge}>
                        {formatDate(experience.startDate)} -{" "}
                        {experience.current
                          ? "Present"
                          : formatDate(experience.endDate)}
                      </PdfText>
                    </View>
                    <PdfText style={modern_styles.position}>
                      {experience.position}
                    </PdfText>

                    {/* General Description (fallback) */}
                    {experience.description && (
                      <View style={{ marginTop: 8 }}>
                        <PdfText style={modern_styles.bulletItem}>
                          {experience.description}
                        </PdfText>
                      </View>
                    )}
                  </View>

                  {/* Key Responsibilities */}
                  {experience.responsibilities &&
                    experience.responsibilities.length > 0 && (
                      <View style={{ marginTop: 8 }}>
                        <PdfText
                          style={{
                            fontSize: 10,
                            fontWeight: "bold",
                            color: MODERN_COLORS.secondary,
                            marginBottom: 4,
                          }}
                        >
                          Key Responsibilities:
                        </PdfText>
                        <View style={modern_styles.bulletList}>
                          {experience.responsibilities.map((resp, index) => (
                            <View
                              key={index}
                              style={{ flexDirection: "row", marginBottom: 4 }}
                            >
                              <PdfText style={modern_styles.bullet}>•</PdfText>
                              <PdfText style={modern_styles.bulletItem}>
                                {resp}
                              </PdfText>
                            </View>
                          ))}
                        </View>
                      </View>
                    )}

                  {/* Achievements */}
                  {experience.achievements &&
                    experience.achievements.length > 0 && (
                      <View style={{ marginTop: 8 }}>
                        <PdfText
                          style={{
                            fontSize: 10,
                            fontWeight: "bold",
                            color: MODERN_COLORS.highlight,
                            marginBottom: 4,
                          }}
                        >
                          Key Achievements:
                        </PdfText>
                        <View style={modern_styles.bulletList}>
                          {experience.achievements.map((achievement, index) => (
                            <View
                              key={index}
                              style={{ flexDirection: "row", marginBottom: 4 }}
                            >
                              <PdfText style={modern_styles.bullet}>•</PdfText>
                              <PdfText style={modern_styles.bulletItem}>
                                {achievement}
                              </PdfText>
                            </View>
                          ))}
                        </View>
                      </View>
                    )}
                </View>
              ))}
            </View>
          )}

          {experiences.length > 0 &&
            (educations.length > 0 || projects.length > 0) && (
              <View style={modern_styles.divider} />
            )}

          {/* Education */}
          {educations.length > 0 && (
            <View style={modern_styles.section}>
              <View style={modern_styles.sectionTitle}>
                <PdfText>Education</PdfText>
                <View style={modern_styles.sectionTitleAccent} />
              </View>
              {educations.map((education) => (
                <View key={education.id} style={modern_styles.educationItem}>
                  <View style={modern_styles.educationHeader}>
                    <PdfText style={modern_styles.educationTitle}>
                      {education.degree} in {education.field}
                    </PdfText>
                    <PdfText style={modern_styles.educationDate}>
                      {formatDate(education.startDate)} -{" "}
                      {education.current
                        ? "Present"
                        : formatDate(education.endDate)}
                    </PdfText>
                  </View>
                  <PdfText style={modern_styles.educationDetails}>
                    {education.institution}
                  </PdfText>
                  {education.gpa && (
                    <PdfText style={modern_styles.educationDetails}>
                      GPA: {education.gpa}
                    </PdfText>
                  )}
                  {education.description && (
                    <PdfText style={modern_styles.educationDetails}>
                      {education.description}
                    </PdfText>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <View style={modern_styles.section}>
              <View style={modern_styles.sectionTitle}>
                <PdfText>Projects</PdfText>
                <View style={modern_styles.sectionTitleAccent} />
              </View>
              {projects.map((project) => (
                <View key={project.id} style={modern_styles.projectItem}>
                  <View style={modern_styles.projectHeader}>
                    <PdfText style={modern_styles.projectTitle}>
                      {project.name}
                    </PdfText>
                    {project.role && (
                      <PdfText style={modern_styles.projectRole}>
                        Role: {project.role}
                      </PdfText>
                    )}
                    {project.date && (
                      <PdfText style={modern_styles.projectDate}>
                        {formatDate(project.date)}
                      </PdfText>
                    )}
                  </View>

                  <PdfText style={modern_styles.projectDescription}>
                    {project.description}
                  </PdfText>

                  {project.technologies && project.technologies.length > 0 && (
                    <View style={modern_styles.techContainer}>
                      {project.technologies.map((tech, index) => (
                        <PdfText key={index} style={modern_styles.projectTech}>
                          {tech}
                        </PdfText>
                      ))}
                    </View>
                  )}

                  {/* Project Images */}
                  {project.images && project.images.length > 0 && (
                    <View style={modern_styles.projectImagesContainer}>
                      <PdfText
                        style={{
                          fontSize: 9,
                          color: MODERN_COLORS.lightText,
                          marginBottom: 5,
                        }}
                      >
                        Screenshots:
                      </PdfText>
                      <View style={modern_styles.projectImageRow}>
                        {project.images.map((image, index) => {
                          if (isValidBase64Image(image)) {
                            return (
                              <Image
                                key={index}
                                src={image}
                                style={modern_styles.projectImage}
                              />
                            );
                          }
                          return null;
                        })}
                      </View>
                    </View>
                  )}

                  {project.link && (
                    <View style={{ marginTop: 10 }}>
                      <Link
                        src={project.link}
                        style={{ fontSize: 9, color: MODERN_COLORS.accent }}
                      >
                        View Project
                      </Link>
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
}
