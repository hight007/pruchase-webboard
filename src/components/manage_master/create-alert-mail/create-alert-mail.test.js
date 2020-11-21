import React from 'react';
import { shallow } from 'enzyme';
import CreateAlertMail from './create-alert-mail';

describe('CreateAlertMail', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<CreateAlertMail />);
    expect(wrapper).toMatchSnapshot();
  });
});
