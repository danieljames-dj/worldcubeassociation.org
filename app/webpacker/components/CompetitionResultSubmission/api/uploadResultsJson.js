import { fetchJsonOrError } from '../../../lib/requests/fetchWithAuthenticityToken';
import { actionUrls } from '../../../lib/requests/routes.js.erb';

export default async function uploadResultsJson(competitionId, file) {
  const formData = new FormData();
  formData.append('results_file', file);
  formData.append('competition_id', competitionId);

  const { data } = await fetchJsonOrError(
    actionUrls.competitionResultSubmission.uploadResultsJson(competitionId),
    {
      method: 'POST',
      body: formData,
    },
  );

  return data;
}
