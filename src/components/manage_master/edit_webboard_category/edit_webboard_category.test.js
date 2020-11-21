import React from 'react';
import { shallow } from 'enzyme';
import Edit_webboard_category from './edit_webboard_category';

describe('Edit_webboard_category', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Edit_webboard_category />);
    expect(wrapper).toMatchSnapshot();
  });
});
