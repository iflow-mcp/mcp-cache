#!/usr/bin/env node
/**
 * mcp-cache - Universal response management wrapper for any MCP server
 *
 * Usage: mcp-cache <command> <args...>
 * Example: mcp-cache python -m chrome_automation_mcp
 */

import { MCPProxy } from './proxy.js';

async function main() {
  // Skip first two args (node and script path)
  const args = process.argv.slice(2);

  // Allow starting without target server for testing management tools
  // When no target server is provided, mcp-cache will only provide management tools
  if (args.length === 0) {
    console.error('mcp-cache: Starting without target server. Only management tools will be available.');
    console.error('Usage: mcp-cache <command> <args...>');
    console.error('Example: mcp-cache python -m chrome_automation_mcp');
    // Don't exit, continue with empty command
  }

  const command = args[0] || '';
  const commandArgs = args.slice(1);

  try {
    const proxy = new MCPProxy(command, commandArgs);
    await proxy.start();
  } catch (error) {
    console.error('Error starting mcp-cache:', error);
    process.exit(1);
  }
}

main();