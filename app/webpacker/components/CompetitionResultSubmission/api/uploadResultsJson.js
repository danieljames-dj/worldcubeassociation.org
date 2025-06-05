import { fetchJsonOrError } from '../../../lib/requests/fetchWithAuthenticityToken';

export default async function uploadResultsJson(file) {
  const formData = new FormData();
  formData.append('resultsJson', file);

  const { data } = await fetchJsonOrError(competitionScrambleFilesUrl(competitionId), {
    method: 'POST',
    body: formData,
  });

  return data;
}
