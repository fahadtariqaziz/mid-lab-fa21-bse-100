import { View, FlatList, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    loadProducts();
  }, []);

  const saveProductsToStorage = async (products: ProductState[]) => {
    try {
      await AsyncStorage.setItem('products', JSON.stringify(products));
    } catch (error) {
      console.error('Failed to save products to storage:', error);
    }
  };

  const loadProducts = async () => {
    try {
      const savedProducts = await AsyncStorage.getItem('products');
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
      } else {
        getProducts();
      }
    } catch (error) {
        console.error('Failed to load products from storage: change in main', error);
    }
  };

  const getProducts = () => {
    fetch('https://simple-grocery-store-api.online/products')
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
        saveProductsToStorage(json); // Save fetched products to storage
      })
      .catch((error) => {
        console.error('Failed to fetch products:', error);
      });
  };

  const filterProducts = () => {
    if (selectedCategory === 'All') return products;
    return products.filter((product) => product.category === selectedCategory);
  };

  const renderProductItem = ({ item, index }: { item: ProductState; index: number }) => {
    const isFirstCardBigger = index % 2 === 0;
    const cardStyle = isFirstCardBigger ? styles.bigCard : styles.smallCard;

    return <ProductItems item={item} />;
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
              selectedCategory === category && styles.selectedCategoryButton,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Product Grid */}
      <FlatList
        data={filterProducts()}
        numColumns={2}
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
  bigCard: {
    width: '40%',
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
    width: '40%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
});

export default products;
