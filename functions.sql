Drop  Table Clients;

Create table Clients(
	ClientID serial primary key,
	"Name" character varying (50) NOT NULL,
	"Surname" character varying(50)NOT NULL,
	"Email" character varying(75)NOT NULL,
	"PhoneNumber" character varying(20)NOT NULL,
	"Address" character varying(50)NOT NULL,
	"Active" boolean
	
	
);

select * from clients;