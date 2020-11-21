import React from 'react';
import { shallow } from 'enzyme';
import Purchase_code from './purchase_code';

describe('Purchase_code', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Purchase_code />);
    expect(wrapper).toMatchSnapshot();
  });
});
