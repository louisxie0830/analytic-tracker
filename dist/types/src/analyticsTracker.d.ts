interface EventMetadata {
    [key: string]: any;
}
export default class Tracker {
    private endpoint;
    private flushInterval;
    private eventQueue;
    private intervalId;
    /**
     * 創建一個 Tracker 實例
     * @param {string} endpoint - 事件發送的伺服器端點
     * @param {number} [flushInterval=10000] - 自動發送事件的時間間隔（毫秒）
     */
    constructor(endpoint: string, flushInterval?: number);
    /**
     * 追蹤一個事件
     * @param {string} category - 事件類別
     * @param {string} action - 事件動作
     * @param {string} [label=''] - 事件標籤
     * @param {string} [value=''] - 事件值
     * @param {EventMetadata} [metadata={}] - 事件的其他數據
     */
    trackEvent(category: string, action: string, label?: string, value?: string, metadata?: EventMetadata): void;
    /**
     * 開始自動發送事件
     * @private
     */
    private startFlushInterval;
    /**
     * 停止自動發送事件
     * @public
     */
    stopFlushInterval(): void;
    /**
     * 發送事件到伺服器
     * @private
     * @async
     */
    private flushEvents;
}
export {};
