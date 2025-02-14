import { fetchJsonOrError } from '../../../lib/requests/fetchWithAuthenticityToken';
import { actionUrls } from '../../../lib/requests/routes.js.erb';

export default async function editProfileValidations(body) {
  const { data } = await fetchJsonOrError(
    actionUrls.contact.editProfileValidations,
    { method: 'POST', headers: {}, body },
  );
  return data;
}
