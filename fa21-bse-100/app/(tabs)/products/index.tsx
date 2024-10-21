import { View, FlatList, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import ProductItems from '@/compoents/products/ProductItems';

interface ProductState {
  category: string;
  id: number;
  inStock: boolean;
  name: string;
}

const products = () => {
  const [products, setProducts] = useState<ProductState[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Snacks']; // Example categories

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    fetch('https://simple-grocery-store-api.online/products')
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
      });
  };

  const filterProducts = () => {
    if (selectedCategory === 'All') return products;
    return products.filter((product) => product.category === selectedCategory);
  };

  const renderProductItem = ({ item, index }: { item: ProductState; index: number }) => {
    // Determine the size of the card based on index
    const isFirstCardBigger = index % 2 === 0; // Alternate bigger/smaller card per row
    const cardStyle = isFirstCardBigger ? styles.bigCard : styles.smallCard;

    return (
      
        <ProductItems item={item} />
    
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Category Row */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryRow}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Product Grid with alternating card sizes */}
      <FlatList
        data={filterProducts()}
        numColumns={2} // Keep two items per row
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProductItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  categoryRow: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f8f8f8',
  },
  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    marginRight: 10,
  },
  selectedCategoryButton: {
    backgroundColor: '#00C853',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  selectedCategoryText: {
    color: '#FFF',
  },

  // Card styles for alternating sizes
  bigCard: {
    width: '40%', // Bigger card takes more space
    backgroundColor: '#FFF',
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  smallCard: {
    width: '40%', // Smaller card takes less space
    backgroundColor: '#FFF',
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  }
});

export default products;
