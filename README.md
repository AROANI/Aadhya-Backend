# OceanOS / Aadhya Backend Server

This is the complete backend for the OceanOS/Aadhya project, built from scratch using **NestJS**, **TypeORM**, and **PostgreSQL**.

## 🚀 Features Implemented
- **Child Management:** CRUD APIs to manage student profiles.
- **Assessment System:** Dynamic JSON-based questionnaire engine (supports PurpleVision, PurpleMind, etc.).
- **Authentication:** Phone-based login system with OTP verification.
- **Curriculum:** Management modules for Subjects and Activities.
- **Organization:** NGO and Role-based user management.

---

## 🛠️ Setup Instructions (Fresh Install)

Follow these steps to run the project on a new machine.

### Prerequisites
- **Docker Desktop** (Must be installed and running)
- **Git**

### Step 1: Clone the Repository
Open your terminal and run:
```bash
git clone [https://github.com/AROANI/Aadhya-Backend.git](https://github.com/AROANI/Aadhya-Backend.git)
cd Aadhya-Backend

### Step 2: Configure Environment

Create a new file named `.env` in the root folder and paste the following configuration:

```env
# PostgreSQL Database Settings
POSTGRES_USER=aadhya
POSTGRES_PASSWORD=aadhya_password
POSTGRES_DB=aadhya

# NestJS Application Settings
DATABASE_USERNAME=aadhya
DATABASE_PASSWORD=aadhya_password
DATABASE_NAME=aadhya
DATABASE_HOST=db
DATABASE_PORT=5432