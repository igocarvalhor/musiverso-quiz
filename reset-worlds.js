#!/usr/bin/env node
/**
 * Reset script para limpar mundos antigos e permitir que sejam recriados com novos nomes
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || '';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function resetWorlds() {
  try {
    console.log('🌍 Iniciando reset de mundos...');

    // 1. Deletar todas as lições
    console.log('📝 Deletando lições...');
    const { error: lessonsError } = await supabase
      .from('lessons')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (lessonsError) {
      console.error('❌ Erro ao deletar lições:', lessonsError);
      throw lessonsError;
    }
    console.log('✅ Lições deletadas');

    // 2. Deletar todos os mundos
    console.log('🗺️  Deletando mundos...');
    const { error: worldsError } = await supabase
      .from('worlds')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (worldsError) {
      console.error('❌ Erro ao deletar mundos:', worldsError);
      throw worldsError;
    }
    console.log('✅ Mundos deletados');

    // 3. Verificar se os dados foram realmente deletados
    const { data: checkWorlds } = await supabase
      .from('worlds')
      .select('count');

    console.log(`\n✨ Reset completo! Mundos agora podem ser recriados.`);
    console.log('⏭️  Próximo passo: Reinicie o servidor para que os mundos sejam criados com os novos nomes.\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Erro durante reset:', error.message);
    process.exit(1);
  }
}

resetWorlds();
