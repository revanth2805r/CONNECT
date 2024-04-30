CREATE TABLE signup (
    user_id text PRIMARY KEY NOT NULL,
    user_name text NOT NULL,
    password VARCHAR(255) NOT NULL
);


CREATE TABLE User (
  user_id text ,
  college_id text NOT NULL,
  username VARCHAR(50) NOT NULL,
  role VARCHAR(50) NOT NULL,
  year_of_student text NOT NULL,
  Description text,
  FOREIGN KEY (college_id) REFERENCES college(college_id),
 FOREIGN KEY (user_id) REFERENCES signup(user_id)
);


CREATE TABLE college (
  college_id text PRIMARY KEY,
  college_name VARCHAR(50) NOT NULL,
  college_place VARCHAR(50) NOT NULL,
  created_date VARCHAR(50) NOT NULL
);

CREATE TABLE request (
  request_id INTEGER PRIMARY KEY AUTOINCREMENT,
  sender_id VARCHAR(255) NOT NULL,
  receiver_id VARCHAR(255) NOT NULL,
  message TEXT,
  is_status TEXT DEFAULT  'pending' CHECK (is_status IN('pending', 'approved','rejected')),
  created_at VARCHAR(255),
  updated_at VARCHAR(255),
  FOREIGN KEY (sender_id) REFERENCES signup(user_id),
  FOREIGN KEY (receiver_id) REFERENCES signup(user_id)
);


CREATE TABLE post(
    post_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id VARCHAR(255),
    post_title VARCHAR(255) NOT NULL,
    post_description VARCHAR(255) NOT NULL,  
    FOREIGN KEY (user_id) REFERENCES login(user_id)
)


create table group(
   group_id VARCHAR(255) primary key NOT NULL,
   group_name VARCHAR(255) NOT NULL,
   created_by VARCHAR(255),
   member VARCHAR(255),
   description VARCHAR(255),
   foreign key (created_by) references signup(user_id)
)


   CREATE TABLE chat (
    chat_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user1 TEXT,
    user2 TEXT,
    message TEXT,
    FOREIGN KEY (user1) REFERENCES signup(user_id),
    FOREIGN KEY (user2) REFERENCES signup(user_id)
);



  