import React from 'react';
import { shallow } from 'enzyme';
import Search_delivery_order from './search_delivery_order';

describe('Search_delivery_order', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Search_delivery_order />);
    expect(wrapper).toMatchSnapshot();
  });
});
