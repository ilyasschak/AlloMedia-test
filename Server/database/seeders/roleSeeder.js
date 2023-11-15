const Role = require('../../models/Role');

async function insertRoles() {
    const rolesToInsert = [
        { name: 'Manager' },
        { name: 'DeliveryMan' },
        { name: 'Client' },
    ];
    try {
        const roles = [];
        for (const role of rolesToInsert) {
          const newRole = await Role.findOneAndUpdate(
            { name: role.name },
            role,
            { upsert: true, new: true }
          );
          roles.push(newRole);
        }
        console.log('Roles inserted successfully');
        return roles;
    } catch (error) {
        console.error('Error inserting roles:', error);
    }
}

module.exports = insertRoles ;
