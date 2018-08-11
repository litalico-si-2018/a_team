create table users(
    id int primary key,  
    name varchar(50),
    level int
);

create table questions(
    id int primary key,
    name varchar(40),
);

create table answers(
    user_id int,
    question_id int,
    condition int,
    created_at timestamp not null default current_timestamp,
    FOREIGN KEY (`user_id`) references users(`id`),
    FOREIGN KEY (`question_id`) references questions(`id`)
);
