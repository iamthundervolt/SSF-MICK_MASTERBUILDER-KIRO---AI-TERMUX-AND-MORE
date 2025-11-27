// Termux Command Emulator - Virtual File System
class TermuxEmulator {
    constructor() {
        this.fileSystem = this.initFileSystem();
        this.currentPath = '/home';
        this.environment = {
            USER: 'termux',
            HOME: '/home',
            PATH: '/bin:/usr/bin',
            SHELL: '/bin/bash',
            TERM: 'xterm-256color'
        };
        this.processes = [];
        this.networkInfo = null;
    }

    initFileSystem() {
        return {
            '/': {
                type: 'dir',
                contents: {
                    'home': {
                        type: 'dir',
                        contents: {
                            'README.txt': { type: 'file', content: 'Welcome to KIRO Termux Emulator!\n\nThis is a virtual file system running in your browser.\nType "help" for available commands.' },
                            'storage': { type: 'dir', contents: {} }
                        }
                    },
                    'bin': { type: 'dir', contents: {} },
                    'usr': { type: 'dir', contents: { 'bin': { type: 'dir', contents: {} } } },
                    'tmp': { type: 'dir', contents: {} },
                    'etc': { type: 'dir', contents: {} }
                }
            }
        };
    }

    resolvePath(path) {
        if (path.startsWith('/')) {
            return path;
        }
        if (path === '~') {
            return this.environment.HOME;
        }
        if (path.startsWith('~/')) {
            return this.environment.HOME + path.substring(1);
        }
        if (path === '.') {
            return this.currentPath;
        }
        if (path === '..') {
            const parts = this.currentPath.split('/').filter(p => p);
            parts.pop();
            return '/' + parts.join('/');
        }
        return this.currentPath + (this.currentPath.endsWith('/') ? '' : '/') + path;
    }

    getNode(path) {
        const resolved = this.resolvePath(path);
        const parts = resolved.split('/').filter(p => p);
        let node = this.fileSystem['/'];
        
        for (const part of parts) {
            if (!node.contents || !node.contents[part]) {
                return null;
            }
            node = node.contents[part];
        }
        return node;
    }

    executeCommand(cmd, args) {
        const commands = {
            'ls': () => this.ls(args),
            'pwd': () => this.pwd(),
            'cd': () => this.cd(args[0] || '~'),
            'mkdir': () => this.mkdir(args[0]),
            'touch': () => this.touch(args[0]),
            'cat': () => this.cat(args[0]),
            'echo': () => args.join(' '),
            'rm': () => this.rm(args[0]),
            'clear': () => 'CLEAR',
            'whoami': () => this.environment.USER,
            'hostname': () => 'kiro-termux',
            'uname': () => 'Linux kiro-termux 5.10.0 aarch64 Android',
            'date': () => new Date().toString(),
            'uptime': () => `up ${Math.floor(performance.now() / 1000 / 60)} minutes`,
            'free': () => this.free(),
            'df': () => this.df(),
            'ps': () => this.ps(),
            'top': () => 'Use "htop" for interactive process viewer',
            'ifconfig': () => this.ifconfig(),
            'ip': () => this.ipCommand(args),
            'ping': () => this.ping(args[0]),
            'netstat': () => this.netstat(),
            'curl': () => this.curl(args[0]),
            'wget': () => this.wget(args[0]),
            'pkg': () => this.pkg(args),
            'apt': () => this.pkg(args),
            'termux-setup-storage': () => this.setupStorage(),
            'env': () => this.env(),
            'export': () => this.export(args),
            'alias': () => 'alias ll="ls -la"',
            'history': () => 'Command history',
            'man': () => `Manual page for ${args[0] || 'command'}`,
            'which': () => `/usr/bin/${args[0] || 'command'}`,
            'file': () => `${args[0]}: text/plain`,
            'grep': () => this.grep(args),
            'find': () => this.find(args),
            'tree': () => this.tree(),
            'nano': () => `Opening ${args[0] || 'file'} in nano... (simulated)`,
            'vim': () => `Opening ${args[0] || 'file'} in vim... (simulated)`,
            'python': () => 'Python 3.11.0 (simulated)\nType "help", "copyright" for more information.',
            'node': () => 'Node.js v20.0.0 (simulated)',
            'git': () => this.git(args),
            'ssh': () => `Connecting to ${args[0] || 'host'}... (simulated)`,
            'scp': () => `Copying files... (simulated)`,
            'tar': () => `Archiving... (simulated)`,
            'zip': () => `Compressing... (simulated)`,
            'unzip': () => `Extracting... (simulated)`,
            'chmod': () => `Changed permissions of ${args[0]}`,
            'chown': () => `Changed owner of ${args[0]}`,
            'ln': () => `Created link`,
            'cp': () => this.cp(args),
            'mv': () => this.mv(args),
            'head': () => this.head(args[0]),
            'tail': () => this.tail(args[0]),
            'wc': () => this.wc(args[0]),
            'sort': () => 'Sorted output',
            'uniq': () => 'Unique lines',
            'diff': () => 'File differences',
            'sed': () => 'Stream editor output',
            'awk': () => 'AWK processing output',
            'telnet': () => `Connecting to ${args[0] || 'host'}... (simulated)`,
            'nc': () => `Netcat connection to ${args[0] || 'host'}... (simulated)`,
            'nmap': () => `Scanning ${args[0] || 'target'}... (simulated)`,
            'htop': () => 'Interactive process viewer (simulated)',
            'tmux': () => 'Terminal multiplexer (simulated)',
            'screen': () => 'Screen session (simulated)'
        };

        if (commands[cmd]) {
            return commands[cmd]();
        }
        return `${cmd}: command not found\nTry "help" for available commands or "chat" to ask KIRO AI`;
    }

