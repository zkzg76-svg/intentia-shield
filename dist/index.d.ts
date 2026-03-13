/**
 * 🛡️ Intentia Shield SDK - V1.1.2
 * 融合了“初期实战模型”与“新版冗余矩阵”的终极版本
 */
export interface AuditResult {
    status: "BLOCKED" | "PASS";
    node_id: string;
    reason: string;
    risk_score?: number;
}
export interface IntentiaConfig {
    openRouterApiKey: string;
    customModels?: string[];
}
export declare class IntentiaShield {
    private client;
    private models;
    constructor(config: IntentiaConfig);
    private cleanJsonResponse;
    audit(intent: string): Promise<AuditResult>;
}
