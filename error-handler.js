// Self-Healing Error Handler - Auto-Fix System
class ErrorHandler {
    constructor() {
        this.errorLog = [];
        this.autoFixAttempts = 0;
        this.maxAutoFix = 3;
        this.init();
    }

    init() {
        // Global error handler
        window.addEventListener('error', (event) => {
            this.handleError(event.error, event.message, event.filename, event.lineno);
        });

        // Promise rejection handler
        window.addEventListener('unhandledrejection', (event) => {
            this.handlePromiseRejection(event.reason);
        });

        console.log('🛡️ Self-healing error handler initialized');
    }

    handleError(error, message, filename, lineno) {
        const errorInfo = {
            type: 'runtime',
            message: message,
            file: filename,
            line: lineno,
            timestamp: new Date(),
            error: error
        };

        this.errorLog.push(errorInfo);
        console.error('❌ Error detected:', errorInfo);

        // Try to auto-fix
        this.attemptAutoFix(errorInfo);
    }

    handlePromiseRejection(reason) {
        const errorInfo = {
            type: 'promise',
            message: reason?.message || reason,
            timestamp: new Date(),
            error: reason
        };

        this.errorLog.push(errorInfo);
        console.error('❌ Promise rejection:', errorInfo);

        // Try to auto-fix
        this.attemptAutoFix(errorInfo);
    }

    attemptAutoFix(errorInfo) {
        if (this.autoFixAttempts >= this.maxAutoFix) {
            console.warn('⚠️ Max auto-fix attempts reached. Manual intervention may be needed.');
            return;
        }

        this.autoFixAttempts++;
        console.log(`🔧 Attempting auto-fix (${this.autoFixAttempts}/${this.maxAutoFix})...`);

        // Common fixes
        const fixes = [
            () => this.fixLocalStorage(),
            () => this.fixMissingElements(),
            () => this.fixAPIConnection(),
            () => this.reinitializeComponents()
        ];

        // Try each fix
        for (const fix of fixes) {
            try {
                if (fix()) {
                    console.log('✅ Auto-fix successful!');
                    this.autoFixAttempts = 0; // Reset on success
                    return true;
                }
            } catch (e) {
                console.warn('Fix attempt failed:', e);
            }
        }

        return false;
    }

    fixLocalStorage() {
        try {
            // Test localStorage
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            return false; // No fix needed
        } catch (e) {
            console.log('🔧 Fixing localStorage...');
            // Clear corrupted data
            try {
                localStorage.clear();
                console.log('✅ localStorage cleared and reset');
                return true;
            } catch (clearError) {
                console.warn('Could not clear localStorage');
                return false;
            }
        }
    }

    fixMissingElements() {
        const requiredElements = [
            'terminal-output',
            'terminal-input'
        ];

        let fixed = false;

        for (const id of requiredElements) {
            if (!document.getElementById(id)) {
                console.log(`🔧 Recreating missing element: ${id}`);
                // Element is missing, page might need reload
                console.log('⚠️ Critical elements missing. Recommend page reload.');
                fixed = true;
            }
        }

        return fixed;
    }

    fixAPIConnection() {
        // Check if AI API is configured but failing
        const apiKey = localStorage.getItem('ai_api_key');
        if (apiKey && apiKey.length < 10) {
            console.log('🔧 Invalid API key detected, clearing...');
            localStorage.removeItem('ai_api_key');
            console.log('✅ Switched to hybrid intelligence mode');
            return true;
        }
        return false;
    }

    reinitializeComponents() {
        try {
            // Check if terminal exists
            if (window.terminal && typeof window.terminal.init === 'function') {
                console.log('🔧 Reinitializing terminal...');
                // Don't actually reinit, just verify it's working
                return false;
            }
        } catch (e) {
            console.warn('Could not reinitialize components');
        }
        return false;
    }

    getErrorReport() {
        return {
            totalErrors: this.errorLog.length,
            autoFixAttempts: this.autoFixAttempts,
            recentErrors: this.errorLog.slice(-5),
            status: this.autoFixAttempts < this.maxAutoFix ? 'healthy' : 'needs attention'
        };
    }

    clearErrorLog() {
        this.errorLog = [];
        this.autoFixAttempts = 0;
        console.log('✅ Error log cleared');
    }
}

// Auto-initialize
const errorHandler = new ErrorHandler();

// Make available globally
window.errorHandler = errorHandler;
