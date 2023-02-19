drop TABLE if exists categories cascade;    
CREATE TABLE "categories" (
  "category_id" uuid primary KEY DEFAULT uuid_generate_v4(),
  "title" varchar(128)
);

insert into categories(title) values('SARTAROSHXONA');

drop TABLE if exists master;
CREATE TABLE "master" (
  "master_id" varchar(64) primary KEY,
  "master_number" varchar(64),
  "master_name" varchar(64),
  "workshop_title" varchar(128),
  "address" varchar(128),
  "address_x" varchar(128),
  "address_y" varchar(128),
  "address_target" varchar(128),
  "work_start" varchar(10),
  "work_end" varchar(10),
  "work_time" varchar(10),
  "reyting" int DEFAULT 0,
  "master_status" boolean DEFAULT false,
  "category_id" uuid,
  FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

CREATE TABLE "users" (
  "user_id" varchar(128) primary KEY,
  "user_number" varchar(64),
  "user_name" varchar(64),
  "address" varchar(128),
  "address_x" varchar(128),
  "address_y" varchar(128),
  "user_status" boolean DEFAULT true,
);

CREATE TABLE "orders" (
  "user_id" varchar(128),
  "master_id" varchar(128),
  "order_time" varchar(128)
);

CREATE TABLE "rate" (
  "id" uuid,
  "master_id" varchar(128),
  "user_id" varchar(128),
  "star" int DEFAULT  0
  );
ALTER TABLE "user" ADD FOREIGN KEY ("user_id") REFERENCES "orders" ("user_id");

ALTER TABLE "master" ADD FOREIGN KEY ("master_id") REFERENCES "orders" ("master_id");

ALTER TABLE "master" ADD FOREIGN KEY ("master_id") REFERENCES "rate" ("master_id");

ALTER TABLE "user" ADD FOREIGN KEY ("user_id") REFERENCES "rate" ("user_id");

ALTER TABLE "categories" ADD FOREIGN KEY ("category_id") REFERENCES "master" ("category_id");