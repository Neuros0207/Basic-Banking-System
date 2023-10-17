drop table if exists akun, posts, likes, komentar;

create table akun (
	id int primary key generated always as identity,
	name varchar not null,
	email varchar not null,
	password varchar not null,
	profile text default 'Profile is empty',
	verified boolean not null default false);
create table posts (
	id int primary key generated always as identity,
	title varchar,
	body text,
	user_id int not null,
	status varchar,
	created_at timestamp default current_timestamp(0),
	created_by varchar,
	updated_at timestamp,
	updated_by varchar,
	foreign key (user_id) references akun(id)
	on delete cascade);
create table likes (
	id int primary key generated always as identity,
	user_id int,
	post_id int,
	foreign key (user_id) references akun(id)
	on delete cascade,
	foreign key (post_id) references posts(id)
	on delete cascade);
create table komentar (
	id int primary key generated always as identity,
	body text,
	user_id int,
	post_id int,
	foreign key (user_id) references akun(id)
	on delete cascade,
	foreign key (post_id) references posts(id)
	on delete cascade);


-- mencari user yang telah posting dan akunnya telah diverifikasi
select  * from akun a
left join posts p  on p.user_id = a.id 
where p.title is not null and a.verified is true ;


-- cari berapa kali user ngelike dan ngecomment
select 
akun_join_komen."name" as "Nama Pengguna",
akun_join_komen.id as "ID Pengguna" , 
akun_join_komen.jumlah_komen as "Berapa kali mengkomen", 
akun_join_likes.jumlah_like as "Berapa kali ngelike" 
from 
(select a."name",  a.id , count(k.id) as jumlah_komen  from akun a
left join komentar k on a.id = k.user_id
group by a.id) 
as akun_join_komen
left join 
(select a.id, count(l.id) as jumlah_like from akun a
left join likes l on a.id = l.user_id
group by a.id) 
as akun_join_likes on akun_join_likes.id = akun_join_komen.id
order by akun_join_komen.id;

INSERT INTO public.akun ("name",email,"password",profile,verified) VALUES
	 ('yusuf','yusuf@gmail.com','1234',NULL,true),
	 ('aldi','aldi@gmail.com','1234',NULL,false),
	 ('candra','candra@gmail.com','1234',NULL,true),
	 ('budi','budi@gmail.com','1234',NULL,false),
	 ('dede','dede@gmail.com','1234',NULL,true),
	 ('andi','andi@gmail.com','1234',NULL,false),
	 ('dede','dede@gmail.com','1234',NULL,true),
	 ('caca','caca@gmail.com','1234',NULL,false),
	 ('didi','didi@gmail.com','1234',NULL,false),
	 ('gede','gede@gmail.com','1234',NULL,true);

INSERT INTO public.posts (title,body,user_id,status,created_at,created_by,updated_at,updated_by) VALUES
	 ('post 1','hello',6,NULL,NULL,NULL,NULL,NULL),
	 ('post 2','hello',5,NULL,NULL,NULL,NULL,NULL),
	 ('post 3','hello',6,NULL,NULL,NULL,NULL,NULL),
	 ('post 4','hello',2,NULL,NULL,NULL,NULL,NULL),
	 ('post 5','hello',1,NULL,NULL,NULL,NULL,NULL),
	 ('post 9','hello',3,NULL,NULL,NULL,NULL,NULL),
	 ('post 12','hello',4,NULL,NULL,NULL,NULL,NULL),
	 ('post 11','hello',9,NULL,NULL,NULL,NULL,NULL),
	 ('post 13','hello',6,NULL,NULL,NULL,NULL,NULL),
	 ('post 6','hello',10,NULL,NULL,NULL,NULL,NULL);

INSERT INTO public.komentar (body,user_id,post_id) VALUES
	 ('allo',1,3),
	 ('allo',1,2),
	 ('allo',2,3),
	 ('allo',2,8),
	 ('allo',3,3),
	 ('allo',4,1),
	 ('allo',6,5),
	 ('allo',7,3),
	 ('allo',8,3),
	 ('allo',9,6);

INSERT INTO public.likes (user_id,post_id) VALUES
	 (1,9),
	 (1,3),
	 (2,4),
	 (2,7),
	 (3,10),
	 (5,4),
	 (5,2),
	 (5,2),
	 (6,1),
	 (9,6);



