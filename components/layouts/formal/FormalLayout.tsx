import { useData } from "@/store/store";
import {
  Document,
  Page,
  Text as PdfText,
  View,
  Link,
  Image,
} from "@react-pdf/renderer";
import { createFormalStyles } from "./FormalStyle";
import { IColors } from "@/type/type";

export default function FormalLayout({ colors }: { colors: IColors }) {
  const { personalInfo, experiences, educations, skills, languages, projects } =
    useData();

  // Create dynamic styles based on colors
  const FormalStyles = createFormalStyles(colors);

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
      <PdfText key={index} style={FormalStyles.bulletPoint}>
        • {point.trim()}
      </PdfText>
    ));
  };

  // Render project images (Base64)
  const renderProjectImages = (images: string[] = []) => {
    if (images.length === 0) return null;

    return (
      <View style={FormalStyles.projectImagesContainer}>
        {images.map((image, index) => (
          <Image key={index} src={image} style={FormalStyles.projectImage} />
        ))}
      </View>
    );
  };

  // Render skill tags
  const renderSkills = () => {
    if (skills.length === 0) return null;

    return (
      <View style={FormalStyles.skillsContainer}>
        {skills.map((skill, index) => (
          <PdfText key={index} style={FormalStyles.skillTag}>
            {skill}
          </PdfText>
        ))}
      </View>
    );
  };

  return (
    <Document>
      <Page size="A4" style={FormalStyles.page}>
        {/* Header Section */}
        <View style={FormalStyles.header}>
          <PdfText style={FormalStyles.name}>
            {personalInfo.name || "Professional Name"}
          </PdfText>
          <PdfText style={FormalStyles.title}>
            {personalInfo.title || "Professional Title"}
          </PdfText>

          <View style={FormalStyles.contactInfo}>
            {personalInfo.email && (
              <View style={FormalStyles.contactItem}>
                <Link
                  src={`mailto:${personalInfo.email}`}
                  style={FormalStyles.contactLink}
                >
                  {personalInfo.email}
                </Link>
              </View>
            )}
            {personalInfo.phone && (
              <View style={FormalStyles.contactItem}>
                <PdfText style={FormalStyles.contactText}>
                  {personalInfo.phone}
                </PdfText>
              </View>
            )}
            {personalInfo.location && (
              <View style={FormalStyles.contactItem}>
                <PdfText style={FormalStyles.contactText}>
                  {personalInfo.location}
                </PdfText>
              </View>
            )}
            {personalInfo.linkedin && (
              <View style={FormalStyles.contactItem}>
                <Link
                  src={personalInfo.linkedin}
                  style={FormalStyles.contactLink}
                >
                  LinkedIn
                </Link>
              </View>
            )}
            {personalInfo.links.length > 0 &&
              personalInfo.links
                ?.filter((link) => link.url.trim())
                .map((link, index) => (
                  <View key={index} style={FormalStyles.contactItem}>
                    <Link src={link.url} style={FormalStyles.contactLink}>
                      {link.title}
                    </Link>
                  </View>
                ))}
          </View>
        </View>

        {/* Main Content - Single Column */}
        <View style={FormalStyles.mainColumn}>
          {/* About Me Section */}
          {personalInfo.aboutMe && (
            <View style={FormalStyles.section}>
              <PdfText style={FormalStyles.sectionTitle}>
                Professional Summary
              </PdfText>
              <PdfText style={FormalStyles.aboutText}>
                {personalInfo.aboutMe}
              </PdfText>
            </View>
          )}

          {/* Education Section */}
          {educations.length > 0 && (
            <View style={FormalStyles.section}>
              <PdfText style={FormalStyles.sectionTitle}>Education</PdfText>
              {educations.map((education) => (
                <View key={education.id} style={FormalStyles.educationItem}>
                  <PdfText style={FormalStyles.educationTitle}>
                    {education.degree} in {education.field}
                  </PdfText>
                  <PdfText style={FormalStyles.institution}>
                    {education.institution}
                  </PdfText>
                  <PdfText style={FormalStyles.educationDetails}>
                    {formatDate(education.startDate)} -{" "}
                    {education.current
                      ? "Present"
                      : formatDate(education.endDate)}
                    {education.gpa && ` | GPA: ${education.gpa}`}
                  </PdfText>
                  {education.description && (
                    <PdfText style={FormalStyles.educationDescription}>
                      {education.description}
                    </PdfText>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Experience Section */}
          {experiences.length > 0 && (
            <View style={FormalStyles.section}>
              <PdfText style={FormalStyles.sectionTitle}>
                Professional Experience
              </PdfText>
              {experiences.map((experience) => (
                <View key={experience.id} style={FormalStyles.experienceItem}>
                  <View style={FormalStyles.experienceHeader}>
                    <View style={FormalStyles.companyPosition}>
                      <PdfText style={FormalStyles.company}>
                        {experience.company}
                      </PdfText>
                      <PdfText style={FormalStyles.position}>
                        {experience.position}
                      </PdfText>
                    </View>
                    <PdfText style={FormalStyles.dateRange}>
                      {formatDate(experience.startDate)} -{" "}
                      {experience.current
                        ? "Present"
                        : formatDate(experience.endDate)}
                    </PdfText>
                  </View>

                  {/* Description */}
                  {experience.description && (
                    <View style={FormalStyles.description}>
                      {renderBulletPoints(experience.description)}
                    </View>
                  )}

                  {/* Responsibilities */}
                  {experience.responsibilities?.length > 0 && (
                    <View style={FormalStyles.responsibilities}>
                      <PdfText style={FormalStyles.subsectionTitle}>
                        Responsibilities:
                      </PdfText>
                      {experience.responsibilities.map(
                        (responsibility, index) => (
                          <PdfText key={index} style={FormalStyles.bulletPoint}>
                            • {responsibility}
                          </PdfText>
                        )
                      )}
                    </View>
                  )}

                  {/* Achievements */}
                  {experience.achievements?.length > 0 && (
                    <View style={FormalStyles.achievements}>
                      <PdfText style={FormalStyles.subsectionTitle}>
                        Key Achievements:
                      </PdfText>
                      {experience.achievements.map((achievement, index) => (
                        <PdfText key={index} style={FormalStyles.bulletPoint}>
                          • {achievement}
                        </PdfText>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Skills Section */}
          {skills.length > 0 && (
            <View style={FormalStyles.section}>
              <PdfText style={FormalStyles.sectionTitle}>Skills</PdfText>
              {renderSkills()}
            </View>
          )}

          {/* Languages Section */}
          {languages.length > 0 && (
            <View style={FormalStyles.section}>
              <PdfText style={FormalStyles.sectionTitle}>Languages</PdfText>
              {languages.map((language) => (
                <PdfText key={language.id} style={FormalStyles.languageItem}>
                  • {language.name} ({language.levelLabel})
                </PdfText>
              ))}
            </View>
          )}

          {/* Projects Section */}
          {projects.length > 0 && (
            <View style={FormalStyles.section}>
              <PdfText style={FormalStyles.sectionTitle}>Projects</PdfText>
              {projects.map((project) => (
                <View key={project.id} style={FormalStyles.projectItem}>
                  <View style={FormalStyles.projectHeader}>
                    <View style={FormalStyles.projectTitleContainer}>
                      <PdfText style={FormalStyles.projectName}>
                        {project.name}
                      </PdfText>
                      {project.role && (
                        <PdfText style={FormalStyles.projectRole}>
                          {project.role}
                        </PdfText>
                      )}
                    </View>
                    <PdfText style={FormalStyles.projectDate}>
                      {formatDate(project.date)}
                    </PdfText>
                  </View>

                  {/* Project Description */}
                  {project.description && (
                    <PdfText style={FormalStyles.projectDescription}>
                      {project.description}
                    </PdfText>
                  )}

                  {/* Technologies */}
                  {project.technologies && project.technologies?.length > 0 && (
                    <View style={FormalStyles.technologiesContainer}>
                      {project.technologies.map((tech, index) => (
                        <PdfText key={index} style={FormalStyles.technologyTag}>
                          {tech}
                        </PdfText>
                      ))}
                    </View>
                  )}

                  {/* Project Images */}
                  {renderProjectImages(project.images)}

                  {/* Project Link */}
                  {project.link && (
                    <Link src={project.link} style={FormalStyles.projectLink}>
                      View Project
                    </Link>
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
