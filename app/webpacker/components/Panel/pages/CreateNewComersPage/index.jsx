import React from 'react';
import { Header } from 'semantic-ui-react';
import { QueryClient, useQuery } from '@tanstack/react-query';
import useQueryParams from '../../../../lib/hooks/useQueryParams';
import CompetitionsInput from './CompetitionsInput';
import NewComerCheckOutput from './NewComerCheckOutput';
import getNewComerCheckDetails from './api/getNewComerCheckDetails';
import useInputState from '../../../../lib/hooks/useInputState';

const NEW_COMERS_CHECK_QUERY_CLIENT = new QueryClient();

export default function CreateNewComersPage() {
  const [queryParams] = useQueryParams();
  const competitionIdsFromQuery = queryParams?.competition_ids?.split(',');
  const [competitionIds, setCompetitionIds] = useInputState(competitionIdsFromQuery || []);

  const {
    data, isFetching, isError, refetch: doNewComersCheck,
  } = useQuery({
    queryKey: ['newComerCheck'],
    queryFn: () => getNewComerCheckDetails(competitionIds),
    enabled: !!competitionIdsFromQuery,
  }, NEW_COMERS_CHECK_QUERY_CLIENT);

  // Information needs to be shown only if we DON'T have any newcomer check that has already
  // started. If competitionIds is received through queryParam, then Information needs to be
  // shown.
  const shouldShowInformation = !(data || isFetching || isError || competitionIdsFromQuery);

  return (
    <>
      <Header>Create New Comers</Header>
      {shouldShowInformation && <Information />}
      <CompetitionsInput
        competitionIds={competitionIds}
        setCompetitionIds={setCompetitionIds}
        doNewComersCheck={doNewComersCheck}
      />
      <NewComerCheckOutput
        data={data}
        isFetching={isFetching}
        isError={isError}
      />
    </>
  );
}

function Information() {
  return (
    <div>
      <p>
        In this script, a &quot;person&quot; always means a triple of (id,name,countryId) and
        &quot;similar&quot; always means just name similarity. A person is called
        &quot;finished&quot; if it has a non-empty personId. A &quot;semi-id&quot; is the id
        without the running number at the end.
      </p>
      <p>
        For each unfinished person in the Results table, I show you the few most similar
        persons. Then you make choices and click &quot;update&quot; at the bottom of the page
        to show and execute your choices. You can:
      </p>
      <ul>
        <li>
          <p>
            Choose the person as &quot;new&quot;, optionally modifying name, country and
            semi-id. This will add the person to the Persons table (with appropriately
            extended id) and change its Results accordingly. If this person has both roman and
            local names, the syntax for the names to be inserted correctly is
            &quot;romanName (localName)&quot;.
          </p>
        </li>
        <li>
          <p>
            Choose another person. This will overwrite the person&apos;s (id,name,countryId)
            triple in the Results table with those of the other person.
          </p>
        </li>
        <li>
          <p>Skip it if you&apos;re not sure yet.</p>
        </li>
      </ul>

      <hr />
    </div>
  );
}