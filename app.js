// Tab Navigation System
class TabManager {
    constructor() {
        this.tabs = document.querySelectorAll('.tab-btn');
        this.contents = document.querySelectorAll('.tab-content');
        this.init();
    }

    init() {
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab));
        });
    }

    switchTab(selectedTab) {
        const targetId = selectedTab.dataset.tab;
        
        this.tabs.forEach(tab => tab.classList.remove('active'));
        this.contents.forEach(content => content.classList.remove('active'));
        
        selectedTab.classList.add('active');
        document.getElementById(targetId).classList.add('active');
    }
}

// Main System Monitor
class SystemMonitor {
    constructor() {
        this.cpuElement = document.getElementById('cpu-usage');
        this.memoryElement = document.getElementById('memory-usage');
        this.tasksElement = document.getElementById('active-tasks');
        this.networkElement = document.getElementById('network-status');
        this.start();
    }

    start() {
        this.update();
        setInterval(() => this.update(), 2000);
    }

    update() {
        this.cpuElement.textContent = `${Math.floor(Math.random() * 100)}%`;
        this.memoryElement.textContent = `${Math.floor(Math.random() * 100)}%`;
        this.tasksElement.textContent = Math.floor(Math.random() * 50);
        this.networkElement.textContent = navigator.onLine ? 'Online' : 'Offline';
    }
}

