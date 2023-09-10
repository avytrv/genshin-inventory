import { Card, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import labels from '../../data/labels.json';
import subStats from '../../data/substats.json';

function ArtifactItem({ data }) {
  return (
    <Card style={styles.card}>
      <Text variant='titleLarge'>{ labels[data.set] } | { labels[data.type] }</Text>
      <Text variant='titleMedium'>{ labels[data.mainStatName] } : { data.mainStatValue }</Text>
      {subStats.map((subStat) => {
        if (parseFloat(data[subStat.value]) !== 0) {
          return (
            <Text>{ subStat.label } : {data[subStat.value]}</Text>
            )
          }
        })}
      </Card>
  );
}
    
const styles = StyleSheet.create({
  card: {
    padding: 16,
    margin: 16,
  },
});

export default ArtifactItem;