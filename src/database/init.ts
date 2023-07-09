import { conect } from "./mysql.connection";
import * as dotenv from "dotenv";
dotenv.config();

conect()
.then((db: any) => {

    db.query(`
        create table products (
            product_id int auto_increment primary key,
            product_name varchar(100) not null,
            product_price int not null,
            product_description varchar(200),
            product_category varchar(200)
        );
    `);

    db.query(`
        create table costumers (
            costumer_id int auto_increment primary key,
            costumer_name varchar(100) not null,
            costumer_cpf varchar(11) not null,
            costumer_email varchar(50) not null,
            costumer_address varchar(100),
            costumer_telephone varchar(11)
        );
    `);

    db.query(`    
        create table product_stock (
            amount int not null,
            product int,    
            foreign key (product) references products(product_id)
        );
    `);
        
    db.query(`
        create table sales (
            sale_id int auto_increment primary key,
            total_value int,
            sale_date date,
            costumer int,
            foreign key (costumer) references costumers(costumer_id)
        );
    `);

    db.query(`
        create table orders (
            order_id int auto_increment primary key,
            amount int,
            sale int,
            product int,
            foreign key (sale) references sales(sale_id),
            foreign key (product) references products(product_id)
        );
    `)

    process.exit();
})
.catch((error: Error) => {
    console.log(error)
    process.exit();
})