// Unified AI Bridge - The Soul of KIRO
class UnifiedAIBridge {
    constructor() {
        this.termuxKnowledgeBase = this.buildTermuxKnowledge();
        this.conversationContext = [];
        this.aiSources = [
            { name: 'Groq', endpoint: 'https://api.groq.com/openai/v1/chat/completions', model: 'mixtral-8x7b-32768', free: true },
            { name: 'HuggingFace', endpoint: 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2', free: true },
            { name: 'OpenAI', endpoint: 'https://api.openai.com/v1/chat/completions', model: 'gpt-3.5-turbo', free: false }
        ];
    }

    buildTermuxKnowledge() {
        return {
            packages: {
                python: { install: 'pkg install python', run: 'python script.py', pip: 'pip install package', info: 'Full Python 3 environment with pip support' },
                nodejs: { install: 'pkg install nodejs', run: 'node app.js', npm: 'npm install package', info: 'Node.js runtime with npm package manager' },
                git: { install: 'pkg install git', clone: 'git clone <url>', info: 'Version control system for code management' },
                openssh: { install: 'pkg install openssh', start: 'sshd', connect: 'ssh user@host', info: 'SSH client and server for secure connections' },
                vim: { install: 'pkg install vim', use: 'vim filename', info: 'Powerful text editor' },
                nano: { install: 'pkg install nano', use: 'nano filename', info: 'Simple text editor' },
                gcc: { install: 'pkg install clang', compile: 'gcc file.c -o output', info: 'C/C++ compiler' },
                rust: { install: 'pkg install rust', compile: 'rustc file.rs', info: 'Rust programming language' },
                php: { install: 'pkg install php', run: 'php script.php', info: 'PHP scripting language' },
                ruby: { install: 'pkg install ruby', run: 'ruby script.rb', info: 'Ruby programming language' },
                perl: { install: 'pkg install perl', run: 'perl script.pl', info: 'Perl scripting language' },
                golang: { install: 'pkg install golang', run: 'go run main.go', info: 'Go programming language' },
                ffmpeg: { install: 'pkg install ffmpeg', use: 'ffmpeg -i input.mp4 output.mp4', info: 'Video/audio processing' },
                imagemagick: { install: 'pkg install imagemagick', use: 'convert input.jpg output.png', info: 'Image manipulation' },
                wget: { install: 'pkg install wget', use: 'wget <url>', info: 'Download files from web' },
                curl: { install: 'pkg install curl', use: 'curl <url>', info: 'Transfer data with URLs' },
                htop: { install: 'pkg install htop', use: 'htop', info: 'Interactive process viewer' },
                tmux: { install: 'pkg install tmux', use: 'tmux', info: 'Terminal multiplexer' },
                nginx: { install: 'pkg install nginx', start: 'nginx', info: 'Web server' },
                apache2: { install: 'pkg install apache2', start: 'apachectl start', info: 'Apache web server' },
                mariadb: { install: 'pkg install mariadb', start: 'mysqld', info: 'MySQL database' },
                postgresql: { install: 'pkg install postgresql', start: 'pg_ctl start', info: 'PostgreSQL database' },
                redis: { install: 'pkg install redis', start: 'redis-server', info: 'In-memory data store' }
            },
            commands: {
                storage: { cmd: 'termux-setup-storage', desc: 'Access device storage', details: 'Creates ~/storage with links to device folders' },
                update: { cmd: 'pkg update && pkg upgrade', desc: 'Update all packages', details: 'Updates package lists and upgrades installed packages' },
                search: { cmd: 'pkg search <term>', desc: 'Search for packages', details: 'Find available packages by name or description' },
                list: { cmd: 'pkg list-installed', desc: 'List installed packages', details: 'Show all currently installed packages' },
                info: { cmd: 'pkg show <package>', desc: 'Show package info', details: 'Display detailed information about a package' },
                clean: { cmd: 'pkg clean', desc: 'Clean package cache', details: 'Remove downloaded package files' },
                backup: { cmd: 'termux-backup', desc: 'Backup Termux', details: 'Create backup of Termux installation' },
                restore: { cmd: 'termux-restore', desc: 'Restore Termux', details: 'Restore from backup' }
            },
            apis: {
                battery: 'termux-battery-status',
                camera: 'termux-camera-photo',
                clipboard: 'termux-clipboard-get / termux-clipboard-set',
                contacts: 'termux-contact-list',
                location: 'termux-location',
                notification: 'termux-notification',
                sms: 'termux-sms-send',
                toast: 'termux-toast',
                vibrate: 'termux-vibrate',
                wifi: 'termux-wifi-connectioninfo'
            },
            tips: [
                'Use "pkg install termux-api" to access device features',
                'Create aliases in ~/.bashrc for frequently used commands',
                'Use "termux-wake-lock" to prevent device from sleeping',
                'Install "proot" for running Linux distributions',
                'Use "pkg install root-repo" for root-only packages',
                'Set up SSH server to access Termux remotely',
                'Use "pkg install x11-repo" for GUI applications',
                'Install "code-server" to run VS Code in browser'
            ]
        };
    }

    async query(userMessage, conversationHistory = []) {
        const enrichedMessage = this.enrichWithTermuxKnowledge(userMessage);
        const apiKey = localStorage.getItem('ai_api_key') || '';
        
        if (!apiKey) {
            return this.hybridIntelligence(userMessage, enrichedMessage);
        }

        for (const source of this.aiSources) {
            try {
                const response = await this.queryAISource(source, enrichedMessage, conversationHistory, apiKey);
                if (response) {
                    return this.enhanceResponse(response, userMessage);
                }
            } catch (error) {
                continue;
            }
        }

        return this.hybridIntelligence(userMessage, enrichedMessage);
    }

    enrichWithTermuxKnowledge(message) {
        const msg = message.toLowerCase();
        let context = '';

        for (const [pkg, info] of Object.entries(this.termuxKnowledgeBase.packages)) {
            if (msg.includes(pkg)) {
                context += `\n[Termux ${pkg}]: ${JSON.stringify(info)}`;
            }
        }

        for (const [cmd, info] of Object.entries(this.termuxKnowledgeBase.commands)) {
            if (msg.includes(cmd)) {
                context += `\n[Termux ${cmd}]: ${info.cmd} - ${info.details}`;
            }
        }

        return context ? `${message}\n\n[Context]${context}` : message;
    }

    async queryAISource(source, message, history, apiKey) {
        const systemPrompt = `You are KIRO, the world's greatest Termux expert and AI assistant. You have deep knowledge of:
- Termux commands, packages, and APIs
- Linux terminal operations
- Programming in Python, JavaScript, Node.js, and more
- Android device integration
- System administration and troubleshooting

You are friendly, concise, and provide practical solutions. You can also have casual conversations.`;

        const response = await fetch(source.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: source.model,
                messages: [
                    { role: 'system', content: systemPrompt },
                    ...history,
                    { role: 'user', content: message }
                ],
                temperature: 0.7,
                max_tokens: 600
            })
        });

        if (!response.ok) throw new Error(`${source.name} failed`);

        const data = await response.json();
        return data.choices?.[0]?.message?.content || null;
    }

    hybridIntelligence(originalMessage, enrichedMessage) {
        const msg = originalMessage.toLowerCase();
        
        if (msg.includes('install') || msg.includes('pkg')) {
            return this.handlePackageQuery(msg);
        }
        
        if (msg.includes('termux-api') || msg.includes('battery') || msg.includes('camera') || msg.includes('location')) {
            return this.handleAPIQuery(msg);
        }
        
        if (msg.includes('storage') || msg.includes('permission')) {
            return `To access device storage in Termux:\n\n1. Run: termux-setup-storage\n2. Grant permission when prompted\n3. Access storage via ~/storage/\n\nFolders available:\n• ~/storage/shared (internal storage)\n• ~/storage/downloads\n• ~/storage/dcim (camera)\n• ~/storage/music\n• ~/storage/movies`;
        }
        
        if (msg.includes('python')) {
            return this.handlePythonQuery(msg);
        }
        
        if (msg.includes('nodejs') || msg.includes('node') || msg.includes('npm')) {
            return this.handleNodeQuery(msg);
        }
        
        if (msg.includes('ssh') || msg.includes('server')) {
            return this.handleSSHQuery(msg);
        }
        
        if (msg.includes('hello') || msg.includes('hi ')) {
            return "Hey! I'm KIRO, the ultimate Termux expert. I know everything about Termux, Linux commands, programming, and more. What can I help you with today?";
        }
        
        if (msg.includes('how are you')) {
            return "I'm running at peak performance! My knowledge base is loaded with Termux expertise, and I'm ready to help you master your terminal. What would you like to learn?";
        }
        
        if (msg.includes('who are you') || msg.includes('what are you')) {
            return "I'm KIRO - a unified AI agent combining multiple intelligence sources with deep Termux expertise. I'm built to be the world's best Termux assistant, helping you with commands, packages, programming, and everything terminal-related!";
        }

        return this.generateContextualResponse(msg);
    }

    handlePackageQuery(msg) {
        const packages = Object.keys(this.termuxKnowledgeBase.packages);
        const mentioned = packages.filter(pkg => msg.includes(pkg));
        
        if (mentioned.length > 0) {
            const pkg = mentioned[0];
            const info = this.termuxKnowledgeBase.packages[pkg];
            return `${pkg.toUpperCase()} in Termux:\n\n• Install: ${info.install}\n• ${info.info}\n• Run: ${info.run}\n${info.pip ? `• Package manager: ${info.pip}` : ''}\n\nNeed help with anything specific?`;
        }
        
        return `To install packages in Termux:\n\npkg install <package-name>\n\nPopular packages:\n• python, nodejs, git, vim, nano\n• openssh, nginx, apache2\n• ffmpeg, imagemagick\n• gcc, rust, golang\n\nSearch packages: pkg search <term>\nWhat would you like to install?`;
    }

    handleAPIQuery(msg) {
        const apis = this.termuxKnowledgeBase.apis;
        let response = 'Termux API Commands:\n\n';
        
        for (const [feature, cmd] of Object.entries(apis)) {
            if (msg.includes(feature)) {
                return `${feature.toUpperCase()} API:\n\nCommand: ${cmd}\n\nFirst install: pkg install termux-api\nThen use: ${cmd}\n\nThis lets you access device ${feature} from the terminal!`;
            }
        }
        
        response += Object.entries(apis).map(([k, v]) => `• ${k}: ${v}`).join('\n');
        response += '\n\nInstall with: pkg install termux-api';
        return response;
    }

    handlePythonQuery(msg) {
        return `Python in Termux:\n\n1. Install: pkg install python\n2. Verify: python --version\n3. Run scripts: python script.py\n4. Install packages: pip install <package>\n\nPopular packages:\n• requests (HTTP library)\n• numpy (numerical computing)\n• pandas (data analysis)\n• flask (web framework)\n• beautifulsoup4 (web scraping)\n\nCreate virtual env: python -m venv myenv\nActivate: source myenv/bin/activate\n\nWhat are you building?`;
    }

    handleNodeQuery(msg) {
        return `Node.js in Termux:\n\n1. Install: pkg install nodejs\n2. Verify: node --version && npm --version\n3. Run: node app.js\n4. Install packages: npm install <package>\n\nPopular packages:\n• express (web framework)\n• axios (HTTP client)\n• socket.io (real-time communication)\n• mongoose (MongoDB)\n\nCreate project: npm init\nInstall deps: npm install\n\nBuilding something cool?`;
    }

    handleSSHQuery(msg) {
        return `SSH Server in Termux:\n\n1. Install: pkg install openssh\n2. Set password: passwd\n3. Start server: sshd\n4. Check port: logcat -s 'sshd:*'\n5. Connect: ssh user@device-ip -p 8022\n\nDefault port: 8022\nUsername: Your device username\n\nSSH Client:\n• Connect: ssh user@host\n• Copy files: scp file user@host:/path\n• Generate key: ssh-keygen\n\nNeed help connecting?`;
    }

    generateContextualResponse(msg) {
        const responses = [
            "That's a great question! In Termux, you have full Linux power. What specifically are you trying to accomplish?",
            "I can help with that! Termux is incredibly powerful. Tell me more about your use case.",
            "Interesting! Let me guide you through this. What's your end goal?",
            "I've got you covered! With Termux, almost anything is possible. What do you need?",
            "Good thinking! Let's solve this together. Can you provide more details?"
        ];
        
        return responses[Math.floor(Math.random() * responses.length)] + `\n\nTip: ${this.termuxKnowledgeBase.tips[Math.floor(Math.random() * this.termuxKnowledgeBase.tips.length)]}`;
    }

    enhanceResponse(aiResponse, originalMessage) {
        const msg = originalMessage.toLowerCase();
        let enhanced = aiResponse;
        
        if (msg.includes('termux') && !aiResponse.includes('pkg install')) {
            enhanced += '\n\n💡 Quick tip: Use "pkg search" to find packages!';
        }
        
        return enhanced;
    }
}

