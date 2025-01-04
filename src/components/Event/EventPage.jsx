import React, { useState } from "react";
import { notify } from "../Login/toast"; // Đảm bảo bạn đã import đúng module
import styles from "./EventPage.module.css";

const eventsData = [
  {
    id: 1,
    name: "HUST Hackathon 2025",
    description: "Tham gia cuộc thi lập trình đầy thử thách với giải thưởng hấp dẫn.",
    status: "Available",
  },
  {
    id: 2,
    name: "Seminar AI và Blockchain",
    description:
      "Buổi hội thảo giới thiệu các ứng dụng AI và Blockchain trong thực tế.",
    status: "Full",
  },
  {
    id: 3,
    name: "Workshop Kỹ năng mềm",
    description:
      "Phát triển kỹ năng mềm với các chuyên gia hàng đầu trong ngành.",
    status: "Available",
  },
];

export default function EventPage() {
  const [events] = useState(eventsData);

  // Hàm handleRegister hiển thị thông báo với tên sự kiện
  const handleRegister = (eventName) => {
    notify(`Bạn đã đăng ký thành công sự kiện: ${eventName}`, "success");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>HUST Student Events</h1>
        <p>Các sự kiện nổi bật dành riêng cho sinh viên Bách Khoa.</p>
      </div>

      <div className={styles.main}>
        {events.map((event) => (
          <div key={event.id} className={styles.eventCard}>
            <h2>{event.name}</h2>
            <p>{event.description}</p>
            <p className={styles.status}>
              {event.status === "Available" ? (
                <span className={styles.available}>Đang mở</span>
              ) : (
                <span className={styles.full}>Đã đầy</span>
              )}
            </p>
            {event.status === "Available" && (
              <button
                className={styles.joinButton}
                onClick={() => handleRegister(event.name)} // Truyền tên sự kiện vào notify
              >
                Đăng ký ngay
              </button>
            )}
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <p>© 2025 HUST Events. Mọi quyền được bảo lưu.</p>
      </div>
    </div>
  );
}
