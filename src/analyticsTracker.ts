interface EventMetadata {
  [key: string]: any;
}

interface TrackedEvent {
  category: string;
  action: string;
  label: string;
  value: string;
  metadata: EventMetadata;
  timestamp: string;
}

export default class Tracker {
  private endpoint: string;
  private flushInterval: number;
  private eventQueue: TrackedEvent[];
  private intervalId: ReturnType<typeof setInterval> | null = null;

  /**
   * 創建一個 Tracker 實例
   * @param {string} endpoint - 事件發送的伺服器端點
   * @param {number} [flushInterval=10000] - 自動發送事件的時間間隔（毫秒）
   */
  constructor(endpoint: string, flushInterval = 10000) {
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
  public trackEvent(
    category: string,
    action: string,
    label = '',
    value = '',
    metadata: EventMetadata = {}
  ): void {
    const event: TrackedEvent = {
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
  private startFlushInterval(): void {
    this.stopFlushInterval();
    this.intervalId = setInterval(() => this.flushEvents(), this.flushInterval);
  }

  /**
   * 停止自動發送事件
   * @public
   */
  public stopFlushInterval(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  /**
   * 發送事件到伺服器
   * @private
   * @async
   */
  private async flushEvents(): Promise<void> {
    if (this.eventQueue.length === 0) return;

    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.eventQueue),
      });

      if (response.ok) {
        const data = await response.json();
        this.eventQueue = []; // 清空事件隊列
      }
    } catch (error) {
      console.error('Error sending events:', error);
    }
  }
}
