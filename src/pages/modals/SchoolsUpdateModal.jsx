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
import SchoolService from "../../services/schoolService";
import { useHistory, useParams } from "react-router-dom";

export default function SchoolsUpdateModal(props) {
  const [open, setOpen] = useState(false);

  const schema = Yup.object({
    id: Yup.number(),
    schoolName: Yup.string().required("Okul Adı Zorunludur"),
    department: Yup.string().required("Bölüm Bilgisi Zorunludur"),
    entryDate: Yup.date().required("Başlangıç Tarihi Zorunludur."),
    graduateDate: Yup.date(),
  });

  function updateSchools(school) {
    let schoolService = new SchoolService();
    schoolService.update(school);
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
      <Modal.Header>Okul Bilgisi Düzenle</Modal.Header>
      <Modal.Content style={{ display: "flex" }}>
        <Modal.Description>
          {props.candidateSchools?.map((school) => (
            <Formik
              initialValues={{
                id: school.id,
                schoolName: school.schoolName,
                department: school.department,
                entryDate: school.entryDate,
                graduateDate: school.graduateDate,
              }}
              validationSchema={schema}
              onSubmit={(values) => {
                updateSchools(values);
              }}
            >
              <Form className="ui form si-form modal-form">
                <HrmsTextInput name="schoolName" type="text" />
                <HrmsTextInput name="department" type="text" />
                <HrmsTextInput name="entryDate" type="date" />
                <HrmsTextInput name="graduateDate" type="date" />
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
