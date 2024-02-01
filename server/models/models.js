const sequelize = require('.');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    birthDate: { type: DataTypes.DATE, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }
});

const Property = sequelize.define('Property', {
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.STRING(3000), allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    isSold: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    rooms: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }
});

const PropertyType = sequelize.define('PropertyType', {
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {type: DataTypes.STRING, allowNull: false}
});

const Review = sequelize.define('Review', {
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    isPositive: {type: DataTypes.BOOLEAN, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false}
});

const Admin = sequelize.define('Admin', {
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }
});

const Contact = sequelize.define('Contact', {
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    value: {type: DataTypes.STRING, allowNull: false}
});

const ContactType = sequelize.define('ContactType', {
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {type: DataTypes.STRING, allowNull: false},
});

const Deal = sequelize.define('Deal', {
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    isClosed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    isSold: { type: DataTypes.BOOLEAN, allowNull: false},
});

const Favorite = sequelize.define('Favorite', {
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

Property.belongsTo(PropertyType);
PropertyType.hasMany(Property);

User.hasMany(Deal);
Deal.belongsTo(User);
Property.hasMany(Deal);
Deal.belongsTo(Property);

Property.belongsToMany(User, { through: Favorite });
User.belongsToMany(Property, { through: Favorite });

Review.belongsTo(User);
User.hasMany(Review);

Contact.belongsTo(ContactType);
ContactType.hasMany(Contact);

module.exports = {
    User,
    Property,
    PropertyType,
    Deal,
    Contact,
    Review,
    ContactType,
    Admin,
    Favorite
};