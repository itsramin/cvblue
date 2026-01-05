"use client";

import { Collapse } from "antd";
import { useState } from "react";
import PersonalInfo from "./formSections/Personal";
import WorkExperience from "./formSections/WorkExperience";
import Education from "./formSections/Education";
import Skills from "./formSections/Skills";
import Certifications from "./formSections/Certifications";
import Languages from "./formSections/Languages";
import Projects from "./formSections/Projects";

export default function Main() {
  // const { data, updateField } = useData();

  // const [form] = Form.useForm();
  const [activeKeys, setActiveKeys] = useState<string[]>(["projects"]);

  // useEffect(() => {
  //   if (data) {
  //     form.setFieldsValue(data);
  //   }
  // }, [data, form]);

  // function changeHandler(_changedValues: any, allValues: IData) {
  //   updateData(allValues);
  // }
  // function fieldHandler(field: any, _fieldData: any) {
  //   updateField(field[0].name[0], field[0].value);
  // }

  const handlePanelChange = (keys: string | string[]) => {
    setActiveKeys(Array.isArray(keys) ? keys : [keys]);
  };

  const items = [
    {
      key: "personal",
      label: "Personal Information",
      children: <PersonalInfo />,
    },
    {
      key: "experience",
      label: "Work Experience",
      children: <WorkExperience />,
    },
    {
      key: "education",
      label: "Education",
      children: <Education />,
    },
    {
      key: "skills",
      label: "Skills",
      children: <Skills />,
    },
    {
      key: "languages",
      label: "Languages",
      children: <Languages />,
    },
    {
      key: "projects",
      label: "Projects",
      children: <Projects />,
    },
    // {
    //   key: "certifications",
    //   label: "Certifications",
    //   children: <Certifications />,
    // },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">CV Builder</h2>

      {/* <Form
        form={form}
        layout="vertical"
        onFieldsChange={fieldHandler}
        initialValues={data}
        className="!space-y-6"
      > */}
      <Collapse
        activeKey={activeKeys}
        onChange={handlePanelChange}
        expandIconPosition="start"
        items={items}
      />
      {/* </Form> */}
    </div>
  );
}
