import React from "react";
import { Icon } from "semantic-ui-react";
import { Button, Modal } from "semantic-ui-react";
import { useState } from "react";
import JobExperienceService from "../../../services/jobExperienceService";

export default function JobExperienceDeleteModal(props) {
  const [open, setOpen] = useState(false);

  function deleteJobExperience(jobExperienceId) {
    let jobExperienceService = new JobExperienceService();
    jobExperienceService.deleteById(jobExperienceId);
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
            color: "red",
            backgroundColor: "transparent",
          }}
          animated="fade"
          circular
          className="cvBtn"
        >
          <Button.Content hidden>
            <Icon name="delete" />
          </Button.Content>
          <Button.Content  className="textAlignLeft" visible>Sil</Button.Content>
        </Button>
      }
    >
      <Modal.Header>
        Geçerli iş bilgisini silmek istediğinize emin misiniz?
      </Modal.Header>
      <Modal.Content style={{ display: "flex" }}>
        <Modal.Description>{props?.job?.workplaceName}</Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Evet"
          onClick={() => deleteJobExperience(props?.job?.id)}
          positive
        />
        <Button color="red" onClick={() => setOpen(false)}>
          Hayır
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
