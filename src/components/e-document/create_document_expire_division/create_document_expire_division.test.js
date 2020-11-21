import React from 'react';
import { shallow } from 'enzyme';
import Create_document_expire_division from './create_document_expire_division';

describe('Create_document_expire_division', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Create_document_expire_division />);
    expect(wrapper).toMatchSnapshot();
  });
});
