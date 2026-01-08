# 🎨 Contribute New CV Templates to CVBlue

We're excited to invite you to contribute new, beautiful CV templates to CVBlue! Our template system is built on `@react-pdf/renderer`, making it easy to create professional, printable PDF layouts.

## 📁 Template Structure

Each new template requires two files:

### 1. Layout Component (`YourTemplateLayout.tsx`)

```tsx
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
import { your_template_styles } from "./YourTemplateStyle";

// Your layout implementation here
```

### 2. Style Definition (YourTemplateStyle.ts)

```tsx
import { StyleSheet } from "@react-pdf/renderer";

export const YOUR_TEMPLATE_COLORS = {
  primary: "#your-color",
  secondary: "#your-color",
  // Define your color palette
};

export const your_template_styles = StyleSheet.create({
  // Your style definitions here
});
```

## 📊 Available Data

Your template can use these data structures from our store:

```ts
personalInfo: {
  name: string;
  email: string;
  phone: string;
  title: string;
  location: string;
  linkedin: string;
  links: {
    url: string;
    title: string;
  }
  [];
  aboutMe: string;
}

experiences: Array<{
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  responsibilities: string[];
  achievements: string[];
}>;

educations: Array<{
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa?: string;
  description: string;
}>;

skills: string[];

languages: Array<{ id: number; name: string; level: number }>;

projects: Array<{
  id: string;
  name: string;
  description: string;
  role?: string;
  technologies?: string[];
  link?: string;
  date: string;
  images?: string[]; // Base64 images
}>
```

## 📊 Available Data

### 1. Page Layout

- Use A4 page size (size="A4")
- Set appropriate padding/margins (40px recommended)
- Consider responsive text sizing
- Test with varying content lengths

### 2. Avoid Common Issues

```tsx
// ✅ DO: Use flexbox for layout control
<View style={{ flexDirection: "row", flexWrap: "wrap" }}>

// ✅ DO: Handle overflow
<Text style={{ fontSize: 11, lineHeight: 1.5 }}>

// ❌ DON'T: Use fixed heights that might cut content
<View style={{ height: 100 }}> {/* Avoid! */}

// ✅ DO: Use dynamic heights
<View style={{ minHeight: 50 }}> {/* Better */}
```

### 3. Text Handling

- Set Font.registerHyphenationCallback((word) => [word]) to prevent word breaks
- Use appropriate line heights (1.4-1.6 for readability)
- Test with long names, company names, and descriptions
- Ensure contrast meets accessibility standards

### 4. Color Scheme

- Create a cohesive color palette (3-5 colors max)
- Ensure text is readable on backgrounds
- Use semantic colors (primary, secondary, accent)

### 5. Spacing & Alignment

- Use consistent spacing units
- Align related elements visually
- Create visual hierarchy with typography

## 🔧 Technical Requirements

### 1. Page Break Prevention

- No content exceeds page boundaries
- Lists don't break mid-item
- Sections stay together when possible
- Use margin/padding instead of fixed heights

## 🚀 Getting Started

### Step 1: Create Template Files

1. Create YourTemplateLayout.tsx in /components/layouts/
2. Create YourTemplateStyle.ts in the same directory
3. Follow the structure of existing templates

### Step 2: Implement Layout

```tsx
export default function YourTemplateLayout() {
  const { personalInfo, experiences, educations, skills, languages, projects } =
    useData();

  return (
    <Document>
      <Page size="A4" style={your_template_styles.page}>
        {/* Your layout here */}
        <View style={your_template_styles.header}>
          <PdfText style={your_template_styles.name}>
            {personalInfo.name}
          </PdfText>
        </View>
        {/* Add all sections */}
      </Page>
    </Document>
  );
}
```

### Step 3: Define Styles

```tsx
export const your_template_styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 40,
    fontSize: 11,
    fontFamily: "Arial",
  },
  // Define all your styles
});
```

### Step 4: Test Thoroughly

- Test with minimal data
- Test with maximum data (long descriptions, many items)
- Test PDF export
- Check for overlapping elements
- Verify no content is cut off

## 📝 Example Checklist

Before submitting your template:

- All data fields are utilized appropriately
- No content overflow or cutoff
- Consistent spacing and alignment
- Accessible color contrast
- Works with variable content lengths
- PDF exports correctly
- Follows existing code style
- Includes comments for complex logic

## 🤝 Contribution Process

1. Fork the repository
2. Create your template in a new branch
3. Test with various data scenarios
4. Submit a pull request with:

   - Your template files
   - Screenshot of the PDF output
   - Brief description of the design

## 🆘 Need Help?

- Check @react-pdf/renderer documentation
- Examine existing templates for patterns
- Open an issue for questions
- Join our community discussions

---

**Thank you for contributing!** Your templates will help thousands of users create beautiful, professional resumes. Every new template makes CVBlue more valuable to our community. 🚀

Happy designing! 🎨
