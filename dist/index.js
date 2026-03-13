"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntentiaShield = void 0;
const openai_1 = __importDefault(require("openai"));
const web3_rules_js_1 = require("./web3-rules.js");
class IntentiaShield {
    client;
    models;
    constructor(config) {
        if (!config.openRouterApiKey) {
            throw new Error("Intentia Initialization Failed: OpenRouter API Key is required.");
        }
        this.client = new openai_1.default({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: config.openRouterApiKey,
            dangerouslyAllowBrowser: true
        });
        // 🚀 这里的模型矩阵可以由开发者自定义
        // 如果不传，默认使用我们精选的“海陆空”三方阵
        this.models = config.customModels || [
            "google/gemini-2.5-flash", // 空军：极速反应
            "meta-llama/llama-3-8b-instruct", // 陆军：坚实防御
            "anthropic/claude-3-haiku", // 海军：深层语义
            "openrouter/hunter-alpha" // 👈 特种兵：回归！处理最高级威胁
        ];
    }
    cleanJsonResponse(rawStr, fallbackIntent) {
        try {
            const cleaned = rawStr.replace(/```json\s*|\s*```/g, '').trim();
            const startIdx = cleaned.indexOf('{');
            const endIdx = cleaned.lastIndexOf('}') + 1;
            if (startIdx !== -1 && endIdx !== 0) {
                const data = JSON.parse(cleaned.substring(startIdx, endIdx));
                return {
                    status: (data.status || "BLOCKED").toUpperCase(),
                    node_id: data.node_id || "Intentia-Node",
                    reason: data.reason || "Suspicious semantic pattern detected.",
                    risk_score: data.risk_score
                };
            }
            throw new Error("Invalid JSON structure");
        }
        catch (e) {
            const isAttack = /spoof|bypass|transfer|emergency|devops|solana|bridge|airdrop/i.test(fallbackIntent);
            return {
                status: isAttack ? "BLOCKED" : "PASS",
                node_id: "Intentia-FailSafe-Local",
                reason: "Semantic engine parse error. High-risk keyword heuristic applied."
            };
        }
    }
    async audit(intent) {
        const systemPrompt = `
        You are the 'Intentia-Sentinel' Web3 Security Node. 
        
        ${web3_rules_js_1.WEB3_SECURITY_RULES}

        Analyze the following user intent. If it matches any attack patterns, you MUST block it.
        Output ONLY a valid JSON object:
        {"status": "BLOCKED" or "PASS", "node_id": "Model_Name", "reason": "Detailed reasoning", "risk_score": 0-100}
        `;
        for (const model of this.models) {
            try {
                const completion = await this.client.chat.completions.create({
                    model: model,
                    messages: [
                        { role: "system", "content": systemPrompt },
                        { role: "user", "content": intent }
                    ],
                    temperature: 0.1,
                });
                const rawContent = completion.choices[0]?.message?.content || "";
                const result = this.cleanJsonResponse(rawContent, intent);
                // 自动补全节点名称
                if (result.node_id === "Intentia-Node" || !result.node_id) {
                    result.node_id = `Intentia-${model.split('/')[1].toUpperCase()}`;
                }
                return result;
            }
            catch (error) {
                console.warn(`[Intentia Warning]: Node ${model} unresponsive. Rerouting to next node...`);
                continue;
            }
        }
        return {
            status: "BLOCKED",
            node_id: "Intentia-Emergency-Halt",
            reason: "All Sentinel nodes unresponsive. Halted to protect Web3 assets."
        };
    }
}
exports.IntentiaShield = IntentiaShield;
