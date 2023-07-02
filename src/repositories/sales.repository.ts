import { conect } from "../database/mysql.connection";

interface SaleData {
    totalValue: number,
    date: Date,
    costumer: number | string
}

export class SalesRepository {
    async create (saleData: SaleData) {
        const db = await conect();

        const query = `insert into sales (total_value, sale_date, costumer) values (?, ?, ?);`;

        try {
            const data = [saleData.totalValue, saleData.date, saleData.costumer];

            const sale = await db.query(query, data);

            return sale;
            
        } catch (error) {
            return error;
        }
    }

    async getAllSalesByCostumer (costumerId: number | string) {
        const db = await conect();

        const query = `select * from sales where costumer = (?);`;

        const [sales] = await db.query(query, [costumerId]);

        return sales;
    }

    async getAll () {
        const db = await conect();

        const query = `select * from sales;`;

        const [sales] = await db.query(query);

        return sales;
    }
}