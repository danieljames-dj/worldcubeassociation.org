import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import I18n from '../../lib/i18n';

export default function EditProfileValidations({
  modalParams,
  setModalParams,
  submitEditProfileRequest,
}) {
  const { isOpen, validationIssues } = modalParams;
  const closeModal = () => setModalParams({ isOpen: false });

  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
    >
      <Modal.Header>{I18n.t('page.contact_edit_profile.validations.title')}</Modal.Header>
      <Modal.Content>
        {validationIssues?.map((validationIssue) => {
          console.log('Hello');
          return <>Hello World</>;
        })}
      </Modal.Content>
      <Modal.Actions>
        <Button
          type="button"
          onClick={closeModal}
        >
          Go back to Edit
        </Button>
        <Button
          type="submit"
          onClick={submitEditProfileRequest}
        >
          Submit Edit Request
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
