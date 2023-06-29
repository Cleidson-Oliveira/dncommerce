import { conect } from "../database/mysql.connection";


export class ProductStockRepository {
    async create (amount: number, productId: number | string) {
        const db = await conect();

        const query = `insert into product_stock (amount, product) values (?, ?);`;

        const data = [amount, productId];

        const stock = db.query(query, data);

        return stock;
    }

    async get (productId: number | string) {
        const db = await conect();

        const query = `select * from product_stock where product = (?) limit 1;`;

        const [stock] = db.query(query, [productId]);

        return stock.amount;
    }

    async update (amount: number, productId: number | string) {
        const db = await conect();

        const query = `update product_stock set amount = (?) where product = (?);`;

        const stock = db.query(query, [amount, productId]);

        return stock;
    }

    async delete (productId: number | string) {
        const db = await conect();

        const query = `delete from product_stock where product = (?);`;

        const stock = db.query(query, [productId]);

        return stock;
    }
}