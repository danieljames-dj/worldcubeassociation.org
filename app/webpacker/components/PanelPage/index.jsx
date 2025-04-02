import React, { useMemo } from 'react';
import {
  Container, Dropdown, Grid, Header, Icon, Label, Menu,
  Segment,
} from 'semantic-ui-react';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { panelPageUrl } from '../../lib/requests/routes.js.erb';
import WCAQueryClientProvider from '../../lib/providers/WCAQueryClientProvider';
import Loading from '../Requests/Loading';
import panelPagePanel from './api/panelPagePanel';
import Errored from '../Requests/Errored';
import PanelPages from '../Panel/PanelPages';
import ConfirmProvider from '../../lib/providers/ConfirmProvider';

const WCA_SEARCH_QUERY_CLIENT = new QueryClient();

function openPanelPage(id) {
  const panelPageDetails = PanelPages[id];
  if (panelPageDetails.component) {
    window.open(panelPageUrl(id));
  } else {
    window.location.href = panelPageDetails.link;
  }
}

export default function PanelPage({ id, loggedInUserId }) {
  const {
    data: panelDetails, isFetching, isError,
  } = useQuery({
    queryKey: ['panelPage', id],
    queryFn: () => panelPagePanel({ id }),
  }, WCA_SEARCH_QUERY_CLIENT);

  const panelPageDetails = PanelPages[id];

  const SelectedComponent = panelPageDetails?.component;

  const menuOptions = useMemo(() => (panelDetails?.pages?.map(
    (page) => ({
      id: page,
      notification: panelDetails?.notifications?.[page],
      ...PanelPages[page],
    }),
  )), [panelDetails]);

  if (isFetching) return <Loading />;
  if (isError) return <Errored />;

  if (!SelectedComponent) {
    openPanelPage(id);
    return () => null;
  }

  return (
    <WCAQueryClientProvider>
      <Container fluid>
        <Header as="h1">{panelDetails.name}</Header>
        <Grid>
          <Grid.Column only="computer" computer={4}>
            <PanelPagesMenu
              menuOptions={menuOptions}
              panelPageId={id}
            />
          </Grid.Column>

          <Grid.Column stretched computer={12} mobile={16} tablet={16}>
            <Segment>
              <Grid container padded>
                <Grid.Row only="tablet mobile">
                  <Dropdown
                    inline
                    options={menuOptions.map((menuOption) => ({
                      key: menuOption.id,
                      text: menuOption.name,
                      value: menuOption.id,
                      icon: !menuOption.component && 'external alternate',
                      label: menuOption.notification && ({ color: 'red', content: menuOption.notification }),
                    }))}
                    value={id}
                    onChange={(_, { value }) => openPanelPage(value)}
                  />
                </Grid.Row>
                {/* TODO: Fix the Grid.Row by removing CSS style and using appropriate props from
                    semantic-ui */}
                <Grid.Row style={{ margin: 0 }}>
                  <div style={{ width: '100%' }}>
                    <ConfirmProvider>
                      <SelectedComponent loggedInUserId={loggedInUserId} />
                    </ConfirmProvider>
                  </div>
                </Grid.Row>
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    </WCAQueryClientProvider>
  );
}

function PanelPagesMenu({ menuOptions, panelPageId }) {
  return (
    <Menu vertical fluid>
      {menuOptions.map((menuOption) => (
        <Menu.Item
          key={menuOption.id}
          name={menuOption.name}
          active={menuOption.id === panelPageId}
          onClick={() => openPanelPage(menuOption.id)}
        >
          {!menuOption.component && <Icon name="external alternate" />}
          {menuOption.notification !== undefined && (
            <Label color={menuOption.notification === 0 ? 'green' : 'red'}>
              {menuOption.notification}
            </Label>
          )}
          {menuOption.name}
        </Menu.Item>
      ))}
    </Menu>
  );
}
