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
import { SafeAreaView, StyleSheet, TextInput, View } from 'react-native';
import { Appbar, Button, SegmentedButtons, Text } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Slider from '@react-native-community/slider';

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
      level: 20,
      mainStatName: 'hp',
      mainStatValue: '0',
      hp: '0',
      hpPercentage: '0',
      atk: '0',
      atkPercentage: '0',
      def: '0',
      defPercentage: '0',
      elementalMastery: '0',
      energyRecharge: '0',
      critRate: '0',
      critDmg: '0',
    },
  });
  // TODO: Change onSubmit function to add artifact to database
  const onSubmit = (data) => console.log(data);
  const watchType = watch('type');
  const watchLevel = watch('level');

  useEffect(() => {
    const options = {
      shouldValidate: true,
    };
    switch(watchType) {
      case 'flower':
        setMainStats(flowerMainStats);
        setValue('mainStatName', 'hp', options);
        setValue('mainStatValue', '0', options);
        break;
      case 'plume':
        setMainStats(plumeMainStats);
        setValue('mainStatName', 'atk', options);
        setValue('mainStatValue', '0', options);
        break;
      case 'sands':
        setMainStats(sandsMainStats);
        setValue('mainStatName', 'hp-percentage', options);
        setValue('mainStatValue', '0', options);
        break;
      case 'goblet':
        setMainStats(gobletMainStats);
        setValue('mainStatName', 'hp-percentage', options);
        setValue('mainStatValue', '0', options);
        break;
      case 'circlet':
        setMainStats(circletMainStats);
        setValue('mainStatName', 'hp-percentage', options);
        setValue('mainStatValue', '0', options);
        break;
      default:
        setMainStats([]);
        setValue('mainStatName', '', options);
        setValue('mainStatValue', '0', options);
    }
  }, [watchType]);

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Appbar.Header>
          <Appbar.Content
            title='Add Artifact'
            titleStyle={styles.title}
          />
        </Appbar.Header>

        <View style={styles.form}>
          <Text variant='titleMedium'>Set</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <Picker
                onValueChange={onChange}
                selectedValue={value}
                style={styles.picker}
              >
                {sets.map((set) => (
                  <Picker.Item
                    label={set.label}
                    value={set.value} 
                    key={set.value}
                  />
                ))}
              </Picker>
            )}
            name='set'
          />
          {errors.set && <Text>This is required.</Text>}

          <Text variant='titleMedium'>Rarity</Text>
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

          <Text variant='titleMedium'>Type</Text>
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

          <Text variant='titleMedium'>Level</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <Slider
                minimumValue={1}
                maximumValue={20}
                value={value}
                onValueChange={onChange}
                minimumTrackTintColor='#edddf6'
                maximumTrackTintColor='#edddf6'
                thumbTintColor='#21182a'
                step={1}
              />
            )}
            name='level'
          />
          <Text variant='labelLarge'>{ watchLevel }</Text>
          {errors.set && <Text>This is required.</Text>}

          <Text variant='titleMedium'>Main stat</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <Picker
                onValueChange={onChange}
                selectedValue={value}
                style={styles.picker}
              >
                {mainStats.map((mainStat) => (
                  <Picker.Item
                    label={mainStat.label}
                    value={mainStat.value} 
                    key={mainStat.value}
                  />
                ))}
              </Picker>
            )}
            name='mainStatName'
          />
          {errors.mainStatName && <Text>This is required.</Text>}

          <Text variant='labelLarge'>Main stat value</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange} 
                keyboardType='numeric'
                style={styles.input}
                selectionColor='#edddf6'
              />
            )}
            name='mainStatValue'
          />
          {errors.mainStatValue && <Text>This is required.</Text>}

          <Text variant='titleMedium'>Sub stats</Text>

          {(subStats).map((subStat) => (
            <View>
              <Text variant='labelLarge' style={styles.label}>{subStat.label}</Text>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    value={value}
                    onChangeText={onChange} 
                    keyboardType='numeric'
                    style={styles.input}
                    selectionColor='#edddf6'
                  />
                )}
                name={subStat.value}
              />
            </View>
          ))}
          
          {
            // TODO: Redirect to artifact list screen after submission
          }
          <Button icon='pencil' mode='contained' onPress={handleSubmit(onSubmit)}>
            Add
          </Button>
        </View>
      </View>
    </KeyboardAwareScrollView>
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
  picker: {
    backgroundColor: 'rgb(237, 221, 246)',
  },
  label: {
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  fab: {
    position: 'absolute',
    margin: 32,
    right: 0,
    bottom: 0,
  },
});
