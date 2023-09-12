import { Card, Text } from 'react-native-paper';
import { FlatList, StyleSheet, View } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import labels from '../data/labels.json';
import subStats from '../data/substats.json';
import images from '../lib/images';
import { Image } from 'expo-image';

function ArtifactItem({ data }) {
  return (
    <View
      className='flex rounded-md border border-slate-300 m-4 py-5 px-2 bg-white'
    >
      <Card.Content>
        <View
          className='flex flex-row space-x-4 mb-2 items-center shadow'
        >
          <Image
            className='rounded-full border border-slate-100 shadow bg-slate-100'
            style={{ width: 64, height: 64 }}
            contentFit='cover'
          />
          <View className='flex space-y-1'>
            <View className='flex flex-row space-x-2 items-center'>
              <Text variant='titleLarge'>{ labels[data.set] }</Text>
              <Image
                source={images[data.type]}
                style={{ width: 20, height: 20 }}
                contentFit='cover'
              />
              <Text variant='titleMedium'>{ labels[data.type] }</Text>
            </View>
            <View
              className='flex flex-row space-x-1 items-center mb-2 font-bold'
            >
              <Text className='px-2 py-1 rounded-md bg-slate-100' variant='titleMedium'>{ labels[data.mainStatName] }</Text>
              <Text variant='titleMedium'>{data.mainStatValue}</Text>
            </View>
          </View>
        </View>
        
        <FlatList
          horizontal={false}
          data={subStats.filter((subStat) => !!(data[subStat.value]) && !!(parseFloat(data[subStat.value])))}
          renderItem={({ item }) => {
            return (
              <View key={uuidv4()} className='flex-grow flex flex-row w-1/3 mb-1 items-center space-x-1'>
                <Image
                  source={images[item.value]}
                  style={{ width: 20, height: 20 }}
                  contentFit='cover'
                />
                <View
                  className='flex flex-row space-x-1 items-center'
                >
                  <Text className='px-2 py-1 rounded-md bg-slate-100'>{ item.label }</Text>
                  <Text>{data[item.value]}</Text>
                </View>
              </View>
              )
            }
          }
          numColumns={2}
          contentContainerStyle={{ flex: 0 }}
        />
        
      </Card.Content>
    </View>
  );
}
    
const styles = StyleSheet.create({
  card: {
    padding: 4,
    margin: 16,
  }
});

export default ArtifactItem;