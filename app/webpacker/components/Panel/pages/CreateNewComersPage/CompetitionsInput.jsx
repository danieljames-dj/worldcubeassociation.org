import React from 'react';
import { Form } from 'semantic-ui-react';
import { IdWcaSearch } from '../../../SearchWidget/WcaSearch';
import SEARCH_MODELS from '../../../SearchWidget/SearchModel';

export default function CompetitionsInput({ competitionIds, setCompetitionIds, doNewComersCheck }) {
  return (
    <Form>
      <IdWcaSearch
        model={SEARCH_MODELS.competition}
        multiple
        value={competitionIds}
        onChange={setCompetitionIds}
        label="Competition(s)"
      />
      <Form.Button href="/panel/new_comers">Check newcomers</Form.Button>
    </Form>
  );
}
