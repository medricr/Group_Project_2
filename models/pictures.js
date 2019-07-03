module.exports = (sequelize, Sequelize) => {
    var Picture = sequelize.define('Picture', {
        type: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        data: {
            type: Sequelize.BLOB("long"),
            allowNull: true,
            get() {
                return this.getDataValue('data').toString('utf8'); // or whatever encoding is right
            },
        }
    });

    Picture.associate = function (models) {
        Picture.belongsTo(models.Recipe, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Picture;
}