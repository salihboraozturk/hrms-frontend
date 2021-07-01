import React from "react";
import { Icon } from "semantic-ui-react";
import { Button, Modal } from "semantic-ui-react";
import { useState } from "react";
import SkillService from "../../../services/skillService";

export default function SkillDeleteModal(props) {
  const [open, setOpen] = useState(false);

  function deleteSkill(skillId) {
    let skillService = new SkillService();
    skillService.deleteById(skillId);
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
        Geçerli yeteneği silmek istediğinize emin misiniz?
      </Modal.Header>
      <Modal.Content style={{ display: "flex" }}>
        <Modal.Description>{props?.skill.skillName}</Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Evet"
          onClick={() => deleteSkill(props?.skill.id)}
          positive
        />
        <Button color="red" onClick={() => setOpen(false)}>
          Hayır
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
