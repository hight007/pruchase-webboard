import React from 'react';
import { shallow } from 'enzyme';
import List_content from './list_content';

describe('List_content', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<List_content />);
    expect(wrapper).toMatchSnapshot();
  });
});
