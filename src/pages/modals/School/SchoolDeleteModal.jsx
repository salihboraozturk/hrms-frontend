import React from "react";
import { Icon } from "semantic-ui-react";
import { Button, Modal } from "semantic-ui-react";
import { useState } from "react";
import SchoolService from "../../../services/schoolService";

export default function SchoolDeleteModal(props) {
  const [open, setOpen] = useState(false);

  function deleteSchool(schoolId) {
    let schoolService = new SchoolService();
    schoolService.deleteById(schoolId);
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
          <Button.Content className="textAlignLeft" visible>Sil</Button.Content>
        </Button>
      }
    >
      <Modal.Header>
        Geçerli öğrenim bilgisiini silmek istediğinize emin misiniz?
      </Modal.Header>
      <Modal.Content style={{ display: "flex" }}>
        <Modal.Description>{props?.school?.schoolName}</Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Evet"
          onClick={() => deleteSchool(props?.school?.id)}
          positive
        />
        <Button color="red" onClick={() => setOpen(false)}>
          Hayır
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
