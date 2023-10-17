drop table if exists transaksi,akun,nasabah;
create table nasabah (
    nasabah_id INT primary key generated always as identity,
    nama_nasabah varchar(100) not null,
    nomor_hp text not null,
    alamat varchar(100) 
);

create table akun (
    akun_id INT primary key generated always as identity,
    saldo_akun DEC(15,2) not null default(0) check (saldo_akun > 0),
    nasabah_id INT,
    email varchar not null unique,
    foreign key (nasabah_id) references nasabah(nasabah_id) 
    on delete cascade on update cascade 
);

drop type if exists jenis;
create type jenis as enum('Penyetoran','Penarikan','Transfer');

create table transaksi(
    transaksi_id INT primary key generated always as identity,
    jenis_transaksi jenis ,
    nilai_transaksi dec(15,2),
    waktu_transaksi timestamp default current_timestamp(0),
    id_tujuan int default null,
    akun_id INT,
    foreign key (akun_id)  references akun(akun_id) 
    on delete cascade on update cascade
);
INSERT INTO nasabah(nama_nasabah, nomor_hp,alamat)
VALUES 
('Andi','0811322355','Jakarta'),
('Budi','0811366422','Bandung'),
('Candra','0823154355','Samarinda');
INSERT INTO akun(saldo_akun,nasabah_id,email)
VALUES 
(45000000,1,'andi223@gmail.com'),
(50000000,2,'budi992@gmail.com'),
(60000000,2,'budi900@gmail.com'),
(20100000,3,'candra929@gmail.com');
INSERT INTO transaksi(jenis_transaksi,nilai_transaksi,akun_id)
VALUES 
('Penyetoran',0,1),
('Penarikan',1000000,1),
('Penyetoran',1000000,2),
('Penarikan',1000000,3),
('Penarikan',1000000,4);

INSERT INTO transaksi(jenis_transaksi,nilai_transaksi,akun_id,id_tujuan)
VALUES 
('Transfer',1000000,3,2),
('Transfer',2500000,2,1);

-- mencari id nasabah, nama nasabah, dan jumlah akun yang dimiliki nasabah menggunakan nasabah_id nasabah
-- yang merupakan PK di table dan FK di table akun
select nasabah.nasabah_id, nasabah.nama_nasabah, count(akun.nasabah_id) as jumlah_akun 
from nasabah
left join akun on nasabah.nasabah_id = akun.nasabah_id 
group by nasabah.nasabah_id ;

-- void function untuk mendeposit uang nasabah di akun yang dipakai
create or replace procedure deposit(
    nominal dec,
    nomor_akun INT
)
language plpgsql 
as $$
begin
    -- menambahkan nominal saldo akun penyetor --
    update akun
    set saldo_akun  = saldo_akun + nominal
    where akun_id = nomor_akun;
   
   	insert into transaksi(jenis_transaksi,nilai_transaksi,akun_id)
   	values('Penyetoran',nominal,nomor_akun);
    commit;
end;$$

-- void function untuk menarik uang nasabah di akun yang dipakai
create or replace procedure withdraw(
    nominal dec,
    nomor_akun INT
)
language plpgsql 
as $$
begin
    -- menambahkan nominal saldo akun penarik --
    update akun
    set saldo_akun  = saldo_akun - nominal
    where akun_id = nomor_akun;
   
   	insert into transaksi(jenis_transaksi,nilai_transaksi,akun_id)
   	values('Penarikan',nominal,nomor_akun);
    commit;
end;$$

-- void function untuk men-transfer uang nasabah ke akun yang dituju
create or replace procedure transfer(
    nominal dec,
    nomor_akun INT,
    nomor_tujuan INT
)
language plpgsql 
as $$
begin
    -- mengurangkan nominal saldo akun pengirim
    update akun
    set saldo_akun  = saldo_akun - nominal
    where akun_id = nomor_akun;
   
	-- menambahkan nominal saldo akun penerima 
   	update akun 
   	set saldo_akun = saldo_akun + nominal
   	where akun_id = nomor_tujuan;
	--  menambahkan riwayat transaksi ke database table transaksi
   	insert into transaksi(jenis_transaksi,nilai_transaksi,akun_id, id_tujuan)
   	values('Transfer',nominal,nomor_akun, nomor_tujuan);
    commit;
end;$$

CALL transfer(2000000 , 2, 3);
CALL deposit(1000000, 2);
CALL withdraw(2000000, 3);