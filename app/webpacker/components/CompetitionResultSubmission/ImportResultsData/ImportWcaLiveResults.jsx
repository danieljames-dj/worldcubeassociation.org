import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from 'semantic-ui-react';
import Errored from '../../Requests/Errored';
import Loading from '../../Requests/Loading';
import importTemporaryResults from '../api/importTemporaryResults';

export default function ImportWcaLiveResults({ competitionId, onImportSuccess }) {
  const {
    mutate: importTemporaryResultsMutate, error, isPending, isError,
  } = useMutation({
    mutationFn: () => importTemporaryResults({ competitionId, importMethod: 'wca_live' }),
    onSuccess: onImportSuccess,
  });

  if (isPending) return <Loading />;
  if (isError) return <Errored error={error} />;

  return (
    <Button primary onClick={importTemporaryResultsMutate}>Import WCA Live Results</Button>
  );
}
