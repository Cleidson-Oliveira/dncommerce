import { conect } from "../database/mysql.connection";

interface IProducts {
    id: string
    name: string
    description: string
    price: number
    category: string
}

export class ProductsRepository {
    async create (data: Partial<IProducts>) {

        const db = await conect();
        
        const query = `insert into products ( product_name, product_price, product_description, product_category ) values (?, ?, ?, ?)`;
        
        const values = [data.name, data.price, data.description, data.category];
        
        const products = await db.query(query, values);
        
        return products;
    }

    async getAll () {

        const db = await conect();

        const query = `select * from products;`;

        const [products] = await db.query(query);

        return products
    }

    async getById (id: string | number) {

        const db = await conect();

        const query = `select * from products where (product_id) = ?`;

        const [product] = await db.query(query, id);

        return product;
    }

    async update (data: Partial<IProducts>, id: string | number) {

        const db = await conect();
        
        const updateFieldsFormated = this.formatUpdateQueryString(data);
        
        const query = `update products set ${updateFieldsFormated} where product_id = ?;`

        const [product] = await db.query(query, id);

        return product;
    }
    
    async delete (id: string | number) {
        
        const db = await conect();

        const query = `delete from products where (product_id) = ?`;

        const [product] = await db.query(query, id);
        
        return product;
    }

    private formatUpdateQueryString (data: Partial<IProducts>) {
        const updateFields = [
            data.name ? `product_name = "${data.name}"`: "", 
            data.category ? `product_category = "${data.category}"`: "",
            data.description ? `product_description = "${data.description}"`: "",
            data.price ? `product_price = "${data.price}"`: ""
        ];
        
        return updateFields.filter(i => i !== "").join(",");
    }
}