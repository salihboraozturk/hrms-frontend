import React from "react";
import { Icon } from "semantic-ui-react";
import { Button, Modal } from "semantic-ui-react";
import { useState } from "react";
import LanguageService from "../../../services/languageService";

export default function LanguageDeleteModal(props) {
  const [open, setOpen] = useState(false);

  function deleteLanguage(languageId) {
    let languageService = new LanguageService();
    languageService.deleteById(languageId);
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
            <Icon name="delete" centered />
          </Button.Content>
          <Button.Content className="textAlignLeft" visible>Sil</Button.Content>
        </Button>
      }
    >
      <Modal.Header>
        Geçerli dili silmek istediğinize emin misiniz?
      </Modal.Header>
      <Modal.Content style={{ display: "flex" }}>
        <Modal.Description>{props?.language.languageName}</Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Evet"
          onClick={() => deleteLanguage(props?.language.id)}
          positive
        />
        <Button color="red" onClick={() => setOpen(false)}>
          Hayır
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
