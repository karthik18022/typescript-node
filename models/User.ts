import { CreationOptional,  Model, Sequelize, InferAttributes, InferCreationAttributes,} from 'sequelize';
import {User as userAAttributes} from '../attributes/user.js'
import {DataType} from 'sequelize-typescript'

class User extends Model implements userAAttributes {
    id!:number;
    email!: string;
    firstName!: string;
    lastName!: string;
    password!: string;

    
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static initModel (sequelize: Sequelize):void {
        User.init({
            id: {
                type: DataType.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            email: {
                type: DataType.STRING,
                allowNull: false
            },
            firstName: {
                type: DataType.STRING
            }, 
            lastName: {
                type: DataType.STRING
            }, 
            password: {
                type: DataType.STRING
            }
        },{
            sequelize,
            underscored: true,
            tableName: 'user'
        });
    }
}

export default User;