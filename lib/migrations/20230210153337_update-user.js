
exports.up = async function (knex) {
    await knex.schema.alterTable('user', (table) => {
        table.string('userName').notNull();
        table.string('password').notNull();
        table.string('mail').notNull();
    })
};

exports.down = async function (knex) {
    await knex.schema.alterTable('user', (table) => {
        table.dropColumn('userName');
        table.dropColumn('password')
        table.dropColumn('mail');
    })
};
