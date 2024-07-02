var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class Tracker {
    /**
     * 創建一個 Tracker 實例
     * @param {string} endpoint - 事件發送的伺服器端點
     * @param {number} [flushInterval=10000] - 自動發送事件的時間間隔（毫秒）
     */
    constructor(endpoint, flushInterval = 10000) {
        this.intervalId = null;
        this.endpoint = endpoint;
        this.flushInterval = flushInterval;
        this.eventQueue = [];
        this.startFlushInterval();
    }
    /**
     * 追蹤一個事件
     * @param {string} category - 事件類別
     * @param {string} action - 事件動作
     * @param {string} [label=''] - 事件標籤
     * @param {string} [value=''] - 事件值
     * @param {EventMetadata} [metadata={}] - 事件的其他數據
     */
    trackEvent(category, action, label = '', value = '', metadata = {}) {
        const event = {
            category,
            action,
            label,
            value,
            metadata,
            timestamp: new Date().toISOString(),
        };
        this.eventQueue.push(event);
    }
    /**
     * 開始自動發送事件
     * @private
     */
    startFlushInterval() {
        this.stopFlushInterval();
        this.intervalId = setInterval(() => this.flushEvents(), this.flushInterval);
    }
    /**
     * 停止自動發送事件
     * @public
     */
    stopFlushInterval() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
    /**
     * Cleans the event queue by resetting it to an empty array.
     *
     * @return {void} This function does not return anything.
     */
    cleanEventQueue() {
        this.eventQueue = [];
    }
    /**
     * 發送事件到伺服器
     * @private
     * @async
     */
    flushEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.eventQueue.length === 0)
                return;
            try {
                const response = yield fetch(this.endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.eventQueue),
                });
                if (response.ok) {
                    const data = yield response.json();
                    this.eventQueue = []; // 清空事件隊列
                }
            }
            catch (error) {
                console.error('Error sending events:', error);
            }
        });
    }
}
//# sourceMappingURL=analyticsTracker.js.map