# mcp

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

Settings:
This project was created using `bun init` in bun v1.2.5. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## Install Cline in VSCode

1. Search for "Cline" in the VSCode Extensions Marketplace
2. Click "Install" to install the extension

## Configure MCPServer

1. Open `~/.vscode-server/data/User/globalStorage/saoudrizwan.claude-dev/settings/cline_mcp_settings.json`
2. Add the following configuration:
```json
{
  "mcpServers": {
    "example-server": {
      "command": "/root/.bun/bin/bun",  # Use full path to bun executable
      "args": ["run", "/workspace/mcp-server/index.ts"],  # Use full path to index.ts
      "env": {}
    }
  }
}
```

3. Enable the MCPServer in Cline:
   - Open the Command Palette (Ctrl+Shift+P or Cmd+Shift+P)
   - Search for "Cline: Refresh MCP Servers"
   - Select the command to refresh and enable the server
   - Verify the server is running by checking the Cline status bar
