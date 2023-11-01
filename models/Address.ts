import { CreationOptional,  Model, Sequelize, InferAttributes, InferCreationAttributes,} from 'sequelize';
import {Address as addressAttributes} from '../attributes/address.js'
import {DataType} from 'sequelize-typescript'

class Address extends Model implements addressAttributes {
 
    public id!: number;
    public address!: string;
    public area!:string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static initModel (sequelize: Sequelize):void {
        Address.init({
            id: {
                type: DataType.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            address: {
                type: DataType.STRING
            },
            area: {
                type: DataType.STRING
            }
        },{
            sequelize,
            underscored: true,
            tableName: 'address'
        });
    }   

}

export default Address;
