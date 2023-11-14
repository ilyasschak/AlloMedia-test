const Role = require('../../models/Role');

async function insertRoles() {
    const rolesToInsert = [
        { name: 'Manager' },
        { name: 'DeliveryMan' },
        { name: 'Client' },
    ];

    try {
        await Role.insertMany(rolesToInsert);
        console.log('Roles inserted successfully');
    } catch (error) {
        console.error('Error inserting roles:', error);
    }
}

module.exports = insertRoles ;
