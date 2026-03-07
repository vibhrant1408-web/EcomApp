import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, setProductsLoading, setProductsError } from '../redux/slices/productsSlice';
import { colors, spacing } from '../utils/theme';
import { productApi } from '../services/api';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';
import SearchBar from '../components/SearchBar';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('women');
  const itemsPerPage = 10;
  const { width } = Dimensions.get('window');

  useEffect(() => {
    loadProducts(1, true);
  }, []);

  const loadProducts = async (pageNum, isRefresh = false) => {
    try {
      if (isRefresh) {
        dispatch(setProductsLoading(true));
      } else {
        setLoadingMore(true);
      }
      
      const data = await productApi.getAllProducts();
      const startIndex = (pageNum - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedData = data.slice(startIndex, endIndex);

      if (isRefresh) {
        setAllProducts(data);
        dispatch(setProducts(paginatedData));
        setPage(1);
        setHasMore(data.length > itemsPerPage);
      } else {
        const newProducts = [...allProducts];
        setAllProducts(newProducts);
        dispatch(setProducts([...products, ...paginatedData]));
        setPage(pageNum);
        setHasMore(endIndex < data.length);
      }
    } catch (error) {
      dispatch(setProductsError(error.message));
    } finally {
      if (isRefresh) {
        dispatch(setProductsLoading(false));
      } else {
        setLoadingMore(false);
      }
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadProducts(1, true);
    setRefreshing(false);
  };

  const handleEndReached = () => {
    if (hasMore && !loadingMore && !loading) {
      loadProducts(page + 1, false);
    }
  };

  const handleSearch = (query) => {
    navigation.navigate('Discover', { searchQuery: query });
  };

  const renderBanner1 = () => (
    <View style={{ width: width, alignItems: 'center', marginBottom: spacing.lg, gap: 20, paddingHorizontal: 20, marginTop: spacing.lg }}>
      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}> 
        <TouchableOpacity onPress={() => setSelectedCategory('women')}>
          <View style={[selectedCategory === 'women' ? styles.categoryButtonSelected : styles.categoryButtonNotSelected]}>
            <View style={[styles.categoryButton, selectedCategory === 'women' && { backgroundColor: '#FCFCFD' }]}>
              <Image
                source={require('../assets/female.png')}
                style={{  width: 12.5, height: 20, resizeMode: 'contain', tintColor: selectedCategory === 'women' ? '#3A2C27' : '#B1B5C3' }}
              />
            </View>
          </View>
          <Text style={[styles.categoryText, selectedCategory === 'women' && { color: '#FCFCFD' }]}>Women</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedCategory('men')}>
          <View style={[selectedCategory === 'men' ? styles.categoryButtonSelected : styles.categoryButtonNotSelected]}>
          <View style={[styles.categoryButton, selectedCategory === 'men' && { backgroundColor: '#FCFCFD' }]}>
            <Image
              source={require('../assets/male.png')}
              style={{  width: 17, height: 16.11, resizeMode: 'contain', tintColor: selectedCategory === 'men' ? '#3A2C27' : '#B1B5C3' }}
            />
          </View>
          </View>
          <Text style={[styles.categoryText, selectedCategory === 'men' && { color: '#FCFCFD' }]}>Men</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedCategory('accessories')}>
          <View style={[selectedCategory === 'accessories' ? styles.categoryButtonSelected : styles.categoryButtonNotSelected]}>
          <View style={[styles.categoryButton, selectedCategory === 'accessories' && { backgroundColor: '#FCFCFD' }]}>
            <Image
              source={require('../assets/glasses.png')}
              style={{  width: 20.8, height: 14.3, resizeMode: 'contain', tintColor: selectedCategory === 'accessories' ? '#3A2C27' : '#B1B5C3' }}
            />
          </View>
          </View>
          <Text style={[styles.categoryText, selectedCategory === 'accessories' && { color: '#FCFCFD' }]}>Accessories</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedCategory('beauty')}>
          <View style={[selectedCategory === 'beauty' ? styles.categoryButtonSelected : styles.categoryButtonNotSelected]}>
          <View style={[styles.categoryButton, selectedCategory === 'beauty' && { backgroundColor: '#FCFCFD' }]}>
            <Image
              source={require('../assets/screwdriver.png')}
              style={{  width: 24, height: 24, resizeMode: 'contain', tintColor: selectedCategory === 'beauty' ? '#3A2C27' : '#B1B5C3' }}
            />
          </View>
          </View>
          <Text style={[styles.categoryText, selectedCategory === 'beauty' && { color: '#FCFCFD' }]}>Beauty</Text>
        </TouchableOpacity>
      </View>   
        <Image
          source={require('../assets/banner1.png')}
          style={{  width: '100%', height: 175, resizeMode: 'stretch' }}
        />
      </View>
  );

  const renderBanner2 = () => (
    <View style={{ width: width, alignItems: 'center', marginBottom: spacing.lg, gap: 20 }}>
        <Image
          source={require('../assets/banner2.png')}
          style={{  width: '100%', height: 160, resizeMode: 'stretch' }}
        />
      </View>
  );

  const renderBanner3 = () => (
    <View style={{ width: width, alignItems: 'center', marginBottom: spacing.lg, gap: 20, paddingHorizontal: 20, marginTop: spacing.lg }}>
         <Text style={styles.collectionTitle}>Top Collection</Text>
        <Image
          source={require('../assets/banner3.png')}
          style={{  width: '100%', height: 142, resizeMode: 'stretch' }}
        />
        <Image
          source={require('../assets/banner4.png')}
          style={{  width: '100%', height: 210, resizeMode: 'stretch' }}
        />
        <Image
          source={require('../assets/banner5.png')}
          style={{  width: '100%', height: 195, resizeMode: 'stretch' }}
        />
      </View>
  );

  const renderItem = ({ item }) => (
    <ProductCard
      product={item}
      onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
    />
  );

  const renderRecommendedItem = ({ item }) => (
    <TouchableOpacity style={styles.recommendedCard} onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}>
      <Image
        source={{ uri: item.images?.[0] || 'https://via.placeholder.com/150' }}
        style={styles.recommendedImage}
        resizeMode="cover"
      />
      <View style={styles.recommendedCardContent}>
        <Text style={styles.recommendedTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.recommendedPrice}>${item.price?.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderList = () => (
    <View style={{ marginBottom: 5 }}>
        <Text style={styles.sectionTitle}>Feature Products</Text>
        <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        snapToInterval={240}
        decelerationRate="fast"
        contentContainerStyle={styles.horizontalContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
            <EmptyState
            title="No Products"
            description="Check back soon for new products!"
            />
        }
        ListFooterComponent={
            loadingMore && <Loading />
        }
        />
    </View>
  );

  const renderRecommendedList = () => (
    <View style={{ marginBottom: spacing.lg }}>
      <View style={styles.recommendedHeader}>
        <Text style={styles.sectionTitle}>Recommended</Text>
      </View>
      <FlatList
        data={products.slice(0, 6)}
        renderItem={renderRecommendedItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={true}
        contentContainerStyle={styles.recommendedListContent}
        numColumns={1}
      />
    </View>
  );

  if (loading && !refreshing) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title}>Stylinx</Text>
      </View>
      <ScrollView style={{ flex: 1 }} >
        {renderBanner1()}
        {renderList()}
        {renderBanner2()}
        {renderRecommendedList()}
        {renderBanner3()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2A2F37',
  },
  horizontalContent: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FCFCFD',
    alignSelf: 'center',
  },
  topContainer: {
    paddingVertical: spacing.lg,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginHorizontal: spacing.md,
  },
  collectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    alignSelf: 'flex-start',
  },
  recommendedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingHorizontal: spacing.md,
  },
  showAll: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  recommendedListContent: {
    paddingHorizontal: spacing.md,
    gap: 15,
  },
  recommendedCard: {
    width: 215,
    height: 66,
    flexDirection: 'row',
    backgroundColor: '#141416',
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 15,
    elevation: 1,
  },
  recommendedImage: {
    width: 66,
    height: 66,
    backgroundColor: colors.gray_100,
    borderRadius: 8,
  },
  recommendedCardContent: {
    flex: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    justifyContent: 'center',
  },
  recommendedTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FCFCFD',
    marginBottom: 2,
  },
  recommendedPrice: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FCFCFD',
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '300',
    color: '#FFFFFF',
    alignSelf: 'center',
    marginTop: 4,
  },
  categoryButton: {
    backgroundColor: '#23262F',
    borderRadius: 40,
    width: 38,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryButtonSelected: { 
    padding: 4, 
    width: 50, 
    height: 50, 
    alignItems: 'center', 
    justifyContent: 'center', 
    borderWidth: 1, 
    borderColor: '#FCFCFD', 
    borderRadius: 50,
    backgroundColor: '#2A2F37'
  },
  categoryButtonNotSelected: { 
    width: 40, 
    height: 40, 
    alignItems: 'center', 
    justifyContent: 'center',
  }
});

export default HomeScreen;
