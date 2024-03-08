import React from 'react';
import { Button, Confirm, Table } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import UserBadge from '../UserBadge';
import useLoadedData from '../../lib/hooks/useLoadedData';
import { apiV0Urls } from '../../lib/requests/routes.js.erb';
import { groupTypes } from '../../lib/wca-data.js.erb';
import useSaveAction from '../../lib/hooks/useSaveAction';
import WcaSearch from '../SearchWidget/WcaSearch';
import SEARCH_MODELS from '../SearchWidget/SearchModel';
import Errored from '../Requests/Errored';
import useInputState from '../../lib/hooks/useInputState';

const dateFormat = 'YYYY-MM-DD';

function ProbationListTable({
  roleList, isActive, save, sync,
}) {
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [endProbationParams, setEndProbationParams] = React.useState();

  const endProbation = () => {
    save(apiV0Urls.userRoles.update(endProbationParams.probationRoleId), {
      endDate: endProbationParams.endDate,
    }, sync, { method: 'PATCH' });
    setConfirmOpen(false);
    setEndProbationParams(null);
  };

  return (
    <>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={5}>User</Table.HeaderCell>
            <Table.HeaderCell width={2}>Start date</Table.HeaderCell>
            <Table.HeaderCell width={2}>End date</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {roleList.map((probationRole) => (
            <Table.Row key={probationRole.id}>
              <Table.Cell>
                <UserBadge
                  user={probationRole.user}
                  hideBorder
                  leftAlign
                />
              </Table.Cell>
              <Table.Cell>
                {probationRole.start_date}
              </Table.Cell>
              <Table.Cell>
                {
                isActive ? (
                  <DatePicker
                    onChange={(date) => {
                      setEndProbationParams({
                        probationRoleId: probationRole.id,
                        endDate: moment(date).format(dateFormat),
                      });
                      setConfirmOpen(true);
                    }}
                    selected={probationRole.end_date ? new Date(probationRole.end_date) : null}
                  />
                ) : probationRole.end_date
              }
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={endProbation}
        content="Are you sure you want to change end date of this probation?"
      />
    </>
  );
}

export default function DelegateProbations() {
  const [user, setUser] = useInputState();

  const {
    data: probationRoles, loading, error, sync,
  } = useLoadedData(apiV0Urls.userRoles.listOfGroupType(groupTypes.delegate_probation));
  const { save, saving } = useSaveAction();

  if (loading || saving) return 'Loading...'; // No i18n because this page is used only by WCA Staff.
  if (error) return <Errored />;

  return (
    <>
      <h1>Delegate Probations</h1>
      <WcaSearch
        name="user"
        value={user}
        onChange={setUser}
        multiple={false}
        model={SEARCH_MODELS.user}
        params={{ only_staff_delegates: true }}
      />
      <Button
        onClick={() => save(apiV0Urls.userRoles.create(), {
          userId: user.id,
          groupType: groupTypes.delegate_probation,
        }, () => {
          sync();
          setUser(null);
        }, { method: 'POST' })}
        disabled={!user}
      >
        Start Probation
      </Button>
      <h2>Active Probations</h2>
      <ProbationListTable
        roleList={probationRoles.filter((probationRole) => probationRole.end_date === null
           || probationRole.end_date > moment().format(dateFormat))}
        isActive
        save={save}
        sync={sync}
      />
      <h2>Past Probations</h2>
      <ProbationListTable
        roleList={probationRoles.filter((probationRole) => probationRole.end_date !== null
          && probationRole.end_date <= moment().format(dateFormat))}
        isActive={false}
      />
    </>
  );
}
