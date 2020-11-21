import React from 'react';
import { shallow } from 'enzyme';
import Create_document_expire from './create_document_expire';

describe('Create_document_expire', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Create_document_expire />);
    expect(wrapper).toMatchSnapshot();
  });
});
