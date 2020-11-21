import React from 'react';
import { shallow } from 'enzyme';
import Order_arrived from './order_arrived';

describe('Order_arrived', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Order_arrived />);
    expect(wrapper).toMatchSnapshot();
  });
});
