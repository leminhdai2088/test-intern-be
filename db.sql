CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    storeId INTEGER,
    name VARCHAR(50),
	phone VARCHAR(15) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
	password VARCHAR(200) NOT NULL,
	birthday DATE,
	avatar varchar(100),
	gender varchar(10),
	address varchar(200),
	verified boolean,
	opt varchar(10),
	role boolean
);

CREATE TABLE store (
    id SERIAL PRIMARY KEY,
    ownerId INTEGER not null,
    name VARCHAR(50),
	logo VARCHAR(100),
	address varchar(200),
	phone VARCHAR(15) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE	
);

CREATE TABLE request (
    freelancerId INTEGER,
	storeId INTEGER,
    requested BOOLEAN not null,
    createdAT TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT pk_request PRIMARY KEY (freelancerId, storeId, requested)
);

insert into users (storeId, name, phone, email, password, birthday, avatar, gender, address, role, verified)
values (1, 'Tuấn Kha', '0123150054', 'tk1@gmail.com', 'password', '01/01/2002','avatar.png', 'nam', 'address1', false, true);
insert into users (storeId, name, phone, email, password, birthday, avatar, gender, address, role, verified)
values (1, 'Tuấn Kha', '0888154700', 'tk2@gmail.com', 'password', '01/01/2002','avatar.png', 'nam', 'address1', false, true);
insert into users (storeId, name, phone, email, password, birthday, avatar, gender, address, role, verified)
values (1, 'Tuấn Kha', '01123154790', 'tk3@gmail.com', 'password', '01/01/2002','avatar.png', 'nam', 'address1', false, true);
insert into users (storeId, name, phone, email, password, birthday, avatar, gender, address, role, verified)
values (1, 'Tuấn Kha', '01156154700', 'tk4@gmail.com', 'password', '01/01/2002','avatar.png', 'nam', 'address1', false, true);
insert into users (storeId, name, phone, email, password, birthday, avatar, gender, address, role, verified)
values (1, 'Tuấn Kha', '0123700', 'tk5@gmail.com', 'password', '01/01/2002','avatar.png', 'nam', 'address1', false, true);
insert into users (storeId, name, phone, email, password, birthday, avatar, gender, address, role, verified)
values (2, 'Tuấn Kha', '014454700671', 'tk6@gmail.com', 'password', '01/01/2002','avatar.png', 'nam', 'address1', false, true);
insert into users (storeId, name, phone, email, password, birthday, avatar, gender, address, role, verified)
values (2, 'Tuấn Kha', '31239977400', 'tk7@gmail.com', 'password', '01/01/2002','avatar.png', 'nam', 'address1', false, true);
insert into users (storeId, name, phone, email, password, birthday, avatar, gender, address, role, verified)
values (2, 'Tuấn Kha', '023514700', 'tk8@gmail.com', 'password', '01/01/2002','avatar.png', 'nam', 'address1', false, true);
insert into users (storeId, name, phone, email, password, birthday, avatar, gender, address, role, verified)
values (2, 'Tuấn Kha', '01154756505', 'tk9@gmail.com', 'password', '01/01/2002','avatar.png', 'nam', 'address1', false, true);
insert into users (storeId, name, phone, email, password, birthday, avatar, gender, address, role, verified)
values (2, 'Tuấn Kha', '01212054700', 'tk10@gmail.com', 'password', '01/01/2002','avatar.png', 'nam', 'address1', false, true);
insert into users (storeId, name, phone, email, password, birthday, avatar, gender, address, role, verified)
values (3, 'Tuấn Kha', '01231545780', 'tk11@gmail.com', 'password', '01/01/2002','avatar.png', 'nam', 'address1', false, true);
insert into users (storeId, name, phone, email, password, birthday, avatar, gender, address, role, verified)
values (3, 'Tuấn Kha', '99123154700', 'tk12@gmail.com', 'password', '01/01/2002','avatar.png', 'nam', 'address1', false, true);
insert into users (storeId, name, phone, email, password, birthday, avatar, gender, address, role, verified)
values (3, 'Tuấn Kha', '880123154700', 'tk13@gmail.com', 'password', '01/01/2002','avatar.png', 'nam', 'address1', false, true);
insert into users (storeId, name, phone, email, password, birthday, avatar, gender, address, role, verified)
values (3, 'Tuấn Kha', '770123154700', 'tk14@gmail.com', 'password', '01/01/2002','avatar.png', 'nam', 'address1', false, true);
insert into users (storeId, name, phone, email, password, birthday, avatar, gender, address, role, verified)
values (4, 'Tuấn Kha', '660123154700', 'tk15@gmail.com', 'password', '01/01/2002','avatar.png', 'nam', 'address1', false, true);
insert into users (storeId, name, phone, email, password, birthday, avatar, gender, address, role, verified)
values (4, 'Tuấn Kha', '550123154700', 'tk16@gmail.com', 'password', '01/01/2002','avatar.png', 'nam', 'address1', false, true);
insert into users (storeId, name, phone, email, password, birthday, avatar, gender, address, role, verified)
values (4, 'Tuấn Kha', '440123154700', 'tk17@gmail.com', 'password', '01/01/2002','avatar.png', 'nam', 'address1', false, true);
insert into users (storeId, name, phone, email, password, birthday, avatar, gender, address, role, verified)
values (4, 'Tuấn Kha', '330123154700', 'tk18@gmail.com', 'password', '01/01/2002','avatar.png', 'nam', 'address1', false, true);
insert into users (storeId, name, phone, email, password, birthday, avatar, gender, address, role, verified)
values (4, 'Tuấn Kha', '220123154700', 'tk19@gmail.com', 'password', '01/01/2002','avatar.png', 'nam', 'address1', false, true);
insert into users (storeId, name, phone, email, password, birthday, avatar, gender, address, role, verified)
values (5, 'Tuấn Kha', '110123154700', 'tk20@gmail.com', 'password', '01/01/2002','avatar.png', 'nam', 'address1', false, true);
insert into users (storeId, name, phone, email, password, birthday, avatar, gender, address, role, verified)
values (5, 'Tuấn Kha', '000123154700', 'tk21@gmail.com', 'password', '01/01/2002','avatar.png', 'nam', 'address1', false, true);
insert into users (storeId, name, phone, email, password, birthday, avatar, gender, address, role, verified)
values (5, 'Tuấn Kha', '120123154700', 'tk22@gmail.com', 'password', '01/01/2002','avatar.png', 'nam', 'address1', false, true);
insert into users (storeId, name, phone, email, password, birthday, avatar, gender, address, role, verified)
values (5, 'Tuấn Kha', '130123154700', 'tk23@gmail.com', 'password', '01/01/2002','avatar.png', 'nam', 'address1', false, true);
insert into users (name, phone, email, password, birthday, avatar, gender, address, role, verified)
values ('Tuấn Kha', '140123154700', 'tk24@gmail.com', 'password', '01/01/2002','avatar.png', 'nam', 'address1', true, true);

