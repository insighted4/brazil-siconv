import * as Knex from 'knex';

exports.up = function (knex: Knex, promise: any): Promise<any> {
    return promise.all([
        // Consorcios
        knex.schema.createTable('consorcios', (table) => {
            table.integer('id').primary();
            table.string('id_proposta'); // ID_PROPOSTA
            table.string('cnpj_consorcio'); // CNPJ_CONSORCIO;
            table.string('nome_consorcio'); // NOME_CONSORCIO;
            table.string('codigo_cnae_primario'); // CODIGO_CNAE_PRIMARIO;
            table.text('desc_cnae_primario'); // DESC_CNAE_PRIMARIO;
            table.string('codigo_cnae_secundario'); // CODIGO_CNAE_SECUNDARIO;
            table.text('desc_cnae_secundario'); // DESC_CNAE_SECUNDARIO;
            table.string('cnpj_participante'); // CNPJ_PARTICIPANTE;
            table.string('nome_participante'); // NOME_PARTICIPANTE;
            table.timestamps(true, true);

            table.unique(['id_proposta', 'cnpj_consorcio', 'nome_consorcio', 'codigo_cnae_primario', 'codigo_cnae_secundario', 'cnpj_participante']);
            table.index(['id_proposta']);
            table.index(['cnpj_consorcio']);
            table.index(['cnpj_participante']);
        }),

        // Convenio
        knex.schema.createTable('convenios', (table) => {
            table.integer('id').primary();
            table.string('nr_convenio');
            table.string('id_proposta');
            table.date('dia_assin_conv');
            table.string('sit_convenio');
            table.string('subsituacao_conv');
            table.string('situacao_publicacao');
            table.boolean('instrumento_ativo');
            table.boolean('ind_opera_obtv');
            table.string('nr_processo');
            table.string('ug_emitente');
            table.string('dia_publ_conv');
            table.date('dia_inic_vigenc_conv');
            table.date('dia_fim_vigenc_conv');
            table.date('dias_prest_contas');
            table.date('dia_limite_prest_contas');
            table.string('situacao_contratacao');
            table.boolean('ind_assinado');
            table.string('qtde_convenios');
            table.string('qtd_ta');
            table.string('qtd_prorroga');
            table.float('vl_global_conv');
            table.float('vl_repasse_conv');
            table.float('vl_contrapartida_conv');
            table.float('vl_empenhado_conv');
            table.float('vl_desembolsado_conv');
            table.float('vl_saldo_reman_tesouro');
            table.float('vl_saldo_reman_convenente');
            table.float('vl_rendimento_aplicacao');
            table.float('vl_ingresso_contrapartida');
            table.timestamps(true, true);

            table.unique(['nr_convenio']);
            table.index(['id_proposta']);
            table.index(['dia_assin_conv']);
            table.index(['nr_processo']);
        }),

        // Desembolso
        knex.schema.createTable('desembolsos', (table) => {
            table.integer('id').primary();
            table.string('nr_convenio');
            table.date('dt_ult_desembolso');
            table.integer('qtd_dias_sem_desembolso');
            table.string('id_desembolso');
            table.date('data_desembolso');
            table.integer('ano_desembolso');
            table.integer('mes_desembolso');
            table.string('nr_siafi');
            table.float('vl_desembolsado');
            table.timestamps(true, true);

            table.unique(['nr_convenio', 'id_desembolso']);
            table.index(['nr_convenio']);
        }),

        // Emenda
        knex.schema.createTable('emendas', (table) => {
            table.integer('id').primary();
            table.string('id_proposta');
            table.string('qualif_proponente');
            table.string('cod_programa_emenda');
            table.string('nr_emenda');
            table.string('nome_parlamentar');
            table.string('beneficiario_emenda');
            table.boolean('ind_impositivo');
            table.string('tipo_parlamentar');
            table.float('valor_repasse_proposta_emenda');
            table.float('valor_repasse_emenda');
            table.timestamps(true, true);

            table.index(['id_proposta']);
            table.index(['cod_programa_emenda']);
            table.index(['nr_emenda']);
        }),

        // Empenho
        knex.schema.createTable('empenhos', (table) => {
            table.integer('id').primary();
            table.string('id_empenho');
            table.string('nr_empenho');
            table.string('tipo_nota');
            table.text('desc_tipo_nota');
            table.string('data_emissao');
            table.string('cod_situacao_empenho');
            table.text('desc_situacao_empenho');
            table.string('valor_empenho');
            table.string('nr_convenio');
            table.timestamps(true, true);

            table.unique(['id_empenho']);
            table.index(['nr_empenho']);
        }),

        // Empenhos Desembolsos
        knex.schema.createTable('empenho_desembolsos', (table) => {
            table.integer('id').primary();
            table.string('id_desembolso');
            table.string('id_empenho');
            table.float('valor_grupo');
            table.timestamps(true, true);

            table.index(['id_desembolso', 'id_empenho']);
        }),

        // Etapa Crono Fisicos
        knex.schema.createTable('etapa_crono_fisicos', (table) => {
            table.integer('id').primary();
            table.string('id_meta');
            table.string('id_etapa');
            table.string('nr_etapa');
            table.text('desc_etapa');
            table.date('data_inicio_etapa');
            table.date('data_fim_etapa');
            table.string('uf_etapa');
            table.string('municipio_etapa');
            table.text('endereco_etapa');
            table.string('cep_etapa');
            table.integer('qtd_etapa');
            table.string('und_fornecimento_etapa');
            table.float('vl_etapa');
            table.timestamps(true, true);

            table.unique(['id_etapa']);
            table.index(['id_meta']);
            table.index(['nr_etapa']);
            table.index(['uf_etapa']);
        }),

        // Historico Situacao
        knex.schema.createTable('historico_situacoes', (table) => {
            table.integer('id').primary();
            table.string('id_proposta');
            table.string('nr_convenio');
            table.date('dia_historico_sit');
            table.string('historico_sit');
            table.integer('dias_historico_sit');
            table.string('cod_historico_sit');
            table.timestamps(true, true);

            table.unique(['id_proposta', 'dia_historico_sit', 'cod_historico_sit']);
            table.index(['id_proposta']);
            table.index(['nr_convenio']);
        }),

        // Ingresso Contrapartida
        knex.schema.createTable('ingresso_contrapartidas', (table) => {
            table.integer('id').primary();
            table.string('nr_convenio');
            table.date('dt_ingresso_contrapartida');
            table.float('vl_ingresso_contrapartida');
            table.timestamps(true, true);

            table.unique(['nr_convenio', 'dt_ingresso_contrapartida']);
            table.index(['nr_convenio']);
        }),

        // Meta Crono Fisico
        knex.schema.createTable('meta_crono_fisicos', (table) => {
            table.integer('id').primary();
            table.string('id_meta');
            table.string('nr_convenio');
            table.string('cod_programa');
            table.string('nome_programa');
            table.integer('nr_meta');
            table.string('tipo_meta');
            table.text('desc_meta');
            table.date('data_inicio_meta');
            table.date('data_fim_meta');
            table.string('uf_meta');
            table.string('municipio_meta');
            table.text('endereco_meta');
            table.string('cep_meta');
            table.integer('qtd_meta');
            table.string('und_fornecimento_meta');
            table.float('vl_meta');
            table.timestamps(true, true);

            table.unique(['id_meta']);
            table.index(['nr_convenio']);
            table.index(['cod_programa']);
            table.index(['nome_programa']);
            table.index(['nr_meta']);
            table.index(['uf_meta']);
        }),

        // Obtv Convenente
        knex.schema.createTable('obtv_convenentes', (table) => {
            table.integer('id').primary();
            table.string('nr_mov_fin');
            table.string('identif_favorecido_obtv_conv');
            table.string('nm_favorecido_obtv_conv');
            table.string('tp_aquisicao');
            table.float('vl_pago_obtv_conv');
            table.timestamps(true, true);

            table.index(['nr_mov_fin']);
            table.index(['identif_favorecido_obtv_conv']);

        }),

        // Pagamento
        knex.schema.createTable('pagamentos', (table) => {
            table.integer('id').primary();
            table.string('nr_mov_fin');
            table.string('nr_convenio');
            table.string('identif_fornecedor');
            table.string('nome_fornecedor');
            table.string('tp_mov_financeira');
            table.date('data_pag');
            table.text('nr_dl');
            table.text('desc_dl');
            table.float('vl_pago');
            table.timestamps(true, true);

            table.unique(['nr_mov_fin']);
            table.index(['nr_convenio']);
            table.index(['identif_fornecedor']);
        }),

        // Plano Aplicacao Detalhado
        knex.schema.createTable('plano_aplicacao_detalhados', (table) => {
            table.integer('id').primary();
            table.string('id_proposta');
            table.string('sigla');
            table.string('municipio');
            table.integer('natureza_aquisicao');
            table.text('descricao_item');
            table.string('cep_item');
            table.text('endereco_item');
            table.string('tipo_despesa_item');
            table.string('natureza_despesa');
            table.string('sit_item');
            table.integer('qtd_item');
            table.float('valor_unitario_item');
            table.float('valor_total_item');
            table.timestamps(true, true);

            table.index(['id_proposta']);
            table.index(['sigla']);
        }),

        // Programa
        knex.schema.createTable('programas', (table) => {
            table.integer('id').primary();
            table.string('cod_orgao_sup_programa');
            table.text('desc_orgao_sup_programa');
            table.string('id_programa');
            table.string('cod_programa');
            table.string('nome_programa');
            table.string('sit_programa');
            table.date('data_disponibilizacao');
            table.integer('ano_disponibilizacao');
            table.date('dt_prog_ini_receb_prop');
            table.date('dt_prog_fim_receb_prop');
            table.date('dt_prog_ini_emenda_par');
            table.date('dt_prog_fim_emenda_par');
            table.date('dt_prog_ini_benef_esp');
            table.date('dt_prog_fim_benef_esp');
            table.string('modalidade_programa');
            table.string('natureza_juridica_programa');
            table.string('uf_programa');
            table.string('acao_orcamentaria');
            table.timestamps(true, true);

            table.index(['cod_orgao_sup_programa']);
            table.index(['id_programa']);
            table.index(['cod_programa']);
            table.index(['uf_programa']);
        }),

        // Programa Proposta
        knex.schema.createTable('programa_propostas', (table) => {
            table.integer('id').primary();
            table.string('id_programa');
            table.string('id_proposta');
            table.timestamps(true, true);

            table.index(['id_programa', 'id_proposta']);
        }),

        // Proponentes
        knex.schema.createTable('proponentes', (table) => {
            table.integer('id').primary();
            table.string('identif_proponente');
            table.string('nm_proponente');
            table.string('municipio_proponente');
            table.string('uf_proponente');
            table.text('endereco_proponente');
            table.string('bairro_proponente');
            table.string('cep_proponente');
            table.string('email_proponente');
            table.string('telefone_proponente');
            table.string('fax_proponente');
            table.timestamps(true, true);

            table.unique(['identif_proponente']);
            table.index(['nm_proponente']);
            table.index(['uf_proponente']);

        }),

        // Proposta
        knex.schema.createTable('propostas', (table) => {
            table.integer('id').primary();
            table.string('id_proposta');
            table.string('uf_proponente');
            table.string('munic_proponente');
            table.string('cod_munic_ibge');
            table.string('cod_orgao_sup');
            table.text('desc_orgao_sup');
            table.string('natureza_juridica');
            table.string('nr_proposta');
            table.date('dia_proposta');
            table.string('cod_orgao');
            table.text('desc_orgao');
            table.string('modalidade');
            table.string('identif_proponente');
            table.string('nm_proponente');
            table.string('cep_proponente');
            table.text('endereco_proponente');
            table.string('bairro_proponente');
            table.string('nm_banco');
            table.string('situacao_conta');
            table.string('situacao_projeto_basico');
            table.string('sit_proposta');
            table.date('dia_inic_vigencia_proposta');
            table.date('dia_fim_vigencia_proposta');
            table.text('objeto_proposta');
            table.float('vl_global_prop');
            table.float('vl_repasse_prop');
            table.float('vl_contrapartida_prop');
            table.timestamps(true, true);

            table.unique(['id_proposta']);
            table.index(['uf_proponente']);
            table.index(['nr_proposta']);
            table.index(['cod_orgao']);
            table.index(['nm_proponente']);
        }),

        // Prorroga Oficio
        knex.schema.createTable('prorroga_oficios', (table) => {
            table.integer('id').primary();
            table.string('nr_convenio');
            table.string('nr_prorroga');
            table.date('dt_inicio_prorroga');
            table.date('dt_fim_prorroga');
            table.integer('dias_prorroga');
            table.date('dt_assinatura_prorroga');
            table.string('sit_prorroga');
            table.timestamps(true, true);

            table.unique(['nr_convenio', 'nr_prorroga', 'dt_inicio_prorroga', 'dt_fim_prorroga', 'dias_prorroga', 'dt_assinatura_prorroga', 'sit_prorroga']);
            table.index(['nr_convenio']);
            table.index(['nr_prorroga']);
        }),

        // Termo Aditivos
        knex.schema.createTable('termo_aditivos', (table) => {
            table.integer('id').primary();
            table.string('nr_convenio');
            table.string('numero_ta');
            table.string('tipo_ta');
            table.float('vl_global_ta');
            table.float('vl_repasse_ta');
            table.float('vl_contrapartida_ta');
            table.date('dt_assinatura_ta');
            table.date('dt_inicio_ta');
            table.date('dt_fim_ta');
            table.text('justificativa_ta');
            table.timestamps(true, true);

            table.unique(['nr_convenio', 'numero_ta', 'tipo_ta', 'dt_inicio_ta', 'justificativa_ta']);
            table.index(['nr_convenio']);
            table.index(['numero_ta']);
        }),

        // History
        knex.schema.createTable('history', (table) => {
            table.increments('id');
            table.string('file').notNullable();
            table.string('line').notNullable();
            table.string('persisted').notNullable();
            table.timestamps(true, true);

            table.unique(['file', 'line']);
        }),
    ]);

};

exports.down = function (knex: Knex, promise: any): Promise<any> {
    return promise.all([
        knex.schema.dropTable('consorcios'),
        knex.schema.dropTable('convenios'),
        knex.schema.dropTable('desembolsos'),
        knex.schema.dropTable('emendas'),
        knex.schema.dropTable('empenhos'),
        knex.schema.dropTable('empenho_desembolsos'),
        knex.schema.dropTable('etapa_crono_fisicos'),
        knex.schema.dropTable('historico_situacoes'),
        knex.schema.dropTable('ingresso_contrapartidas'),
        knex.schema.dropTable('meta_crono_fisicos'),
        knex.schema.dropTable('obtv_convenentes'),
        knex.schema.dropTable('pagamentos'),
        knex.schema.dropTable('plano_aplicacao_detalhados'),
        knex.schema.dropTable('programas'),
        knex.schema.dropTable('programa_propostas'),
        knex.schema.dropTable('proponentes'),
        knex.schema.dropTable('propostas'),
        knex.schema.dropTable('prorroga_oficios'),
        knex.schema.dropTable('termo_aditivos'),
        knex.schema.dropTable('history'),
    ]);
};
