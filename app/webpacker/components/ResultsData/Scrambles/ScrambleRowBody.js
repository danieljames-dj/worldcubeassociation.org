import React from 'react';
import _ from 'lodash';

import ScrambleRow from './ScrambleRow';

function ScrambleRowBody({ round, adminMode }) {
  const scramblesByGroupId = Object.values(_.groupBy(round.scrambles, 'group_id'));

  return (
    <>
      {scramblesByGroupId.flatMap((group) => (
        group.map((scramble, index, iterScrambles) => (
          <ScrambleRow
            key={scramble.id}
            scramble={scramble}
            scrambles={iterScrambles}
            adminMode={adminMode}
          />
        ))
      ))}
    </>
  );
}

export default ScrambleRowBody;
