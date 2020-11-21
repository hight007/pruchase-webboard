import React from 'react';
import { shallow } from 'enzyme';
import Create_webboard_category from './create_webboard_category';

describe('Create_webboard_category', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Create_webboard_category />);
    expect(wrapper).toMatchSnapshot();
  });
});