    ls(args) {
        const path = args[0] || this.currentPath;
        const node = this.getNode(path);
        
        if (!node) {
            return `ls: cannot access '${path}': No such file or directory`;
        }
        
        if (node.type === 'file') {
            return path.split('/').pop();
        }
        
        const showAll = args.includes('-a') || args.includes('-la');
        const longFormat = args.includes('-l') || args.includes('-la');
        
        let items = Object.keys(node.contents || {});
        if (showAll) {
            items = ['.', '..', ...items];
        }
        
        if (longFormat) {
            return items.map(item => {
                if (item === '.' || item === '..') {
                    return `drwxr-xr-x 2 termux termux 4096 Nov 27 12:00 ${item}`;
                }
                const itemNode = node.contents[item];
                const type = itemNode.type === 'dir' ? 'd' : '-';
                const size = itemNode.type === 'file' ? (itemNode.content?.length || 0) : 4096;
                return `${type}rwxr-xr-x 1 termux termux ${size} Nov 27 12:00 ${item}`;
            }).join('\n');
        }
        
        return items.join('  ');
    }

    pwd() {
        return this.currentPath;
    }

    cd(path) {
        const newPath = this.resolvePath(path);
        const node = this.getNode(newPath);
        
        if (!node) {
            return `cd: ${path}: No such file or directory`;
        }
        
        if (node.type !== 'dir') {
            return `cd: ${path}: Not a directory`;
        }
        
        this.currentPath = newPath;
        return '';
    }

    mkdir(path) {
        if (!path) return 'mkdir: missing operand';
        
        const fullPath = this.resolvePath(path);
        const parts = fullPath.split('/').filter(p => p);
        const dirName = parts.pop();
        const parentPath = '/' + parts.join('/');
        
        const parent = this.getNode(parentPath);
        if (!parent || parent.type !== 'dir') {
            return `mkdir: cannot create directory '${path}': No such file or directory`;
        }
        
        if (parent.contents[dirName]) {
            return `mkdir: cannot create directory '${path}': File exists`;
        }
        
        parent.contents[dirName] = { type: 'dir', contents: {} };
        return '';
    }

