🛡️ Intentia Shield

The Semantic Firewall for Autonomous AI Agents.
(专为 Web3 智能体打造的语义防火墙)

Intentia is an open-source, BYOK (Bring Your Own Key) security middleware designed to protect Web3 agents (Eliza, OpenClaw, LangChain) from Logic Hijacking and Semantic Injections.

Intentia 是一个开源的、自带密钥 (BYOK) 的安全中间件。它旨在保护 Web3 智能体免受逻辑劫持和语义注入的攻击。

🚀 Key Features (核心特性)

Web3 Intelligence Module: Optimized for on-chain attack vectors. (专为链上攻击场景优化)。

Zero Infrastructure Dependency: Runs entirely in your local environment. (零基础设施依赖，本地运行)。

Bring Your Own Key (BYOK): You control your privacy and costs. (自带密钥，掌控隐私)。

Dynamic Failover Matrix: Multi-model redundancy. (多模型冗余，永不下线)。

🛡️ Web3 Specific Protections (专项防御场景)

Intentia Shield v1.2 includes pre-configured intelligence for:
(Intentia Shield v1.2 版本已针对以下高频攻击深度优化：)

Address Poisoning (地址投毒): Detects attempts to spoof destination addresses or replace verified wallets with malicious ones via "checksum error" or "update" excuses. (识别以“校验错误”或“地址更新”为借口诱导修改转账目标的攻击)。

Fake Bridge/Emergency Drains (虚假跨链/紧急提款): Identifies coercive language like "Contract hacked" or "Bridge exploit" used to panic agents into "safeguarding" funds to attacker-controlled vaults. (识别利用“合约被黑”、“跨链桥漏洞”等恐慌话术诱导智能体执行“紧急提款”的逻辑)。

Airdrop & Signature Phishing (空投/签名钓鱼): Flags suspicious requests asking agents to sign unverified messages or "approve" spending for rewards. (拦截诱导智能体签署恶意授权或空投领取的签名请求)。

📦 Installation (安装)

npm install @intentia-network/shield


💻 Quick Start (快速开始)

TypeScript Example

import { IntentiaShield } from "@intentia-network/shield";

const shield = new IntentiaShield({ 
    openRouterApiKey: "sk-or-v1-..." 
});

async function safeTransfer(userPrompt) {
    // Audit the intent specifically for Web3 risks
    const verdict = await shield.audit(userPrompt);

    if (verdict.status === "BLOCKED") {
        console.error(`🚨 Attack Blocked: ${verdict.reason}`);
        return;
    } 

    // Execute transfer...
}


📜 License

MIT License. Open source.