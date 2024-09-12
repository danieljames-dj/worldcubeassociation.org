import React from 'react';
import { Form } from 'semantic-ui-react';
import I18n from '../../../../lib/i18n';
import { useDispatch, useStore } from '../../../../lib/providers/StoreProvider';
import { updateSectionData, uploadProfileChangeProof } from '../../store/actions';

const SECTION = 'wrt';

export default function RemovePersonalData() {
  const { formValues: { wrt: { message, removeDataConfirmation } } } = useStore();
  const dispatch = useDispatch();
  const handleFormChange = (_, { name, value }) => dispatch(
    updateSectionData(SECTION, name, value),
  );

  const handleFileUpload = (event) => dispatch(
    uploadProfileChangeProof(event.target.files[0]),
  );

  return (
    <>
      <Form.TextArea
        label={I18n.t('page.contacts.form.wrt.message.label')}
        name="message"
        value={message}
        onChange={handleFormChange}
        required
      />
      <Form.Checkbox
        label={I18n.t('page.contacts.form.wrt.remove_data_confirmation.label')}
        checked={removeDataConfirmation}
        onChange={handleFormChange}
        required
      />
      <Form.Input
        label={I18n.t('page.contacts.form.wrt.remove_data_proof_attach.label')}
        type="file"
        onChange={handleFileUpload}
      />
    </>
  );
}
