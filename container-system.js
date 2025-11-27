// Revolutionary Container System - Run Virtual Environments
class ContainerSystem {
    constructor() {
        this.containers = new Map();
        this.activeContainer = null;
    }

    // Create a new container (Debian, Ubuntu, etc.)
    createContainer(name, distro = 'debian') {
        if (this.containers.has(name)) {
            return `Container '${name}' already exists`;
        }

        const container = {
            name: name,
            distro: distro,
            status: 'stopped',
            created: new Date(),
            iframe: null,
            url: null
        };

        this.containers.set(name, container);
        return `Container '${name}' created with ${distro}\nUse 'container start ${name}' to launch`;
    }

    // Start a container in a new window/iframe
    startContainer(name) {
        const container = this.containers.get(name);
        if (!container) {
            return `Container '${name}' not found`;
        }

        if (container.status === 'running') {
            return `Container '${name}' is already running`;
        }

        // Create container window
        const containerWindow = this.createContainerWindow(container);
        container.iframe = containerWindow;
        container.status = 'running';
        this.activeContainer = name;

        return `Container '${name}' started!\nAccess it in the new window or tab.`;
    }

    createContainerWindow(container) {
        // Create a new window for the container
        const containerHTML = this.generateContainerHTML(container);
        
        // Open in new window
        const newWindow = window.open('', container.name, 'width=1024,height=768');
        if (newWindow) {
            newWindow.document.write(containerHTML);
            newWindow.document.close();
            return newWindow;
        }

        // Fallback: Create iframe in current page
        const iframe = document.createElement('iframe');
        iframe.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; border: none; z-index: 9999;';
        iframe.srcdoc = containerHTML;
        document.body.appendChild(iframe);
        return iframe;
    }

    generateContainerHTML(container) {
        return `<!DOCTYPE html>
<html>
<head>
    <title>${container.name} - ${container.distro}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Courier New', monospace;
            background: #000;
            color: #0f0;
            padding: 20px;
            height: 100vh;
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
            padding: 15px;
            border: 2px solid #0f0;
            margin-bottom: 20px;
            border-radius: 5px;
        }
        .header h1 {
            color: #0f0;
            font-size: 24px;
            margin-bottom: 5px;
        }
        .header p {
            color: #888;
            font-size: 14px;
        }
        .terminal {
            background: #000;
            border: 2px solid #0f0;
            padding: 20px;
            height: calc(100vh - 120px);
            overflow-y: auto;
            border-radius: 5px;
        }
        .terminal-line {
            margin-bottom: 5px;
        }
        .prompt {
            color: #0ff;
        }
        .input-line {
            display: flex;
            margin-top: 10px;
        }
        .input-line input {
            flex: 1;
            background: transparent;
            border: none;
            color: #0f0;
            font-family: 'Courier New', monospace;
            font-size: 16px;
            outline: none;
            padding: 5px;
        }
        .close-btn {
            position: fixed;
            top: 10px;
            right: 10px;
            background: #f00;
            color: #fff;
            border: none;
            padding: 10px 20px;
            cursor: pointer;
            border-radius: 5px;
            font-weight: bold;
            z-index: 10000;
        }
        .close-btn:hover {
            background: #c00;
        }
    </style>
</head>
<body>
    <button class="close-btn" onclick="window.close()">✕ Close Container</button>
    
    <div class="header">
        <h1>${container.distro.toUpperCase()} Container: ${container.name}</h1>
        <p>Virtual Linux Environment | Created: ${container.created.toLocaleString()}</p>
    </div>
    
    <div class="terminal" id="terminal">
        <div class="terminal-line">Welcome to ${container.distro} container!</div>
        <div class="terminal-line">This is a simulated Linux environment running in your browser.</div>
        <div class="terminal-line"></div>
        <div class="terminal-line">Available commands:</div>
        <div class="terminal-line">  ls, cd, pwd, cat, mkdir, touch, rm</div>
        <div class="terminal-line">  apt update, apt install, apt search</div>
        <div class="terminal-line">  python3, node, git, vim, nano</div>
        <div class="terminal-line">  systemctl, service, ps, top</div>
        <div class="terminal-line"></div>
        <div class="terminal-line">Type 'help' for more information.</div>
        <div class="terminal-line"></div>
        
        <div class="input-line">
            <span class="prompt">root@${container.name}:~# </span>
            <input type="text" id="cmd-input" autofocus />
        </div>
    </div>

    <script>
        const terminal = document.getElementById('terminal');
        const input = document.getElementById('cmd-input');
        let currentPath = '/root';

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const cmd = input.value.trim();
                if (cmd) {
                    addLine('root@${container.name}:' + currentPath + '# ' + cmd, '#0ff');
                    executeCommand(cmd);
                    input.value = '';
                }
            }
        });

        function addLine(text, color = '#0f0') {
            const line = document.createElement('div');
            line.className = 'terminal-line';
            line.style.color = color;
            line.textContent = text;
            terminal.insertBefore(line, terminal.querySelector('.input-line'));
            terminal.scrollTop = terminal.scrollHeight;
        }

        function executeCommand(cmd) {
            const parts = cmd.split(' ');
            const command = parts[0];
            const args = parts.slice(1);

            const commands = {
                'help': () => 'Available: ls, cd, pwd, cat, mkdir, apt, python3, node, git, systemctl, exit',
                'ls': () => 'bin  boot  dev  etc  home  lib  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var',
                'pwd': () => currentPath,
                'cd': () => { currentPath = args[0] || '/root'; return ''; },
                'whoami': () => 'root',
                'uname': () => 'Linux ${container.name} 5.15.0 x86_64 GNU/Linux',
                'date': () => new Date().toString(),
                'clear': () => { 
                    const lines = terminal.querySelectorAll('.terminal-line');
                    lines.forEach(line => line.remove());
                    return '';
                },
                'apt': () => handleApt(args),
                'python3': () => 'Python 3.11.2 (main, Mar 13 2023, 12:18:29)\\nType "help" for more information.',
                'node': () => 'Welcome to Node.js v18.16.0\\nType ".help" for more information.',
                'git': () => 'git version 2.39.2',
                'systemctl': () => 'System is running',
                'ps': () => '  PID TTY          TIME CMD\\n    1 ?        00:00:00 systemd\\n  123 pts/0    00:00:00 bash',
                'exit': () => { window.close(); return 'Closing container...'; }
            };

            const result = commands[command] ? commands[command]() : command + ': command not found';
            if (result) addLine(result);
        }

        function handleApt(args) {
            const subcommand = args[0];
            if (subcommand === 'update') {
                return 'Hit:1 http://deb.debian.org/debian bookworm InRelease\\nReading package lists... Done';
            } else if (subcommand === 'install') {
                return 'Reading package lists... Done\\nBuilding dependency tree... Done\\n' + (args[1] || 'package') + ' is already the newest version.';
            } else if (subcommand === 'search') {
                return 'Searching for ' + (args[1] || 'package') + '...\\nFound 42 packages.';
            }
            return 'Usage: apt [update|install|search] [package]';
        }

        // Focus input on click
        terminal.addEventListener('click', () => input.focus());
    </script>
</body>
</html>`;
    }

