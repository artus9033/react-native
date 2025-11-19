/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {RNTesterModuleExample} from '../../types/RNTesterTypes';
import type {ListRenderItemInfo} from 'react-native';

import * as React from 'react';
import {useEffect, useMemo, useRef} from 'react';
import {
  Animated,
  FlatList,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

module.exports = {
  displayName: 'SwipeableCardExample',
  framework: 'React',
  title: 'SwipeableCard',
  category: 'Basic',
  description:
    'Example of a swipeable card with scrollable content to test PanResponder and JSResponderHandler interaction.',
  examples: [
    {
      title: 'SwipeableCardExample',
      description:
        ('This example creates a swipeable card using PanResponder. ' +
          'Under the hood, JSResponderHandler should prevent scroll when the card is being swiped.': string),
      render: function (): React.Node {
        const {width, height} = useWindowDimensions();
        const widthRef = useRef(width);
        widthRef.current = width;

        useEffect(() => {
          console.log('JS re-rendered with width: ' + widthRef.current);
        });

        // Track how many times the component re-rendered
        const renderCount = useRef(0);
        renderCount.current += 1;

        // Fake heavy list data
        const views = useMemo(
          () =>
            Array.from({length: 500}, (_, i) => `Item ${i + 1}`).map(
              (item, index) => (
                <View
                  key={index}
                  style={[styles.item, {width: width - index / 500}]}>
                  <Text>{item}</Text>
                </View>
              ),
            ),
          [width],
        );

        return (
          <View style={styles.container}>
            <Text style={styles.header}>⚠️ useWindowDimensions Demo</Text>
            <Text>Width: {width.toFixed(0)}</Text>
            <Text>Height: {height.toFixed(0)}</Text>
            <Text style={styles.counter}>
              Render count: {renderCount.current}
            </Text>

            <Text>The below card's width is controlled by JS.</Text>

            <View
              style={{
                height: 20,
                width: width - 40,
                borderWidth: 3,
                borderColor: 'black',
                marginVertical: 10,
                backgroundColor: '#f0f1A2',
              }}
            />

            <ScrollView>{views}</ScrollView>

            <Text style={styles.info}>Try resizing the window.</Text>
          </View>
        );
      },
    },
  ] as Array<RNTesterModuleExample>,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  counter: {
    fontSize: 16,
    marginVertical: 10,
    fontWeight: '600',
  },
  item: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  info: {
    marginTop: 20,
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
  },
});
