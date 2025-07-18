# VunaHub - Agricultural Collection and Distribution System

## Features
VunaHub is a comprehensive agricultural platform that connects farmers, traders, transporters, and administrators in Kenya's agricultural ecosystem. Inspired by KTDA's tea model in Lari, Kiambu, VunaHub revolutionizes how agricultural products move from farm to market.
- **Multi-role Authentication**: Separate dashboards for farmers, traders, drivers, and administrators
- **Produce Management**: Farmers can list their produce, traders can browse and order
- **Collection System**: Optimized routes for drivers to collect produce
- **Real-time Updates**: SMS notifications and status tracking
- **Responsive Design**: Mobile-first design with excellent desktop experience
## Tech Stack
### Frontend
- React 18 with TypeScript
- Vite for development and building
- Tailwind CSS for styling
- shadcn/ui components
- Framer Motion for animations
- React Router for navigation
- Axios for API calls
### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT authentication
- bcryptjs for password hashing
- Twilio for SMS notifications
- OpenRouteService for route optimization
## Getting Started
### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- npm or pnpm
### Installation
1. Clone the repository:
```bash
git clone <repository-url>
cd VunaHub
```
2. Install backend dependencies:
```bash
cd server
npm install
```
3. Install frontend dependencies:
```bash
cd client/workspace/shadcn-ui
npm install
```
4. Set up environment variables:
**Backend (.env in server directory):**
```
MONGO_URI=mongodb://localhost:27017/vunahub
JWT_SECRET=your_jwt_secret_here
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
ORS_API_KEY=your_openrouteservice_api_key
PORT=5000
```
**Frontend (.env in client/workspace/shadcn-ui directory):**
```
VITE_API_URL=http://localhost:5000/api
```
### Running the Application
#### Option 1: Run both frontend and backend together
```bash
cd client/workspace/shadcn-ui
npm run dev:full
```
#### Option 2: Run separately

**Backend:**
```bash
cd server
npm run dev
```
**Frontend:**
```bash
cd client/workspace/shadcn-ui
npm run dev
```
The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
## User Roles
### Farmers
- Register and manage produce listings
- Track collection status
- Receive notifications about pickups
### Traders
- Browse available produce
- Place orders with farmers
- Track deliveries
### Drivers
- View optimized collection routes
- Update collection status
- Receive SMS notifications
### Administrators
- Manage all users and produce
- Monitor system statistics
- Oversee collection operations
## API Endpoints
### Authentication
- `POST /api/users/signup` - Register farmer/trader
- `POST /api/users/login` - Login
- `POST /api/users/driver-login` - Driver login
### Produce
- `GET /api/produce` - Get all produce (with filters)
- `POST /api/produce` - Create produce listing
- `PUT /api/produce/:id` - Update produce
- `DELETE /api/produce/:id` - Delete produce
### Users
- `GET /api/users/farmers` - Get farmers
- `GET /api/users/traders` - Get traders
- `POST /api/users/farmers` - Create farmer
- `POST /api/users/traders` - Create trader
## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
## License
This project is licensed under the MIT License.