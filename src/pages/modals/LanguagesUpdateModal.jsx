import React from "react";
import {
  Input,
  Menu,
  Segment,
  Tab,
  Container,
  Icon,
  Divider,
} from "semantic-ui-react";

import { Button, Header, Modal } from "semantic-ui-react";
import { useState } from "react";
import HrmsTextInput from "../../utilities/customFormControls/hrmsTextInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import LanguageService from "../../services/languageService";
import { useHistory, useParams } from "react-router-dom";

export default function LanguagesUpdateModal(props) {
  const [open, setOpen] = useState(false);

  const schema = Yup.object({
    id: Yup.number(),
    languageName: Yup.string().required("Dil Adı Bilgisi Zorunludur"),
    languageLevel: Yup.number()
      .required("Dil Seviyesi Bilgisi Zorunludur")
      .min(0)
      .max(5),
  });

  function updateLanguage(language) {
    let languageService = new LanguageService();
    languageService.update(language);
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
            color: "Gold",
            backgroundColor: "transparent",
          }}
          animated="fade"
          circular
        >
          <Button.Content visible>
            <Icon name="setting" />
          </Button.Content>
          <Button.Content hidden>Düzenle</Button.Content>
        </Button>
      }
    >
      <Modal.Header>Dilleri Düzenle</Modal.Header>
      <Modal.Content style={{ display: "flex" }}>
        <Modal.Description>
          {props.candidateLanguages?.map((language) => (
            <Formik
              initialValues={{
                id: language.id,
                languageName: language.languageName,
                languageLevel: language.languageLevel,
              }}
              validationSchema={schema}
              onSubmit={(values) => {
                updateLanguage(values);
              }}
            >
              <Form className="ui form si-form modal-form">
                <HrmsTextInput name="languageName" type="text" />
                <HrmsTextInput name="languageLevel" type="number" />
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
