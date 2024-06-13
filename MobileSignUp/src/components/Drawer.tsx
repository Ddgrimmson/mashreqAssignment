import React from 'react';
import {withTheme} from 'react-native-paper';
import styled from 'styled-components/native';
import ConditionalView from './ConditionalView';
import LanguageSelector from '../../i18n/LanguageSelector';

const AppDrawer = props => {
  const {visible, onBackdropClick} = props;
  
  return (
    <ConditionalView testID="drawer-conditional-view" condition={visible}>
      <DraawerBackdropContainer testID="drawer-backdrop" style={{flex: 1}} onPress={onBackdropClick}>
        <DraawerContainer testID="drawer-container">
            <LanguageSelector />
        </DraawerContainer>
      </DraawerBackdropContainer>
    </ConditionalView>
  );
};

const DraawerBackdropContainer = withTheme(styled.TouchableOpacity`
  flex: 1;
  height: 200%;
  width: 100%;
  background-color: ${({theme}) => theme.colors?.backdrop};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
`);

const DraawerContainer = withTheme(styled.View`
  flex: 1;
  height: 200%;
  width: 70%;
  background-color: ${({theme}) => theme.colors?.elevation.level5};
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 10%;
  z-index: 6;
`);

export default withTheme(AppDrawer);
