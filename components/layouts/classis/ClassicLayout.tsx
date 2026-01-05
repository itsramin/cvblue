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
import { classic_styles } from "./ClassisStyle";

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

export default function ClassicLayout() {
  const { personalInfo, experiences, educations, skills, languages, projects } =
    useData();

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  // Split text into bullet points
  const renderBulletPoints = (text: string) => {
    const points = text.split("\n").filter((point) => point.trim());
    return points.map((point, index) => (
      <PdfText key={index} style={classic_styles.bulletPoint}>
        • {point.trim()}
      </PdfText>
    ));
  };

  // Render project images (Base64)
  const renderProjectImages = (images: string[] = []) => {
    if (images.length === 0) return null;

    return (
      <View style={classic_styles.projectImagesContainer}>
        {images.map((image, index) => (
          <Image key={index} src={image} style={classic_styles.projectImage} />
        ))}
      </View>
    );
  };

  // Render skill tags
  const renderSkills = () => {
    if (skills.length === 0) return null;

    return (
      <View style={classic_styles.skillsContainer}>
        {skills.map((skill, index) => (
          <PdfText key={index} style={classic_styles.skillTag}>
            {skill}
          </PdfText>
        ))}
      </View>
    );
  };

  // Render language levels
  const getLanguageLevelText = (level: number) => {
    switch (level) {
      case 1:
        return "Basic";
      case 2:
        return "Intermediate";
      case 3:
        return "Advenced";
      case 4:
        return "Native";
      case 5:
        return "Fluent";
      default:
        return "Basic";
    }
  };

  return (
    <Document>
      <Page size="A4" style={classic_styles.page}>
        {/* Header Section */}
        <View style={classic_styles.header}>
          <PdfText style={classic_styles.name}>
            {personalInfo.name || "Professional Name"}
          </PdfText>
          <PdfText style={classic_styles.title}>
            {personalInfo.title || "Professional Title"}
          </PdfText>

          <View style={classic_styles.contactInfo}>
            {personalInfo.email && (
              <View style={classic_styles.contactItem}>
                <Link
                  src={`mailto:${personalInfo.email}`}
                  style={classic_styles.contactLink}
                >
                  {personalInfo.email}
                </Link>
              </View>
            )}
            {personalInfo.phone && (
              <View style={classic_styles.contactItem}>
                <PdfText style={classic_styles.contactText}>
                  {personalInfo.phone}
                </PdfText>
              </View>
            )}
            {personalInfo.location && (
              <View style={classic_styles.contactItem}>
                <PdfText style={classic_styles.contactText}>
                  {personalInfo.location}
                </PdfText>
              </View>
            )}
            {personalInfo.linkedin && (
              <View style={classic_styles.contactItem}>
                <Link
                  src={personalInfo.linkedin}
                  style={classic_styles.contactLink}
                >
                  LinkedIn
                </Link>
              </View>
            )}
            {personalInfo.links.length > 0 &&
              personalInfo.links
                ?.filter((link) => link.url.trim())
                .map((link, index) => (
                  <View key={index} style={classic_styles.contactItem}>
                    <Link src={link.url} style={classic_styles.contactLink}>
                      {link.title}
                    </Link>
                  </View>
                ))}
          </View>
        </View>

        {/* Two-column layout */}
        <View style={classic_styles.twoColumn}>
          {/* Left Column - Main Content */}
          <View style={classic_styles.leftColumn}>
            {/* About Me Section */}
            {personalInfo.aboutMe && (
              <View style={classic_styles.section}>
                <PdfText style={classic_styles.sectionTitle}>
                  Professional Summary
                </PdfText>
                <PdfText style={classic_styles.aboutText}>
                  {personalInfo.aboutMe}
                </PdfText>
              </View>
            )}

            {/* Experience Section */}
            {experiences.length > 0 && (
              <View style={classic_styles.section}>
                <PdfText style={classic_styles.sectionTitle}>
                  Professional Experience
                </PdfText>
                {experiences.map((experience) => (
                  <View
                    key={experience.id}
                    style={classic_styles.experienceItem}
                  >
                    <View style={classic_styles.experienceHeader}>
                      <View style={classic_styles.companyPosition}>
                        <PdfText style={classic_styles.company}>
                          {experience.company}
                        </PdfText>
                        <PdfText style={classic_styles.position}>
                          {experience.position}
                        </PdfText>
                      </View>
                      <PdfText style={classic_styles.dateRange}>
                        {formatDate(experience.startDate)} -{" "}
                        {experience.current
                          ? "Present"
                          : formatDate(experience.endDate)}
                      </PdfText>
                    </View>

                    {/* Description */}
                    {experience.description && (
                      <View style={classic_styles.description}>
                        {renderBulletPoints(experience.description)}
                      </View>
                    )}

                    {/* Responsibilities */}
                    {experience.responsibilities?.length > 0 && (
                      <View style={classic_styles.responsibilities}>
                        <PdfText style={classic_styles.subsectionTitle}>
                          Responsibilities:
                        </PdfText>
                        {experience.responsibilities.map(
                          (responsibility, index) => (
                            <PdfText
                              key={index}
                              style={classic_styles.bulletPoint}
                            >
                              • {responsibility}
                            </PdfText>
                          )
                        )}
                      </View>
                    )}

                    {/* Achievements */}
                    {experience.achievements?.length > 0 && (
                      <View style={classic_styles.achievements}>
                        <PdfText style={classic_styles.subsectionTitle}>
                          Key Achievements:
                        </PdfText>
                        {experience.achievements.map((achievement, index) => (
                          <PdfText
                            key={index}
                            style={classic_styles.bulletPoint}
                          >
                            • {achievement}
                          </PdfText>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Projects Section */}
            {projects.length > 0 && (
              <View style={classic_styles.section}>
                <PdfText style={classic_styles.sectionTitle}>Projects</PdfText>
                {projects.map((project) => (
                  <View key={project.id} style={classic_styles.projectItem}>
                    <View style={classic_styles.projectHeader}>
                      <View style={classic_styles.projectTitleContainer}>
                        <PdfText style={classic_styles.projectName}>
                          {project.name}
                        </PdfText>
                        {project.role && (
                          <PdfText style={classic_styles.projectRole}>
                            {project.role}
                          </PdfText>
                        )}
                      </View>
                      <PdfText style={classic_styles.projectDate}>
                        {formatDate(project.date)}
                      </PdfText>
                    </View>

                    {/* Project Description */}
                    {project.description && (
                      <PdfText style={classic_styles.projectDescription}>
                        {project.description}
                      </PdfText>
                    )}

                    {/* Technologies */}
                    {project.technologies &&
                      project.technologies?.length > 0 && (
                        <View style={classic_styles.technologiesContainer}>
                          {project.technologies.map((tech, index) => (
                            <PdfText
                              key={index}
                              style={classic_styles.technologyTag}
                            >
                              {tech}
                            </PdfText>
                          ))}
                        </View>
                      )}

                    {/* Project Images */}
                    {renderProjectImages(project.images)}

                    {/* Project Link */}
                    {project.link && (
                      <Link
                        src={project.link}
                        style={classic_styles.projectLink}
                      >
                        View Project
                      </Link>
                    )}
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Right Column - Sidebar */}
          <View style={classic_styles.rightColumn}>
            {/* Skills Section */}
            {skills.length > 0 && (
              <View style={classic_styles.sidebarSection}>
                <PdfText style={classic_styles.sidebarTitle}>Skills</PdfText>
                {renderSkills()}
              </View>
            )}

            {/* Education Section */}
            {educations.length > 0 && (
              <>
                {skills.length > 0 && <View style={classic_styles.divider} />}
                <View style={classic_styles.sidebarSection}>
                  <PdfText style={classic_styles.sidebarTitle}>
                    Education
                  </PdfText>
                  {educations.map((education) => (
                    <View
                      key={education.id}
                      style={classic_styles.educationItem}
                    >
                      <PdfText style={classic_styles.educationTitle}>
                        {education.degree} in {education.field}
                      </PdfText>
                      <PdfText style={classic_styles.institution}>
                        {education.institution}
                      </PdfText>
                      <PdfText style={classic_styles.educationDetails}>
                        {formatDate(education.startDate)} -{" "}
                        {education.current
                          ? "Present"
                          : formatDate(education.endDate)}
                        {education.gpa && ` | GPA: ${education.gpa}`}
                      </PdfText>
                      {education.description && (
                        <PdfText style={classic_styles.educationDescription}>
                          {education.description}
                        </PdfText>
                      )}
                    </View>
                  ))}
                </View>
              </>
            )}

            {/* Languages Section */}
            {languages.length > 0 && (
              <>
                {(skills.length > 0 || educations.length > 0) && (
                  <View style={classic_styles.divider} />
                )}
                <View style={classic_styles.sidebarSection}>
                  <PdfText style={classic_styles.sidebarTitle}>
                    Languages
                  </PdfText>
                  {languages.map((language) => (
                    <PdfText
                      key={language.id}
                      style={classic_styles.sidebarItem}
                    >
                      • {language.name} ({getLanguageLevelText(language.level)})
                    </PdfText>
                  ))}
                </View>
              </>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}
