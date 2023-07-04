import { conect } from "../database/mysql.connection";

export interface ICostumer {
    id: string
    name: string
    cpf: string
    address: string
    email: string
    telephone: string
}

export class CostumersRepository {
    async create (data: Partial<ICostumer>) {

        const db = await conect();
        
        const query = `insert into costumers ( costumer_name, costumer_cpf, costumer_address, costumer_email, costumer_telephone ) values (?, ?, ?, ?, ?)`;
        const values = [data.name, data.cpf, data.address, data.email, data.telephone];
        
        const costumer = await db.query(query, values);
        
        return costumer;
    }

    async getAll () {

        const db = await conect();

        const query = `select * from costumers;`;

        const [costumer] = await db.query(query);

        return costumer
    }

    async getById (id: string | number) {

        const db = await conect();

        const query = `select * from costumers where (costumer_id) = ?`;

        const [costumer] = await db.query(query, id);

        return costumer;
    }

    async update (data: Partial<ICostumer>, id: string | number) {

        const db = await conect();

        const updateFieldsFormated = this.formatUpdateQueryString(data);

        const query = `update costumers set ${updateFieldsFormated} where costumer_id = ?;`

        const [costumer] = await db.query(query, id);

        return costumer;
    }
    
    async delete (id: string | number) {
        
        const db = await conect();

        const query = `delete from costumers where (costumer_id) = ?`;

        const [costumer] = await db.query(query, id);
        
        return costumer;
    }

    private formatUpdateQueryString (data: Partial<ICostumer>) {
        const updateFields = [
            data.name ? `costumer_name = "${data.name}"`: "", 
            data.address ? `costumer_address = "${data.address}"`: "",
            data.email ? `costumer_email = "${data.email}"`: "",
            data.telephone ? `costumer_telephone = "${data.telephone}"`: ""
        ];

        return updateFields.filter(i => i !== "").join(",");
    }
}