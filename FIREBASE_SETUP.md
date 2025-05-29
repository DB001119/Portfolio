# Firebase Setup Guide for Contact Form

This guide will help you set up Firebase Firestore to store contact form submissions from your portfolio website.

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter your project name (e.g., "dipan-portfolio")
4. Disable Google Analytics (optional for this use case)
5. Click "Create project"

## Step 2: Set up Firestore Database

1. In your Firebase project dashboard, click "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (you can configure security rules later)
4. Select a location closest to your users (e.g., us-central1)
5. Click "Done"

## Step 3: Get Firebase Configuration

1. In your Firebase project, click the gear icon ⚙️ and select "Project settings"
2. Scroll down to "Your apps" and click the web icon `</>`
3. Register your app with a nickname (e.g., "portfolio-web")
4. Copy the Firebase configuration object

## Step 4: Configure Environment Variables

1. Create a `.env` file in your project root (copy from `.env.example`)
2. Add your Firebase configuration:

```env
REACT_APP_FIREBASE_API_KEY=your-api-key-here
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=your-app-id
```

3. Replace the values with your actual Firebase config values

## Step 5: Configure Firestore Security Rules (Optional but Recommended)

In the Firestore Database section, go to "Rules" and update them:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to contact-submissions for all users
    // In production, you might want to restrict read access
    match /contact-submissions/{document} {
      allow create: if true; // Anyone can create submissions
      allow read: if false; // Restrict reading (you can change this for admin access)
    }
  }
}
```

## Step 6: Test the Form

1. Start your development server: `npm start`
2. Navigate to the contact section
3. Fill out and submit the form
4. Check your Firestore database for the new submission

## Step 7: View Submissions (Admin Panel)

To view submissions, you can:

1. Access them directly in the Firebase Console
2. Use the `ContactAdmin` component (add it to a protected route)
3. Create a simple admin page at `/admin` that uses the `ContactAdmin` component

## Additional Features You Can Add

### Email Notifications

Set up Firebase Functions to send email notifications when new forms are submitted:

```bash
npm install -g firebase-tools
firebase init functions
```

### Email Integration

Combine with EmailJS to also send emails while storing in Firestore:

```bash
npm install @emailjs/browser
```

### Real-time Updates

Use Firestore's real-time listeners to get instant notifications of new submissions.

## Security Best Practices

1. **Environment Variables**: Never commit your `.env` file to git
2. **Firestore Rules**: Configure proper security rules for production
3. **API Key Restrictions**: In Firebase Console, restrict your API key to specific domains
4. **Admin Access**: Implement proper authentication for admin features

## Troubleshooting

### Common Issues:

1. **"Firebase not initialized"**: Check if your environment variables are loaded correctly
2. **Permission denied**: Review your Firestore security rules
3. **CORS errors**: Make sure your domain is whitelisted in Firebase settings

### Testing in Development:

The form will work in development mode. To test:

1. Make sure all environment variables are set
2. Check the browser console for any Firebase errors
3. Verify submissions appear in your Firestore database

## MongoDB Alternative

If you prefer MongoDB instead of Firebase:

1. Set up MongoDB Atlas
2. Create a Node.js/Express backend
3. Create API endpoints for form submission
4. Update the `submitContactForm` function to call your API

The Firebase approach is recommended for frontend-only applications as it doesn't require a backend server.
