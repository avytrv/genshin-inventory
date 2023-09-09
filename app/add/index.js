import { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Appbar, FAB, SegmentedButtons, Text } from 'react-native-paper';
import { Link } from 'expo-router';
import RNPickerSelect from 'react-native-picker-select';

import sets from './sets.json';
import rarities from './stars.json';
import types from './types.json';
import flowerMainStats from './flower-main-stats.json';
import plumeMainStats from './plume-main-stats.json';
import sandsMainStats from './sands-main-stats.json';
import gobletMainStats from './goblet-main-stats.json';
import circletMainStats from './circlet-main-stats.json';
import subStats from './substats.json';

export default function Page() {
  const [rarity, setRarity] = useState('');
  const [type, setType] = useState('');

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content
          title='Add Artifact'
          titleStyle={styles.title}
        />
      </Appbar.Header>

      <View style={styles.form}>
        <Text variant='labelLarge' style={styles.label}>Set</Text>
        <RNPickerSelect
          onValueChange={(value) => console.log(value)}
          items={sets}
        />

        <Text variant='labelLarge' style={styles.label}>Rarity</Text>
        <SafeAreaView>
          <SegmentedButtons
            value={rarity}
            onValueChange={setRarity}
            buttons={rarities}
          />
        </SafeAreaView>

        <Text variant='labelLarge' style={styles.label}>Type</Text>
        <SafeAreaView>
          <SegmentedButtons
            value={type}
            onValueChange={setType}
            buttons={types}
          />
        </SafeAreaView>

        <Text variant='labelLarge' style={styles.label}>Main stat</Text>
        <RNPickerSelect
          onValueChange={(value) => console.log(value)}
          items={sandsMainStats}
        />
      </View>

      <Link href='/' asChild>
        <FAB
          icon='pencil'
          style={styles.fab}
        />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    flex: 1,
    margin: 16,
    gap: 16,
  },
  title: {
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    margin: 32,
    right: 0,
    bottom: 0,
  },
});
