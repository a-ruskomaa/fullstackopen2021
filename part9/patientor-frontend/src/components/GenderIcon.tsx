import React from 'react';
import { SemanticICONS, Icon } from 'semantic-ui-react';
import { Gender } from '../types';

type GenderProps = {
  gender: Gender;
};

const GenderIcon = ({ gender }: GenderProps) => {

  const resolveGenderIconName = (gender: Gender): SemanticICONS => {
    switch (gender) {
      case Gender.Male:
        return 'mars';
      case Gender.Female:
        return 'venus';
      default:
        return 'genderless';
    }
  };

  return <Icon name={resolveGenderIconName(gender)} />;
};

export default GenderIcon;