import React, { useMemo } from 'react';
import {
  FormField, FormGroup, Radio,
} from 'semantic-ui-react';
import I18n from '../../../../lib/i18n';
import { useDispatch, useStore } from '../../../../lib/providers/StoreProvider';
import { updateSectionData } from '../../store/actions';
import EditProfileQuery from './EditProfileQuery';
import OtherQuery from './OtherQuery';
import RemovePersonalData from './RemovePersonalData';

const SECTION = 'wrt';
const QUERY_TYPES = ['edit_profile', 'report_result_issue', 'remove_personal_data', 'other_query'];
const QUERY_TYPES_MAP = _.keyBy(QUERY_TYPES, _.camelCase);

export default function Wrt() {
  const { formValues: { wrt } } = useStore();
  const { queryType: selectedQueryType } = wrt || {};
  const dispatch = useDispatch();
  const handleFormChange = (_, { name, value }) => dispatch(
    updateSectionData(SECTION, name, value),
  );

  const QueryForm = useMemo(() => {
    if (!selectedQueryType) return null;
    switch (selectedQueryType) {
      case QUERY_TYPES_MAP.editProfile:
        return EditProfileQuery;
      case QUERY_TYPES_MAP.removePersonalData:
        return RemovePersonalData;
      default:
        return OtherQuery;
    }
  }, [selectedQueryType]);

  return (
    <>
      <FormGroup grouped>
        <div>{I18n.t('page.contacts.form.wrt.query_type.label')}</div>
        {QUERY_TYPES.map((queryType) => (
          <FormField key={queryType}>
            <Radio
              label={I18n.t(`page.contacts.form.wrt.query_type.${queryType}.label`)}
              name="queryType"
              value={queryType}
              checked={selectedQueryType === queryType}
              onChange={handleFormChange}
            />
          </FormField>
        ))}
      </FormGroup>
      {QueryForm && <QueryForm />}
    </>
  );
}
