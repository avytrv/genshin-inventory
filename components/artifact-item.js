import { Card, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import labels from '../data/labels.json';
import subStats from '../data/substats.json';
import images from '../app/images';
import { Image } from 'expo-image';

function ArtifactItem({ data }) {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.label}>
          <Text variant='titleLarge'>{ labels[data.set] }</Text>
          <Image
                  source={images[data.type]}
                  style={{ width: 20, height: 20 }}
                  contentFit='cover'
                />
          <Text variant='titleLarge'>{ labels[data.type] }</Text>
        </View>
        
        <Text variant='titleMedium'>{ labels[data.mainStatName] } : { data.mainStatValue }</Text>
        {subStats.map((subStat) => {
          if (parseFloat(data[subStat.value]) !== 0) {
            return (
              <View key={uuidv4()} style={styles.label}>
                <Image
                  source={images[subStat.value]}
                  style={{ width: 20, height: 20 }}
                  contentFit='cover'
                />
                <Text>{ subStat.label } : {data[subStat.value]}</Text>
              </View>
              )
            }
        })}
      </Card.Content>
    </Card>
  );
}
    
const styles = StyleSheet.create({
  card: {
    padding: 4,
    margin: 16,
  },
  label: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});

export default ArtifactItem;