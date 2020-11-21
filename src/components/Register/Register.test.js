import React from 'react';
import { shallow } from 'enzyme';
import Register from './Register';

describe('Register', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Register />);
    expect(wrapper).toMatchSnapshot();
  });
});
