import React from 'react';
import { shallow } from 'enzyme';
import CreateDomainMail from './create-domain-mail';

describe('CreateDomainMail', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<CreateDomainMail />);
    expect(wrapper).toMatchSnapshot();
  });
});
