import React, { FC, useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  setProducts,
  setProductsLoading,
  setProductsError,
  setSearchQuery,
} from '../redux/actions';
import { productApi } from '../services/api';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import EmptyState from '../components/EmptyState';
import Loading from '../components/Loading';
import { colors, spacing, borderRadius } from '../utils/theme';
import { RootState } from '../redux/store';
import { Product } from '../redux/types';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { filteredProducts, loading, error, filters } = useSelector(
    (state: RootState) => state.products
  );
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (): Promise<void> => {
    try {
      dispatch(setProductsLoading(true));
      const data = await productApi.getAllProducts();
      dispatch(setProducts(data));
    } catch (err) {
      dispatch(setProductsError((err as Error).message || 'Failed to fetch products'));
    } finally {
      dispatch(setProductsLoading(false));
      setRefreshing(false);
    }
  };

  const onRefresh = (): void => {
    setRefreshing(true);
    fetchProducts();
  };

  const handleProductPress = (product: Product): void => {
    navigation.navigate('ProductDetails', { product });
  };

  if (loading && !filteredProducts.length) {
    return <Loading />;
  }

  // Split products into sections
  const horizontalList1 = filteredProducts.slice(0, 4);
  const singleCards1 = filteredProducts.slice(4, 7);
  const horizontalList2 = filteredProducts.slice(7, 11);
  const singleCards2 = filteredProducts.slice(11, 13);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <SearchBar
            placeholder="Search products..."
            onSearch={(text) => dispatch(setSearchQuery(text))}
            value={filters.searchQuery}
          />
        </View>

        {/* Error Message */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={fetchProducts}
            >
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Empty State */}
        {filteredProducts.length === 0 ? (
          <EmptyState
            title="No Products Found"
            description="Try adjusting your search or filters"
          />
        ) : (
          <>
            {/* Horizontal List 1 */}
            {horizontalList1.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Featured</Text>
                <FlatList
                  data={horizontalList1}
                  renderItem={({ item }) => (
                    <View style={styles.horizontalCard}>
                      <ProductCard
                        product={item}
                        onPress={() => handleProductPress(item)}
                      />
                    </View>
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  horizontal
                  scrollEnabled
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.horizontalListContent}
                />
              </View>
            )}

            {/* Single Cards 1 (3 items in grid) */}
            {singleCards1.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Popular Products</Text>
                <View style={styles.gridContainer}>
                  {singleCards1.map((item) => (
                    <View key={item.id.toString()} style={styles.singleCard}>
                      <ProductCard
                        product={item}
                        onPress={() => handleProductPress(item)}
                      />
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Horizontal List 2 */}
            {horizontalList2.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>New Arrivals</Text>
                <FlatList
                  data={horizontalList2}
                  renderItem={({ item }) => (
                    <View style={styles.horizontalCard}>
                      <ProductCard
                        product={item}
                        onPress={() => handleProductPress(item)}
                      />
                    </View>
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  horizontal
                  scrollEnabled
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.horizontalListContent}
                />
              </View>
            )}

            {/* Single Cards 2 (2 items) */}
            {singleCards2.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Best Deals</Text>
                <View style={styles.gridContainer2}>
                  {singleCards2.map((item) => (
                    <View key={item.id.toString()} style={styles.singleCard2}>
                      <ProductCard
                        product={item}
                        onPress={() => handleProductPress(item)}
                      />
                    </View>
                  ))}
                </View>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141416',
  },
  searchContainer: {
    paddingVertical: spacing.md,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: colors.white,
    marginBottom: spacing.md,
    marginHorizontal: spacing.lg,
  },
  horizontalListContent: {
    paddingHorizontal: spacing.lg,
  },
  horizontalCard: {
    width: 160,
    marginRight: spacing.md,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: spacing.lg,
  },
  gridContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: spacing.lg,
  },
  singleCard: {
    width: '31%',
    marginBottom: spacing.md,
  },
  singleCard2: {
    width: '48%',
    marginBottom: spacing.md,
  },
  errorContainer: {
    marginHorizontal: spacing.lg,
    marginVertical: spacing.md,
    padding: spacing.md,
    backgroundColor: '#ffebee',
    borderRadius: 8,
    alignItems: 'center',
  },
  errorText: {
    color: colors.danger,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: colors.danger,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 6,
  },
  retryText: {
    color: colors.white,
    fontWeight: '600' as const,
  },
});

export default HomeScreen;
