import React from "react";
import { Icon } from "semantic-ui-react";
import { Button, Modal } from "semantic-ui-react";
import { useState } from "react";
import HrmsTextInput from "../../../utilities/customFormControls/hrmsTextInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CandidateService from "../../../services/candidateService";

export default function CandidateInfoUpdateModal(props) {
  const [open, setOpen] = useState(false);

  const schema = Yup.object({
    id: Yup.number(),
    firstName: Yup.string().required("İsim Bilgisi Zorunludur"),
    lastName: Yup.string().required("Soyisim Bilgisi Zorunludur"),
    description: Yup.string().required("Açıklama Bilgisi Zorunludur."),
    birthYear: Yup.string().required("Doğum Yılı Zorunludur."),
    email: Yup.string().required("E-Mail Zorunludur."),
  });

  function updateCandidateInfo(candidate) {
    let candidateService = new CandidateService();
    candidateService.update(candidate);
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
      <Modal.Header>İş Arayan Bilgisi Düzenle</Modal.Header>
      <Modal.Content style={{ display: "flex", flexDirection: "column" }}>
        <Modal.Description>
          <Formik
            initialValues={{
              id: props?.candidateInfos?.id,
              birthYear: props?.candidateInfos?.birthYear,
              description: props?.candidateInfos?.description,
              email: props?.candidateInfos?.email,
              firstName: props?.candidateInfos?.firstName,
              lastName: props?.candidateInfos?.lastName,
              identificationNumber: props?.candidateInfos?.identificationNumber,
              imageUrl: props?.candidateInfos?.imageUrl,
              password: props?.candidateInfos?.password,
            }}
            validationSchema={schema}
            onSubmit={(values) => {
              updateCandidateInfo(values);
            }}
          >
            <Form className="ui form si-form modal-form">
              <HrmsTextInput name="firstName" type="text" />
              <HrmsTextInput name="lastName" type="text" />
              <HrmsTextInput name="email" type="text" />
              <HrmsTextInput name="description" type="text" />
              <HrmsTextInput name="birthYear" type="text" />
              <Button content="Güncelle" type="submit" positive />
            </Form>
          </Formik>
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
