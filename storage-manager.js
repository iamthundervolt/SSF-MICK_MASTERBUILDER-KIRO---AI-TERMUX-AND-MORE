// Multi-Storage Manager - GitHub + IndexedDB + Flask Backend
class StorageManager {
    constructor() {
        this.githubToken = localStorage.getItem('github_token');
        this.githubRepo = 'iamthundervolt/SSF-MICK_MASTERBUILDER-KIRO---AI-TERMUX-AND-MORE';
        this.githubBranch = 'storage'; // Separate branch for user data
        this.backendUrl = 'http://localhost:5000';
        this.db = null;
        this.init();
    }

    async init() {
        // Initialize IndexedDB
        await this.initIndexedDB();
        console.log('✅ Storage Manager initialized');
        console.log('📦 IndexedDB: Ready');
        console.log('🐙 GitHub API:', this.githubToken ? 'Configured' : 'Not configured');
        console.log('🔧 Flask Backend: Checking...');
    }

    // ==================== IndexedDB (Local Storage) ====================
    async initIndexedDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('KiroFileSystem', 1);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                // Files store
                if (!db.objectStoreNames.contains('files')) {
                    const filesStore = db.createObjectStore('files', { keyPath: 'path' });
                    filesStore.createIndex('directory', 'directory', { unique: false });
                    filesStore.createIndex('modified', 'modified', { unique: false });
                }

