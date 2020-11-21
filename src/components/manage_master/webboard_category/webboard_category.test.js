import React from 'react';
import { shallow } from 'enzyme';
import Webboard_category from './webboard_category';

describe('Webboard_category', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Webboard_category />);
    expect(wrapper).toMatchSnapshot();
  });
});
