import React, { useState, useRef, useEffect } from "react";
import "./CommunityWritePage.css";

const CommunityWritePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState({ title: "", content: "", image: "" });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const urls = images.map((img) => URL.createObjectURL(img));
    setImagePreviews(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors((prev) => ({ ...prev, image: "" }));
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);

    if (images.length + selectedFiles.length > 10) {
      const message = "이미지는 최대 10개까지 업로드할 수 있습니다.";
      setErrors((prev) => ({ ...prev, image: message }));
      return;
    }

    const validFiles: File[] = [];
    const errorMessages: string[] = [];

    for (const file of selectedFiles) {
      const sizeInMB = file.size / (1024 * 1024);
      if (sizeInMB > 1) {
        errorMessages.push(`'${file.name}' 파일은 1MB를 초과합니다.`);
        continue;
      }
      if (!file.type.match(/^image\/(jpeg|png|gif|bmp|webp)$/)) {
        errorMessages.push(`'${file.name}' 파일은 지원되지 않는 형식입니다.`);
        continue;
      }
      validFiles.push(file);
    }

    if (errorMessages.length > 0) {
      setErrors((prev) => ({ ...prev, image: errorMessages.join("\n") }));
    }

    setImages((prev) => [...prev, ...validFiles]);
  };

  const handleImageDelete = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const validate = () => {
    const newErrors = { title: "", content: "", image: "" };

    if (!title.trim()) {
      const msg = "제목을 입력해 주세요.";
      alert(msg);
      newErrors.title = msg;
      setErrors(newErrors);
      return false;
    }
    if (title.trim().length < 2 || title.trim().length > 20) {
      const msg = "제목은 2자 이상 20자 이하로 작성해 주세요.";
      alert(msg);
      newErrors.title = msg;
      setErrors(newErrors);
      return false;
    }

    if (!content.trim()) {
      const msg = "내용을 입력해 주세요.";
      alert(msg);
      newErrors.content = msg;
      setErrors(newErrors);
      return false;
    }
    if (content.trim().length < 10 || content.trim().length > 500) {
      const msg = "내용은 10자 이상 500자 이하로 작성해 주세요.";
      alert(msg);
      newErrors.content = msg;
      setErrors(newErrors);
      return false;
    }

    setErrors(newErrors);
    return true;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const communityPostData = {
      userId: 1,
      title: title.trim(),
      body: content.trim(),
      attachments: imagePreviews.map((url) => ({ previewUrl: url })),
    };

    console.log("게시글 데이터", communityPostData);

    setTitle("");
    setContent("");
    setImages([]);
    setErrors({ title: "", content: "", image: "" });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="write-wrapper">
      <div className="write-card">
        <h2 className="write-heading">글 작성</h2>

        <div className="form-field">
          <label className="form-label">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요"
            className="form-input"
          />
          {errors.title && <span className="error-text">{errors.title}</span>}
        </div>

        <div className="form-field">
          <label className="form-label">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
            rows={8}
            className="form-textarea"
          ></textarea>
          {errors.content && (
            <span className="error-text">{errors.content}</span>
          )}
        </div>

        <div className="form-field">
          <label className="form-label">
            이미지 첨부 (최대 10개, 1MB 이하)
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            ref={fileInputRef}
          />
          {errors.image && <span className="error-text">{errors.image}</span>}
          <div className="image-preview-area">
            {imagePreviews.map((url, idx) => (
              <div key={images[idx].name} className="image-preview-box">
                <img
                  src={url}
                  alt={images[idx].name}
                  className="preview-thumb"
                />
                <button
                  className="image-delete-btn"
                  onClick={() => handleImageDelete(idx)}
                  type="button"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <span className="image-count">{images.length}/10</span>
        </div>

        <div className="action-buttons">
          <button className="btn outline">취소</button>
          <button onClick={handleSubmit} className="btn primary">
            작성완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityWritePage;
