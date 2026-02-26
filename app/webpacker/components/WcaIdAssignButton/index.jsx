import React, { useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import WCAQueryClientProvider from '../../lib/providers/WCAQueryClientProvider';
import ConfirmProvider from '../../lib/providers/ConfirmProvider';
import AssignWcaIdToUser from '../Panel/views/AssignWcaIdToUser';

function WcaIdAssignButtonInner({ userId, userName }) {
  const [isOpen, setIsOpen] = useState(false);

  // Instead of fetching user details, creating a user object and passing it to the modal,
  // this is because this button is going to be part of the user's profile page (React
  // version), and that page will anyway fetch the user details.
  const user = { id: userId, name: userName };

  const handleSuccess = () => {
    setIsOpen(false);
    // Force reload is required because the remaining part of the page is currently rails HTML
    window.location.reload();
  };

  return (
    <>
      {/* type="button" prevents form submission: this button is rendered inside a Rails form */}
      <Button
        primary
        size="small"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        Assign WCA ID
      </Button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)} closeIcon size="small">
        <Modal.Content>
          <AssignWcaIdToUser user={user} onSuccess={handleSuccess} />
        </Modal.Content>
      </Modal>
    </>
  );
}

export default function WcaIdAssignButton({ userId, userName }) {
  return (
    <WCAQueryClientProvider>
      <ConfirmProvider>
        <WcaIdAssignButtonInner userId={userId} userName={userName} />
      </ConfirmProvider>
    </WCAQueryClientProvider>
  );
}
