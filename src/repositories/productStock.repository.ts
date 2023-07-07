import { conect } from "../database/mysql.connection";


export class ProductStockRepository {
    async create (amount: number, productId: number | string) {
        const db = await conect();

        const query = `insert into product_stock (amount, product) values (?, ?);`;

        const data = [amount, productId];

        const stock = await db.query(query, data);

        return stock;
    }

    async get (productId: number | string) {
        const db = await conect(); 

        const query = `select * from product_stock where product = (?) limit 1;`;

        const [stock] = await db.query(query, [productId]);

        return {stockAmount: stock[0].amount, productId};
    }

    async update (amount: number, productId: number | string) {
        const db = await conect();

        const query = `update product_stock set amount = (?) where product = (?);`;

        const stock = await db.query(query, [amount, productId]);

        return stock;
    }

    async delete (productId: number | string) {
        const db = await conect();

        const query = `delete from product_stock where product = (?);`;

        const [dbResponse] = await db.query(query, [productId]);

        return dbResponse.affectedRows > 0 ? true : false;
    }
}