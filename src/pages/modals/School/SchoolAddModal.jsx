import React from "react";
import { Icon } from "semantic-ui-react";
import { Button, Modal } from "semantic-ui-react";
import { useState } from "react";
import HrmsTextInput from "../../../utilities/customFormControls/hrmsTextInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import SchoolService from "../../../services/schoolService";

export default function SchoolAddModal(props) {
  const [open, setOpen] = useState(false);

  const schema = Yup.object({
    userId: Yup.number(),
    schoolName: Yup.string().required("Okul Adı Zorunludur"),
    department: Yup.string().required("Bölüm Bilgisi Zorunludur"),
    entryDate: Yup.date().required("Başlangıç Tarihi Zorunludur."),
    graduateDate: Yup.date(),
  });

  function addSchool(school) {
    let schoolService = new SchoolService();
    schoolService.add(school);
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
          <Button.Content className="textAlignLeft" visible>Ekle</Button.Content>
        </Button>
      }
    >
      <Modal.Header>Okul Bilgisi Ekle</Modal.Header>
      <Modal.Content style={{ display: "flex" }}>
        <Modal.Description>
          <Formik
            initialValues={{
              userId: props?.userId,
              schoolName: "",
              department: "",
              entryDate: "",
              graduateDate: "",
            }}
            validationSchema={schema}
            onSubmit={(values) => {
              let data = {
                candidate: {
                  id: values.userId,
                },
                schoolName: values.schoolName,
                department: values.department,
                entryDate: values.entryDate,
                graduateDate: values.graduateDate,
              };
              addSchool(data);
            }}
          >
            <Form className="ui form">
              <HrmsTextInput
                name="schoolName"
                type="text"
                placeholder="Okul adı giriniz."
              />
              <HrmsTextInput
                name="department"
                type="text"
                placeholder="Bölüm giriniz."
              />
              <HrmsTextInput name="entryDate" type="date" />
              <HrmsTextInput name="graduateDate" type="date" />
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
