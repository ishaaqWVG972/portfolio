import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    const configPath = path.join(process.cwd(), 'admin', 'config.yml');
    const config = fs.readFileSync(configPath, 'utf8');

    res.setHeader('Content-Type', 'text/yaml; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache');
    res.status(200).send(config);
  } catch (error) {
    console.error('Error reading CMS config:', error);
    res.status(500).send('Failed to load config');
  }
}
