import React from "react";
import { Icon } from "semantic-ui-react";
import { Button, Modal } from "semantic-ui-react";
import { useState } from "react";
import HrmsTextInput from "../../../utilities/customFormControls/hrmsTextInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import JobExperienceService from "../../../services/jobExperienceService";

export default function JobExperienceAddModal(props) {
  const [open, setOpen] = useState(false);

  const schema = Yup.object({
    userId: Yup.number(),
    workplaceName: Yup.string().required("İş Yeri Adı Zorunludur"),
    position: Yup.string().required("Pozisyon Bilgisi Zorunludur"),
    startDate: Yup.date().required("Başlangıç Tarihi Zorunludur."),
    finishDate: Yup.date(),
  });

  function addJobExperiences(jobExperience) {
    let jobExperienceService = new JobExperienceService();
    jobExperienceService.add(jobExperience);
    window.location.reload(true);
  }

  return (
    <Modal
      style={{ display: "flex", flexDirection: "column" }}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button
          style={{
            float: "right",
            color: "green",
            backgroundColor: "transparent",
          }}
          animated="fade"
          circular
          className="cvBtn"
        >
          <Button.Content hidden>
            <Icon name="plus" />
          </Button.Content>
          <Button.Content  className="textAlignLeft" visible>Ekle</Button.Content>
        </Button>
      }
    >
      <Modal.Header>İş Deneyimi Ekle</Modal.Header>
      <Modal.Content
        style={{ display: "flex !important", flexDirection: "row !important" }}
      >
        <Modal.Description>
          <Formik
            initialValues={{
              userId: props?.userId,
              workplaceName: "",
              position: "",
              startDate: "",
              finishDate: "",
            }}
            validationSchema={schema}
            onSubmit={(values) => {
              let data = {
                candidate: {
                  id: values.userId,
                },
                workplaceName: values.workplaceName,
                position: values.position,
                startDate: values.startDate,
                finishDate: values.finishDate,
              };
              addJobExperiences(data);
            }}
          >
            <Form className="ui form">
              <HrmsTextInput
                name="workplaceName"
                type="text"
                placeholder="İş yeri adı giriniz."
              />
              <HrmsTextInput
                name="position"
                type="text"
                placeholder="Pozisyon giriniz."
              />
              <HrmsTextInput name="startDate" type="date" />
              <HrmsTextInput name="finishDate" type="date" />
              <Button color="red" onClick={() => setOpen(false)}>
                Kapat
              </Button>
              <Button content="Ekle" type="submit" positive />
            </Form>
          </Formik>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
}
