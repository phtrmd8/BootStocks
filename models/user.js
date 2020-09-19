module.exports = function(sequelize,DataTypes){
    const User = sequelize.define('User',{
        username : {
            type: DataTypes.STRING,
            allowNull : false,
            unique: true,
            validate:{
                len : [8,64]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len : [1]
            }
        },
        lastname : {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len : [1]
            }
        },
        profile_pic: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        user_money: {
            type: DataTypes.INTEGER,
        }
    });
    return User;
}