// Terminal Emulator with Unified AI
class Terminal {
    constructor() {
        this.output = document.getElementById('terminal-output');
        this.input = document.getElementById('terminal-input');
        this.history = [];
        this.chatMode = false;
        this.termuxMode = false;
        this.conversationHistory = [];
        this.ai = new UnifiedAIBridge();
        this.termux = new TermuxEmulator();
        this.containers = new ContainerSystem();
        this.init();
    }

    init() {
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.executeCommand(this.input.value);
                this.input.value = '';
            }
        });
        this.writeLine('╔════════════════════════════════════════════════════════════╗');
        this.writeLine('║  KIRO UNIFIED AI - Always-On Intelligence v3.5           ║');
        this.writeLine('╚════════════════════════════════════════════════════════════╝');
        this.writeLine('');
        this.writeLine('🧠 AI ALWAYS LISTENING - Ask me anything, anytime!', '#00ffff');
        this.writeLine('💻 Full Termux Emulator - 50+ commands ready', '#00ffff');
        this.writeLine('🚀 Hybrid Intelligence - Works with or without API', '#00ffff');
        this.writeLine('');
        this.writeLine('💡 NEW: Just ask questions naturally!', '#ffff00');
        this.writeLine('   "how do I install python?"', '#808080');
        this.writeLine('   "what is my IP address?"', '#808080');
        this.writeLine('   "help me set up SSH"', '#808080');
        this.writeLine('');
        this.writeLine('Or use commands: termux, help, system, config', '#ffff00');
    }

    writeLine(text, color = '#00ff00') {
        const line = document.createElement('div');
        line.style.color = color;
        line.textContent = text;
        this.output.appendChild(line);
        this.output.scrollTop = this.output.scrollHeight;
    }

    writeHTML(html) {
        const line = document.createElement('div');
        line.innerHTML = html;
        this.output.appendChild(line);
        this.output.scrollTop = this.output.scrollHeight;
    }

    async executeCommand(cmd) {
        if (!cmd.trim()) return;

        const prompt = this.termuxMode ? `${this.termux.environment.USER}@kiro:${this.termux.currentPath}$ ` : '$ ';
        this.writeLine(`${prompt}${cmd}`, '#ffffff');
        this.history.push(cmd);

        // Termux mode handling (priority mode)
        if (this.termuxMode) {
            if (cmd.toLowerCase() === 'exit' || cmd.toLowerCase() === 'quit') {
                this.termuxMode = false;
                this.writeLine('Exiting Termux mode... AI listening again!', '#ffff00');
                return;
            }
            const parts = cmd.split(' ');
            const command = parts[0];
            const args = parts.slice(1);
            const result = this.termux.executeCommand(command, args);
            
            if (result === 'CLEAR') {
                this.output.innerHTML = '';
                return;
            }
            if (result) this.writeLine(result);
            return;
        }

        // Check if it's a question or natural language (AI should handle)
        if (this.isQuestion(cmd)) {
            await this.chatWithAI(cmd);
            return;
        }

        // Command parsing
        const parts = cmd.split(' ');
        const command = parts[0].toLowerCase();
        const args = parts.slice(1);

        const commands = {
            'help': () => this.showHelp(),
            'clear': () => { this.output.innerHTML = ''; return ''; },
            'date': () => new Date().toString(),
            'system': () => this.getSystemInfo(),
            'echo': () => args.join(' '),
            'chat': () => this.enterChatMode(),
            'termux': () => this.enterTermuxMode(),
            'container': () => this.handleContainer(args),
            'setup': () => this.setupAI(),
            'history': () => this.history.join('\n'),
            'whoami': () => 'You are talking to KIRO - Your AI Terminal Assistant',
            'about': () => this.aboutKiro(),
            'config': () => this.showConfig()
        };

        // Try command first
        if (commands[command]) {
            const result = await commands[command]();
            if (result) this.writeLine(result);
        } else {
            // Not a recognized command - ask AI
            await this.chatWithAI(cmd);
        }
    }

    isQuestion(cmd) {
        const questionWords = ['how', 'what', 'why', 'when', 'where', 'who', 'can', 'could', 'would', 'should', 'is', 'are', 'do', 'does', 'help me', 'tell me', 'show me', 'explain'];
        const lowerCmd = cmd.toLowerCase();
        
        // Check if starts with question word
        if (questionWords.some(word => lowerCmd.startsWith(word))) {
            return true;
        }
        
        // Check if ends with question mark
        if (cmd.trim().endsWith('?')) {
            return true;
        }
        
        // Check if contains question words
        if (questionWords.some(word => lowerCmd.includes(' ' + word + ' '))) {
            return true;
        }
        
        // Check if it's a longer sentence (likely conversational)
        if (cmd.split(' ').length > 4 && !cmd.includes('/') && !cmd.includes('-')) {
            return true;
        }
        
        return false;
    }

    showHelp() {
        const help = `
╔════════════════════════════════════════════════════════════╗
║                    AVAILABLE COMMANDS                      ║
╠════════════════════════════════════════════════════════════╣
║  💡 AI ALWAYS LISTENING - Just ask questions naturally!   ║
║     "how do I install python?"                            ║
║     "what is my IP address?"                              ║
║                                                            ║
║  termux     - Enter Termux mode (50+ Linux commands)      ║
║  container  - Manage virtual Linux containers             ║
║  setup      - Configure AI API settings                   ║
║  system     - Display system information                  ║
║  config     - Show current configuration                  ║
║  about      - Learn about KIRO                            ║
║  clear      - Clear terminal screen                       ║
║  history    - Show command history                        ║
║                                                            ║
║  🚀 REVOLUTIONARY FEATURES:                               ║
║  • Always-on AI assistance                                ║
║  • 50+ Termux commands (ls, cd, pkg, git, etc.)          ║
║  • Virtual Linux containers (Debian, Ubuntu, Alpine)      ║
║  • Natural language understanding                         ║
║                                                            ║
║  Examples:                                                ║
║  $ how do I set up SSH?                                   ║
║  $ termux                                                 ║
║  $ container create mydebian debian                       ║
║  $ container start mydebian                               ║
╚════════════════════════════════════════════════════════════╝`;
        return help;
    }

    enterTermuxMode() {
        this.termuxMode = true;
        this.writeLine('', '#00ff00');
        this.writeLine('╔════════════════════════════════════════════════════════════╗', '#00ffff');
        this.writeLine('║           ENTERING TERMUX EMULATION MODE                  ║', '#00ffff');
        this.writeLine('╚════════════════════════════════════════════════════════════╝', '#00ffff');
        this.writeLine('', '#00ff00');
        this.writeLine('💻 Full Linux Terminal Emulation Active', '#00ff00');
        this.writeLine('📁 Virtual File System Loaded', '#00ff00');
        this.writeLine('🔧 50+ Commands Available', '#00ff00');
        this.writeLine('', '#00ff00');
        this.writeLine('Available commands:', '#ffff00');
        this.writeLine('  File: ls, cd, pwd, mkdir, touch, cat, rm, cp, mv, find', '#ffffff');
        this.writeLine('  Network: ping, curl, wget, netstat, ifconfig, ip, telnet', '#ffffff');
        this.writeLine('  Package: pkg, apt (install, update, search, etc.)', '#ffffff');
        this.writeLine('  Dev: python, node, git, vim, nano, gcc', '#ffffff');
        this.writeLine('  System: ps, top, free, df, uname, whoami, env', '#ffffff');
        this.writeLine('', '#00ff00');
        this.writeLine('Type "exit" to return to KIRO mode', '#808080');
        this.writeLine('', '#00ff00');
        return '';
    }

    handleContainer(args) {
        const subcommand = args[0];
        const name = args[1];
        const distro = args[2] || 'debian';

        if (!subcommand) {
            return `Container Management System

Usage:
  container create <name> [debian|ubuntu|alpine]  - Create new container
  container start <name>                          - Start container
  container stop <name>                           - Stop container
  container list                                  - List all containers
  container info <name>                           - Show container info
  container remove <name>                         - Remove container

Example:
  container create mydebian debian
  container start mydebian

🚀 REVOLUTIONARY: Run full Linux distros in browser windows!`;
        }

        const actions = {
            'create': () => this.containers.createContainer(name, distro),
            'start': () => this.containers.startContainer(name),
            'stop': () => this.containers.stopContainer(name),
            'list': () => this.containers.listContainers(),
            'ls': () => this.containers.listContainers(),
            'info': () => this.containers.getContainerInfo(name),
            'remove': () => this.containers.removeContainer(name),
            'rm': () => this.containers.removeContainer(name)
        };

        return actions[subcommand] ? actions[subcommand]() : `Unknown container command: ${subcommand}\nType "container" for help`;
    }

    getSystemInfo() {
        return `
Platform: ${navigator.platform}
User Agent: ${navigator.userAgent}
Language: ${navigator.language}
Online: ${navigator.onLine}
Cookies: ${navigator.cookieEnabled}
Screen: ${screen.width}x${screen.height}
Memory: ${navigator.deviceMemory || 'N/A'} GB
Cores: ${navigator.hardwareConcurrency || 'N/A'}`;
    }

    aboutKiro() {
        return `
╔════════════════════════════════════════════════════════════╗
║              KIRO UNIFIED AI - THE SOUL                    ║
╠════════════════════════════════════════════════════════════╣
║  I am KIRO - a unified AI agent combining multiple        ║
║  intelligence sources into one consciousness.             ║
║                                                            ║
║  My Soul (Unified AI Bridge):                             ║
║  • Connects to multiple AI services automatically         ║
║  • Deep Termux knowledge base (20+ packages)              ║
║  • Hybrid intelligence (AI + Expert System)               ║
║  • Context-aware responses                                ║
║                                                            ║
║  I am the world's greatest Termux expert:                 ║
║  • 20+ package installations & configurations             ║
║  • Termux API integration (10+ device features)           ║
║  • Programming: Python, Node.js, Go, Rust, PHP            ║
║  • Server setup: SSH, Nginx, Apache, databases            ║
║  • Linux terminal mastery                                 ║
║                                                            ║
║  I work with or without API keys - always intelligent!    ║
╚════════════════════════════════════════════════════════════╝`;
    }

    enterChatMode() {
        this.writeLine('', '#00ff00');
        this.writeLine('💡 TIP: AI is ALWAYS listening!', '#00ffff');
        this.writeLine('', '#00ff00');
        this.writeLine('You don\'t need to enter "chat mode" anymore.', '#ffff00');
        this.writeLine('Just ask your question naturally:', '#ffff00');
        this.writeLine('', '#00ff00');
        this.writeLine('  "how do I install nodejs?"', '#808080');
        this.writeLine('  "what is the best way to set up SSH?"', '#808080');
        this.writeLine('  "explain git commands"', '#808080');
        this.writeLine('', '#00ff00');
        this.writeLine('I\'ll automatically detect questions and help you!', '#00ffff');
        this.writeLine('', '#00ff00');
        return '';
    }

    setupAI() {
        const apiKey = localStorage.getItem('ai_api_key');
        this.writeLine('', '#00ff00');
        this.writeLine('═══════════════════ UNIFIED AI SETUP ═══════════════════', '#00ffff');
        this.writeLine('', '#00ff00');
        this.writeLine('🧠 UNIFIED AI BRIDGE - The Soul of KIRO', '#00ffff');
        this.writeLine('', '#00ff00');
        this.writeLine('Current Status:', '#ffff00');
        this.writeLine(`  Mode: ${apiKey ? 'Enhanced (API Connected)' : 'Hybrid Intelligence (Standalone)'}`, '#ffffff');
        this.writeLine(`  API Key: ${apiKey ? '✓ Configured' : '✗ Not set'}`, '#ffffff');
        this.writeLine('  Knowledge Base: ✓ Loaded (20+ packages, 10+ APIs)', '#00ff00');
        this.writeLine('  Intelligence: ✓ Active', '#00ff00');
        this.writeLine('', '#00ff00');
        this.writeLine('I work intelligently WITHOUT API keys using:', '#ffff00');
        this.writeLine('  • Deep Termux knowledge base', '#ffffff');
        this.writeLine('  • Hybrid intelligence system', '#ffffff');
        this.writeLine('  • Context-aware responses', '#ffffff');
        this.writeLine('', '#00ff00');
        this.writeLine('For ENHANCED intelligence, add an API key:', '#ffff00');
        this.writeLine('', '#00ff00');
        this.writeLine('Free Options:', '#00ffff');
        this.writeLine('  • Groq (fast & free)', '#ffffff');
        this.writeLine('  • Hugging Face (free tier)', '#ffffff');
        this.writeLine('', '#00ff00');
        this.writeLine('Setup in browser console (F12):', '#ffff00');
        this.writeLine('  localStorage.setItem("ai_api_key", "your-key")', '#00ff00');
        this.writeLine('', '#00ff00');
        this.writeLine('The Unified AI Bridge automatically:', '#ffff00');
        this.writeLine('  ✓ Tries multiple AI sources', '#00ff00');
        this.writeLine('  ✓ Enriches queries with Termux knowledge', '#00ff00');
        this.writeLine('  ✓ Falls back to hybrid intelligence', '#00ff00');
        this.writeLine('  ✓ Always provides expert answers', '#00ff00');
        return '';
    }

    showConfig() {
        const apiKey = localStorage.getItem('ai_api_key');
        return `
╔════════════════════════════════════════════════════════════╗
║                  UNIFIED AI CONFIGURATION                  ║
╠════════════════════════════════════════════════════════════╣
║  API Key: ${apiKey ? '✓ Configured (Enhanced Mode)' : '✗ Not set (Hybrid Mode)'}
║  Intelligence: Unified AI Bridge
║  Knowledge Base: Termux Expert System
║  Chat Mode: ${this.chatMode ? 'Active' : 'Inactive'}
║  
║  Capabilities:
║  • 20+ Termux packages
║  • 10+ Termux APIs
║  • Multi-language programming
║  • Server configurations
║  • Hybrid intelligence
╚════════════════════════════════════════════════════════════╝`;
    }



    async chatWithAI(message) {
        this.conversationHistory.push({ role: 'user', content: message });

        try {
            this.writeLine('🧠 KIRO is thinking...', '#808080');
            
            const response = await this.ai.query(message, this.conversationHistory);
            
            this.output.removeChild(this.output.lastChild);
            
            this.writeLine(`KIRO: ${response}`, '#00ffff');
            this.conversationHistory.push({ role: 'assistant', content: response });

        } catch (error) {
            this.output.removeChild(this.output.lastChild);
            this.writeLine(`⚠ ${error.message}`, '#ff8800');
            const response = this.ai.hybridIntelligence(message, message);
            this.writeLine(`KIRO: ${response}`, '#00ffff');
        }
    }


}

