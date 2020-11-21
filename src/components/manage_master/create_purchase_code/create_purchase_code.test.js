import React from 'react';
import { shallow } from 'enzyme';
import Create_purchase_code from './create_purchase_code';

describe('Create_purchase_code', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Create_purchase_code />);
    expect(wrapper).toMatchSnapshot();
  });
});
