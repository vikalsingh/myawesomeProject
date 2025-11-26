import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  getDBConnection,
  createItemsTable,
  getItems,
  insertItem,
  clearItems,
  deleteItem,
} from '../db/database';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const ListScreen = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const loadDataFromDB = async () => {
    try {
      setLoading(true);
      const db = await getDBConnection();
      await createItemsTable(db);
      const storedItems = await getItems(db);
      console.log('Loaded items from DB:', storedItems);
      setItems(storedItems);
      
    } catch (error) {
      console.log('Error loading data from DB:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSampleItem = async () => {
    try {
      const db = await getDBConnection();
      await insertItem(db, title, description);
      const updatedItems = await getItems(db);
      setItems(updatedItems);
      setDescription('');
      setTitle('');
    } catch (error) {
      console.log('Error inserting item:', error);
    }
  };

  const handleClear = async () => {
    try {
      const db = await getDBConnection();
      await clearItems(db);
      const updatedItems = await getItems(db);
      setItems(updatedItems);
    } catch (error) {
      console.log('Error clearing items:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const db = await getDBConnection();
      await deleteItem(db, id);
      const updatedItems = await getItems(db);
      setItems(updatedItems);
    } catch (error) {
      console.log('Error deleting item:', error);
    }
  }

  useEffect(() => {
    loadDataFromDB();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.textBox}>
        <Text style={styles.title}>{item.title}</Text>
        {item.description ? (
          <Text style={styles.description}>{item.description}</Text>
        ) : null}
      </View>
      <View style={styles.deleteBox}>
        <TouchableHighlight onPress={() => handleDelete(item.id)}>
          <Text>Del</Text>
        </TouchableHighlight>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.screenTitle}>Local DB Items</Text>
      </View>
      <TextInput style={styles.input} placeholder="Enter item title" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="Enter item description" value={description} onChangeText={setDescription} />
      

      <View style={styles.buttonsRow}>
        <TouchableOpacity style={styles.button} onPress={handleAddSampleItem}>
          <Text style={styles.buttonText}>Add Item</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleClear}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={item => String(item.id)}
          renderItem={renderItem}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No items yet. Add one.</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  headerRow: { marginBottom: 12 },
  screenTitle: { fontSize: 22, fontWeight: '600' },
  buttonsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
    borderWidth: 1,
  },
  buttonText: { fontSize: 16 },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 8,
  },
  textBox: { flex: 1, marginRight: 6 },
  title: { fontSize: 18, fontWeight: '500' },
  description: { fontSize: 14, color: '#555', marginTop: 4 },
  emptyText: { marginTop: 20, fontSize: 16 },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  deleteBox: {
    backgroundColor: '#f8d7da',
    padding: 6,
    borderRadius: 4,
  }
});
export default ListScreen;