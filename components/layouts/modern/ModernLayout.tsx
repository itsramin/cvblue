import { useData } from "@/store/store";
import {
  Document,
  Page,
  Text as PdfText,
  View,
  Link,
  Image,
} from "@react-pdf/renderer";
import { createModernStyles } from "./ModernStyle";
import { IColors } from "@/type/type";

export default function ModernLayout({ colors }: { colors: IColors }) {
  const { personalInfo, experiences, educations, skills, languages, projects } =
    useData();

  const moderStyle = createModernStyles(colors);

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

  // Check if a string is a valid Base64 image
  const isValidBase64Image = (str: string): boolean => {
    if (!str) return false;
    // Check for common Base64 image prefixes
    return str.startsWith("data:image/") && str.includes("base64,");
  };

  return (
    <Document>
      <Page size="A4" style={moderStyle.page}>
        {/* Left Sidebar */}
        <View style={moderStyle.sidebar}>
          {/* Profile */}
          <View style={moderStyle.profileSection}>
            <PdfText style={moderStyle.name}>
              {personalInfo.name.toUpperCase() || "JOHN DOE"}
            </PdfText>
            <PdfText style={moderStyle.title}>
              {personalInfo.title || "Professional"}
            </PdfText>
          </View>

          {/* Contact */}
          <View style={moderStyle.contactSection}>
            <PdfText style={moderStyle.contactTitle}>Contact</PdfText>
            {personalInfo.email && (
              <View style={moderStyle.contactItem}>
                <PdfText style={moderStyle.contactText}>
                  {personalInfo.email}
                </PdfText>
              </View>
            )}
            {personalInfo.phone && (
              <View style={moderStyle.contactItem}>
                <PdfText style={moderStyle.contactText}>
                  {personalInfo.phone}
                </PdfText>
              </View>
            )}
            {personalInfo.location && (
              <View style={moderStyle.contactItem}>
                <PdfText style={moderStyle.contactText}>
                  {personalInfo.location}
                </PdfText>
              </View>
            )}
            {personalInfo.linkedin && (
              <View style={moderStyle.contactItem}>
                <Link
                  src={personalInfo.linkedin}
                  style={moderStyle.contactLink}
                >
                  LinkedIn
                </Link>
              </View>
            )}
            {personalInfo.links
              ?.filter((link) => link.url.trim())
              .map((link, index) => (
                <View key={index} style={moderStyle.contactItem}>
                  <Link src={link.url} style={moderStyle.contactLink}>
                    {link.title}
                  </Link>
                </View>
              ))}
          </View>

          {/* Skills */}
          {skills.length > 0 && (
            <View style={moderStyle.skillsSection}>
              <PdfText style={moderStyle.contactTitle}>Skills</PdfText>

              {skills.map((skill, index) => (
                <PdfText key={index} style={moderStyle.skillItem}>
                  • {skill}
                </PdfText>
              ))}
            </View>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <View style={moderStyle.languagesSection}>
              <PdfText style={moderStyle.contactTitle}>Languages</PdfText>
              {languages.map((language) => (
                <View key={language.id} style={moderStyle.languageItem}>
                  <PdfText style={moderStyle.languageName}>
                    {language.name}
                  </PdfText>
                  <PdfText style={moderStyle.languageLevel}>
                    {language.levelLabel}
                  </PdfText>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Main Content */}
        <View style={moderStyle.mainContent}>
          {/* Professional Summary */}
          {personalInfo.aboutMe && (
            <View style={moderStyle.section}>
              <View style={moderStyle.sectionTitle}>
                <PdfText>Professional Profile</PdfText>
                <View style={moderStyle.sectionTitleAccent} />
              </View>
              <PdfText style={moderStyle.aboutText}>
                {personalInfo.aboutMe}
              </PdfText>
            </View>
          )}

          {/* Work Experience */}
          {experiences.length > 0 && (
            <View style={moderStyle.section}>
              <View style={moderStyle.sectionTitle}>
                <PdfText>Work Experience</PdfText>
                <View style={moderStyle.sectionTitleAccent} />
              </View>
              {experiences.map((experience) => (
                <View key={experience.id} style={moderStyle.experienceItem}>
                  <View style={moderStyle.experienceHeader}>
                    <View style={moderStyle.companyRow}>
                      <PdfText style={moderStyle.company}>
                        {experience.company}
                      </PdfText>
                      <PdfText style={moderStyle.dateBadge}>
                        {formatDate(experience.startDate)} -{" "}
                        {experience.current
                          ? "Present"
                          : formatDate(experience.endDate)}
                      </PdfText>
                    </View>
                    <PdfText style={moderStyle.position}>
                      {experience.position}
                    </PdfText>

                    {/* General Description */}
                    {experience.description && (
                      <View style={{ marginTop: 8 }} wrap={false}>
                        <PdfText style={moderStyle.bulletItem}>
                          {experience.description}
                        </PdfText>
                      </View>
                    )}
                  </View>

                  {/* Key Responsibilities */}
                  {experience.responsibilities &&
                    experience.responsibilities.length > 0 && (
                      <View style={{ marginTop: 8 }} wrap={false}>
                        <PdfText
                          style={{
                            fontSize: 10,
                            fontWeight: "bold",
                            color: colors.secondary,
                            marginBottom: 4,
                          }}
                        >
                          Key Responsibilities:
                        </PdfText>
                        <View style={moderStyle.bulletList}>
                          {experience.responsibilities.map((resp, index) => (
                            <View
                              key={index}
                              style={{ flexDirection: "row", marginBottom: 4 }}
                            >
                              <PdfText style={moderStyle.bullet}>•</PdfText>
                              <PdfText style={moderStyle.bulletItem}>
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
                      <View style={{ marginTop: 8 }} wrap={false}>
                        <PdfText
                          style={{
                            fontSize: 10,
                            fontWeight: "bold",
                            color: colors.secondary,
                            marginBottom: 4,
                          }}
                        >
                          Key Achievements:
                        </PdfText>
                        <View style={moderStyle.bulletList}>
                          {experience.achievements.map((achievement, index) => (
                            <View
                              key={index}
                              style={{ flexDirection: "row", marginBottom: 4 }}
                            >
                              <PdfText style={moderStyle.bullet}>•</PdfText>
                              <PdfText style={moderStyle.bulletItem}>
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

          {/* Education */}
          {educations.length > 0 && (
            <View style={moderStyle.section}>
              <View style={moderStyle.sectionTitle}>
                <PdfText>Education</PdfText>
                <View style={moderStyle.sectionTitleAccent} />
              </View>
              {educations.map((education) => (
                <View key={education.id} style={moderStyle.educationItem}>
                  <PdfText style={moderStyle.educationTitle}>
                    {education.degree} in {education.field}
                  </PdfText>

                  <PdfText style={moderStyle.educationDetails}>
                    {education.institution}
                  </PdfText>
                  <View style={moderStyle.educationHeader}>
                    <PdfText style={moderStyle.educationDate}>
                      {formatDate(education.startDate)} -{" "}
                      {education.current
                        ? "Present"
                        : formatDate(education.endDate)}
                    </PdfText>
                    {education.gpa && (
                      <PdfText style={moderStyle.educationDetails}>
                        GPA: {education.gpa}
                      </PdfText>
                    )}
                  </View>

                  {education.description && (
                    <PdfText style={moderStyle.educationDetails}>
                      {education.description}
                    </PdfText>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <View style={moderStyle.section}>
              <View style={moderStyle.sectionTitle}>
                <PdfText>Projects</PdfText>
                <View style={moderStyle.sectionTitleAccent} />
              </View>
              {projects.map((project) => (
                <View key={project.id} style={moderStyle.projectItem}>
                  <View style={moderStyle.projectHeader}>
                    <PdfText style={moderStyle.projectTitle}>
                      {project.name}
                    </PdfText>
                    {project.role && (
                      <PdfText style={moderStyle.projectRole}>
                        Role: {project.role}
                      </PdfText>
                    )}
                    {project.date && (
                      <PdfText style={moderStyle.projectDate}>
                        {formatDate(project.date)}
                      </PdfText>
                    )}
                  </View>

                  <PdfText style={moderStyle.projectDescription}>
                    {project.description}
                  </PdfText>

                  {project.technologies && project.technologies.length > 0 && (
                    <View style={moderStyle.techContainer}>
                      {project.technologies.map((tech, index) => (
                        <PdfText key={index} style={moderStyle.projectTech}>
                          {tech}
                        </PdfText>
                      ))}
                    </View>
                  )}

                  {/* Project Images */}
                  {project.images && project.images.length > 0 && (
                    <View style={moderStyle.projectImagesContainer}>
                      <PdfText
                        style={{
                          fontSize: 9,
                          color: colors.secondary,
                          marginBottom: 5,
                        }}
                      >
                        Screenshots:
                      </PdfText>
                      <View style={moderStyle.projectImageRow}>
                        {project.images.map((image, index) => {
                          if (isValidBase64Image(image)) {
                            return (
                              <Image
                                key={index}
                                src={image}
                                style={moderStyle.projectImage}
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
                        style={{ fontSize: 9, color: colors.accent }}
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
