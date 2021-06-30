import React, { useEffect, useState } from "react";
import {
  Input,
  Menu,
  Segment,
  Tab,
  Container,
  Icon,
  Divider,
} from "semantic-ui-react";
import { Grid, Image } from "semantic-ui-react";

import { Button, Header, Modal } from "semantic-ui-react";
import CandidateService from "../services/candidateService";
import HrmsTextInput from "../utilities/customFormControls/hrmsTextInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import HrmsSelectOption from "../utilities/customFormControls/hrmsSelectOption";
import LinkTypeService from "../services/linkTypeService";
import LanguagesUpdateModal from "./modals/LanguagesUpdateModal";
import SkillsUpdateModal from "./modals/SkillsUpdateModal";
import JobExperiencesUpdateModal from "./modals/JobExperiencesUpdate";
import SchoolsUpdateModal from "./modals/SchoolsUpdateModal";
import CandidateInfoUpdateModal from "./modals/CandidateInfoUpdateModal";
export default function CurricullumVitae() {
  const [candidateCV, setcandidateCV] = useState({});
  const [linkTypes, setlinkTypes] = useState([]);
  const [open, setOpen] = React.useState(false);
  const { id } = useParams();
  useEffect(() => {
    let linkTypeService = new LinkTypeService();
    linkTypeService.getLinkType().then((result) => {
      setlinkTypes(result.data.data);
    });
    let candidateService = new CandidateService();
    candidateService
      .getCVByCandidate(id)
      .then((result) => setcandidateCV(result.data.data));
    console.log(candidateCV);
  }, []);

  const linkOptions = linkTypes.map((linkType, index) => ({
    key: index,
    text: linkType.linkTypeName,
    value: linkType.id,
  }));

  const initialPersonalInfo = {
    firstName: candidateCV.candidate?.firstName,
    lastName: candidateCV.candidate?.lastName,
    description: candidateCV.candidate?.description,
    email: candidateCV.candidate?.email,
    birthYear: candidateCV.candidate?.birthYear,
  };
  const schemaPersonalInfo = Yup.object({
    firstName: Yup.string().required("İsim zorunlu"),
    lastName: Yup.string().required("İsim zorunlu"),
    description: Yup.string().required("İsim zorunlu"),
    email: Yup.string().required("İsim zorunlu"),
    birthYear: Yup.string().required("İsim zorunlu"),
    linkkedinLink: Yup.string().required("İsim zorunlu"),
    githubLink: Yup.string().required("İsim zorunlu"),
  });

  return (
    <Container className="cvpage">
      <div className="cv">
        <div className="cv-1">
          <div className="logo">
            <img className="cvImg" src={candidateCV.candidate?.imageUrl}></img>
          </div>
        </div>
        <div className="cv-2">
          <div className="name">
            <h1>
              {candidateCV.candidate?.firstName}{" "}
              {candidateCV.candidate?.lastName}
            </h1>
          </div>
          <div className="info">
            <h3 className="textAlignLeft">
              <Icon name="info circle"></Icon>
              Kişisel Bilgiler
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
                      <Icon name="plus" />
                    </Button.Content>
                    <Button.Content hidden>Ekle</Button.Content>
                  </Button>
                }
              >
                <Modal.Header>Kişisel Bilgileri Ekle/Düzenle</Modal.Header>
                <Modal.Content image>
                  <Image
                    size="medium"
                    src={candidateCV.candidate?.imageUrl}
                    wrapped
                  />
                  <Modal.Description>
                    <Header>Kişisel Bilgiler</Header>
                    <Formik
                      initialValues={initialPersonalInfo}
                      validationSchema={schemaPersonalInfo}
                      onSubmit={(values) => {}}
                    >
                      <Form className="ui form si-form">
                        <HrmsTextInput
                          className="si-input"
                          name="firstName"
                          placeholder="Ad girin."
                        />
                        <HrmsTextInput
                          className="si-input"
                          name="lastName"
                          placeholder="Soyad girin."
                        />
                        <HrmsTextInput
                          className="si-input"
                          name="description"
                          placeholder="Açıklama girin."
                        />
                        <HrmsTextInput
                          className="si-input"
                          type="date"
                          name="birthYear"
                          placeholder="Doğum tarihi girin."
                        />
                        <HrmsSelectOption
                          placeholder="Link Tipi"
                          name="linkTypeId"
                          options={linkOptions}
                          className="hrmsSelectOption"
                        />
                      </Form>
                    </Formik>
                  </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                  <Button color="black" onClick={() => setOpen(false)}>
                    Nope
                  </Button>
                  <Button
                    content="Yep, that's me"
                    labelPosition="right"
                    icon="checkmark"
                    onClick={() => setOpen(false)}
                    positive
                  />
                </Modal.Actions>
              </Modal>
            </h3>
            <Divider />
            <Grid className="" divided="vertically">
              <Grid.Row columns={4}>
                <Grid.Column>
                  <p className="textAlignLeft">
                    <strong>Açıklama:</strong>
                    {candidateCV.candidate?.description}
                  </p>
                </Grid.Column>
                <Grid.Column>
                  <p className="textAlignLeft">
                    <strong>E-Mail:</strong>
                    {candidateCV.candidate?.email}
                  </p>
                </Grid.Column>
                <Grid.Column>
                  <p className="textAlignLeft">
                    <strong>Doğum Tarihi:</strong>
                    {candidateCV.candidate?.birthYear}
                  </p>
                </Grid.Column>
                <Grid.Column className="modal" style={{ textAlign: "right" }}>
                  <CandidateInfoUpdateModal
                    candidateInfos={candidateCV?.candidate}
                  ></CandidateInfoUpdateModal>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row
                columns={4}
                className="shadowNone"
                style={{ boxShadow: "0!important" }}
              >
                {candidateCV.candidateLinks?.map((link) => (
                  <Grid.Column>
                    <p className="textAlignLeft">
                      <strong> {link.linkType.linkTypeName}:</strong>
                      {link.linkPath}
                    </p>
                  </Grid.Column>
                ))}
              </Grid.Row>
            </Grid>
          </div>
        </div>
        <div className="cv-3">
          <div className="info">
            <h3 className="textAlignLeft mb-1">
              <Icon name="briefcase"></Icon> İş Deneyimi
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
                      <Icon name="plus" />
                    </Button.Content>
                    <Button.Content hidden>Ekle</Button.Content>
                  </Button>
                }
              >
                <Modal.Header>Kişisel Bilgileri Ekle/Düzenle</Modal.Header>
                <Modal.Content image>
                  <Image
                    size="medium"
                    src={candidateCV.candidate?.imageUrl}
                    wrapped
                  />
                  <Modal.Description>
                    <Header>Kişisel Bilgiler</Header>
                    <Formik
                      initialValues={initialPersonalInfo}
                      validationSchema={schemaPersonalInfo}
                      onSubmit={(values) => {}}
                    >
                      <Form className="ui form si-form">
                        <HrmsTextInput
                          className="si-input"
                          name="firstName"
                          placeholder="Ad girin."
                        />
                        <HrmsTextInput
                          className="si-input"
                          name="lastName"
                          placeholder="Soyad girin."
                        />
                        <HrmsTextInput
                          className="si-input"
                          name="description"
                          placeholder="Açıklama girin."
                        />
                        <HrmsTextInput
                          className="si-input"
                          type="date"
                          name="birthYear"
                          placeholder="Doğum tarihi girin."
                        />
                      </Form>
                    </Formik>
                  </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                  <Button color="black" onClick={() => setOpen(false)}>
                    Nope
                  </Button>
                  <Button
                    content="Yep, that's me"
                    labelPosition="right"
                    icon="checkmark"
                    onClick={() => setOpen(false)}
                    positive
                  />
                </Modal.Actions>
              </Modal>
            </h3>{" "}
            <Divider />
            <Grid divided="vertically">
              {candidateCV.jobExperiences?.map((job) => (
                <Grid.Row columns={4}>
                  <Grid.Column>
                    <p className="textAlignLeft">
                      <strong>Şirket Adı:</strong>
                      {job.workplaceName}
                    </p>
                  </Grid.Column>
                  <Grid.Column>
                    <p className="textAlignLeft">
                      <strong>Pozisyon:</strong>
                      {job.position}
                    </p>
                  </Grid.Column>
                  <Grid.Column>
                    <p className="textAlignLeft">
                      <strong>Çalışma Tarihi:</strong>
                      {job.startDate}
                    </p>
                  </Grid.Column>
                  <Grid.Column>
                    <JobExperiencesUpdateModal
                      candidateJobExperiences={candidateCV.jobExperiences}
                    ></JobExperiencesUpdateModal>
                    <Modal
                      style={{ float: "right" }}
                      onClose={() => setOpen(false)}
                      onOpen={() => setOpen(true)}
                      open={open}
                      trigger={
                        <Button
                          style={{
                            float: "right",
                            color: "red",
                            backgroundColor: "transparent",
                          }}
                          animated="fade"
                          circular
                        >
                          <Button.Content visible>
                            <Icon name="delete" />
                          </Button.Content>
                          <Button.Content hidden>Sil</Button.Content>
                        </Button>
                      }
                    >
                      <Modal.Header>
                        Kişisel Bilgileri Ekle/Düzenle
                      </Modal.Header>
                      <Modal.Content image>
                        <Image
                          size="medium"
                          src={candidateCV.candidate?.imageUrl}
                          wrapped
                        />
                        <Modal.Description>
                          <Header>Kişisel Bilgiler</Header>
                          <Formik
                            initialValues={initialPersonalInfo}
                            validationSchema={schemaPersonalInfo}
                            onSubmit={(values) => {}}
                          >
                            <Form className="ui form si-form">
                              <HrmsTextInput
                                className="si-input"
                                name="firstName"
                                placeholder="Ad girin."
                              />
                              <HrmsTextInput
                                className="si-input"
                                name="lastName"
                                placeholder="Soyad girin."
                              />
                              <HrmsTextInput
                                className="si-input"
                                name="description"
                                placeholder="Açıklama girin."
                              />
                              <HrmsTextInput
                                className="si-input"
                                type="date"
                                name="birthYear"
                                placeholder="Doğum tarihi girin."
                              />
                            </Form>
                          </Formik>
                        </Modal.Description>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button color="black" onClick={() => setOpen(false)}>
                          Nope
                        </Button>
                        <Button
                          content="Yep, that's me"
                          labelPosition="right"
                          icon="checkmark"
                          onClick={() => setOpen(false)}
                          positive
                        />
                      </Modal.Actions>
                    </Modal>
                  </Grid.Column>
                </Grid.Row>
              ))}
            </Grid>
          </div>
        </div>
        <div className="cv-4">
          <div className="info">
            <h3 className="textAlignLeft mb-1">
              <Icon name="student"></Icon>Öğrenim Durumu
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
                      <Icon name="plus" />
                    </Button.Content>
                    <Button.Content hidden>Ekle</Button.Content>
                  </Button>
                }
              >
                <Modal.Header>Kişisel Bilgileri Ekle/Düzenle</Modal.Header>
                <Modal.Content image>
                  <Image
                    size="medium"
                    src={candidateCV.candidate?.imageUrl}
                    wrapped
                  />
                  <Modal.Description>
                    <Header>Kişisel Bilgiler</Header>
                    <Formik
                      initialValues={initialPersonalInfo}
                      validationSchema={schemaPersonalInfo}
                      onSubmit={(values) => {}}
                    >
                      <Form className="ui form si-form">
                        <HrmsTextInput
                          className="si-input"
                          name="firstName"
                          placeholder="Ad girin."
                        />
                        <HrmsTextInput
                          className="si-input"
                          name="lastName"
                          placeholder="Soyad girin."
                        />
                        <HrmsTextInput
                          className="si-input"
                          name="description"
                          placeholder="Açıklama girin."
                        />
                        <HrmsTextInput
                          className="si-input"
                          type="date"
                          name="birthYear"
                          placeholder="Doğum tarihi girin."
                        />
                      </Form>
                    </Formik>
                  </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                  <Button color="black" onClick={() => setOpen(false)}>
                    Nope
                  </Button>
                  <Button
                    content="Yep, that's me"
                    labelPosition="right"
                    icon="checkmark"
                    onClick={() => setOpen(false)}
                    positive
                  />
                </Modal.Actions>
              </Modal>
            </h3>
            <Divider />
            <Grid divided="vertically">
              {candidateCV.schools?.map((school) => (
                <Grid.Row className="row" columns={4}>
                  <Grid.Column>
                    <p className="textAlignLeft">
                      <strong>Okul Adı:</strong>
                      {school.schoolName}
                    </p>
                  </Grid.Column>
                  <Grid.Column>
                    <p className="textAlignLeft">
                      <strong>Bölüm:</strong>
                      {school.department}
                    </p>
                  </Grid.Column>
                  <Grid.Column>
                    <p className="textAlignLeft">
                      <strong>Başlangıç Tarihi:</strong>
                      {school.entryDate}
                    </p>
                    <p className="textAlignLeft">
                      <strong>Bitiş Tarihi:</strong>
                      {school.graduateDate}
                    </p>
                  </Grid.Column>
                  <Grid.Column>
                    <SchoolsUpdateModal
                      candidateSchools={candidateCV.schools}
                    ></SchoolsUpdateModal>

                    <Modal
                      style={{ float: "right" }}
                      onClose={() => setOpen(false)}
                      onOpen={() => setOpen(true)}
                      open={open}
                      trigger={
                        <Button
                          style={{
                            float: "right",
                            color: "red",
                            backgroundColor: "transparent",
                          }}
                          animated="fade"
                          circular
                        >
                          <Button.Content visible>
                            <Icon name="delete" />
                          </Button.Content>
                          <Button.Content hidden>Sil</Button.Content>
                        </Button>
                      }
                    >
                      <Modal.Header>
                        Kişisel Bilgileri Ekle/Düzenle
                      </Modal.Header>
                      <Modal.Content image>
                        <Image
                          size="medium"
                          src={candidateCV.candidate?.imageUrl}
                          wrapped
                        />
                        <Modal.Description>
                          <Header>Kişisel Bilgiler</Header>
                          <Formik
                            initialValues={initialPersonalInfo}
                            validationSchema={schemaPersonalInfo}
                            onSubmit={(values) => {}}
                          >
                            <Form className="ui form si-form">
                              <HrmsTextInput
                                className="si-input"
                                name="firstName"
                                placeholder="Ad girin."
                              />
                              <HrmsTextInput
                                className="si-input"
                                name="lastName"
                                placeholder="Soyad girin."
                              />
                              <HrmsTextInput
                                className="si-input"
                                name="description"
                                placeholder="Açıklama girin."
                              />
                              <HrmsTextInput
                                className="si-input"
                                type="date"
                                name="birthYear"
                                placeholder="Doğum tarihi girin."
                              />
                            </Form>
                          </Formik>
                        </Modal.Description>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button color="black" onClick={() => setOpen(false)}>
                          Nope
                        </Button>
                        <Button
                          content="Yep, that's me"
                          labelPosition="right"
                          icon="checkmark"
                          onClick={() => setOpen(false)}
                          positive
                        />
                      </Modal.Actions>
                    </Modal>
                  </Grid.Column>
                </Grid.Row>
              ))}
            </Grid>
          </div>
        </div>
        <div className="cv-5">
          <div className="info">
            <h3 className="textAlignLeft mb-1">
              <Icon name="star"></Icon> Yetenekler
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
                      <Icon name="plus" />
                    </Button.Content>
                    <Button.Content hidden>Ekle</Button.Content>
                  </Button>
                }
              >
                <Modal.Header>Kişisel Bilgileri Ekle/Düzenle</Modal.Header>
                <Modal.Content image>
                  <Image
                    size="medium"
                    src={candidateCV.candidate?.imageUrl}
                    wrapped
                  />
                  <Modal.Description>
                    <Header>Kişisel Bilgiler</Header>
                    <Formik
                      initialValues={initialPersonalInfo}
                      validationSchema={schemaPersonalInfo}
                      onSubmit={(values) => {}}
                    >
                      <Form className="ui form si-form">
                        <HrmsTextInput
                          className="si-input"
                          name="firstName"
                          placeholder="Ad girin."
                        />
                        <HrmsTextInput
                          className="si-input"
                          name="lastName"
                          placeholder="Soyad girin."
                        />
                        <HrmsTextInput
                          className="si-input"
                          name="description"
                          placeholder="Açıklama girin."
                        />
                        <HrmsTextInput
                          className="si-input"
                          type="date"
                          name="birthYear"
                          placeholder="Doğum tarihi girin."
                        />
                      </Form>
                    </Formik>
                  </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                  <Button color="black" onClick={() => setOpen(false)}>
                    Nope
                  </Button>
                  <Button
                    content="Yep, that's me"
                    labelPosition="right"
                    icon="checkmark"
                    onClick={() => setOpen(false)}
                    positive
                  />
                </Modal.Actions>
              </Modal>
            </h3>
            <Divider />
            <Grid divided="vertically">
              <Grid.Row columns={3} className="shadowNone">
                {candidateCV.skills?.map((skill) => (
                  <Grid.Column className="textAlignLeft pt-1">
                    <span className="textAlignLeft">{skill.skillName}</span>

                    <SkillsUpdateModal
                      candidateSkills={candidateCV.skills}
                    ></SkillsUpdateModal>
                    <Modal
                      style={{ float: "right" }}
                      onClose={() => setOpen(false)}
                      onOpen={() => setOpen(true)}
                      open={open}
                      trigger={
                        <Button
                          className="skillButton"
                          style={{
                            float: "right",
                            color: "red",
                            backgroundColor: "transparent",
                          }}
                          animated="fade"
                          circular
                        >
                          <Button.Content visible>
                            <Icon name="delete" />
                          </Button.Content>
                          <Button.Content hidden>Sil</Button.Content>
                        </Button>
                      }
                    >
                      <Modal.Header>
                        Kişisel Bilgileri Ekle/Düzenle
                      </Modal.Header>
                      <Modal.Content image>
                        <Image
                          size="medium"
                          src={candidateCV.candidate?.imageUrl}
                          wrapped
                        />
                        <Modal.Description>
                          <Header>Kişisel Bilgiler</Header>
                          <Formik
                            initialValues={initialPersonalInfo}
                            validationSchema={schemaPersonalInfo}
                            onSubmit={(values) => {}}
                          >
                            <Form className="ui form si-form">
                              <HrmsTextInput
                                className="si-input"
                                name="firstName"
                                placeholder="Ad girin."
                              />
                              <HrmsTextInput
                                className="si-input"
                                name="lastName"
                                placeholder="Soyad girin."
                              />
                              <HrmsTextInput
                                className="si-input"
                                name="description"
                                placeholder="Açıklama girin."
                              />
                              <HrmsTextInput
                                className="si-input"
                                type="date"
                                name="birthYear"
                                placeholder="Doğum tarihi girin."
                              />
                            </Form>
                          </Formik>
                        </Modal.Description>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button color="black" onClick={() => setOpen(false)}>
                          Nope
                        </Button>
                        <Button
                          content="Yep, that's me"
                          labelPosition="right"
                          icon="checkmark"
                          onClick={() => setOpen(false)}
                          positive
                        />
                      </Modal.Actions>
                    </Modal>
                  </Grid.Column>
                ))}
              </Grid.Row>
            </Grid>
          </div>
        </div>
        <div className="cv-6">
          <div className="info">
            <h3 className="textAlignLeft mb-1">
              <Icon name="language"></Icon> Diller
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
                      <Icon name="plus" />
                    </Button.Content>
                    <Button.Content hidden>Ekle</Button.Content>
                  </Button>
                }
              >
                <Modal.Header>Kişisel Bilgileri Ekle/Düzenle</Modal.Header>
                <Modal.Content image>
                  <Image
                    size="medium"
                    src={candidateCV.candidate?.imageUrl}
                    wrapped
                  />
                  <Modal.Description>
                    <Header>Kişisel Bilgiler</Header>
                    <Formik
                      initialValues={initialPersonalInfo}
                      validationSchema={schemaPersonalInfo}
                      onSubmit={(values) => {}}
                    >
                      <Form className="ui form si-form">
                        <HrmsTextInput
                          className="si-input"
                          name="firstName"
                          placeholder="Ad girin."
                        />
                        <HrmsTextInput
                          className="si-input"
                          name="lastName"
                          placeholder="Soyad girin."
                        />
                        <HrmsTextInput
                          className="si-input"
                          name="description"
                          placeholder="Açıklama girin."
                        />
                        <HrmsTextInput
                          className="si-input"
                          type="date"
                          name="birthYear"
                          placeholder="Doğum tarihi girin."
                        />
                      </Form>
                    </Formik>
                  </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                  <Button color="black" onClick={() => setOpen(false)}>
                    Nope
                  </Button>
                  <Button
                    content="Yep, that's me"
                    labelPosition="right"
                    icon="checkmark"
                    onClick={() => setOpen(false)}
                    positive
                  />
                </Modal.Actions>
              </Modal>
            </h3>
            <Divider />
            <Grid divided="vertically">
              {candidateCV.languages?.map((language) => (
                <Grid.Row columns={3}>
                  <Grid.Column>
                    <p className="textAlignLeft">
                      <strong>Dil:</strong>
                      {language.languageName}
                    </p>
                  </Grid.Column>
                  <Grid.Column>
                    <p className="textAlignLeft">
                      <strong>Seviye:</strong>
                      {language.languageLevel}
                    </p>
                  </Grid.Column>
                  <Grid.Column>
                    <LanguagesUpdateModal
                      candidateLanguages={candidateCV.languages}
                    />
                    <Modal
                      style={{ float: "right" }}
                      onClose={() => setOpen(false)}
                      onOpen={() => setOpen(true)}
                      open={open}
                      trigger={
                        <Button
                          style={{
                            float: "right",
                            color: "red",
                            backgroundColor: "transparent",
                          }}
                          animated="fade"
                          circular
                        >
                          <Button.Content visible>
                            <Icon name="delete" />
                          </Button.Content>
                          <Button.Content hidden>Sil</Button.Content>
                        </Button>
                      }
                    >
                      <Modal.Header>
                        Kişisel Bilgileri Ekle/Düzenle
                      </Modal.Header>
                      <Modal.Content image>
                        <Image
                          size="medium"
                          src={candidateCV.candidate?.imageUrl}
                          wrapped
                        />
                        <Modal.Description>
                          <Header>Dil</Header>
                          <Formik
                            initialValues={initialPersonalInfo}
                            validationSchema={schemaPersonalInfo}
                            onSubmit={(values) => {}}
                          >
                            <Form className="ui form si-form">
                              <HrmsTextInput
                                className="si-input"
                                name="firstName"
                                placeholder="Ad girin."
                              />
                              <HrmsTextInput
                                className="si-input"
                                name="lastName"
                                placeholder="Soyad girin."
                              />
                              <HrmsTextInput
                                className="si-input"
                                name="description"
                                placeholder="Açıklama girin."
                              />
                              <HrmsTextInput
                                className="si-input"
                                type="date"
                                name="birthYear"
                                placeholder="Doğum tarihi girin."
                              />
                            </Form>
                          </Formik>
                        </Modal.Description>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button color="black" onClick={() => setOpen(false)}>
                          Nope
                        </Button>
                        <Button
                          content="Yep, that's me"
                          labelPosition="right"
                          icon="checkmark"
                          onClick={() => setOpen(false)}
                          positive
                        />
                      </Modal.Actions>
                    </Modal>
                  </Grid.Column>
                </Grid.Row>
              ))}
            </Grid>
          </div>
        </div>
      </div>
    </Container>
  );
}
