import React, { useState, useEffect, useRef } from "react";
import "./ActivityWritePage.css";

const ActivityWritePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [deadlineDate, setDeadlineDate] = useState("");
  const [deadlineTime, setDeadlineTime] = useState("");
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
    const selected = Array.from(e.target.files);

    const validFiles: File[] = [];
    const errorMessages: string[] = [];

    for (const file of selected) {
      const sizeInMB = file.size / (1024 * 1024);
      if (sizeInMB > 1) {
        errorMessages.push(`'${file.name}'은 1MB를 초과합니다.`);
        continue;
      }
      if (!file.type.match(/^image\/(jpeg|png|gif|bmp|webp)$/)) {
        errorMessages.push(`'${file.name}'은 지원되지 않는 형식입니다.`);
        continue;
      }
      validFiles.push(file);
    }

    if (images.length + validFiles.length > 3) {
      errorMessages.push("이미지는 최대 3개까지 업로드할 수 있습니다.");
    }

    if (errorMessages.length > 0) {
      setErrors((prev) => ({ ...prev, image: errorMessages.join("\n") }));
    }

    setImages((prev) => [...prev, ...validFiles].slice(0, 3));
  };

  const handleImageDelete = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const validate = () => {
    const newErrors = { title: "", content: "", image: "" };

    if (!title.trim()) {
      newErrors.title = "제목을 입력해 주세요.";
    } else if (title.trim().length > 50) {
      newErrors.title = "제목은 최대 50자까지 작성할 수 있습니다.";
    }

    if (!content.trim()) {
      newErrors.content = "내용을 입력해 주세요.";
    } else if (content.trim().length > 4000) {
      newErrors.content = "내용은 최대 4000자까지 작성할 수 있습니다.";
    }

    setErrors(newErrors);
    return !newErrors.title && !newErrors.content && !newErrors.image;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const postData = {
      title,
      content,
      images: imagePreviews,
      deadline: `${deadlineDate} ${deadlineTime}`,
      location: "",
    };

    console.log("환경 모집글:", postData);

    setTitle("");
    setContent("");
    setImages([]);
    setDeadlineDate("");
    setDeadlineTime("");
    setErrors({ title: "", content: "", image: "" });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="write-wrapper">
      <div className="write-card">
        <h2 className="write-heading">팀 모집글 작성</h2>

        <div className="form-field">
          <label className="form-label">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요."
            className="form-input"
          />
          {errors.title && <span className="error-text">{errors.title}</span>}
        </div>

        <div className="form-field">
          <label className="form-label">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            placeholder="내용을 입력하세요."
            className="form-textarea"
          />
          {errors.content && (
            <span className="error-text">{errors.content}</span>
          )}
        </div>

        <div className="form-field">
          <label className="form-label">이미지 첨부 (최대 3개)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            ref={fileInputRef}
            className="form-input"
          />
          {errors.image && <span className="error-text">{errors.image}</span>}
          <div className="image-preview-area">
            {imagePreviews.map((url, idx) => (
              <div key={idx} className="image-preview-box">
                <img
                  src={url}
                  alt={`preview-${idx}`}
                  className="preview-thumb"
                />
                <button
                  type="button"
                  className="image-delete-btn"
                  onClick={() => handleImageDelete(idx)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <span className="image-count">{images.length}/3</span>
        </div>

        <div className="form-row">
          <div className="form-field half-width">
            <label className="form-label">마감 날짜</label>
            <input
              type="date"
              value={deadlineDate}
              onChange={(e) => setDeadlineDate(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-field half-width">
            <label className="form-label">마감 시간</label>
            <input
              type="time"
              value={deadlineTime}
              onChange={(e) => setDeadlineTime(e.target.value)}
              className="form-input"
            />
          </div>
        </div>

        <div className="form-field">
          <label className="form-label">활동영역</label>
          <div id="map" className="map-box">
            지도 띄울 곳
          </div>
        </div>

        <div className="action-buttons">
          <button className="btn outline">취소</button>
          <button className="btn primary" onClick={handleSubmit}>
            작성 완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityWritePage;
