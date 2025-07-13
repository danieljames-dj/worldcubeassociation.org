import { fetchJsonOrError } from '../../../lib/requests/fetchWithAuthenticityToken';
import { actionUrls } from '../../../lib/requests/routes.js.erb';

export default async function importTemporaryResults({
  competitionId,
  importMethod,
  markResultSubmitted = false,
  resultFile,
  storeUploadedJson = false,
}) {
  const formData = new FormData();
  formData.append('competition_id', competitionId);
  formData.append('import_method', importMethod);
  formData.append('mark_result_submitted', markResultSubmitted);
  formData.append('store_uploaded_json', storeUploadedJson);

  if (resultFile) {
    formData.append('results_file', resultFile);
  }

  const { data } = await fetchJsonOrError(
    actionUrls.competitionResultSubmission.importTemporaryResults(competitionId),
    {
      method: 'POST',
      body: formData,
    },
  );

  return data;
}
