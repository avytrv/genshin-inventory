import sets from '../../data/sets.json';
import rarities from '../../data/stars.json';
import types from '../../data/types.json';
import flowerMainStats from '../../data/flower-main-stats.json';
import plumeMainStats from '../../data/plume-main-stats.json';
import sandsMainStats from '../../data/sands-main-stats.json';
import gobletMainStats from '../../data/goblet-main-stats.json';
import circletMainStats from '../../data/circlet-main-stats.json';
import subStats from '../../data/substats.json';
import images from '../../lib/images';
import images from '../images';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, View } from 'react-native';
import { Appbar, Button, SegmentedButtons, Text } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Slider from '@react-native-community/slider';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { update, database, set, push, dataRef, ref, auth } from '../../firebase.js';
import { Image } from 'expo-image';

export default function Page() {
  const [ mainStats, setMainStats ] = useState([]);
  const [submissionSuccessful, setSubmissionSuccessful] = useState(false);

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

  const onSubmit = async (data) => {
    console.log(data); 

    try {
      const newItemRef = push(dataRef);
      await set(newItemRef, {
        "atk": data.atk,
        "atkPercentage": data.atkPercentage,
        "critDmg": data.critDmg,
        "type": data.type,
        "critRate": data.critRate,
        "def": data.def,
        "defPercentage": data.defPercentage,
        "elementalMastery": data.elementalMastery,
        "energyRecharge": data.energyRecharge,
        "hp": data.hp,
        "hpPercentage": data.hpPercentage,
        "level": data.level,
        "mainStatName": data.mainStatName,
        "mainStatValue": data.mainStatValue,
        "rarity": data.rarity,
        "set": data.set,
        "type": data.type,
      });
      const userId = auth.currentUser.uid;
      const userRef = ref(database, `users/${userId}/ownedItems`);
      update(userRef, {
        [newItemRef.key]: true
      })
      setSubmissionSuccessful(true);
    } catch(error) {
      console.error("Error submitting data:", error);
    }
  }
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

  if (submissionSuccessful) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, color: 'green' }}>Submission Successful!</Text>
        <Link href ="/">Go back to Login</Link>
      </View>
    );
  } else {
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
                      key={uuidv4()}
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
                      key={uuidv4()}
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
              <View key={uuidv4()}>
                <View style={styles.label}>
                  <Image
                      source={images[subStat.value]}
                      style={{ width: 20, height: 20 }}
                      contentFit='cover'
                  />
                  <Text variant='labelLarge'>
                    {subStat.label}
                  </Text>
                </View>
                
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
    borderWidth: 1,
    borderRadius: 8,
  },
  label: {
    marginBottom: 8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    margin: 32,
    right: 0,
    bottom: 0,
  },
  button: {
    backgroundColor: '#007BFF', 
    color: '#FFFFFF',   
    padding: 10,
  }
});
