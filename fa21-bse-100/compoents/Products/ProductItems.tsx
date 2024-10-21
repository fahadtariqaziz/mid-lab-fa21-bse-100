import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

interface DataProp {
  item: {
    category: string;
    id: number;
    inStock: boolean;
    name: string;
  };
}

const ProductItems = ({ item }: DataProp) => {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: 'https://www.shutterstock.com/shutterstock/photos/2476606071/display_1500/stock-photo-variety-of-fruits-and-berries-on-a-wooden-table-the-table-fills-most-of-the-frame-and-the-fruits-2476606071.jpg' }}
        style={styles.image}
      />
      <Text style={styles.productName}>
        {item.name.length > 50 ? item.name.substring(0, 50) + "..." : item.name}
      </Text>
      <Text style={styles.category}>from {item.category}</Text>
      <Text style={styles.price}>$1.20 per piece</Text>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '45%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  productName: {
    fontWeight: '500',
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  category: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
    textAlign: 'center',
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 5,
    textAlign: 'center',
  },
  addButton: {
    marginTop: 10,
    backgroundColor: '#00C853',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
  },
  addButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ProductItems;
