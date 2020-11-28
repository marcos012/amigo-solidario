exports.up = function(knex) {
    return knex.schema.createTable('casos', function (table) {
        table.increments();
        table.string('titulo').notNullable();
        table.string('descricao').notNullable();
        table.decimal('qtd_pessoas').notNullable();

        table.string('id_user').notNullable();

        table.foreign('id_user').references('id').inTable('usuarios')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('casos')
};
