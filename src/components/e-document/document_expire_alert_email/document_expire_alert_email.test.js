import React from 'react';
import { shallow } from 'enzyme';
import Document_expire_alert_email from './document_expire_alert_email';

describe('Document_expire_alert_email', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Document_expire_alert_email />);
    expect(wrapper).toMatchSnapshot();
  });
});
