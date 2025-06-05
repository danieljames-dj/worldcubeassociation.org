import React, { useState } from 'react';
import {
  Container, Header, Menu, Message, Segment,
} from 'semantic-ui-react';
import UploadResultsJson from './UploadResultsJson';
import Errored from '../../Requests/Errored';
import ImportFromWcaLive from './ImportFromWcaLive';

const IMPORT_RESULTS_COMPONENTS = {
  uploadResultsJson: UploadResultsJson,
  importFromWcaLive: ImportFromWcaLive,
};

export default function ImportResultsData({
  alreadyHasSubmittedResult,
  importFromWcaLiveDisabled,
}) {
  const [activeOption, setActiveOption] = useState('uploadResultsJson');
  const ActiveComponent = IMPORT_RESULTS_COMPONENTS[activeOption];

  return (
    <Container fluid>
      <Header>Import Results Data</Header>
      {alreadyHasSubmittedResult
        ? (
          <Message warning>
            Some results are already there, importing results data again will override all of them!
          </Message>
        )
        : (
          <Message>
            Please start by importing results data using any one of the following options.
          </Message>
        )}
      <Menu attached="top" tabular>
        <Menu.Item
          name="uploadResultsJson"
          active={activeOption === 'uploadResultsJson'}
          onClick={() => setActiveOption('uploadResultsJson')}
        >
          Upload Result JSON (v0.3)
        </Menu.Item>
        <Menu.Item
          name="importFromWcaLive"
          active={activeOption === 'importFromWcaLive'}
          onClick={() => setActiveOption('importFromWcaLive')}
          disabled={importFromWcaLiveDisabled}
        >
          Import from WCA Live
        </Menu.Item>
      </Menu>
      <Segment attached="bottom">
        {ActiveComponent
          ? <ActiveComponent />
          : <Errored error={`No component found for active option: ${activeOption}`} />}
      </Segment>
    </Container>
  );
}
