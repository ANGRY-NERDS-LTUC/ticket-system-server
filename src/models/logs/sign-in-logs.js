const signInModel = (sequelize, DataTypes) =>
    sequelize.define('xxxxxxxxxxxxxx', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // method: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // },
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
module.exports = signInModel;