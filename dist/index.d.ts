export interface AuditResult {
    status: "BLOCKED" | "PASS";
    node_id: string;
    reason: string;
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
