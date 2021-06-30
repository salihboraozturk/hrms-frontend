import React, { useEffect, useState } from "react";
import HrmsTextInput from "../utilities/customFormControls/hrmsTextInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button, Container, Label } from "semantic-ui-react";
import SystemUserService from "../services/systemUserService";
import { useParams } from "react-router-dom";
export default function SystemUserInfo() {
  const [systemUser, setsystemUser] = useState();
  const { id } = useParams();
  useEffect(() => {
    let systemUserService = new SystemUserService();
    systemUserService.getSystemUserById(id).then((result) => {
      setsystemUser(result.data.data);
    });
  }, []);
  const initialValues = {
    id: systemUser?.id,
    firstName: systemUser?.firstName,
    lastName: systemUser?.lastName,
    email: systemUser?.email,
    password: systemUser?.password,
  };

  const schema = Yup.object({
    firstName: Yup.string().required("İsim zorunlu"),
    lastName: Yup.string().required("Soyisim zorunlu"),
    email: Yup.string().required("E-Mail zorunlu"),
    password: Yup.string().required("Password zorunlu"),
  });

  function handleSystemUserUpdate(values) {
    let systemUserService = new SystemUserService();
    systemUserService.update(values);
  }
  return (
    <Container className="si-container">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values) => {
          handleSystemUserUpdate(values);
        }}
      >
        <Form className="ui form si-form">
          <label className="si-label">Ad:</label>
          <HrmsTextInput
            className="si-input"
            name="firstName"
            placeholder="Ad girin."
          />
          <label className="si-label">Soyad:</label>
          <HrmsTextInput
            className="si-input"
            name="lastName"
            placeholder="Soyad girin."
          />
          <label className="si-label">E-Mail:</label>
          <HrmsTextInput
            className="si-input"
            name="email"
            placeholder="E-mail girin."
          />
          <label className="si-label">Parola:</label>
          <HrmsTextInput
            className="si-input"
            type="password"
            name="password"
            placeholder="Parola girin."
          />
          <Button type="submit">Güncelle</Button>
        </Form>
      </Formik>
    </Container>
  );
}
