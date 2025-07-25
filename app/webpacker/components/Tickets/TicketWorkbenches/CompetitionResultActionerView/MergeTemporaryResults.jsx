import React from 'react';
import { Button } from 'semantic-ui-react';
import { ResultsPreview } from './ResultsPreview';

export default function MergeTemporaryResults({ ticketDetails }) {
  const { ticket: { metadata: { competition_id: competitionId } } } = ticketDetails;
  return (
    <>
      Hello
      <ResultsPreview competitionId={competitionId} />
      <Button onClick={}>
        Merge Temporary Results
      </Button>
    </>
  );
}
