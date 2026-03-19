import React from 'react';
import { Button } from 'semantic-ui-react';
import { useQuery } from '@tanstack/react-query';
import { personUrl } from '../../lib/requests/routes.js.erb';
import I18n from '../../lib/i18n';
import Loading from '../Requests/Loading';
import Errored from '../Requests/Errored';
import WCAQueryClientProvider from '../../lib/providers/WCAQueryClientProvider';
import getUsersInfo from '../RegistrationsV2/api/user/post/getUserInfo';

export default function Wrapper({ id, editable }) {
  return (
    <WCAQueryClientProvider>
      <WcaIdDetails id={id} editable={editable} />
    </WCAQueryClientProvider>
  );
}

function WcaIdDetails({ id, editable }) {
  const {
    data: user,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['wca-id-details', id],
    queryFn: async () => {
      const users = await getUsersInfo([id]);
      return users[0];
    },
  });

  if (isPending) return <Loading />;
  if (isError) return <Errored error={error} />;

  const { wca_id: wcaId, 'special_account?': isSpecialAccount } = user;
  return (
    <>
      <div>WCA ID</div>
      {wcaId ? (
        <>
          <a href={personUrl(wcaId)} target="_blank" rel="noreferrer" style={{ marginRight: '10px' }}>
            {wcaId}
          </a>
          {editable && (
            <Button type="button">
              Clear WCA ID
            </Button>
          )}
        </>
      ) : (
        <>
          <span style={{ marginRight: '10px' }}>No WCA ID</span>
          {editable && (
            <Button type="button">
              Assign WCA ID
            </Button>
          )}
        </>
      )}
      {isSpecialAccount && (
        <p className="help-block">
          {I18n.t('users.edit.account_is_special')}
        </p>
      )}
    </>
  );
}
