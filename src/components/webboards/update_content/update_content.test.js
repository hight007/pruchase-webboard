import React from 'react';
import { shallow } from 'enzyme';
import Update_content from './update_content';

describe('Update_content', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Update_content />);
    expect(wrapper).toMatchSnapshot();
  });
});
