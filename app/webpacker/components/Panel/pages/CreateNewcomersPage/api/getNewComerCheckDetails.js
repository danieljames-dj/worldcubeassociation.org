import { fetchJsonOrError } from '../../../../../lib/requests/fetchWithAuthenticityToken';
import { actionUrls } from '../../../../../lib/requests/routes.js.erb';

export default async function getNewComerCheckDetails(competitionIds) {
  const { data } = await fetchJsonOrError(actionUrls.admin.getNewComerCheckDetails(competitionIds));
  return data;
}