    stopContainer(name) {
        const container = this.containers.get(name);
        if (!container) {
            return `Container '${name}' not found`;
        }

        if (container.status === 'stopped') {
            return `Container '${name}' is already stopped`;
        }

        // Close window or remove iframe
        if (container.iframe) {
            if (container.iframe.close) {
                container.iframe.close();
            } else if (container.iframe.remove) {
                container.iframe.remove();
            }
        }

        container.status = 'stopped';
        container.iframe = null;

        if (this.activeContainer === name) {
            this.activeContainer = null;
        }

        return `Container '${name}' stopped`;
    }

    listContainers() {
        if (this.containers.size === 0) {
            return 'No containers created yet.\nUse: container create <name> [debian|ubuntu|alpine]';
        }

        let output = 'CONTAINER NAME    DISTRO      STATUS      CREATED\n';
        output += '─'.repeat(60) + '\n';

        for (const [name, container] of this.containers) {
            const status = container.status === 'running' ? '🟢 running' : '⚫ stopped';
            const created = container.created.toLocaleDateString();
            output += `${name.padEnd(16)} ${container.distro.padEnd(11)} ${status.padEnd(11)} ${created}\n`;
        }

        return output;
    }

    removeContainer(name) {
        const container = this.containers.get(name);
        if (!container) {
            return `Container '${name}' not found`;
        }

        if (container.status === 'running') {
            this.stopContainer(name);
        }

        this.containers.delete(name);
        return `Container '${name}' removed`;
    }

    getContainerInfo(name) {
        const container = this.containers.get(name);
        if (!container) {
            return `Container '${name}' not found`;
        }

        return `Container: ${name}
Distro: ${container.distro}
Status: ${container.status}
Created: ${container.created.toLocaleString()}
Active: ${this.activeContainer === name ? 'Yes' : 'No'}`;
    }
}
