import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Icon,
  Image,
  Container,
  Button,
  Grid,
  Modal,
} from "semantic-ui-react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import HrmsTextInput from "../utilities/customFormControls/hrmsTextInput";
import EmployerService from "../services/employerService";
export default function EmployerInfo() {
  const { id } = new useParams();
  const [employer, setEmployer] = useState({});
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    let employerService = new EmployerService();
    employerService.getEmployerById(id).then((result) => {
      setEmployer(result.data.data);
    });
  }, []);

  const initialValues = {
    id: employer.id,
    email: employer.email,
    password: employer.password,
    companyName: employer.companyName,
    webAddress: employer.webAddress,
    phoneNumber: employer.phoneNumber,
    companyLogo: employer.companyLogo,
  };
  const schema = Yup.object({
    email: Yup.string().required("İsim zorunlu"),
    password: Yup.string().required("İsim zorunlu"),
    companyName: Yup.string().required("İsim zorunlu"),
    webAddress: Yup.string().required("İsim zorunlu"),
    phoneNumber: Yup.string().required("İsim zorunlu"),
    companyLogo: Yup.string().required("İsim zorunlu"),
  });

  function handleUpdate(employer) {
    let employerService = new EmployerService();
    employerService.update(employer);
  }
  return (
    <Container className="containerEI">
      <Grid>
        <Grid.Row>
          <Card className="cardEmployer">
            <Image
              className="imageEmployer"
              src={employer?.companyLogo}
              wrapped
              ui={false}
            />
            <Card.Content>
              <Card.Header>{employer?.companyName}</Card.Header>
              <Card.Meta>
                <span className="date">{employer?.webAddress}</span>
              </Card.Meta>
              <Card.Description>{employer?.email}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a>
                <Icon name="phone" />0{employer?.phoneNumber}
              </a>
            </Card.Content>
          </Card>
        </Grid.Row>
        <Grid.Row style={{ display: "flex", justifyContent: "center" }}>
          <Modal
            className="modal"
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={
              <Button
                style={{
                  color: "green",
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
            <Modal.Header>
              İşveren Bilgileri
              <Modal.Actions style={{ float: "right" }}>
                <Button color="red" onClick={() => setOpen(false)}>
                  Kapat
                </Button>
              </Modal.Actions>
            </Modal.Header>
            <Modal.Content>
              <Image size="medium" src={employer.companyLogo} wrapped />
              <Modal.Description>
                <Formik
                  initialValues={initialValues}
                  validationSchema={schema}
                  onSubmit={(values) => {
                    handleUpdate(values);
                  }}
                >
                  <Form className="ui form si-form">
                    <HrmsTextInput
                      className="si-input"
                      name="companyName"
                      placeholder="Şirket adı girin."
                    />
                    <HrmsTextInput
                      className="si-input"
                      name="webAddress"
                      placeholder="Web sitesi girin."
                    />
                    <HrmsTextInput
                      className="si-input"
                      name="email"
                      placeholder="E-Mail girin."
                    />
                    <HrmsTextInput
                      className="si-input"
                      name="phoneNumber"
                      placeholder="Doğum tarihi girin."
                    />
                    <Button
                      content="Yep, that's me"
                      labelPosition="right"
                      icon="checkmark"
                      type="submit"
                      positive
                    />
                  </Form>
                </Formik>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        </Grid.Row>
      </Grid>
    </Container>
  );
}
