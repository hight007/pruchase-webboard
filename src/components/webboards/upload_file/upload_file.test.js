import React from 'react';
import { shallow } from 'enzyme';
import Upload_file from './upload_file';

describe('Upload_file', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<Upload_file />);
    expect(wrapper).toMatchSnapshot();
  });
});
