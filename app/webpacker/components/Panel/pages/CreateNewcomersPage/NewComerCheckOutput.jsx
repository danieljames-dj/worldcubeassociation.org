import React from 'react';
import { Header } from 'semantic-ui-react';
import Loading from '../../../Requests/Loading';
import Errored from '../../../Requests/Errored';

export default function NewComerCheckOutput({ data, isFetching, isError }) {
  if (isFetching) return <Loading />;
  if (isError) return <Errored />;

  console.log(data);
  return (data && (
    <>
      <Header>New Comer List</Header>
      <div>Hl</div>
    </>
  ));
}
