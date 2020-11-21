import React from 'react';
import { shallow } from 'enzyme';
import DomainMail from './domain-mail';

describe('DomainMail', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<DomainMail />);
    expect(wrapper).toMatchSnapshot();
  });
});
