import React from 'react';
import { shallow } from 'enzyme';
import Show_content from './show_content';

describe('Show_content', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Show_content />);
    expect(wrapper).toMatchSnapshot();
  });
});
