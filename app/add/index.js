import sets from './sets.json';
import rarities from './stars.json';
import types from './types.json';
import flowerMainStats from './flower-main-stats.json';
import plumeMainStats from './plume-main-stats.json';
import sandsMainStats from './sands-main-stats.json';
import gobletMainStats from './goblet-main-stats.json';
import circletMainStats from './circlet-main-stats.json';
import subStats from './substats.json';

import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Appbar, FAB, SegmentedButtons, Text } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { Controller, useForm } from 'react-hook-form';

export default function Page() {
  const [ mainStats, setMainStats ] = useState([]);
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      set: '',
      rarity: 5,
      type: 'flower',
      mainStatName: 'hp',
      mainStatValue: 0,
    },
  });
  // TODO: Change onSubmit function to add artifact to database
  const onSubmit = (data) => console.log(data);
  const watchType = watch('type');

  useEffect(() => {
    const options = {
      shouldValidate: true,
      shouldDirty: true
    };
    switch(watchType) {
      case 'flower':
        setMainStats(flowerMainStats);
        setValue('mainStatName', 'hp', options);
        break;
      case 'plume':
        setMainStats(plumeMainStats);
        setValue('mainStatName', 'atk', options);
        break;
      case 'sands':
        setMainStats(sandsMainStats);
        setValue('mainStatName', 'hp-percentage', options);
        break;
      case 'goblet':
        setMainStats(gobletMainStats);
        setValue('mainStatName', 'hp-percentage', options);
        break;
      case 'circlet':
        setMainStats(circletMainStats);
        setValue('mainStatName', 'hp-percentage', options);
        break;
      default:
        setMainStats([]);
        setValue('mainStatName', '', options);
    }
  }, [watchType]);

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
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <RNPickerSelect
              onValueChange={onChange}
              value={value}
              items={sets}
            />
          )}
          name='set'
        />
        {errors.set && <Text>This is required.</Text>}

        <Text variant='labelLarge' style={styles.label}>Rarity</Text>
        <SafeAreaView>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <SegmentedButtons
                value={value}
                onValueChange={onChange}
                buttons={rarities}
              />
            )}
            name='rarity'
          />
          {errors.rarity && <Text>This is required.</Text>}
        </SafeAreaView>

        <Text variant='labelLarge' style={styles.label}>Type</Text>
        <SafeAreaView>
        <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <SegmentedButtons
                value={value}
                onValueChange={(e) => {
                  onChange(e);

                }}
                buttons={types}
              />
            )}
            name='type'
          />
          {errors.type && <Text>This is required.</Text>}
        </SafeAreaView>

        <Text variant='labelLarge' style={styles.label}>Main Stat</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <RNPickerSelect
              onValueChange={onChange}
              value={value}
              items={mainStats}
            />
          )}
          name='mainStatName'
        />
        {errors.mainStatName && <Text>This is required.</Text>}
      </View>

      {
        // TODO: Redirect to artifact list screen after submission
      }
      <FAB
        icon='pencil'
        style={styles.fab}
        onPress={handleSubmit(onSubmit)}
      />
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
