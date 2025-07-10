import { useState, useRef } from "react";
import { uploadFile, getFileInfo } from "./service/api.js";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null); // For preview content
  const [result, setResult] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [message, setMessage] = useState("");
  const [copySuccess, setCopySuccess] = useState("");
  const [downloadCount, setDownloadCount] = useState(null);

  const fileInputRef = useRef();

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.size <= 10 * 1024 * 1024) {
      await handleFileSelection(droppedFile);
    } else {
      setMessage("File is too large. Max size is 10MB.");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size <= 10 * 1024 * 1024) {
      await handleFileSelection(selectedFile);
    } else {
      setMessage("File is too large. Max size is 10MB.");
    }
  };

  // New: handle file selection and preview
  const handleFileSelection = async (selectedFile) => {
    setFile(selectedFile);
    setFilePreview(null);
    // Image preview
    if (selectedFile.type.startsWith("image/")) {
      setFilePreview({ type: "image", url: URL.createObjectURL(selectedFile) });
    } else if (selectedFile.type.startsWith("text/")) {
      // Text preview (first 10 lines or 500 chars)
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const lines = text.split("\n").slice(0, 10).join("\n");
        setFilePreview({ type: "text", content: lines });
      };
      reader.readAsText(selectedFile);
    } else {
      setFilePreview(null);
    }
    setMessage("");
    setResult("");
    setDownloadCount(null);
  };

  const handleFileUpload = async (selectedFile) => {
    setMessage("");
    setResult("");
    setDownloadCount(null);
    const data = new FormData();
    data.append("name", selectedFile.name);
    data.append("file", selectedFile);
    try {
      const response = await uploadFile(data);
      setResult(response.path);
      setMessage("File uploaded successfully!");
      // Extract fileId from response.path
      const match = response.path.match(/\/file\/(.+)$/);
      if (match && match[1]) {
        const fileId = match[1];
        const fileInfo = await getFileInfo(fileId);
        setDownloadCount(fileInfo.downloadCount);
      }
    } catch (err) {
      setMessage("Upload failed. Please try again.");
    }
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopySuccess("Link copied!");
      setTimeout(() => setCopySuccess(""), 2000);
    }
  };

  const handleDownload = async (e) => {
    // Allow the default link behavior (download)
    setTimeout(async () => {
      if (result) {
        const match = result.match(/\/file\/(.+)$/);
        if (match && match[1]) {
          const fileId = match[1];
          const fileInfo = await getFileInfo(fileId);
          setDownloadCount(fileInfo.downloadCount);
        }
      }
    }, 1000); // Wait 1 second to allow backend to update
  };

  return (
    <div
      className="main-wrapper"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/23547/pexels-photo.jpg')`,
      }}
    >
      <div className="container">
        <div className="wrapper">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              margin: "40px 0",
            }}
          >
            <span style={{ fontSize: "48px", lineHeight: 1 }}>📁</span>
            <h1 style={{ margin: 0 }}>Ayush File Sharing</h1>
          </div>
          <p className="subtitle">
            Upload your files and share the link with your friends
          </p>
          {/* File Preview Area */}
          {filePreview && (
            <div className="file-preview">
              {filePreview.type === "image" && (
                <img
                  src={filePreview.url}
                  alt="preview"
                  className="preview-image"
                />
              )}
              {filePreview.type === "text" && (
                <pre className="preview-text">{filePreview.content}</pre>
              )}
            </div>
          )}
          <div
            className={`drop-zone${isDragging ? " dragging" : ""}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={onUploadClick}
          >
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <span>
              {isDragging
                ? "Drop file here..."
                : "Drag & drop file here or click to select"}
            </span>
            <div className="file-size-info">Max file size: 10MB</div>
          </div>
          {file && (
            <button
              className="copy-btn"
              style={{ marginBottom: 16 }}
              onClick={() => handleFileUpload(file)}
            >
              Upload
            </button>
          )}
          {message && <div className="toast">{message}</div>}
          {result && (
            <div className="result-box">
              <div className="result-link">
                <a
                  href={result}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleDownload}
                >
                  {result}
                </a>
                <button className="copy-btn" onClick={handleCopy}>
                  Copy
                </button>
              </div>
              {copySuccess && (
                <span className="copy-success">{copySuccess}</span>
              )}
              <div className="download-count">
                Downloads: {downloadCount !== null ? downloadCount : "-"}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
