// app/screens/BookDetails.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import TopHeader from '../components/TopHeader';

export default function BookDetails() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Parse the book object from params
  const book = params.book ? JSON.parse(params.book) : null;
  
  const [isLiked, setIsLiked] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!book) {
    return (
      <SafeAreaView style={styles.container}>
        <TopHeader showBackButton={true} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Book not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleStartReading = () => {
    router.push({
      pathname: '/screens/Reader',
      params: { book: JSON.stringify(book) }
    });
  };

  const handleBuyNow = () => {
    console.log('Buy Now clicked for:', book.title);
    // Implement purchase flow
  };

  const handleAddToLikes = () => {
    setIsLiked(!isLiked);
    console.log(isLiked ? 'Removed from likes' : 'Added to likes');
  };

  const handleAddToCart = () => {
    setAddedToCart(true);
    console.log('Added to cart:', book.title);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <TopHeader 
        showBackButton={true}
        onBackPress={() => router.push('/screens/Home')}
        title="Book Details"
        showCart={!book.isOwned}
        showNotifications={!book.isOwned}
        showProfile={!book.isOwned}
      />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Book Card */}
        <View style={styles.bookCard}>
          <View style={styles.bookCardContent}>
            {/* Book Cover */}
            <View style={styles.coverContainer}>
              <Image 
                source={{ uri: book.image }} 
                style={styles.bookCover}
                resizeMode="cover"
              />
            </View>

            {/* Book Info */}
            <View style={styles.bookInfo}>
              <Text style={styles.bookTitle} numberOfLines={3}>
                {book.title}
              </Text>
              <Text style={styles.bookAuthor} numberOfLines={2}>
                {book.author}
              </Text>

              {/* Badge Area */}
              {book.isOwned ? (
                <View style={styles.ownedBadge}>
                  <Ionicons name="checkmark-circle" size={16} color="#111A50" />
                  <Text style={styles.ownedText}>Owned</Text>
                </View>
              ) : (
                <View style={styles.priceContainer}>
                  {book.originalPrice && (
                    <Text style={styles.originalPrice}>
                      Php {book.originalPrice.toFixed(0)}
                    </Text>
                  )}
                  <View style={styles.priceBadge}>
                    <Text style={styles.priceLabel}>Php</Text>
                    <Text style={styles.priceText}>{book.price.toFixed(0)}</Text>
                  </View>
                </View>
              )}
            </View>
          </View>

          {/* Progress Bar (Owned Books Only) */}
          {book.isOwned && (
            <View style={styles.progressSection}>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: `${book.progress}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.progressText}>{book.progress}%</Text>
              </View>
              <View style={styles.chapterContainer}>
                <Ionicons name="book-outline" size={14} color="#666" />
                <Text style={styles.chapterText}>{book.currentChapter}</Text>
              </View>
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            {book.isOwned ? (
              <TouchableOpacity 
                style={styles.startReadingButton}
                onPress={handleStartReading}
                activeOpacity={0.8}
              >
                <Ionicons name="book-outline" size={20} color="#fff" />
                <Text style={styles.startReadingText}>Start Reading</Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity 
                  style={styles.buyNowButton}
                  onPress={handleBuyNow}
                  activeOpacity={0.8}
                >
                  <Ionicons name="cart" size={18} color="#fff" />
                  <Text style={styles.buyNowText}>Buy Now</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.iconButton, isLiked && styles.iconButtonActive]}
                  onPress={handleAddToLikes}
                  activeOpacity={0.8}
                >
                  <Ionicons 
                    name={isLiked ? "heart" : "heart-outline"} 
                    size={20} 
                    color={isLiked ? "#FF4444" : "#111A50"} 
                  />
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[
                    styles.iconButton, 
                    addedToCart && styles.iconButtonActive
                  ]}
                  onPress={handleAddToCart}
                  activeOpacity={0.8}
                  disabled={addedToCart}
                >
                  <Ionicons 
                    name={addedToCart ? "checkmark-circle" : "cart-outline"} 
                    size={20} 
                    color="#111A50" 
                  />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

        {/* Description Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>
            {book.description || 'Explore the comprehensive guide to human anatomy with detailed illustrations and expert insights. Perfect for students and medical professionals alike. This edition includes updated content with the latest research and findings in the field of anatomical sciences.'}
          </Text>
        </View>

        {/* Category Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Category</Text>
          <View style={styles.categoryChips}>
            {(book.categories || ['Medicine', 'Anatomy']).map((category, index) => (
              <View key={index} style={styles.categoryChip}>
                <Text style={styles.categoryChipText}>{category}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* About the Author */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About the Author</Text>
          <View style={styles.authorContainer}>
            <View style={styles.authorAvatar}>
              <Ionicons name="person" size={24} color="#111A50" />
            </View>
            <Text style={styles.authorName}>{book.author}</Text>
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'FunnelSans-Regular',
  },
  bookCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  bookCardContent: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  coverContainer: {
    marginRight: 20,
  },
  bookCover: {
    width: 120,
    height: 180,
    borderRadius: 12,
  },
  bookInfo: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 6,
    lineHeight: 26,
    fontFamily: 'STIXTwoText-Bold',
  },
  bookAuthor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    fontFamily: 'FunnelSans-Regular',
  },
  ownedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#111A50',
  },
  ownedText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111A50',
    marginLeft: 4,
    fontFamily: 'FunnelSans-Regular',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
    fontFamily: 'FunnelSans-Regular',
  },
  priceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FCECDD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FF8C42',
  },
  priceLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111A50',
    marginRight: 4,
    fontFamily: 'FunnelSans-Regular',
  },
  priceText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111A50',
    fontFamily: 'FunnelSans-Regular',
  },
  progressSection: {
    marginBottom: 16,
    gap: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 10,
    backgroundColor: '#e8f5e9',
    borderRadius: 5,
    overflow: 'hidden',
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#111A50',
    borderRadius: 5,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111A50',
    width: 45,
    fontFamily: 'FunnelSans-Regular',
  },
  chapterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  chapterText: {
    fontSize: 13,
    color: '#666',
    fontFamily: 'FunnelSans-Light',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  startReadingButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111A50',
    paddingVertical: 14,
    borderRadius: 26,
    gap: 8,
  },
  startReadingText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'FunnelSans-Regular',
  },
  buyNowButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF8C42',
    paddingVertical: 14,
    borderRadius: 26,
    gap: 8,
  },
  buyNowText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'FunnelSans-Regular',
  },
  iconButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#111A50',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonActive: {
    backgroundColor: '#f1f8f4',
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 20,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
    fontFamily: 'STIXTwoText-Bold',
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    fontFamily: 'FunnelSans-Light',
  },
  categoryChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    backgroundColor: '#f0f4ff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#111A50',
  },
  categoryChipText: {
    fontSize: 13,
    color: '#111A50',
    fontWeight: '600',
    fontFamily: 'FunnelSans-Regular',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  authorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f4ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  authorName: {
    fontSize: 16,
    color: '#1a1a1a',
    fontWeight: '600',
    fontFamily: 'FunnelSans-Regular',
  },
  bottomSpacing: {
    height: 30,
  },
});