    touch(path) {
        if (!path) return 'touch: missing file operand';
        
        const fullPath = this.resolvePath(path);
        const parts = fullPath.split('/').filter(p => p);
        const fileName = parts.pop();
        const parentPath = '/' + parts.join('/');
        
        const parent = this.getNode(parentPath);
        if (!parent || parent.type !== 'dir') {
            return `touch: cannot touch '${path}': No such file or directory`;
        }
        
        if (!parent.contents[fileName]) {
            parent.contents[fileName] = { type: 'file', content: '' };
        }
        return '';
    }

    cat(path) {
        if (!path) return 'cat: missing file operand';
        
        const node = this.getNode(path);
        if (!node) {
            return `cat: ${path}: No such file or directory`;
        }
        
        if (node.type !== 'file') {
            return `cat: ${path}: Is a directory`;
        }
        
        return node.content || '';
    }

    rm(path) {
        if (!path) return 'rm: missing operand';
        
        const fullPath = this.resolvePath(path);
        const parts = fullPath.split('/').filter(p => p);
        const itemName = parts.pop();
        const parentPath = '/' + parts.join('/');
        
        const parent = this.getNode(parentPath);
        if (!parent || !parent.contents[itemName]) {
            return `rm: cannot remove '${path}': No such file or directory`;
        }
        
        delete parent.contents[itemName];
        return '';
    }

    free() {
        const total = navigator.deviceMemory ? navigator.deviceMemory * 1024 : 4096;
        const used = Math.floor(total * 0.6);
        const free = total - used;
        
        return `              total        used        free
Mem:          ${total}        ${used}        ${free}
Swap:            0           0           0`;
    }

    df() {
        return `Filesystem     1K-blocks    Used Available Use% Mounted on
/dev/root       10485760 6291456   4194304  60% /
tmpfs            2097152       0   2097152   0% /tmp`;
    }

    ps() {
        return `  PID TTY          TIME CMD
    1 pts/0    00:00:00 bash
  ${Math.floor(Math.random() * 1000)} pts/0    00:00:00 kiro-terminal`;
    }

    ifconfig() {
        return `wlan0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.1.${Math.floor(Math.random() * 255)}  netmask 255.255.255.0
        inet6 fe80::${Math.floor(Math.random() * 9999)}  prefixlen 64
        ether ${this.generateMAC()}  txqueuelen 1000`;
    }

    ipCommand(args) {
        if (args[0] === 'addr' || args[0] === 'a') {
            return this.ifconfig();
        }
        return 'Usage: ip [ addr | route | link ]';
    }

    ping(host) {
        if (!host) return 'ping: usage error: Destination address required';
        return `PING ${host} (${this.generateIP()}): 56 data bytes
64 bytes from ${host}: icmp_seq=0 ttl=64 time=12.3 ms
64 bytes from ${host}: icmp_seq=1 ttl=64 time=11.8 ms
--- ${host} ping statistics ---
2 packets transmitted, 2 packets received, 0% packet loss`;
    }

    netstat() {
        return `Active Internet connections
Proto Recv-Q Send-Q Local Address           Foreign Address         State
tcp        0      0 0.0.0.0:8022            0.0.0.0:*               LISTEN
tcp        0      0 192.168.1.100:45678     93.184.216.34:443       ESTABLISHED`;
    }

    curl(url) {
        if (!url) return 'curl: no URL specified';
        return `Fetching ${url}...\n[Simulated HTTP response]\nStatus: 200 OK`;
    }

    wget(url) {
        if (!url) return 'wget: missing URL';
        return `--${new Date().toISOString()}--  ${url}\nResolving host... done.\nConnecting... connected.\nHTTP request sent, awaiting response... 200 OK\nLength: 1024 (1.0K) [text/html]\nSaving to: 'index.html'\n\nindex.html      100%[===================>]   1.00K  --.-KB/s    in 0s\n\n${new Date().toISOString()} (10.2 MB/s) - 'index.html' saved [1024/1024]`;
    }

