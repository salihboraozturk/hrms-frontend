import React from "react";
import { Icon } from "semantic-ui-react";
import { Button, Modal } from "semantic-ui-react";
import { useState } from "react";
import HrmsTextInput from "../../../utilities/customFormControls/hrmsTextInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import SkillService from "../../../services/skillService";

export default function SkillsUpdateModal(props) {
  const [open, setOpen] = useState(false);

  const schema = Yup.object({
    id: Yup.number(),
    skillName: Yup.string().required("Yetenek Adı Bilgisi Zorunludur"),
  });

  function updateSkills(skill) {
    let skillService = new SkillService();
    skillService.update(skill);
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
          <Button.Content className="textAlignLeft" visible>Düzenle</Button.Content>
        </Button>
      }
    >
      <Modal.Header>Yetenekleri Düzenle</Modal.Header>
      <Modal.Content style={{ display: "flex" }}>
        <Modal.Description>
          {props.candidateSkills?.map((skill) => (
            <Formik
              initialValues={{
                id: skill.id,
                skillName: skill.skillName,
              }}
              validationSchema={schema}
              onSubmit={(values) => {
                updateSkills(values);
              }}
            >
              <Form className="ui form si-form modal-form">
                <HrmsTextInput name="skillName" type="text" />
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
