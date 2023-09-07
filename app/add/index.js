import * as React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Appbar, FAB, SegmentedButtons, Text } from 'react-native-paper';
import { Link } from 'expo-router';

export default function Page() {
  const [artifactType, setArtifactType] = React.useState('');

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content
          title='Add Artifact'
          titleStyle={styles.title}
        />
      </Appbar.Header>
      <View style={styles.form}>
        <Text variant='labelLarge'>Artifact Type</Text>
        <SafeAreaView style={styles.artifactTypeButtons}>
          <SegmentedButtons
            value={artifactType}
            onValueChange={setArtifactType}
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
  },
  artifactTypeButtons: {
    flex: 1,
    marginTop: 8,
    alignItems: 'center',
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