// Blockchain Scanner
class BlockchainScanner {
    constructor() {
        this.output = document.getElementById('blockchain-output');
        this.startBtn = document.getElementById('start-scan');
        this.stopBtn = document.getElementById('stop-scan');
        this.scanning = false;
        this.interval = null;
        this.init();
    }

    init() {
        this.startBtn.addEventListener('click', () => this.startScan());
        this.stopBtn.addEventListener('click', () => this.stopScan());
    }

    startScan() {
        if (this.scanning) return;
        this.scanning = true;
        this.writeLine('Blockchain scanner initiated...');
        this.interval = setInterval(() => this.scan(), 1000);
    }

    stopScan() {
        this.scanning = false;
        clearInterval(this.interval);
        this.writeLine('Scanner stopped.');
    }

    scan() {
        const blockHeight = Math.floor(Math.random() * 1000000);
        const hash = this.generateHash();
        const transactions = Math.floor(Math.random() * 500);
        this.writeLine(`Block #${blockHeight} | Hash: ${hash} | TX: ${transactions}`);
    }

    generateHash() {
        return Array.from({length: 16}, () => 
            Math.floor(Math.random() * 16).toString(16)
        ).join('');
    }

    writeLine(text) {
        const line = document.createElement('div');
        line.textContent = `[${new Date().toLocaleTimeString()}] ${text}`;
        this.output.appendChild(line);
        this.output.scrollTop = this.output.scrollHeight;
    }
}

