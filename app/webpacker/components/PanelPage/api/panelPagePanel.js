import { fetchJsonOrError } from '../../../lib/requests/fetchWithAuthenticityToken';
import { panelPagePanelUrl } from '../../../lib/requests/routes.js.erb';

export default async function panelPagePanel({ id }) {
  const { data } = await fetchJsonOrError(
    panelPagePanelUrl(id),
  );
  return data || {};
}
