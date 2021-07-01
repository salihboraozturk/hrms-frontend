import React from "react";
import { Icon } from "semantic-ui-react";
import { Button, Modal } from "semantic-ui-react";
import { useState } from "react";
import HrmsTextInput from "../../../utilities/customFormControls/hrmsTextInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import JobExperienceService from "../../../services/jobExperienceService";

export default function JobExperiencesUpdateModal(props) {
  const [open, setOpen] = useState(false);

  const schema = Yup.object({
    id: Yup.number(),
    workplaceName: Yup.string().required("İş Yeri Adı Zorunludur"),
    position: Yup.string().required("Pozisyon Bilgisi Zorunludur"),
    startDate: Yup.date().required("Başlangıç Tarihi Zorunludur."),
    finishDate: Yup.date(),
  });

  function updateJobExperiences(jobExperience) {
    let jobExperienceService = new JobExperienceService();
    jobExperienceService.update(jobExperience);
    window.location.reload(true);
  }

  return (
    <Modal
      style={{ float: "right" }}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button
          style={{
            float: "right",
            color: "blue",
            backgroundColor: "transparent",
          }}
          animated="fade"
          circular
          className="cvBtn"
        >
          <Button.Content hidden>
            <Icon name="setting" />
          </Button.Content>
          <Button.Content  className="textAlignLeft" visible>Düzenle</Button.Content>
        </Button>
      }
    >
      <Modal.Header>İş Deneyimlerini Düzenle</Modal.Header>
      <Modal.Content style={{ display: "flex" }}>
        <Modal.Description>
          {props.candidateJobExperiences?.map((jobExperience) => (
            <Formik
              initialValues={{
                id: jobExperience.id,
                workplaceName: jobExperience.workplaceName,
                position: jobExperience.position,
                startDate: jobExperience.startDate,
                finishDate: jobExperience.finishDate,
              }}
              validationSchema={schema}
              onSubmit={(values) => {
                updateJobExperiences(values);
              }}
            >
              <Form className="ui form si-form modal-form">
                <HrmsTextInput name="workplaceName" type="text" />
                <HrmsTextInput name="position" type="text" />
                <HrmsTextInput name="startDate" type="date" />
                <HrmsTextInput name="finishDate" type="date" />
                <Button content="Güncelle" type="submit" positive />
              </Form>
            </Formik>
          ))}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={() => setOpen(false)}>
          Kapat
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
