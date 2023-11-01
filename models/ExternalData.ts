import { CreationOptional,  Model, Sequelize, InferAttributes, InferCreationAttributes,} from 'sequelize';
import {DataType} from 'sequelize-typescript'

class ExternalData extends Model {

    public id!: number;
    public apiRequests!: string;
    public apiResponse!: string;
    public data!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static initModel (sequelize: Sequelize):void {
        ExternalData.init({
            id: {
                type: DataType.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            apiRequests: {
                type: DataType.STRING
            },
            apiResponse: {
                type: DataType.STRING
            },
            data: {
                type: DataType.STRING(10000)
            }
        },{
            sequelize,
            underscored: true,
            tableName: 'external_data_node'
        })
    }
}

export default ExternalData;