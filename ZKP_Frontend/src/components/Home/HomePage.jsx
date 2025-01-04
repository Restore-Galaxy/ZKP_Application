import React from "react";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Welcome to ZKP Application</h1>
        <p>
          Trao quyền cho quyền riêng tư và bảo mật với công nghệ Zero Knowledge Proof.
        </p>
      </header>

      <main className={styles.main}>
        <section className={styles.section}>
          <h2>Ứng dụng ZKP</h2>
          <ul>
            <li>An toàn</li>
            <li>Ẩn danh</li>
            <li>Bí mật thông tin</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Khám phá sự kiện</h2>
          <p>
            Kiểm tra các sự kiện được bảo vệ ZKP độc quyền của chúng tôi. Chỉ người dùng được ủy quyền
            mới có thể truy cập.
          </p>
        </section>
      </main>
    </div>
  );
}
