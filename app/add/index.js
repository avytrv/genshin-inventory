import * as React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Appbar, FAB, SegmentedButtons, Text } from 'react-native-paper';
import { Link } from 'expo-router';
import { SelectList } from 'react-native-dropdown-select-list';

export default function Page() {
  const [set, setSet] = React.useState('');
  const [type, setType] = React.useState('');

  const sets = [
    {
      key: '1',
      value: 'Adventurer',
    },
    {
      key: '2',
      value: 'Archaic Petra',
    },
    {
      key: '3',
      value: 'Berserker',
    },
  ]

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
        <SelectList
          setSelected={setSet}
          data={sets}
          save='value'
        />
        <Text variant='labelLarge' style={styles.label}>Type</Text>
        <SafeAreaView>
          <SegmentedButtons
            value={type}
            onValueChange={setType}
            buttons={[
              {
                value: 'flower',
                label: 'Flower',
              },
              {
                value: 'plume',
                label: 'Plume',
              },
              {
                value: 'sands',
                label: 'Sands'
              },
              {
                value: 'goblet',
                label: 'Goblet'
              },
              {
                value: 'circlet',
                label: 'Circlet'
              },
            ]}
          />
        </SafeAreaView>
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
