import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/slices/cartSlice';
import { setCurrentOrder } from '../redux/slices/orderSlice';
import { colors, spacing, typography } from '../utils/theme';

const CheckoutScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState('credit');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    shippingMethod: 'free',
    couponCode: '',
    copyBillingAddress: false,
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  const [errors, setErrors] = useState({});
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };


  const validateShippingForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'Field is required';
    if (!formData.lastName) newErrors.lastName = 'Field is required';
    if (!formData.country) newErrors.country = 'Field is required';
    if (!formData.street) newErrors.street = 'Field is required';
    if (!formData.city) newErrors.city = 'Field is required';
    if (!formData.zipCode) newErrors.zipCode = 'Field is required';
    if (!formData.phone) newErrors.phone = 'Field is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleShippingSubmit = () => {
    if (validateShippingForm()) {
      setStep(2);
    }
  };

  const handlePaymentSubmit = () => {
    // if (formData.cardNumber && formData.expiryDate && formData.cvv) {
    //   const order = {
    //     id: Date.now(),
    //     date: new Date().toLocaleDateString(),
    //     items,
    //     total,
    //     shipping: {
    //       firstName: formData.firstName,
    //       lastName: formData.lastName,
    //       street: formData.street,
    //       city: formData.city,
    //       phone: formData.phone,
    //     },
    //   };
    //   dispatch(setCurrentOrder(order));
    //   dispatch(clearCart());
      
    // }
    setStep(3);
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {step === 1 ? (
        <Image  
          source={require('../assets/checkout1.png')}
          style={{ width: 266, height: 22, resizeMode: 'contain' }}
        />
      ) : (
        step === 2 ? (
          <Image  
            source={require('../assets/checkout2.png')}
            style={{ width: 266, height: 22, resizeMode: 'contain' }}
          />
        ) : (
          <Image  
            source={require('../assets/checkout3.png')}
            style={{ width: 266, height: 22, resizeMode: 'contain' }}
          />
        )
      )}
      
    </View>
  );

  const renderShippingForm = () => (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      <View style={{ paddingHorizontal: spacing.lg }}> 
      <Text style={styles.stepLabel}>STEP 1</Text>
      <Text style={styles.stepTitle}>Shipping</Text>

      <View style={styles.formRow}>
        <View style={styles.formColumn}>
          <Text style={styles.label}>First name *</Text>
          <TextInput
            style={[styles.input, errors.firstName && styles.inputError]}
            placeholder="First name"
            placeholderTextColor="#777E90"
            value={formData.firstName}
            onChangeText={(value) => handleInputChange('firstName', value)}
          />
          {errors.firstName && (
            <Text style={styles.errorText}>{errors.firstName}</Text>
          )}
        </View>
      </View>

      <View style={styles.formRow}>
        <View style={styles.formColumn}>
          <Text style={styles.label}>Last name *</Text>
          <TextInput
            style={[styles.input, errors.lastName && styles.inputError]}
            placeholder="Last name"
            placeholderTextColor="#999"
            value={formData.lastName}
            onChangeText={(value) => handleInputChange('lastName', value)}
          />
          {errors.lastName && (
            <Text style={styles.errorText}>{errors.lastName}</Text>
          )}
        </View>
      </View>

      <View style={styles.formRow}>
        <View style={styles.formColumn}>
          <Text style={styles.label}>Country *</Text>
          <TextInput
            style={[styles.input, errors.country && styles.inputError]}
            placeholder="Select country"
            placeholderTextColor="#999"
            value={formData.country}
            onChangeText={(value) => handleInputChange('country', value)}
          />
          {errors.country && (
            <Text style={styles.errorText}>{errors.country}</Text>
          )}
        </View>
      </View>

      <View style={styles.formRow}>
        <View style={styles.formColumn}>
          <Text style={styles.label}>Street name *</Text>
          <TextInput
            style={[styles.input, errors.street && styles.inputError]}
            placeholder="Street name"
            placeholderTextColor="#999"
            value={formData.street}
            onChangeText={(value) => handleInputChange('street', value)}
          />
          {errors.street && (
            <Text style={styles.errorText}>{errors.street}</Text>
          )}
        </View>
      </View>

      <View style={styles.formRow}>
        <View style={styles.formColumn}>
          <Text style={styles.label}>City *</Text>
          <TextInput
            style={[styles.input, errors.city && styles.inputError]}
            placeholder="City"
            placeholderTextColor="#999"
            value={formData.city}
            onChangeText={(value) => handleInputChange('city', value)}
          />
          {errors.city && (
            <Text style={styles.errorText}>{errors.city}</Text>
          )}
        </View>
      </View>

      <View style={styles.formRow}>
        <View style={styles.formColumn}>
          <Text style={styles.label}>State / Province</Text>
          <TextInput
            style={styles.input}
            placeholder="State / Province"
            placeholderTextColor="#999"
            value={formData.state}
            onChangeText={(value) => handleInputChange('state', value)}
          />
        </View>
      </View>

      <View style={styles.formRow}>
        <View style={styles.formColumn}>
          <Text style={styles.label}>Zip-code *</Text>
          <TextInput
            style={[styles.input, errors.zipCode && styles.inputError]}
            placeholder="Zip-code"
            placeholderTextColor="#999"
            value={formData.zipCode}
            onChangeText={(value) => handleInputChange('zipCode', value)}
            maxLength={6}
          />
          {errors.zipCode && (
            <Text style={styles.errorText}>{errors.zipCode}</Text>
          )}
        </View>
      </View>

      <View style={styles.formRow}>
        <View style={styles.formColumn}>
          <Text style={styles.label}>Phone number *</Text>
          <TextInput
            style={[styles.input, errors.phone && styles.inputError]}
            placeholder="Phone number"
            placeholderTextColor="#999"
            value={formData.phone}
            onChangeText={(value) => handleInputChange('phone', value)}
            keyboardType="phone-pad"
            maxLength={10}
          />
          {errors.phone && (
            <Text style={styles.errorText}>{errors.phone}</Text>
          )}
        </View>
      </View>

      <Text style={styles.shippingMethodTitle}>Shipping method</Text>

      <TouchableOpacity
        style={[styles.shippingOption, formData.shippingMethod === 'free' && styles.selectedShippingOption]}
        onPress={() => handleInputChange('shippingMethod', 'free')}
      >
        <View style={[styles.radioButton , formData.shippingMethod === 'free' && styles.selectedRadioButton]}>
          {formData.shippingMethod === 'free' && (
            <View style={styles.radioDot} />
          )}
        </View>
        <View style={styles.shippingContent}>
          <View style={styles.shippingHeader}>
            <Text style={styles.shippingBadge}>Free</Text>
            <Text style={styles.shippingMethod}>Delivery to home</Text>
          </View>
          <Text style={styles.shippingTime}>Delivery from 3 to 7 business days</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.shippingOption , formData.shippingMethod === 'standard' && styles.selectedShippingOption]}
        onPress={() => handleInputChange('shippingMethod', 'standard')}
      >
        <View style={[styles.radioButton , formData.shippingMethod === 'standard' && styles.selectedRadioButton]}>
          {formData.shippingMethod === 'standard' && (
            <View style={styles.radioDot} />
          )}
        </View>
        <View style={styles.shippingContent}>
          <View style={styles.shippingHeader}>
            <Text style={styles.shippingPrice}>$ 9.90</Text>
            <Text style={styles.shippingMethod}>Delivery to home</Text>
          </View>
          <Text style={styles.shippingTime}>Delivery from 4 to 6 business days</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.shippingOption, formData.shippingMethod === 'fast' && styles.selectedShippingOption]}
        onPress={() => handleInputChange('shippingMethod', 'fast')}
      >
        <View style={[styles.radioButton , formData.shippingMethod === 'fast' && styles.selectedRadioButton]}>
          {formData.shippingMethod === 'fast' && (
            <View style={styles.radioDot} />
          )}
        </View>
        <View style={styles.shippingContent}>
          <View style={styles.shippingHeader}>
            <Text style={styles.shippingPrice}>$ 9.90</Text>
            <Text style={styles.shippingMethod}>Fast Delivery</Text>
          </View>
          <Text style={styles.shippingTime}>Delivery from 2 to 3 business days</Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.couponTitle}>Coupon Code</Text>
      <View style={styles.couponInputWrapper}>
        <TextInput
          style={styles.couponInput}
          placeholder="Have a code? type it here..."
          placeholderTextColor="#999"
          value={formData.couponCode}
          onChangeText={(value) => handleInputChange('couponCode', value)}
        />
        <TouchableOpacity style={styles.validateButton}>
          <Text style={styles.validateButtonText}>Validate</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.couponTitle, { marginBottom: 0, marginTop: 30 }]}>Billing Address</Text>

      <View style={styles.billingAddressContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => handleInputChange('copyBillingAddress', !formData.copyBillingAddress)}
        >
          {formData.copyBillingAddress && (
            <View style={styles.checkboxInner} />
          )}
        </TouchableOpacity>
        <Text style={styles.billingAddressText}>Copy address data from shipping</Text>
      </View>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleShippingSubmit}
      >
        <Text style={styles.continueButtonText}>Continue to payment</Text>
      </TouchableOpacity>
      </View>
    </ScrollView>
  );
  const renderPaymentForm = () => (
    <View>
      <View style={{ paddingHorizontal: spacing.lg }}> 
      <Text style={styles.stepLabel}>STEP 2</Text>
      <Text style={styles.stepTitle}>Payment</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
        <TouchableOpacity onPress={() => setMode('cash')} style={{ alignItems: 'center', width: 95, height: 64, backgroundColor: mode === 'cash' ? '#FCFCFD' : '#23262F', borderRadius: 6, justifyContent: 'center', gap: 5 }}>
          <Image
            source={require('../assets/cash.png')}
            style={{ width: 36.50, height: 22, resizeMode: 'contain' }}
          />
          <Text style={{ color: mode === 'cash' ? '#141416' : '#E6E8EC', fontSize: 12, fontWeight: '500' }}>Cash</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMode('credit')} style={{ alignItems: 'center', width: 95, height: 64, backgroundColor: mode === 'credit' ? '#FCFCFD' : '#23262F', borderRadius: 6, justifyContent: 'center', gap: 5 }}>
          <Image
            source={require('../assets/creditcard.png')}
            style={{ width: 35.55, height: 22, resizeMode: 'contain', tintColor: mode === 'credit' ? '#141416' : '#E6E8EC' }}
          />
          <Text style={{ color: mode === 'credit' ? '#141416' : '#E6E8EC', fontSize: 12, fontWeight: '500' }}>Credit Card</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMode('more')} style={{ alignItems: 'center', width: 95, height: 64, backgroundColor: mode === 'more' ? '#FCFCFD' : '#23262F', borderRadius: 6, justifyContent: 'center', gap: 5 }}>
          <Image
            source={require('../assets/3dot.png')}
            style={{ width: 36.50, height: 8, resizeMode: 'contain', tintColor: mode === 'more' ? '#141416' : '#E6E8EC'  }}
          />
        </TouchableOpacity>
      </View>
      
      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: '700', color: '#E6E8EC' }}>Choose your card</Text>
        <Text style={{ fontSize: 12, fontWeight: '400', color: '#F20000' }}>Add New+</Text>
      </View>

      <View style={{ width: '100%', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20, gap: 20 }}>
        <Text style={{ fontSize: 12, fontWeight: '500', color: '#E6E8EC', alignSelf: 'flex-start' }}>or check out with</Text>
        <Image
            source={require('../assets/payments.png')}
            style={{ width: 292, height: 34, resizeMode: 'contain' }}
          />
      </View>
    </View>
      <View style={styles.orderSummaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Product price</Text>
          <Text style={styles.summaryValue}>${total.toFixed(2)}</Text>
        </View>
        <View style={[styles.summaryRow, styles.subtotalRow]}>
          <Text style={styles.summaryLabel}>Shipping</Text>
          <Text style={[styles.summaryValue, styles.freeShipping]}>Freeship</Text>
        </View>
        <View style={[styles.summaryRow, styles.subtotalRow]}>
          <Text style={styles.subtotalLabel}>Subtotal</Text>
          <Text style={styles.subtotalValue}>${total.toFixed(2)}</Text>
        </View>
        <View style={styles.termsContainer}>
          <TouchableOpacity
            style={styles.termsCheckbox}
            onPress={() => setAgreedToTerms(!agreedToTerms)}
          >
            {agreedToTerms && (
              <View style={styles.termsCheckboxInner} />
            )}
          </TouchableOpacity>
        <Text style={styles.termsText}>
          I agree to <Text style={styles.termsLink}>Terms and conditions</Text>
        </Text>
      </View>

      <TouchableOpacity
        style={styles.placeOrderButton}
        onPress={handlePaymentSubmit}
      >
        <Text style={styles.placeOrderButtonText}>Place my order</Text>
      </TouchableOpacity>
      </View>

      
        
        
    </View>
  );

  const renderConfirmation = () => (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false} contentContainerStyle={styles.confirmationContainer}>
      <Text style={styles.confirmationTitle}>Order Completed</Text>
      <View style={styles.successIcon}>
        <Image
          source={require('../assets/orderComfirm.png')}
          style={{ height: 102, width: 102, resizeMode: 'contain' }}
        />
      </View>
      <Text style={styles.confirmationSubtitle}>
        Thank you for your purchase.{'\n'}You can view your order in ‘My Orders’ {'\n'}section.
      </Text>

      {/* <View style={styles.orderDetails}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Order ID:</Text>
          <Text style={styles.detailValue}>{formData.firstName} {formData.lastName}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Total Amount:</Text>
          <Text style={styles.detailValue}>${total.toFixed(2)}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Delivery Address:</Text>
          <Text style={styles.detailValue}>{formData.street}</Text>
        </View>
      </View> */}

      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => {
          navigation.navigate('Home');
        }}
      >
        <Text style={styles.continueButtonText}>Continue Shopping</Text>
      </TouchableOpacity>
    </ScrollView>
  );


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
         <TouchableOpacity
                              onPress={() => navigation.goBack()}
                              // style={styles.backButton}
                            >
                              <Image
                                source={require('../assets/back.png')}
                                style={styles.backImage}
                                resizeMode="contain"
                              />
                            </TouchableOpacity>
        <Text style={styles.headerTitle}>Check out</Text>
        <View style={{ width: 24 }} />
      </View>

      {renderStepIndicator()}

      {step === 1 && renderShippingForm()}
      {step === 2 && renderPaymentForm()}
      {step === 3 && renderConfirmation()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1D26',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  backButton: {
    fontSize: 28,
    color: '#FCFCFD',
    fontWeight: '300',
  },
  content: {
    // paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  stepDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2C2F3A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#508A7B',
  },
  stepDotActive: {
    backgroundColor: '#508A7B',
  },
  stepDotText: {
    color: '#FCFCFD',
    fontWeight: '600',
    fontSize: 14,
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: '#2C2F3A',
    marginHorizontal: 8,
  },
  stepLineActive: {
    backgroundColor: '#508A7B',
  },
  stepLabel: {
    fontSize: 11,
    fontWeight: '300',
    color: '#FFFFFF',
    marginBottom: 8,

  },
  stepTitle: {
    fontSize: 25,
    fontWeight: '700',
    color: '#FCFCFD',
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#B1B5C3',
    marginBottom: 8,
  },
  formRow: {
    marginBottom: spacing.md,
  },
  formColumn: {
    flex: 1,
  },
  input: {
    // backgroundColor: '#2C2F3A',
    borderBottomWidth: 1,
    borderBottomColor: '#E6E8EC',
    paddingVertical: 12,
    paddingHorizontal: 0,
    fontSize: 14,
    color: '#FCFCFD',
  },
  inputText: {
    color: '#FCFCFD',
    fontSize: 14,
  },
  placeholderText: {
    color: '#999',
  },
  inputError: {
    borderBottomColor: '#F08C7D',
  },
  errorText: {
    color: '#981B1F',
    fontSize: 12,
    marginTop: 4,
  },
  shippingMethodTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FCFCFD',
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  shippingOption: {
    flexDirection: 'row',
    // backgroundColor: '#2C2F3A',
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    alignItems: 'flex-start',
  },
  selectedShippingOption: {
    flexDirection: 'row',
    backgroundColor: '#2C2F3A',
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
    alignItems: 'flex-start',
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    // backgroundColor: '#508A7B',
    marginRight: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    borderWidth: 2,
    borderColor: '#F4F5F6',
  },
   selectedRadioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#508A7B',
    marginRight: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    borderColor: '#508A7B',
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: '#141416',
  },
  shippingContent: {
    flex: 1,
  },
  shippingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  shippingBadge: {
    // backgroundColor: '#508A7B',
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 8,
  },
  shippingPrice: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 8,
  },
  shippingMethod: {
    color: '#E6E8EC',
    fontSize: 14,
    fontWeight: '500',
  },
  shippingTime: {
    color: '#E6E8EC',
    fontSize: 12,
  },
  couponTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FCFCFD',
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  couponInputWrapper: {
    position: 'relative',
    width: '100%',
  },
  couponInput: {
    width: '100%',
    backgroundColor: '#2C2F3A',
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    paddingRight: 90,
    color: '#FCFCFD',
    fontSize: 14,
  },
  validateButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  validateButtonText: {
    color: '#508A7B',
    fontSize: 14,
    fontWeight: '600',
  },
  billingAddressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#E6E8EC',
    borderRadius: 4,
    marginRight: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 12,
    height: 12,
    backgroundColor: '#508A7B',
    borderRadius: 2,
  },
  billingAddressText: {
    color: '#E6E8EC',
    fontSize: 14,
  },
  continueButton: {
    backgroundColor: '#FCFCFD',
    paddingVertical: spacing.md,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
    marginTop: 30,
    height: 48,
    width: 315,
    alignSelf: 'center',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#141416',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#2C2F3A',
    paddingVertical: spacing.md,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E6E8EC',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FCFCFD',
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  summary: {
    backgroundColor: '#2C2F3A',
    padding: spacing.md,
    borderRadius: 8,
    bottom: 0,
    width: '100%',
    margin: 0
  },
  orderSummaryContainer: {
    marginBottom: 40,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#2C2F3A',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderRightColor: '#2C2F3A',
    borderLeftColor: '#2C2F3A',
    backgroundColor: '#141416',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: spacing.lg,
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#E6E8EC',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FCFCFD',
  },
  freeShipping: {
    color: '#FCFCFD',
    fontWeight: '600',
  },
  subtotalRow: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#2C2F3A',
  },
  subtotalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FCFCFD',
  },
  subtotalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FCFCFD',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
    paddingHorizontal: spacing.lg,
    backgroundColor: '#141416',
    marginTop: 30
  },
  termsCheckbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#508A7B',
    borderRadius: 4,
    marginRight: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#141416',
  },
  termsCheckboxInner: {
    width: 12,
    height: 12,
    backgroundColor: '#508A7B',
    borderRadius: 2,
  },
  termsText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#E6E8EC',
    flex: 1,
  },
  termsLink: {
    color: '#E6E8EC',
    textDecorationLine: 'underline',
  },
  placeOrderButton: {
    backgroundColor: '#FCFCFD',
    paddingVertical: spacing.md,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
    marginHorizontal: spacing.lg,
    height: 48,
  },
  placeOrderButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#141416',
  },
  confirmationContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  successIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  successText: {
    fontSize: 40,
    fontWeight: '700',
    color: '#FCFCFD',
  },
  confirmationTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FCFCFD',
    alignSelf: 'flex-start',
    marginHorizontal: spacing.lg,
    marginBottom: 60,
  },
  confirmationSubtitle: {
    fontSize: 14,
    color: '#FCFCFD',
    marginBottom: spacing.xl,
    textAlign: 'center',
    marginTop: 30,
    fontWeight: '500',
  },
  orderDetails: {
    width: '100%',
    backgroundColor: '#2C2F3A',
    padding: spacing.lg,
    borderRadius: 8,
    marginBottom: spacing.xl,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E6E8EC',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FCFCFD',
  },
  backImage: {
    width: 32,
    height: 32,
  },
});

export default CheckoutScreen;
