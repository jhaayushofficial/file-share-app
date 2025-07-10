# Ayush File Sharing

A simple full-stack application for uploading, sharing, and tracking downloads of files. Built with React (frontend) and Node.js/Express/MongoDB (backend).

## Features

### Backend (Node.js/Express/MongoDB)

- **File Upload:** Accepts file uploads (up to 10MB) and stores them on the server.
- **File Download:** Allows users to download files via a unique link.
- **Download Counter:** Tracks and displays the number of times each file has been downloaded.
- **File Info API:** Provides metadata (name, download count, etc.) for each uploaded file.
- **RESTful API Endpoints:**
  - `POST /upload` — Upload a file.
  - `GET /file/:fileId` — Download a file by its ID.
  - `GET /file-info/:fileId` — Get file metadata by its ID.

### Frontend (React)

- **Drag & Drop Upload:** User-friendly drag-and-drop or click-to-select file upload interface.
- **File Preview:** Shows a preview for images and the first 10 lines of text files before upload.
- **Upload Progress & Feedback:** Displays upload status and error messages.
- **Shareable Link:** Generates a unique download link after upload, with a one-click copy button.
- **Download Counter:** Shows how many times the file has been downloaded.
- **Responsive UI:** Clean, modern, and responsive design.

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm
- MongoDB instance (local or cloud, e.g., MongoDB Atlas)

### Backend Setup

1. **Install dependencies:**

   ```bash
   cd server
   npm install
   ```

2. **Configure environment variables:**

   - Create a `.env` file in the `server/` directory:
     ```
     MONGO_URI=your_mongodb_connection_string
     ```
   - Replace `your_mongodb_connection_string` with your actual MongoDB URI.

3. **Start the backend server:**
   ```bash
   npm start
   ```
   The server will run on [http://localhost:8000](http://localhost:8000).

### Frontend Setup

1. **Install dependencies:**

   ```bash
   cd client
   npm install
   ```

2. **Start the frontend development server:**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173) (or as indicated in your terminal).

## API Endpoints

| Method | Endpoint             | Description             |
| ------ | -------------------- | ----------------------- |
| POST   | `/upload`            | Upload a file           |
| GET    | `/file/:fileId`      | Download a file by ID   |
| GET    | `/file-info/:fileId` | Get file metadata by ID |

## File Model

Each uploaded file is stored with the following metadata:

- `path`: Server path to the file
- `name`: Original filename
- `downloadCount`: Number of times downloaded

## Notes

- Maximum file size: **10MB**
- Supported file types: Any (with preview for images and text files)
- Uploaded files are stored in the `server/uploads/` directory.

## License

This project is licensed under the ISC License.