    pkg(args) {
        const subcommand = args[0];
        const packageName = args[1];
        
        const responses = {
            'install': `Installing ${packageName || 'package'}...\nReading package lists... Done\nBuilding dependency tree... Done\n${packageName || 'package'} is already the newest version.\n0 upgraded, 0 newly installed, 0 to remove.`,
            'update': 'Hit:1 https://termux.org stable InRelease\nReading package lists... Done\nBuilding dependency tree... Done\nAll packages are up to date.',
            'upgrade': 'Reading package lists... Done\nBuilding dependency tree... Done\nCalculating upgrade... Done\n0 upgraded, 0 newly installed, 0 to remove.',
            'search': `Searching for ${packageName || 'package'}...\npython/stable 3.11.0 aarch64\n  Python programming language\nnodejs/stable 20.0.0 aarch64\n  JavaScript runtime`,
            'list-installed': 'bash\ncoreutils\ngit\npython\nnodejs\nvim\nnano',
            'show': `Package: ${packageName || 'package'}\nVersion: 1.0.0\nArchitecture: aarch64\nDescription: Package description`
        };
        
        return responses[subcommand] || 'Usage: pkg [install|update|upgrade|search|list-installed|show] [package]';
    }

    setupStorage() {
        const home = this.getNode('/home');
        if (!home.contents['storage']) {
            home.contents['storage'] = {
                type: 'dir',
                contents: {
                    'shared': { type: 'dir', contents: {} },
                    'downloads': { type: 'dir', contents: {} },
                    'dcim': { type: 'dir', contents: {} },
                    'music': { type: 'dir', contents: {} },
                    'movies': { type: 'dir', contents: {} }
                }
            };
        }
        return 'Storage access configured!\nAccess your device storage at ~/storage/';
    }

    env() {
        return Object.entries(this.environment)
            .map(([key, value]) => `${key}=${value}`)
            .join('\n');
    }

    export(args) {
        if (args.length === 0) return this.env();
        const [assignment] = args;
        const [key, value] = assignment.split('=');
        if (key && value) {
            this.environment[key] = value;
            return '';
        }
        return 'export: usage: export VAR=value';
    }

    grep(args) {
        return `Searching for "${args[0] || 'pattern'}"...\n(simulated grep output)`;
    }

    find(args) {
        return `./\n./README.txt\n./storage`;
    }

    tree() {
        return `.\n├── README.txt\n└── storage\n    ├── shared\n    ├── downloads\n    └── dcim`;
    }

    git(args) {
        const subcommand = args[0];
        const responses = {
            'status': 'On branch main\nnothing to commit, working tree clean',
            'log': 'commit abc123 (HEAD -> main)\nAuthor: User\nDate: Now\n\n    Initial commit',
            'branch': '* main',
            'clone': `Cloning into '${args[1] || 'repository'}'...\nremote: Counting objects: 100, done.\nReceiving objects: 100% (100/100), done.`,
            'pull': 'Already up to date.',
            'push': 'Everything up-to-date.'
        };
        return responses[subcommand] || 'usage: git [clone|status|log|branch|pull|push]';
    }

    cp(args) {
        if (args.length < 2) return 'cp: missing file operand';
        return `Copied ${args[0]} to ${args[1]}`;
    }

    mv(args) {
        if (args.length < 2) return 'mv: missing file operand';
        return `Moved ${args[0]} to ${args[1]}`;
    }

    head(path) {
        if (!path) return 'head: missing file operand';
        const content = this.cat(path);
        return content.split('\n').slice(0, 10).join('\n');
    }

    tail(path) {
        if (!path) return 'tail: missing file operand';
        const content = this.cat(path);
        const lines = content.split('\n');
        return lines.slice(-10).join('\n');
    }

    wc(path) {
        if (!path) return 'wc: missing file operand';
        const content = this.cat(path);
        const lines = content.split('\n').length;
        const words = content.split(/\s+/).length;
        const chars = content.length;
        return `  ${lines}  ${words}  ${chars} ${path}`;
    }

    generateMAC() {
        return Array.from({length: 6}, () => 
            Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
        ).join(':');
    }

    generateIP() {
        return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
    }
}
