import { CheckoutFormState } from '../types/order';

export interface FormErrors {
  [key: string]: string;
}

export function validateCheckoutForm(form: CheckoutFormState): { isValid: boolean; errors: FormErrors } {
  const errors: FormErrors = {};

  if (!form.customerName.trim()) {
    errors.customerName = 'Please enter your full name';
  } else if (form.customerName.trim().length < 2) {
    errors.customerName = 'Name must be at least 2 characters';
  }

  const cleanPhone = form.phoneNumber.replace(/\D/g, '');
  if (!cleanPhone) {
    errors.phoneNumber = 'Phone number is required for WhatsApp confirmation';
  } else if (cleanPhone.length < 10) {
    errors.phoneNumber = 'Please enter a valid 10-digit mobile number';
  }

  if (form.deliveryMethod === 'delivery') {
    if (!form.deliveryAddress.trim()) {
      errors.deliveryAddress = 'Delivery address is required';
    } else if (form.deliveryAddress.trim().length < 8) {
      errors.deliveryAddress = 'Please enter a complete delivery address';
    }
  }

  if (!form.preferredDate) {
    errors.preferredDate = 'Please select your preferred date';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateCustomCakeEnquiry(data: {
  name: string;
  phone: string;
  preferredDate: string;
}): { isValid: boolean; errors: FormErrors } {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = 'Please provide your name';
  }

  const cleanPhone = data.phone.replace(/\D/g, '');
  if (!cleanPhone || cleanPhone.length < 10) {
    errors.phone = 'Please provide a valid 10-digit contact number';
  }

  if (!data.preferredDate) {
    errors.preferredDate = 'Please specify when the cake is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
