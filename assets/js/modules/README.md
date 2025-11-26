# JavaScript Modules

This directory contains modular JavaScript components for the Meetup website.

## Logger Module

The `logger.js` module provides a comprehensive client-side logging utility with multiple log levels and configuration options.

### Features

- **Multiple Log Levels**: DEBUG, INFO, WARN, ERROR
- **Console Logging**: Formatted output to browser console
- **Local Storage**: Optional persistent log storage
- **Context-based Logging**: Create child loggers with specific contexts
- **Error Handling**: Proper handling of circular references and Error objects
- **Development Mode**: Logger exposed globally on localhost for debugging

### Usage

#### Basic Usage

```javascript
import { logger } from './modules/logger.js';

// Log different levels
logger.debug('Debug message', { additionalData: 'value' });
logger.info('Application started');
logger.warn('Warning message', { warning: 'details' });
logger.error('Error occurred', new Error('Something went wrong'));
```

#### Creating Child Loggers

```javascript
import { logger } from './modules/logger.js';

// Create a child logger with a specific context
const componentLogger = logger.createChild('MyComponent');
componentLogger.info('Component initialized');
// Output: [2025-11-26T...] [MeetupApp:MyComponent] [INFO] Component initialized
```

#### Custom Logger Instance

```javascript
import { Logger } from './modules/logger.js';

const customLogger = new Logger({
    level: Logger.LogLevel.DEBUG,
    enableConsole: true,
    enableStorage: true,
    maxStorageEntries: 200,
    context: 'CustomApp'
});

customLogger.info('Custom logger initialized');
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `level` | number | `Logger.LogLevel.INFO` | Minimum log level to record |
| `enableConsole` | boolean | `true` | Enable console output |
| `enableStorage` | boolean | `false` | Enable localStorage persistence |
| `maxStorageEntries` | number | `100` | Maximum number of logs to store |
| `storageKey` | string | `'app_logs'` | localStorage key for logs |
| `context` | string | `'App'` | Context identifier for logs |

### Log Levels

```javascript
Logger.LogLevel.DEBUG = 0  // Detailed debugging information
Logger.LogLevel.INFO = 1   // General informational messages
Logger.LogLevel.WARN = 2   // Warning messages
Logger.LogLevel.ERROR = 3  // Error messages
Logger.LogLevel.NONE = 4   // Disable all logging
```

### API Methods

#### Logging Methods

- `logger.debug(message, data?)` - Log debug messages
- `logger.info(message, data?)` - Log informational messages
- `logger.warn(message, data?)` - Log warnings
- `logger.error(message, data?)` - Log errors

#### Storage Methods

- `logger.getLogs()` - Retrieve all stored logs
- `logger.clearLogs()` - Clear all stored logs
- `logger.exportLogs()` - Download logs as JSON file

#### Configuration Methods

- `logger.setLevel(level)` - Change log level at runtime
- `logger.createChild(context)` - Create a child logger with new context

### Development Mode

When running on localhost, the logger is exposed globally as `window.logger` for debugging in the browser console:

```javascript
// In browser console
logger.info('Test message');
logger.getLogs();
logger.setLevel(logger.constructor.LogLevel.DEBUG);
```

### Log Format

Console logs are formatted as:
```
[TIMESTAMP] [CONTEXT] [LEVEL] MESSAGE
```

Example:
```
[2025-11-26T11:50:06.249Z] [MeetupApp:Navigation] [INFO] Initializing Navigation module
```

### Storage Format

Logs stored in localStorage are JSON objects with the following structure:

```json
{
  "timestamp": "2025-11-26T11:50:06.249Z",
  "level": "INFO",
  "context": "MeetupApp:Navigation",
  "message": "Initializing Navigation module",
  "data": null,
  "userAgent": "Mozilla/5.0...",
  "url": "http://localhost:8000/"
}
```

## Other Modules

### Navigation (`navigation.js`)
Handles smooth scrolling navigation, active state tracking, and mobile menu functionality.

### SmoothScroll (`smooth-scroll.js`)
Provides smooth scrolling behavior for all anchor links on the page.

### RegistrationForm (`registration-form.js`)
Manages form validation and submission for the registration form.

### AnimationObserver (`animation-observer.js`)
Uses Intersection Observer API to trigger scroll-based animations.

## Integration

All modules are initialized in `main.js` and use the logger for debugging and monitoring:

```javascript
import { logger } from './modules/logger.js';
import { Navigation } from './modules/navigation.js';

// Each module creates its own child logger
const nav = new Navigation(); // Uses logger.createChild('Navigation')
```
