import React from 'react';
import {
  Button, Grid, GridColumn, GridRow,
} from 'semantic-ui-react';
import { wfcCompetitionsExportUrl, apiV0Urls } from '../../../lib/requests/routes.js.erb';

import UtcDatePicker from '../../wca/UtcDatePicker';
import useQueryParams from '../../../lib/hooks/useQueryParams';
import useLoadedData from '../../../lib/hooks/useLoadedData';
import useSaveAction from '../../../lib/hooks/useSaveAction';

export default function DuesExport() {
  const [queryParams] = useQueryParams();
  const [fromDate, setFromDate] = React.useState(null);
  const [toDate, setToDate] = React.useState(null);
  const {
    data, loading, error,
  } = useLoadedData(apiV0Urls.wfc.tokenSetFromCallback(queryParams?.code, queryParams?.scope));
  const { save, saving } = useSaveAction();
  const tokenSet = data?.tokenSet;
  // const tokenSet = {
  //   access_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjFDQUY4RTY2NzcyRDZEQzAyOEQ2NzI2RkQwMjYxNTgxNTcwRUZDMTkiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJISy1PWm5jdGJjQW8xbkp2MENZVmdWY09fQmsifQ.eyJuYmYiOjE3MTQyMzk5MDIsImV4cCI6MTcxNDI0MTcwMiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS54ZXJvLmNvbSIsImF1ZCI6Imh0dHBzOi8vaWRlbnRpdHkueGVyby5jb20vcmVzb3VyY2VzIiwiY2xpZW50X2lkIjoiQkRENDRDNkE3REE4NDJDQTlCNDU0MzVCNUI4OEI2OEEiLCJzdWIiOiJmYmE2MDMwODVmNWQ1ODczODc4OTAyYzY2YzgwNGFjNSIsImF1dGhfdGltZSI6MTcxNDIzMDg0NCwieGVyb191c2VyaWQiOiI2NjM1ZTQ5MC1mNjBmLTQ4NzUtOGUyYy1mNDg1MzJlNGY1MGEiLCJnbG9iYWxfc2Vzc2lvbl9pZCI6ImJjMTEwYzM1NjM0MTRjZjU5N2RkNTlhMTc2OTFmYjhhIiwic2lkIjoiYmMxMTBjMzU2MzQxNGNmNTk3ZGQ1OWExNzY5MWZiOGEiLCJqdGkiOiJGOURGODNBQjkyQTMwNzVBOEY1QTQwNDk1OUFDRTlFOCIsImF1dGhlbnRpY2F0aW9uX2V2ZW50X2lkIjoiMWM0MjE4NTYtZjgxZS00ZTA4LTlhMzctNzM4MWNmYTk1YmYxIiwic2NvcGUiOiJhY2NvdW50aW5nLmNvbnRhY3RzIiwiYW1yIjpbInB3ZCIsIm1mYSIsIm90cCJdfQ.BY55f29RaMY3d4uEYyPuwkbp38vjQKkOxsCP360488_UCCo5QMctiaYF_4MCrwk_O2z7ZJZ-cotY1amj8ZaCsOnbZnCi7HKzIjrwpIPbVZRoeFMIlC-MnSdyxKR-bV0f01FSKb30l6f70gCbjiinjPOsJ27jkbjo-tigiXbMzKtY7V1tb5qdVT2BKz9AhZOBl58OLnSr30OOV3wVLBNnv_XMuS7kHpfwxdl4-6gQaXp6rQK1gpJNsddTr42ulveRMlQhUZAOAMSfN4lzDIudRhwqQn0Gqwem-AUVJTJ4pli56fsvUuF7a8JRfHeXduTCOZ3HsztcxFRMtXl3AgTmpg',
  //   expires_in: 1800,
  //   token_type: 'Bearer',
  //   scope: 'accounting.contacts',
  // };

  return (
    <Grid centered>
      <GridRow>
        <GridColumn width={8}>Start Date</GridColumn>
        <GridColumn width={8}>
          <UtcDatePicker
            onChange={setFromDate}
            selected={fromDate}
          />
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn width={8}>End Date</GridColumn>
        <GridColumn width={8}>
          <UtcDatePicker
            onChange={setToDate}
            selected={toDate}
          />
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn>
          <Button
            // disabled={!fromDate || !toDate}
            href={apiV0Urls.wfc.authorizeXero}
            // target="_blank"
          >
            Authorize Xero
          </Button>
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn>
          <Button
            onClick={() => {
              save(apiV0Urls.wfc.createContacts, { tokenSet }, () => {});
            }}
          >
            Create Contacts
          </Button>
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn>
          <Button
            disabled={!fromDate || !toDate}
            href={`${wfcCompetitionsExportUrl}?${new URLSearchParams({
              from_date: fromDate,
              to_date: toDate,
            }).toString()}`}
            target="_blank"
          >
            Download
          </Button>
        </GridColumn>
      </GridRow>
    </Grid>
  );
}
