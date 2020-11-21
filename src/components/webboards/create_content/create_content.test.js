import React from 'react';
import { shallow } from 'enzyme';
import CreateSubject from './create-subject';

describe('CreateSubject', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<CreateSubject />);
    expect(wrapper).toMatchSnapshot();
  });
});
