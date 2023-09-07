import { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Appbar, FAB, SegmentedButtons, Text } from 'react-native-paper';
import { Link } from 'expo-router';
import DropDownPicker from 'react-native-dropdown-picker';


export default function Page() {
  const [setOpen, setSetOpen] = useState('');
  const [setValue, setSetValue] = useState('');
  const [setItems, setSetItems] = useState([
    {
      label: 'Adventurer',
      value: 'adventurer',
    },
    {
      label: 'Archaic Petra',
      value: 'archaic-petra',
    },
    {
      label: 'Berserker',
      value: 'berserker',
    },
  ]);

  const [mainStatOpen, setMainStatOpen] = useState('');
  const [mainStatValue, setMainStatValue] = useState('');
  const [mainStatItems, setMainStatItems] = useState([
    {
      label: 'HP (%)',
      value: 'hp-percentage',
    },
    {
      label: 'ATK (%)',
      value: 'atk-percentage',
    },
    {
      label: 'DEF (%)',
      value: 'def-percentage',
    },
    {
      label: 'Elemental Mastery',
      value: 'elemental-mastery',
    },
    {
      label: 'Energy Recharge',
      value: 'energy-recharge',
    },
  ]);


  const [type, setType] = useState('');
  const types = [
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
  ];

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
        <DropDownPicker
          open={setOpen}
          value={setValue}
          items={setItems}
          setOpen={setSetOpen}
          setValue={setSetValue}
          setItems={setSetItems}
        />
        <Text variant='labelLarge' style={styles.label}>Type</Text>
        <SafeAreaView>
          <SegmentedButtons
            value={type}
            onValueChange={setType}
            buttons={types}
          />
        </SafeAreaView>
        <Text variant='labelLarge' style={styles.label}>Main stat</Text>
        <DropDownPicker
          open={mainStatOpen}
          value={mainStatValue}
          items={mainStatItems}
          setOpen={setMainStatOpen}
          setValue={setMainStatValue}
          setItems={setMainStatItems}
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
