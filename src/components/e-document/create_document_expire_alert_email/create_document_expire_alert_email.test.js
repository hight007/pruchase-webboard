import React from 'react';
import { shallow } from 'enzyme';
import Create_document_expire_alert_email from './create_document_expire_alert_email';

describe('Create_document_expire_alert_email', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Create_document_expire_alert_email />);
    expect(wrapper).toMatchSnapshot();
  });
});
