import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  setProducts,
  setCategories,
  setProductsLoading,
  setProductsError,
  setSearchQuery,
  setSelectedCategory,
} from '../redux/slices/productsSlice';
import { colors, spacing } from '../utils/theme';
import { productApi } from '../services/api';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';
import SearchBar from '../components/SearchBar';
import CategoryChip from '../components/CategoryChip';

const DiscoverScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { filteredProducts, categories, loading, filters } = useSelector((state) => state.products);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (route.params?.searchQuery) {
      dispatch(setSearchQuery(route.params.searchQuery));
    }
  }, [route.params?.searchQuery]);

  const loadData = async () => {
    try {
      dispatch(setProductsLoading(true));
      const [productsData, categoriesData] = await Promise.all([
        productApi.getAllProducts(),
        productApi.getAllCategories(),
      ]);
      dispatch(setProducts(productsData));
      dispatch(setCategories(categoriesData));
    } catch (error) {
      dispatch(setProductsError(error.message));
    } finally {
      dispatch(setProductsLoading(false));
    }
  };

  const handleSearch = (query) => {
    dispatch(setSearchQuery(query));
  };

  const handleCategorySelect = (categoryId) => {
    if (filters.selectedCategory === categoryId) {
      dispatch(setSelectedCategory(null));
    } else {
      dispatch(setSelectedCategory(categoryId));
    }
  };

  const renderItem = ({ item }) => (
    <ProductCard
      product={item}
      onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
    />
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
        <View style={styles.categoryContent}>
          {categories.map((category) => (
            <CategoryChip
              key={category.id}
              label={category.name}
              isSelected={filters.selectedCategory === category.id}
              onPress={() => handleCategorySelect(category.id)}
            />
          ))}
        </View>
      </ScrollView>
      <View style={{ height: '93%' }}>
      <SearchBar onSearch={handleSearch} />

      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.content}
        scrollEnabled={true}
        ListEmptyComponent={
          <EmptyState
            title="No Products Found"
            description="Try adjusting your filters or search query"
          />
        }
      />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23262F',
  },
  categoryContainer: {
    backgroundColor: '#23262F',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray_100,
    height: '7%',
  },
  categoryContent: {
    flexDirection: 'row',
  },
  content: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
  },
});

export default DiscoverScreen;
