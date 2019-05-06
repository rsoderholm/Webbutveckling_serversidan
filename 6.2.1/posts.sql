CREATE TABLE posts (
    ID int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    time varchar(30) NOT NULL,
    name varchar (50) NOT NULL,
    email varchar(50) NOT NULL,
    website varchar(100) NOT NULL,
    comment varchar(300) NOT NULL
);