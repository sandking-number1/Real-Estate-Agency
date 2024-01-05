const sequelize = require('.');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    birthDate: { type: DataTypes.DATE, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    dateCreated: {type: DataTypes.DATE, allowNull: false},
    dateModified: {type: DataTypes.DATE, allowNull: false}
});

const Property = sequelize.define('Property', {
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    isSold: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    dateCreated: {type: DataTypes.DATE, allowNull: false},
    dateModified: {type: DataTypes.DATE, allowNull: false}
});

const PropertyType = sequelize.define('PropertyType', {
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {type: DataTypes.STRING, allowNull: false},
    dateCreated: {type: DataTypes.DATE, allowNull: false},
    dateModified: {type: DataTypes.DATE, allowNull: false}
});

const Sale = sequelize.define('Sale', {
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    dateCreated: {type: DataTypes.DATE, allowNull: false},
    dateModified: {type: DataTypes.DATE, allowNull: false}
});

const Review = sequelize.define('Review', {
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    isPositive: {type: DataTypes.BOOLEAN, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    dateCreated: {type: DataTypes.DATE, allowNull: false},
    dateModified: {type: DataTypes.DATE, allowNull: false}
});

const Image = sequelize.define('Image', {
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    image: {type: DataTypes.BLOB('long'), allowNull: false},
    dateCreated: {type: DataTypes.DATE, allowNull: false},
    dateModified: {type: DataTypes.DATE, allowNull: false}
});

const Admin = sequelize.define('Admin', {
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    dateCreated: {type: DataTypes.DATE, allowNull: false},
    dateModified: {type: DataTypes.DATE, allowNull: false}
});

const Contact = sequelize.define('Contact', {
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: {type: DataTypes.STRING, allowNull: false},
    value: {type: DataTypes.STRING, allowNull: false},
    dateCreated: {type: DataTypes.DATE, allowNull: false},
    dateModified: {type: DataTypes.DATE, allowNull: false}
});

const Deal = sequelize.define('Deal', {
    Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    isClosed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    isSold: { type: DataTypes.BOOLEAN, allowNull: false},
    dateCreated: {type: DataTypes.DATE, allowNull: false},
    dateModified: {type: DataTypes.DATE, allowNull: false}
});

Property.hasOne(PropertyType);
PropertyType.belongsTo(Property);

Property.belongsToMany(User, { through: Deal });
User.belongsToMany(Property, { through: Deal });

Review.hasOne(User);
User.belongsTo(Review);

Image.hasOne(Property);
Property.belongsTo(Image);

Sale.hasOne(Deal);
Deal.belongsTo(Sale);

module.exports = {
  User,
  Property,
  PropertyType,
  Deal,
  Sale,
  Contact,
  Image,
  Review
};