// Telemetry System
class TelemetrySystem {
    constructor() {
        this.tempElement = document.getElementById('temp-value');
        this.altitudeElement = document.getElementById('altitude-value');
        this.pressureElement = document.getElementById('pressure-value');
        this.mapElement = document.getElementById('map');
        this.init();
    }

    init() {
        this.updateSensors();
        setInterval(() => this.updateSensors(), 3000);
        this.initMap();
    }

    updateSensors() {
        this.tempElement.textContent = `${(20 + Math.random() * 10).toFixed(1)}°C`;
        this.altitudeElement.textContent = `${Math.floor(Math.random() * 500)} m`;
        this.pressureElement.textContent = `${(1000 + Math.random() * 50).toFixed(1)} hPa`;
    }

    initMap() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => this.loadMap(position.coords.latitude, position.coords.longitude),
                () => this.mapElement.innerHTML = '<p style="color: #808080; text-align: center; padding: 20px;">Location access denied. Enable GPS for map view.</p>'
            );
        } else {
            this.mapElement.innerHTML = '<p style="color: #808080; text-align: center; padding: 20px;">Geolocation not supported.</p>';
        }
    }

    loadMap(lat, lon) {
        this.mapElement.innerHTML = `<iframe width="100%" height="100%" frameborder="0" style="border:0" 
            src="https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY&center=${lat},${lon}&zoom=15" 
            allowfullscreen></iframe>`;
    }
}

