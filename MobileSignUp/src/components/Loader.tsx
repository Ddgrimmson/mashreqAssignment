import * as React from 'react';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const Loader = ({visible}) => (
  <>
    {visible && <ActivityIndicator testID='activity-indicator' animating={true}  />}
  </>
);

export default Loader;