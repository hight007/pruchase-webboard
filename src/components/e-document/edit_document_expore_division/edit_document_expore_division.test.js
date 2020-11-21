import React from 'react';
import { shallow } from 'enzyme';
import Edit_document_expore_division from './edit_document_expore_division';

describe('Edit_document_expore_division', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Edit_document_expore_division />);
    expect(wrapper).toMatchSnapshot();
  });
});
