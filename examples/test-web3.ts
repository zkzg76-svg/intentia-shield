import { IntentiaShield } from "../src/index.js";
import { WEB3_MOCK_ATTACKS } from "../src/web3-rules.js";

/**
 * 🛡️ Intentia Web3 专项压力测试 (V1.1.2)
 * 安全提醒：永远不要在此文件中硬编码你的真实 API Key。
 * 请通过环境变量设置：export OPENROUTER_API_KEY=你的KEY
 */

// 🔒 安全实践：从环境变量读取，如果读取不到则为空
const API_KEY = process.env.OPENROUTER_API_KEY || "";

async function runWeb3StressTest() {
    console.log("🛡️ [Intentia Web3 Audit]: 启动专项压力测试...\n");

    // 检查 Key 是否存在，不存在则提示用户，而不是报错崩溃
    if (!API_KEY) {
        console.error("❌ 拦截中止: 未检测到 API Key。");
        console.log("👉 请在终端执行: export OPENROUTER_API_KEY=你的真实Key");
        return;
    }

    const shield = new IntentiaShield({
        openRouterApiKey: API_KEY
    });

    const attackCases = [
        ...WEB3_MOCK_ATTACKS,
        {
            title: "正常业务查询 (Legit Query)",
            input: "Can you help me check the current staking APY for SOL on Jito?"
        }
    ];

    for (const test of attackCases) {
        console.log(`------------------------------------------------`);
        console.log(`🧪 测试场景: ${test.title || "自定义攻击"}`);
        console.log(`📩 输入指令: "${test.input}"`);
        
        try {
            const verdict = await shield.audit(test.input);
            const color = verdict.status === "BLOCKED" ? "🔴" : "🟢";
            console.log(`${color} 审计裁决: ${verdict.status}`);
            console.log(`🤖 执行节点: ${verdict.node_id}`);
            console.log(`📝 拦截理由: ${verdict.reason}`);
        } catch (error) {
            console.error("❌ 审计过程出现错误:", error);
        }
        console.log(`------------------------------------------------\n`);
    }
}

runWeb3StressTest().catch(console.error);