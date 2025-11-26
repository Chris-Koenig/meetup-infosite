// modules/logger.js
/**
 * Client-side logging utility
 * Provides structured logging with multiple log levels and configuration options
 */

export class Logger {
    static LogLevel = {
        DEBUG: 0,
        INFO: 1,
        WARN: 2,
        ERROR: 3,
        NONE: 4
    };

    constructor(options = {}) {
        this.level = options.level !== undefined 
            ? options.level 
            : Logger.LogLevel.INFO;
        
        this.enableConsole = options.enableConsole !== undefined 
            ? options.enableConsole 
            : true;
        
        this.enableStorage = options.enableStorage !== undefined 
            ? options.enableStorage 
            : false;
        
        this.maxStorageEntries = options.maxStorageEntries || 100;
        this.storageKey = options.storageKey || 'app_logs';
        this.context = options.context || 'App';
        
        // Initialize storage if enabled
        if (this.enableStorage) {
            this.initializeStorage();
        }
    }

    /**
     * Initialize local storage for logs
     */
    initializeStorage() {
        try {
            if (!localStorage.getItem(this.storageKey)) {
                localStorage.setItem(this.storageKey, JSON.stringify([]));
            }
        } catch (error) {
            // Use direct console for internal errors to avoid infinite recursion
            if (this.enableConsole) {
                console.warn('Failed to initialize log storage:', error);
            }
            this.enableStorage = false;
        }
    }

    /**
     * Log a debug message
     * @param {string} message - The message to log
     * @param {Object} data - Optional additional data
     */
    debug(message, data = null) {
        this.log(Logger.LogLevel.DEBUG, message, data);
    }

    /**
     * Log an info message
     * @param {string} message - The message to log
     * @param {Object} data - Optional additional data
     */
    info(message, data = null) {
        this.log(Logger.LogLevel.INFO, message, data);
    }

    /**
     * Log a warning message
     * @param {string} message - The message to log
     * @param {Object} data - Optional additional data
     */
    warn(message, data = null) {
        this.log(Logger.LogLevel.WARN, message, data);
    }

    /**
     * Log an error message
     * @param {string} message - The message to log
     * @param {Object} data - Optional additional data or Error object
     */
    error(message, data = null) {
        this.log(Logger.LogLevel.ERROR, message, data);
    }

    /**
     * Core logging method
     * @param {number} level - Log level
     * @param {string} message - The message to log
     * @param {Object} data - Optional additional data
     */
    log(level, message, data = null) {
        // Check if this log level should be recorded
        if (level < this.level) {
            return;
        }

        const timestamp = new Date().toISOString();
        const levelName = this.getLevelName(level);
        
        const logEntry = {
            timestamp,
            level: levelName,
            context: this.context,
            message,
            data: this.sanitizeData(data),
            userAgent: navigator.userAgent,
            url: window.location.href
        };

        // Output to console if enabled
        if (this.enableConsole) {
            this.logToConsole(level, logEntry);
        }

        // Store in localStorage if enabled
        if (this.enableStorage) {
            this.logToStorage(logEntry);
        }
    }

    /**
     * Get the name of a log level
     * @param {number} level - Log level number
     * @returns {string} Log level name
     */
    getLevelName(level) {
        const levelMap = {
            [Logger.LogLevel.DEBUG]: 'DEBUG',
            [Logger.LogLevel.INFO]: 'INFO',
            [Logger.LogLevel.WARN]: 'WARN',
            [Logger.LogLevel.ERROR]: 'ERROR'
        };
        return levelMap[level] || 'UNKNOWN';
    }

    /**
     * Sanitize data for logging (handle circular references and errors)
     * @param {*} data - Data to sanitize
     * @returns {*} Sanitized data
     */
    sanitizeData(data) {
        if (data === null || data === undefined) {
            return null;
        }

        // Handle Error objects
        if (data instanceof Error) {
            return {
                name: data.name,
                message: data.message,
                stack: data.stack
            };
        }

        // Handle other objects - avoid circular references
        try {
            return JSON.parse(JSON.stringify(data));
        } catch (error) {
            return String(data);
        }
    }

    /**
     * Output log entry to browser console
     * @param {number} level - Log level
     * @param {Object} logEntry - The log entry to output
     */
    logToConsole(level, logEntry) {
        const prefix = `[${logEntry.timestamp}] [${logEntry.context}] [${logEntry.level}]`;
        const message = `${prefix} ${logEntry.message}`;

        switch (level) {
            case Logger.LogLevel.DEBUG:
                console.debug(message, logEntry.data || '');
                break;
            case Logger.LogLevel.INFO:
                console.info(message, logEntry.data || '');
                break;
            case Logger.LogLevel.WARN:
                console.warn(message, logEntry.data || '');
                break;
            case Logger.LogLevel.ERROR:
                console.error(message, logEntry.data || '');
                break;
            default:
                console.log(message, logEntry.data || '');
        }
    }

    /**
     * Store log entry in localStorage
     * @param {Object} logEntry - The log entry to store
     */
    logToStorage(logEntry) {
        try {
            const logs = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
            
            // Add new entry
            logs.push(logEntry);
            
            // Maintain max entries limit
            if (logs.length > this.maxStorageEntries) {
                logs.shift(); // Remove oldest entry
            }
            
            localStorage.setItem(this.storageKey, JSON.stringify(logs));
        } catch (error) {
            // Use direct console for internal errors to avoid infinite recursion
            if (this.enableConsole) {
                console.warn('Failed to store log entry:', error);
            }
        }
    }

    /**
     * Get all stored logs
     * @returns {Array} Array of log entries
     */
    getLogs() {
        if (!this.enableStorage) {
            return [];
        }

        try {
            return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
        } catch (error) {
            // Use direct console for internal errors to avoid infinite recursion
            if (this.enableConsole) {
                console.error('Failed to retrieve logs:', error);
            }
            return [];
        }
    }

    /**
     * Clear all stored logs
     */
    clearLogs() {
        if (!this.enableStorage) {
            return;
        }

        try {
            localStorage.setItem(this.storageKey, JSON.stringify([]));
            // Use direct console for internal messages to avoid recursion
            if (this.enableConsole) {
                console.info('Logs cleared');
            }
        } catch (error) {
            // Use direct console for internal errors to avoid infinite recursion
            if (this.enableConsole) {
                console.error('Failed to clear logs:', error);
            }
        }
    }

    /**
     * Export logs as a downloadable JSON file
     */
    exportLogs() {
        const logs = this.getLogs();
        const dataStr = JSON.stringify(logs, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `logs_${new Date().toISOString()}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    /**
     * Set the logging level
     * @param {number} level - New log level
     */
    setLevel(level) {
        this.level = level;
        this.info('Log level changed', { newLevel: this.getLevelName(level) });
    }

    /**
     * Create a child logger with a specific context
     * @param {string} context - Context name for the child logger
     * @returns {Logger} New logger instance
     */
    createChild(context) {
        return new Logger({
            level: this.level,
            enableConsole: this.enableConsole,
            enableStorage: this.enableStorage,
            maxStorageEntries: this.maxStorageEntries,
            storageKey: this.storageKey,
            context: `${this.context}:${context}`
        });
    }
}

// Create and export a default logger instance
export const logger = new Logger({
    level: Logger.LogLevel.INFO,
    enableConsole: true,
    enableStorage: false,
    context: 'MeetupApp'
});
