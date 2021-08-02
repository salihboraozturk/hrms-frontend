import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Divider, Grid, Icon } from "semantic-ui-react";
import "../css/CurricullumVitae.css";
import CandidateService from "../services/candidateService";
import CandidateInfoUpdateModal from "./modals/CandidateInfo/CandidateInfoUpdateModal";
import LanguageAddModal from "./modals/CandidateLanguage/LanguageAddModal";
import LanguageDeleteModal from "./modals/CandidateLanguage/LanguageDeleteModal";
import LanguagesUpdateModal from "./modals/CandidateLanguage/LanguagesUpdateModal";
import JobExperienceAddModal from "./modals/JobExperience/JobExperienceAddModal";
import JobExperienceDeleteModal from "./modals/JobExperience/JobExperienceDeleteModal";
import JobExperiencesUpdateModal from "./modals/JobExperience/JobExperiencesUpdate";
import SchoolAddModal from "./modals/School/SchoolAddModal";
import SchoolDeleteModal from "./modals/School/SchoolDeleteModal";
import SchoolsUpdateModal from "./modals/School/SchoolsUpdateModal";
import SkillAddModal from "./modals/Skill/SkillAddModal";
import SkillDeleteModal from "./modals/Skill/SkillDeleteModal";
import SkillsUpdateModal from "./modals/Skill/SkillsUpdateModal";

export default function CurricullumVitae() {
  const [candidateCV, setcandidateCV] = useState({});
  const { id } = useParams();

  useEffect(() => {
    let candidateService = new CandidateService();
    candidateService
      .getCVByCandidate(id)
      .then((result) => setcandidateCV(result.data.data));
    console.log(candidateCV);
  }, []);

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
          <Divider />
          <div className="info">
            <h3 className="textAlignLeft">
              <Icon name="info circle"></Icon>
              Kişisel Bilgiler
            </h3>

            <Grid divided="vertically">
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
        <Divider />
        <div className="cv-3">
          <div className="info">
            <h3 className="textAlignLeft mb-1">
              <Icon name="briefcase"></Icon> İş Deneyimi
              <JobExperienceAddModal
                userId={candidateCV.candidate?.id}
              ></JobExperienceAddModal>
              <JobExperiencesUpdateModal
                candidateJobExperiences={candidateCV.jobExperiences}
              ></JobExperiencesUpdateModal>
            </h3>
            <Grid divided="vertically">
              {candidateCV.jobExperiences?.map((jobExperience) => (
                <Grid.Row columns={4}>
                  <Grid.Column>
                    <p className="textAlignLeft">
                      <strong>Şirket Adı:</strong>
                      {jobExperience.workplaceName}
                    </p>
                  </Grid.Column>
                  <Grid.Column>
                    <p className="textAlignLeft">
                      <strong>Pozisyon:</strong>
                      {jobExperience.position}
                    </p>
                  </Grid.Column>
                  <Grid.Column>
                    <p className="textAlignLeft">
                      <strong>Çalışma Tarihi:</strong>
                      {jobExperience.startDate}
                    </p>
                  </Grid.Column>
                  <Grid.Column>
                    <JobExperienceDeleteModal job={jobExperience} />
                  </Grid.Column>
                </Grid.Row>
              ))}
            </Grid>
          </div>
        </div>
        <Divider />
        <div className="cv-4">
          <div className="info">
            <h3 className="textAlignLeft mb-1">
              <Icon name="student"></Icon>Öğrenim Durumu
              <SchoolAddModal
                userId={candidateCV.candidate?.id}
              ></SchoolAddModal>
              <SchoolsUpdateModal
                candidateSchools={candidateCV.schools}
              ></SchoolsUpdateModal>
            </h3>
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
                    <SchoolDeleteModal school={school} />
                  </Grid.Column>
                </Grid.Row>
              ))}
            </Grid>
          </div>
        </div>
        <Divider />
        <div className="cv-5">
          <div className="info">
            <h3 className="textAlignLeft mb-1">
              <Icon name="star"></Icon> Yetenekler
              <SkillAddModal
                userId={candidateCV.candidate?.id}
              ></SkillAddModal>{" "}
              <SkillsUpdateModal
                candidateSkills={candidateCV.skills}
              ></SkillsUpdateModal>
            </h3>
            <Grid divided="vertically">
              <Grid.Row columns={3} className="shadowNone">
                {candidateCV.skills?.map((skill) => (
                  <Grid.Column className="textAlignLeft pt-1">
                    <span className="textAlignLeft">{skill.skillName}</span>

                    <SkillDeleteModal skill={skill} />
                  </Grid.Column>
                ))}
              </Grid.Row>
            </Grid>
          </div>
        </div>
        <Divider />
        <div className="cv-6">
          <div className="info">
            <h3 className="textAlignLeft mb-1">
              <Icon name="language"></Icon> Diller
              <LanguageAddModal userId={candidateCV.candidate?.id} />
              <LanguagesUpdateModal
                candidateLanguages={candidateCV.languages}
              />
            </h3>
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
                    <LanguageDeleteModal language={language} />
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
