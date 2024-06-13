import React, {useState} from 'react';
import {Appbar} from 'react-native-paper';
import styled from 'styled-components/native';
import ConditionalView from './ConditionalView';
import AppDrawer from './Drawer';
import { StyleSheet } from 'react-native';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import { useTheme } from '../ThemeContext';

const BaseLayout = styled.SafeAreaView`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const AppBodyContainer = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 16px;
`;


interface ContainerProps {
  children: React.ReactNode;
  showAppBar?: Boolean;
  screenName?: string;
  withDrawer?: boolean;
  showLeftIcon?: boolean;
  leftIcon?: string;
  leftIconAction?: Function;
  onBackClick?: Function;
  appBarMode?: string;
}

const Container = ({
  children,
  showAppBar = false,
  screenName = 'screenName',
  withDrawer = false,
  showLeftIcon = false,
  leftIcon,
  leftIconAction,
  onBackClick,
  appBarMode = "small"
}: ContainerProps) => {

    const {theme} = useTheme()
    const styles = makeStyles(theme)
  const [toggleDrawer, setToggleDrawer] = useState<boolean>(false);

  const actionItemIcon = (withDrawer ? 'menu' : leftIcon) || 'menu';

  const actionItemHandler = () => {
    withDrawer
      ? setToggleDrawer(prev => !prev)
      : leftIconAction && leftIconAction();
  };

  const backIconAction = () => {
    onBackClick && onBackClick();
  };

  return (
    <BaseLayout>
      <ConditionalView condition={showAppBar}>
        <Appbar style={styles.appBarStyles} elevated={true} mode={appBarMode}>
          <ConditionalView condition={showLeftIcon}>
            <Appbar.Action icon={actionItemIcon} onPress={actionItemHandler} />
          </ConditionalView>
          <Appbar.Content title={screenName} />
          <ConditionalView condition={onBackClick}>
            <Appbar.Action icon="arrow-left" onPress={backIconAction} />
          </ConditionalView>
        </Appbar>
      </ConditionalView>
      <ConditionalView condition={withDrawer}>
        <AppDrawer onBackdropClick={actionItemHandler} visible={toggleDrawer} />
      </ConditionalView>
      <AppBodyContainer>{children}</AppBodyContainer>
    </BaseLayout>
  );
};


const makeStyles = (theme: ThemeProp) =>  StyleSheet.create({
    appBarStyles: {
     backgroundColor: theme.colors.elevation.level5,
     paddingTop: 0,
     marginBottom: 10
    }
   });

export default Container;
