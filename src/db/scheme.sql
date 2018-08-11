create table users(
    id int,  
    name varchar(50),
    primary key(id)
);

create table questions(
    id int,
    name varchar(40),
    primary key(id)
);

create table answers(
    user_id int,
    question_id int,
    `condition` int,
    created_at datetime default current_timestamp,
    FOREIGN KEY (user_id) references users(id),
    FOREIGN KEY (question_id) references questions(id)
);

