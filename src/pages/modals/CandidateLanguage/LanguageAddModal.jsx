import React from "react";
import { Icon } from "semantic-ui-react";
import { Button, Modal } from "semantic-ui-react";
import { useState } from "react";
import HrmsTextInput from "../../../utilities/customFormControls/hrmsTextInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import LanguageService from "../../../services/languageService";

export default function LanguageAddModal(props) {
  const [open, setOpen] = useState(false);

  const schema = Yup.object({
    userId: Yup.number(),
    languageName: Yup.string().required("Dil Adı Bilgisi Zorunludur"),
    languageLevel: Yup.number()
      .required("Dil Seviyesi Bilgisi Zorunludur")
      .min(0)
      .max(5),
  });

  function addLanguage(language) {
    let languageService = new LanguageService();
    languageService.add(language);
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
          <Button.Content  className="textAlignLeft" visible>Ekle</Button.Content>
        </Button>
      }
    >
      <Modal.Header>Dil Ekle</Modal.Header>
      <Modal.Content style={{ display: "flex" }}>
        <Modal.Description>
          <Formik
            initialValues={{
              userId: props?.userId,
              languageName: "",
              languageLevel: "",
            }}
            validationSchema={schema}
            onSubmit={(values) => {
              let data = {
                candidate: {
                  id: values.userId,
                },
                languageName: values.languageName,
                languageLevel: values.languageLevel,
              };
              addLanguage(data);
            }}
          >
            <Form className="ui form">
              <HrmsTextInput
                name="languageName"
                type="text"
                placeholder="Dil giriniz."
              />
              <HrmsTextInput
                name="languageLevel"
                type="number"
                placeholder="Seviye giriniz."
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