                // Directories store
                if (!db.objectStoreNames.contains('directories')) {
                    db.createObjectStore('directories', { keyPath: 'path' });
                }
            };
        });
    }

    async saveToIndexedDB(path, content, isDirectory = false) {
        const store = isDirectory ? 'directories' : 'files';
        const transaction = this.db.transaction([store], 'readwrite');
        const objectStore = transaction.objectStore(store);

        const data = {
            path: path,
            content: content,
            directory: path.substring(0, path.lastIndexOf('/')),
            modified: new Date().toISOString(),
            synced: false
        };

        return new Promise((resolve, reject) => {
            const request = objectStore.put(data);
            request.onsuccess = () => resolve(data);
            request.onerror = () => reject(request.error);
        });
    }

    async readFromIndexedDB(path) {
        const transaction = this.db.transaction(['files', 'directories'], 'readonly');
        
        // Try files first
        let request = transaction.objectStore('files').get(path);
        let result = await new Promise((resolve) => {
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => resolve(null);
        });

        if (result) return result;

        // Try directories
        request = transaction.objectStore('directories').get(path);
        return new Promise((resolve) => {
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => resolve(null);
        });
    }

    async listFromIndexedDB(directory) {
        const transaction = this.db.transaction(['files', 'directories'], 'readonly');
        const files = [];
        const dirs = [];

        // Get files
        const filesStore = transaction.objectStore('files');
        const filesIndex = filesStore.index('directory');
        const filesRequest = filesIndex.getAll(directory);

        await new Promise((resolve) => {
            filesRequest.onsuccess = () => {
                files.push(...filesRequest.result);
                resolve();
            };
        });

        // Get directories
        const dirsStore = transaction.objectStore('directories');
        const dirsRequest = dirsStore.getAll();

        await new Promise((resolve) => {
            dirsRequest.onsuccess = () => {
                const allDirs = dirsRequest.result;
                // Filter directories that are direct children
                allDirs.forEach(dir => {
                    const parent = dir.path.substring(0, dir.path.lastIndexOf('/'));
                    if (parent === directory) {
                        dirs.push(dir);
                    }
                });
                resolve();
            };
        });

        return { files, directories: dirs };
    }

    async deleteFromIndexedDB(path, isDirectory = false) {
        const store = isDirectory ? 'directories' : 'files';
        const transaction = this.db.transaction([store], 'readwrite');
        const objectStore = transaction.objectStore(store);

        return new Promise((resolve, reject) => {
            const request = objectStore.delete(path);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    // ==================== GitHub API (Cloud Storage) ====================
    async saveToGitHub(path, content) {
        if (!this.githubToken) {
            console.log('⚠️  GitHub token not configured');
            return { success: false, reason: 'no_token' };
        }

        try {
            const apiPath = `data${path}`;
            const url = `https://api.github.com/repos/${this.githubRepo}/contents/${apiPath}`;

            // Check if file exists (need SHA for update)
            let sha = null;
            try {
                const checkResponse = await fetch(url, {
                    headers: {
                        'Authorization': `token ${this.githubToken}`,
                        'Accept': 'application/vnd.github.v3+json'
                    }
                });
                if (checkResponse.ok) {
                    const data = await checkResponse.json();
                    sha = data.sha;
                }
            } catch (e) {
                // File doesn't exist, that's ok
            }

            // Create or update file
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${this.githubToken}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: `Update ${path}`,
                    content: btoa(content), // Base64 encode
                    branch: this.githubBranch,
                    sha: sha // Include if updating
                })
            });

            if (response.ok) {
                console.log(`✅ Synced to GitHub: ${path}`);
                return { success: true };
            } else {
                const error = await response.json();
                console.log(`❌ GitHub sync failed: ${error.message}`);
                return { success: false, reason: error.message };
            }
        } catch (error) {
            console.log(`❌ GitHub sync error: ${error.message}`);
            return { success: false, reason: error.message };
        }
    }

    async readFromGitHub(path) {
        if (!this.githubToken) return null;

        try {
            const apiPath = `data${path}`;
            const url = `https://api.github.com/repos/${this.githubRepo}/contents/${apiPath}`;

            const response = await fetch(url, {
                headers: {
                    'Authorization': `token ${this.githubToken}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                return atob(data.content); // Base64 decode
            }
        } catch (error) {
            console.log(`⚠️  GitHub read error: ${error.message}`);
        }

        return null;
    }

    // ==================== Flask Backend (Real Files) ====================
    async saveToBackend(path, content) {
        try {
            const response = await fetch(`${this.backendUrl}/api/file/write`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ path, content })
            });

            if (response.ok) {
                console.log(`✅ Synced to backend: ${path}`);
                return { success: true };
            }
        } catch (error) {
            console.log(`⚠️  Backend not available`);
        }

        return { success: false };
    }

    // ==================== Smart Multi-Storage Operations ====================
    async save(path, content, isDirectory = false) {
        console.log(`💾 Saving: ${path}`);

        // 1. Save to IndexedDB (instant, always works)
        await this.saveToIndexedDB(path, content, isDirectory);
        console.log(`✅ Saved locally: ${path}`);

        // 2. Sync to GitHub (cloud backup)
        if (!isDirectory) {
            const githubResult = await this.saveToGitHub(path, content);
            if (githubResult.success) {
                // Mark as synced in IndexedDB
                const data = await this.readFromIndexedDB(path);
                if (data) {
                    data.synced = true;
                    await this.saveToIndexedDB(path, content, isDirectory);
                }
            }
        }

        // 3. Sync to backend (if available)
        if (!isDirectory) {
            await this.saveToBackend(path, content);
        }

        return { success: true, path };
    }

    async read(path) {
        // Try IndexedDB first (fastest)
        let data = await this.readFromIndexedDB(path);
        if (data) {
            console.log(`📖 Read from local: ${path}`);
            return data.content;
        }

        // Try GitHub (if configured)
        data = await this.readFromGitHub(path);
        if (data) {
            console.log(`📖 Read from GitHub: ${path}`);
            // Cache in IndexedDB
            await this.saveToIndexedDB(path, data, false);
            return data;
        }

        return null;
    }

    async list(directory) {
        // Get from IndexedDB
        const local = await this.listFromIndexedDB(directory);
        console.log(`📂 Listed directory: ${directory}`);
        return local;
    }

    async delete(path, isDirectory = false) {
        console.log(`🗑️  Deleting: ${path}`);
        
        // Delete from IndexedDB
        await this.deleteFromIndexedDB(path, isDirectory);
        
        // TODO: Delete from GitHub (requires API call)
        // TODO: Delete from backend (requires API call)
        
        return { success: true };
    }

    // ==================== Sync Status ====================
    async getSyncStatus() {
        const transaction = this.db.transaction(['files'], 'readonly');
        const store = transaction.objectStore('files');
        const request = store.getAll();

        return new Promise((resolve) => {
            request.onsuccess = () => {
                const files = request.result;
                const total = files.length;
                const synced = files.filter(f => f.synced).length;
                const unsynced = total - synced;

                resolve({
                    total,
                    synced,
                    unsynced,
                    percentage: total > 0 ? Math.round((synced / total) * 100) : 100
                });
            };
        });
    }

    // ==================== Setup Helper ====================
    setupGitHub(token) {
        localStorage.setItem('github_token', token);
        this.githubToken = token;
        console.log('✅ GitHub token configured!');
        console.log('💡 Your files will now sync to GitHub automatically!');
    }
}

// Initialize global storage manager
window.storageManager = new StorageManager();
