import { Card, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import setLabels from '../../data/set-labels.json';
import subStats from '../../data/substats.json';

export default function ArtifactItem({ data }) {
    return (
        <Card style={styles.card}>
            <Text>{ setLabels[data.set] }</Text>
            <Text>{ data.type }</Text>
            <Text>{ data.mainStatName } : { data.mainStatValue }</Text>
            {subStats.map((subStat) => {
                if (parseFloat(data[subStat.value]) !== 0) {
                    return (
                        <Text>{ subStat.label } : {data[subStat.value]}</Text>
                    )
                }
            })
            }
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
      padding: 16,
      margin: 16,
    },
  });