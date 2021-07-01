import React from "react";
import { Icon } from "semantic-ui-react";
import { Button, Modal } from "semantic-ui-react";
import { useState } from "react";
import HrmsTextInput from "../../../utilities/customFormControls/hrmsTextInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import SkillService from "../../../services/skillService";

export default function SkillAddModal(props) {
  const [open, setOpen] = useState(false);

  const schema = Yup.object({
    userId: Yup.number(),
    skillName: Yup.string().required("Yetenek Adı Bilgisi Zorunludur"),
  });

  function addSkill(skill) {
    let skillService = new SkillService();
    skillService.add(skill);
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
          <Button.Content className="textAlignLeft" visible>
            Ekle
          </Button.Content>
        </Button>
      }
    >
      <Modal.Header>Yetenek Ekle</Modal.Header>
      <Modal.Content style={{ display: "flex" }}>
        <Modal.Description>
          <Formik
            initialValues={{
              userId: props?.userId,
              skillName: "",
            }}
            validationSchema={schema}
            onSubmit={(values) => {
              let data = {
                candidate: {
                  id: values.userId,
                },
                skillName: values.skillName,
              };
              addSkill(data);
            }}
          >
            <Form className="ui form">
              <HrmsTextInput
                name="skillName"
                type="text"
                placeholder="Yetenek giriniz."
              />
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
