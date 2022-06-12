import React from 'react';
import {StyleSheet} from 'react-native';
import {Layout, Spinner} from '@ui-kitten/components';

const LoadingIndicator = () => (
  <Layout level="2" style={styles.indicator}>
    <Spinner size="small" status="warning" />
  </Layout>
);

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export {LoadingIndicator};
