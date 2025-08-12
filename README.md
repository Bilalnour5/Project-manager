# Project Manager Web App

## Overview

This is a full-stack Project Management application built with:
- Frontend: Vite + React (or your chosen framework)
- Backend: Django REST Framework
- Database: MySQL

## Features

- User authentication (login, registration, password reset)
- Project creation and management
- Task assignment and tracking
- Dashboard with project statistics

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (v16 or higher recommended)
- Python (3.8 or higher)
- MySQL
- npm/yarn/pnpm

## Installation

### Backend (Django)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up your environment variables:
   - Copy `.env.example` to `.env`
   - Fill in the required values

5. Run database migrations:
   ```bash
   python manage.py migrate
   ```

6. Create a superuser (admin):
   ```bash
   python manage.py createsuperuser
   ```

7. Run the development server:
   ```bash
   python manage.py runserver
   ```

### Frontend (Vite)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install  # or yarn or pnpm install
   ```

3. Set up your environment variables:
   - Copy `.env.example` to `.env`
   - Fill in the required values (especially the API base URL)

4. Run the development server:
   ```bash
   npm run dev
   ```

## Development

### Running Both Servers

For convenience during development, you can run both servers simultaneously:

1. In one terminal:
   ```bash
   cd backend && python manage.py runserver
   ```

2. In another terminal:
   ```bash
   cd frontend && npm run dev
   ```

The frontend will be available at `http://localhost:3000` and the backend API at `http://localhost:8000`.

### Testing

Backend tests:
```bash
cd backend && python manage.py test
```

Frontend tests:
```bash
cd frontend && npm test
```

## Deployment

### Backend

1. Set up your production environment variables
2. Collect static files:
   ```bash
   python manage.py collectstatic
   ```
3. Configure your production server (Gunicorn, uWSGI, etc.)

### Frontend

1. Build for production:
   ```bash
   npm run build
   ```
2. Deploy the generated files in the `dist` folder to your hosting provider

## Environment Variables

### Backend (.env)
```
SECRET_KEY=your_django_secret_key
DEBUG=True/False
DATABASE_URL=your_database_url
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=your_smtp_host
EMAIL_PORT=your_smtp_port
EMAIL_USE_TLS=True/False
EMAIL_HOST_USER=your_email
EMAIL_HOST_PASSWORD=your_email_password
```

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME=Project Manager
# Other frontend-specific variables
```

## Project Structure

```
project-manager/
├── backend/               # Django backend
│   ├── project_manager/   # Django project
│   ├── apps/              # Django apps (users, projects, tasks, etc.)
│   ├── manage.py
│   └── requirements.txt
├── frontend/              # Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/         # State management
│   │   ├── utils/
│   │   └── App.jsx/main.jsx
│   ├── package.json
│   └── vite.config.js
├── docs/                  # Documentation
└── README.md
```

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the [MIT License](LICENSE).

## Contact

Your Name - your.email@example.com

Project Link: [https://github.com/yourusername/project-manager](https://github.com/yourusername/project-manager)

## Acknowledgments

- [Vite](https://vitejs.dev/)
- [Django](https://www.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- Any other libraries or frameworks used
