import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { Input } from 'semantic-ui-react';
import uploadResultsJson from '../api/uploadResultsJson';

export default function UploadResultsJson() {
  const { mutate: uploadResultsJsonMutate } = useMutation({
    mutationFn: (file) => uploadResultsJson(file),
  });

  const handleUpload = (event) => {
    uploadResultsJsonMutate(event.target.files[0]);
  };

  return (
    <Input
      type="file"
      onChange={handleUpload}
    />
  );
}
