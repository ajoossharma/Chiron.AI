# Career Compass

![Logo](public/logo.png)

Career Compass is an AI-powered career development platform that helps job seekers create professional resumes, generate tailored cover letters, and practice interview skills through interactive mock interviews.

## Features

### 📝 Resume Builder
- Interactive resume builder with customizable sections
- Multiple templates to choose from
- Easy entry forms to add experiences, skills, and education
- Export options to PDF and other formats

### ✉️ AI Cover Letter Generator
- Create custom cover letters for specific job applications
- AI-powered content suggestions based on your resume and job description
- Preview and edit functionality
- Save multiple versions for different job applications

### 🎯 Mock Interview Simulator
- Practice interview questions specific to your industry
- Performance tracking and analytics
- Feedback on your responses
- Statistics to track your improvement over time

### 📊 Dashboard
- Track your job application progress
- View analytics on your resume and cover letter performance
- Get insights into your interview strengths and areas for improvement

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **UI Components**: ShadCN UI
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (via Prisma ORM)
- **Authentication**: Next Auth
- **Caching**: Redis
- **Background Jobs**: Inngest
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Redis instance (for caching)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/career-compass.git
   cd career-compass
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables by creating a `.env` file in the root directory:
   ```
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/career_compass"
   
   # Authentication
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   
   # Optional services
   REDIS_URL="redis://localhost:6379"
   ```

4. Initialize the database
   ```bash
   npx prisma migrate dev
   ```

5. Run the development server
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Project Structure

```
├─ app/ - Next.js application routes and pages
│  ├─ (auth)/ - Authentication routes (sign-in, sign-up)
│  ├─ (main)/ - Main application features
│  │  ├─ ai-cover-letter/ - Cover letter generation feature
│  │  ├─ dashboard/ - User dashboard
│  │  ├─ interview/ - Mock interview simulator
│  │  ├─ onboarding/ - User onboarding flow
│  │  └─ resume/ - Resume builder functionality
├─ actions/ - Server actions for data operations
├─ components/ - Reusable UI components
│  └─ ui/ - ShadCN UI components
├─ data/ - Static data (FAQs, features, testimonials)
├─ hooks/ - Custom React hooks
├─ lib/ - Utility functions and service integrations
├─ prisma/ - Database schema and migrations
└─ public/ - Static assets
```

## Deployment

This application can be deployed on platforms like Vercel or Netlify:

```bash
# For Vercel
vercel

# For Netlify
netlify deploy
```

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework used
- [Tailwind CSS](https://tailwindcss.com/) - For styling
- [ShadCN UI](https://ui.shadcn.com/) - For UI components
- [Prisma](https://prisma.io/) - For database ORM
- [Next Auth](https://next-auth.js.org/) - For authentication
