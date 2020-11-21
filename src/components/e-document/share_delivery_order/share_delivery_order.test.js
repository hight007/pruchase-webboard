import React from 'react';
import { shallow } from 'enzyme';
import Share_delivery_order from './share_delivery_order';

describe('Share_delivery_order', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Share_delivery_order />);
    expect(wrapper).toMatchSnapshot();
  });
});