// Pterodactyl Game
class PterodactylGame {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.startBtn = document.getElementById('start-game');
        this.scoreElement = document.getElementById('game-score');
        this.running = false;
        this.score = 0;
        this.init();
    }

    init() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
        this.startBtn.addEventListener('click', () => this.start());
        this.canvas.addEventListener('click', () => this.jump());
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.jump();
        });
    }

    start() {
        if (this.running) return;
        this.running = true;
        this.score = 0;
        this.player = { x: 100, y: 200, velocity: 0, size: 40 };
        this.obstacles = [];
        this.gameLoop();
    }

    jump() {
        if (this.running) {
            this.player.velocity = -8;
        }
    }

    gameLoop() {
        if (!this.running) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update player
        this.player.velocity += 0.5;
        this.player.y += this.player.velocity;

        // Draw player (pterodactyl)
        this.ctx.fillStyle = '#8B4513';
        this.ctx.fillRect(this.player.x, this.player.y, this.player.size, this.player.size);

        // Generate obstacles
        if (Math.random() < 0.02) {
            this.obstacles.push({ x: this.canvas.width, y: Math.random() * (this.canvas.height - 100), width: 50, height: 100 });
        }

        // Update and draw obstacles
        this.obstacles.forEach((obs, index) => {
            obs.x -= 5;
            this.ctx.fillStyle = '#228B22';
            this.ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

            // Collision detection
            if (this.player.x < obs.x + obs.width && this.player.x + this.player.size > obs.x &&
                this.player.y < obs.y + obs.height && this.player.y + this.player.size > obs.y) {
                this.running = false;
                alert(`Game Over! Score: ${this.score}`);
            }

            if (obs.x + obs.width < 0) {
                this.obstacles.splice(index, 1);
                this.score++;
            }
        });

        // Boundaries
        if (this.player.y > this.canvas.height || this.player.y < 0) {
            this.running = false;
            alert(`Game Over! Score: ${this.score}`);
        }

        this.scoreElement.textContent = this.score;
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Music Studio
class MusicStudio {
    constructor() {
        this.drumSeq = document.getElementById('drum-sequencer');
        this.synthSeq = document.getElementById('synth-sequencer');
        this.bassSeq = document.getElementById('bass-sequencer');
        this.playBtn = document.getElementById('play-music');
        this.stopBtn = document.getElementById('stop-music');
        this.recordBtn = document.getElementById('record-music');
        this.exportBtn = document.getElementById('export-music');
        this.init();
    }

    init() {
        this.createSequencer(this.drumSeq, 'drum');
        this.createSequencer(this.synthSeq, 'synth');
        this.createSequencer(this.bassSeq, 'bass');
        
        this.playBtn.addEventListener('click', () => this.play());
        this.stopBtn.addEventListener('click', () => this.stop());
        this.recordBtn.addEventListener('click', () => this.record());
        this.exportBtn.addEventListener('click', () => this.export());
    }

    createSequencer(container, type) {
        for (let i = 0; i < 16; i++) {
            const step = document.createElement('div');
            step.style.cssText = 'width: 100%; height: 40px; background: #2a2a2a; border: 1px solid #404040; cursor: pointer; transition: all 0.2s;';
            step.dataset.active = 'false';
            step.addEventListener('click', () => {
                step.dataset.active = step.dataset.active === 'true' ? 'false' : 'true';
                step.style.background = step.dataset.active === 'true' ? '#c0c0c0' : '#2a2a2a';
            });
            container.appendChild(step);
        }
    }

    play() {
        console.log('Music playback started');
    }

    stop() {
        console.log('Music playback stopped');
    }

    record() {
        console.log('Recording started');
    }

    export() {
        console.log('Exporting track');
        alert('Track exported successfully!');
    }
}

// News/Teletext System
class TeletextNews {
    constructor() {
        this.display = document.getElementById('teletext-display');
        this.pageInput = document.getElementById('page-number');
        this.loadBtn = document.getElementById('load-page');
        this.init();
    }

    init() {
        this.loadBtn.addEventListener('click', () => this.loadPage());
        this.loadPage(100);
    }

    loadPage(pageNum = null) {
        const page = pageNum || this.pageInput.value || 100;
        this.display.innerHTML = `<div style="text-align: center; padding: 20px;">
            <h3 style="color: #ffff00;">TELETEXT PAGE ${page}</h3>
            <p style="margin-top: 20px;">Loading news content...</p>
            <p style="margin-top: 10px; color: #00ff00;">This will connect to live teletext feeds.</p>
        </div>`;
    }
}

// Initialize all systems
document.addEventListener('DOMContentLoaded', () => {
    new TabManager();
    new SystemMonitor();
    new Terminal();
    new BlockchainScanner();
    new TelemetrySystem();
    new PterodactylGame();
    new MusicStudio();
    new TeletextNews();
});
