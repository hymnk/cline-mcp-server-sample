import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

/**
 * 時間表示MCPサーバー
 * 日本時間（JST）で現在時刻を返すサーバー
 */
const server = new McpServer({
    name: "時間表示サーバー",
    version: "1.0.0",
    description: "日本時間（JST）で現在時刻を取得するMCPサーバー"
})

/**
 * 現在時刻を取得するツール
 * @param format - 時刻の表示形式 ("full" | "date" | "time")
 * @returns フォーマットされた時刻文字列
 */
server.tool(
    "get-current-time",
    { format: z.enum(["full", "date", "time"]).optional() },
    async ({ format = "full" }) => {
        try {
            const options = {
                timeZone: "Asia/Tokyo",
                hour12: false
            };
            
            const now = new Date();
            let timeString = "";
            
            switch (format) {
                case "date":
                    timeString = now.toLocaleDateString("ja-JP", options);
                    break;
                case "time":
                    timeString = now.toLocaleTimeString("ja-JP", options);
                    break;
                case "full":
                default:
                    timeString = now.toLocaleString("ja-JP", options);
            }
            return {
                content: [{
                    type: "text",
                    text: `現在の日本時刻は${timeString}です`
                }]
            };
        } catch (error) {
            throw new McpError(
                ErrorCode.InternalError,
                "時刻の取得中にエラーが発生しました"
            );
        }
    }
)

// サーバーを起動
try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.log("時間表示MCPサーバーが正常に起動しました。");
} catch (error) {
    console.error("サーバーの起動に失敗しました:", error);
    process.exit(1);
}
