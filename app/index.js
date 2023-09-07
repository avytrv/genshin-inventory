import { StyleSheet, View } from 'react-native';
import { Appbar, FAB } from 'react-native-paper';
import { Link } from "expo-router";

export default function Page() {
  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content
          title='Artifact Inventory'
          titleStyle={styles.title}
        />
      </Appbar.Header>
      <Link href='/add' asChild>
        <FAB
          icon='plus'
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
