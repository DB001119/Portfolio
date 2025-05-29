import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config.ts';

export interface ContactFormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactSubmission extends ContactFormData {
  timestamp: any;
  status: 'new' | 'read' | 'responded';
  id?: string;
}

export const submitContactForm = async (data: ContactFormData): Promise<string> => {
  try {
    const submission: Omit<ContactSubmission, 'id'> = {
      ...data,
      timestamp: serverTimestamp(),
      status: 'new'
    };

    const docRef = await addDoc(collection(db, 'contact-submissions'), submission);
    console.log('Contact form submitted with ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error submitting contact form: ', error);
    throw new Error('Failed to submit contact form. Please try again.');
  }
};

// You can add more functions here like:
// - getContactSubmissions() to retrieve all submissions
// - markAsRead() to update submission status
// - deleteSubmission() to remove a submission 