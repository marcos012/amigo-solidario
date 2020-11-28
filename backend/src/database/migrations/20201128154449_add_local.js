exports.up = function(knex) {
    return knex.schema.table('casos', function (table) {
        table.string('local').notNullable().defaultTo('Porto Alegre / RS');
    })
};

exports.down = function(knex) {
    return knex.schema.table('casos', function (table) {
        table.dropColumn('local');
    })
};
