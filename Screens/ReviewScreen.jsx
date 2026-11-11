import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from './ThemeContext';

const THEME_COLOR = '#078DD3';

const ReviewScreen = ({ route }) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
    const product = route?.params?.product;

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

  const [reviews, setReviews] = useState([
    {
      id: '1',
      name: 'Raju',
      rating: 5,
      comment: 'Excellent Product. Very Good quality',
      date: '10 Nov 2026',
    },
    {
      id: '2',
      name: 'Priya',
      rating: 4,
      comment: 'Good product and value for money.',
      date: '08 Nov 2026',
    },
    {
      id: '3',
      name: 'Arun',
      rating: 5,
      comment: 'I really likes the product. Recommended',
      date: '05 Nov 2026',
    },
  ]);

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((total, item) => total + item.rating, 0) / reviews.length
      : 0;

  const submitReview = () => {
    if (!comment.trim()) {
      Alert.alert('Feedback required', 'Please write your feedback.');
      return;
    }

    if (rating === 0) {
      Alert.alert('Rating required', 'Please select a star rating.');
      return;
    }

    const newReview = {
      id: Date.now().toString(),
      name: 'You',
      rating,
      comment: comment.trim(),
      date: new Date().toLocaleDateString('en-IN'),
    };
    setReviews((previousReviews) => [newReview, ...previousReviews]);
    setRating(0);
    setComment('');

    Alert.alert('Thank You!', 'Your review has been submitted.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Text style={styles.heading}>Customer Reviews</Text>
          <Text style={styles.subtitle}>
            {product?.title || 'Product feedback and ratings'}
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.average}>{averageRating.toFixed(1)}</Text>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons
                key={star}
                name={star <= Math.round(averageRating) ? 'star' : 'star-outline'}
                size={21}
                color="#F5A623"
              />
            ))}
          </View>
          <Text style={styles.reviewCount}>
            Based on {reviews.length} customer reviews
          </Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Write a Review</Text>
          <Text style={styles.label}>Rate this product</Text>
          <View style={styles.ratingInput}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setRating(star)}
                accessibilityRole="button"
                accessibilityLabel={`Rate ${star} out of 5 stars`}
              >
                <Ionicons
                  name={star <= rating ? 'star' : 'star-outline'}
                  size={32}
                  color="#F5A623"
                />
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.label}>Your feedback</Text>
          <TextInput
            style={styles.input}
            placeholder="Share your experience..."
            placeholderTextColor="#94A3B8"
            multiline
            numberOfLines={4}
            value={comment}
            onChangeText={setComment}
            textAlignVertical="top"
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={submitReview}
            accessibilityRole="button"
          >
            <Text style={styles.submitText}>Submit Review</Text>
            <Ionicons name="send-outline" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.reviewsSection}>
          <Text style={styles.sectionTitle}>
            What customers say ({reviews.length})
          </Text>
          {reviews.map((item) => (
            <View key={item.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {item.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{item.name}</Text>
                  <Text style={styles.date}>{item.date}</Text>
                </View>
                <View style={styles.smallStars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons
                      key={star}
                      name={star <= item.rating ? 'star' : 'star-outline'}
                      size={13}
                      color="#F5A623"
                    />
                  ))}
                </View>
              </View>
              <Text style={styles.comment}>{item.comment}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 18,
  },
  heading: {
    color: theme.text,
    fontSize: 26,
    fontWeight: '800',
  },
  subtitle: {
    marginTop: 6,
    color: theme.secondaryText,
    fontSize: 14,
  },
  summaryCard: {
    alignItems: 'center',
    padding: 20,
    marginBottom: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.border,
    backgroundColor: theme.card,
  },
  average: {
    color: theme.text,
    fontSize: 42,
    fontWeight: '800',
  },
  starsRow: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 4,
  },
  reviewCount: {
    marginTop: 8,
    color: theme.secondaryText,
    fontSize: 13,
  },
  formCard: {
    padding: 18,
    marginBottom: 24,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.border,
    backgroundColor: theme.card,
  },
  sectionTitle: {
    marginBottom: 14,
    color: theme.text,
    fontSize: 18,
    fontWeight: '700',
  },
  label: {
    marginBottom: 8,
    color: theme.secondaryText,
    fontSize: 14,
    fontWeight: '600',
  },
  ratingInput: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 18,
  },
  input: {
    minHeight: 110,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 12,
    color: theme.text,
    fontSize: 14,
    backgroundColor: theme.card,
  },
  submitButton: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 12,
    backgroundColor: THEME_COLOR,
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  reviewsSection: {
    marginBottom: 8,
  },
  reviewCard: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.border,
    backgroundColor: theme.card,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 21,
    backgroundColor: theme.background,
  },
  avatarText: {
    color: THEME_COLOR,
    fontSize: 16,
    fontWeight: '700',
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  userName: {
    color: theme.text,
    fontSize: 14,
    fontWeight: '700',
  },
  date: {
    marginTop: 3,
    color: theme.secondaryText,
    fontSize: 12,
  },
  smallStars: {
    flexDirection: 'row',
    gap: 1,
  },
  comment: {
    marginTop: 14,
    color: theme.secondaryText,
    fontSize: 14,
    lineHeight: 21,
  },
});

export default ReviewScreen;