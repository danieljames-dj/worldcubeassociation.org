import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import useCheckboxState from '../../../lib/hooks/useCheckboxState';
import Errored from '../../Requests/Errored';
import Loading from '../../Requests/Loading';
import importTemporaryResults from '../api/importTemporaryResults';

export default function UploadResultsJson({ competitionId, isAdminView, onImportSuccess }) {
  const [resultFile, setResultFile] = useState();
  const [markResultSubmitted, setMarkResultSubmitted] = useCheckboxState(isAdminView);

  const {
    mutate: importTemporaryResultsMutate, isPending, error, isError,
  } = useMutation({
    mutationFn: () => importTemporaryResults({
      competitionId,
      importMethod: 'results_json',
      resultFile,
      markResultSubmitted,
      storeUploadedJson: !isAdminView, // The JSON will be uploaded to database only for Delegates.
    }),
    onSuccess: onImportSuccess,
  });

  if (isPending) return <Loading />;
  if (isError) return <Errored error={error} />;

  return (
    <Form onSubmit={importTemporaryResultsMutate}>
      <Form.Input
        type="file"
        onChange={(event) => setResultFile(event.target.files[0])}
      />
      {isAdminView && (
        <Form.Checkbox
          checked={markResultSubmitted}
          onChange={setMarkResultSubmitted}
          label="If results are not marked as submitted, mark it as submitted (this is only visible to WRT)"
        />
      )}
      <Form.Button
        disabled={!resultFile}
        type="submit"
      >
        Upload JSON
      </Form.Button>
    </Form>
  );
}
