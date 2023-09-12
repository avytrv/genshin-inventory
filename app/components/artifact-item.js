import { Text } from 'react-native-paper';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import labels from '../../data/labels.json';
import subStats from '../../data/substats.json';
import images from '../../helpers/images';
import artifactImages from '../../helpers/artifactImages';
import { Image } from 'expo-image';

function ArtifactItem({ data }) {
  return (
    <View
      className='flex rounded-md border border-slate-300 mx-4 my-2 p-4'
    >
      <View
        className='flex flex-row space-x-4 mb-2 items-center'
      >
        <Image
          className='w-20 h-20 rounded-full border border-slate-200 bg-slate-100'
          source={artifactImages[data.set][data.type]}
          contentFit='cover'
        />
        
        <View className='flex gap-y-1 shrink'>
          <View className='flex flex-row flex-wrap gap-x-1 items-center'>
            <Text variant='titleMedium'>{ labels[data.set] }</Text>
            <View className='flex flex-row items-center space-x-1'>
              <Image
                source={images[data.type]}
                style={{ width: 20, height: 20 }}
                contentFit='cover'
              />
              <Text variant='labelSmall'>{ labels[data.type] }</Text>
            </View>
          </View>
          <View className='flex flex-row space-x-1'>
            <Text variant='titleMedium' className='px-2 py-1 rounded-md bg-slate-100'>{ data.rarity }★</Text>
            <Text variant='titleMedium' className='px-2 py-1 rounded-md bg-slate-100'>Lvl { data.level }</Text>
          </View>
          
          <View
            className='flex flex-row space-x-1 items-center mb-1 font-bold'
          >
            <Text className='px-2 py-1 rounded-md bg-slate-100' variant='titleMedium'>{ labels[data.mainStatName] }</Text>
            <Text variant='titleMedium'>{data.mainStatValue}</Text>
          </View>
        </View>
      </View>
      
      <SafeAreaView>
        <FlatList
          data={subStats.filter((subStat) => !!(data[subStat.value]) && !!(parseFloat(data[subStat.value])))}
          scrollEnabled={false}
          renderItem={({ item }) => {
            return (
              <View key={uuidv4()} className='flex-grow flex flex-row w-1/2 mb-1 items-center space-x-1 flex-wrap'>
                <View className='flex flex-row mb-1 items-center space-x-1'>
                  <Image
                    source={images[item.value]}
                    style={{ width: 20, height: 20 }}
                    contentFit='cover'
                  />
                  <Text className='px-2 py-1 rounded-md bg-slate-100'>{ item.label }</Text>
                </View>
                <Text>{data[item.value]}</Text>
              </View>
              )
            }
          }
          numColumns={2}
          contentContainerStyle={{ flex: 0 }}
        />
      </SafeAreaView>
    </View>
  );
}

export default ArtifactItem;