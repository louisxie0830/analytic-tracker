# Analytic Tracker

Analytic Tracker is a TypeScript library for tracking and analyzing events.

## Features

- Track various types of events
- Automatically send events to a server
- Support for event categories, actions, labels, and values
- Configurable auto-send interval

## Installation

Install using npm:

```bash
npm install git+https://github.com/louisxie0830/analytic-tracker.git
```

## Usage

First, import the `Tracker` class and create an instance:

```typescript
import Tracker from 'analytic-tracker';

// Create a Tracker instance
const tracker = new Tracker('/track');
```

### Track Events

Use the `trackEvent` method to track an event:

```typescript
tracker.trackEvent('video', 'play', 'promo_video', 'start');
tracker.trackEvent('button', 'click', 'signup_button', '1');
```

### Configuration

You can pass a custom send interval (in milliseconds) when creating the `Tracker` instance:

```typescript
const tracker = new Tracker('/track', 5000); // Send events every 5 seconds
```

### Stop Auto-Sending Events

To stop auto-sending events, use the `stopFlushInterval` method:

```typescript
tracker.stopFlushInterval();
```

## API

### `trackEvent(category: string, action: string, label?: string, value?: string, metadata?: object): void`

Track an event.

- `category`: The event category (required)
- `action`: The event action (required)
- `label`: The event label (optional)
- `value`: The event value (optional)
- `metadata`: Additional data (optional)

### `stopFlushInterval(): void`

Stop auto-sending events.

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## License

This project is licensed under the [MIT License](LICENSE).
