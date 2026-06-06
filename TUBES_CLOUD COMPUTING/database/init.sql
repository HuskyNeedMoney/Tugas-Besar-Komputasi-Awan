CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'student') NOT NULL DEFAULT 'student',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nim VARCHAR(20) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  class_name VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS grades (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  subject VARCHAR(100) NOT NULL,
  score DECIMAL(5,2) NOT NULL,
  semester INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- Insert dummy admin
INSERT INTO users (username, password, role) VALUES ('admin', 'admin123', 'admin') ON DUPLICATE KEY UPDATE username=username;

-- Insert dummy students
INSERT INTO students (nim, name, class_name) VALUES 
('101', 'Budi Santoso', '12A'),
('102', 'Siti Aminah', '12A'),
('103', 'Andi Wijaya', '12B'),
('104', 'Rina Marlina', '12B')
ON DUPLICATE KEY UPDATE nim=nim;

-- Insert dummy grades (assuming student ids 1-4)
INSERT INTO grades (student_id, subject, score, semester) VALUES 
(1, 'Matematika', 85, 1),
(1, 'Fisika', 80, 1),
(1, 'Matematika', 88, 2),
(1, 'Fisika', 85, 2),
(2, 'Matematika', 90, 1),
(2, 'Fisika', 88, 1),
(3, 'Matematika', 75, 1),
(3, 'Fisika', 78, 1),
(4, 'Matematika', 92, 1),
(4, 'Fisika', 85, 1);