insert into users (name, phone, email, password, birthday, avatar, gender, address, role, verified)
values ('Lê Minh Đại', '0387383584', 'louistart0ggy@gmail.com', '$2b$10$BTcyr2Fnqpdkt3CCAjpnuO6Mav73gudt8o7jyfM4.97D3hE9drpda', '01/01/2002','avatar.png', 'nam', 'address1', false, true);
insert into users (name, phone, email, password, birthday, avatar, gender, address, role, verified)
values ('Lê Minh Đại', '0387383583', '20521153@gm.uit.edu.vn', '$2b$10$9mhh.8h//meUxlPWTvP8fOQGeb7JEm0/6gZ58aeW8Ogr3aF6S87xy', '01/01/2002','avatar.png', 'nam', 'address1', true, true);


insert into store (ownerId, name, logo, address, phone, email)
values (26, 'store 1', 'logostore1.png', 'addressstore1','04564656', 'store1@gmail.com');
insert into store (ownerId, name, logo, address, phone, email)
values (26, 'store 2', 'logostore2.png', 'addressstore2','0456451516', 'store2@gmail.com');
insert into store (ownerId, name, logo, address, phone, email)
values (26, 'store 3', 'logostore3.png', 'addressstore3','0456465688', 'store3@gmail.com');
insert into store (ownerId, name, logo, address, phone, email)
values (24, 'store 4', 'logostore4.png', 'addressstore4','884564656', 'store4@gmail.com');



ALTER TABLE users
ADD CONSTRAINT fk_freelancer_store
    FOREIGN KEY (storeId)
    REFERENCES store (id);
	
ALTER TABLE store
ADD CONSTRAINT fk_onwer_user
    FOREIGN KEY (ownerId)
    REFERENCES users (id);

ALTER TABLE request
ADD CONSTRAINT fk_req_user	
    FOREIGN KEY (freelancerId)
    REFERENCES users (id);

ALTER TABLE request
ADD CONSTRAINT fk_req_store	
    FOREIGN KEY (storeId)
    REFERENCES store (id);


           
    
