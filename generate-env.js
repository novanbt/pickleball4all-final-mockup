const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const ENV_PATH = path.join(ROOT_DIR, '.env');
const OUTPUT_PATH = path.join(ROOT_DIR, 'js', 'env.js');

function parseEnvFile(filePath) {
  const envObj = {};
  if (!fs.existsSync(filePath)) return envObj;

  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
      envObj[key] = val;
    }
  }
  return envObj;
}

const fileEnv = parseEnvFile(ENV_PATH);

const supabaseProjectId = process.env.SUPABASE_PROJECT_ID || fileEnv.SUPABASE_PROJECT_ID || '';
const supabaseUrl = process.env.SUPABASE_URL || fileEnv.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || fileEnv.SUPABASE_ANON_KEY || '';

const envJsContent = `// Auto-generated runtime environment configuration
// This file is generated from .env and is ignored by git
window.__ENV__ = {
  SUPABASE_PROJECT_ID: ${JSON.stringify(supabaseProjectId)},
  SUPABASE_URL: ${JSON.stringify(supabaseUrl)},
  SUPABASE_ANON_KEY: ${JSON.stringify(supabaseAnonKey)}
};
`;

fs.writeFileSync(OUTPUT_PATH, envJsContent, 'utf-8');
console.log('✅ js/env.js successfully generated from environment!');
