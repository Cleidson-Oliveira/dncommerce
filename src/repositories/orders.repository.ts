import { conect } from "../database/mysql.connection";

export class OrdersRepository {
    async create (
        amount: number, 
        sale: string | number, 
        product: string | number
    ) {
        const db = await conect();

        const query = `insert into orders (amount, sale, product) values (?, ?, ?);`;

        const data = [amount, sale, product];

        const order = await db.query(query, data);

        return order;
    }

    async getAllOrdersBySale (saleId: number | string) {
        const db = await conect();

        const query = `select * from orders where sale = (?);`;

        const [sales] = await db.query(query, [saleId]);

        return sales;
    }
}