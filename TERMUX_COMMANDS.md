# Termux Command Reference

## How to Use

Type `termux` in the terminal to enter Termux emulation mode.
Type `exit` to return to KIRO mode.

## Available Commands (50+)

### File System Commands
- `ls` - List directory contents
  - `ls -l` - Long format
  - `ls -la` - Long format with hidden files
- `cd <path>` - Change directory
- `pwd` - Print working directory
- `mkdir <dir>` - Create directory
- `touch <file>` - Create empty file
- `cat <file>` - Display file contents
- `rm <file>` - Remove file
- `cp <src> <dest>` - Copy file
- `mv <src> <dest>` - Move/rename file
- `find` - Find files
- `tree` - Display directory tree
- `head <file>` - Show first 10 lines
- `tail <file>` - Show last 10 lines
- `wc <file>` - Word count
- `grep <pattern>` - Search text

### Network Commands
- `ping <host>` - Ping a host
- `curl <url>` - Transfer data from URL
- `wget <url>` - Download files
- `netstat` - Network statistics
- `ifconfig` - Network interface configuration
- `ip addr` - Show IP addresses
- `telnet <host>` - Telnet connection
- `nc <host>` - Netcat connection
- `nmap <target>` - Network scanner
- `ssh <user@host>` - SSH connection
- `scp <file> <dest>` - Secure copy

### Package Management
- `pkg install <package>` - Install package
- `pkg update` - Update package lists
- `pkg upgrade` - Upgrade packages
- `pkg search <term>` - Search packages
- `pkg list-installed` - List installed packages
- `pkg show <package>` - Show package info
- `apt` - Alternative to pkg (same commands)

### Development Tools
- `python` - Python interpreter
- `node` - Node.js runtime
- `git status` - Git status
- `git log` - Git log
- `git clone <url>` - Clone repository
- `git branch` - List branches
- `git pull` - Pull changes
- `git push` - Push changes
- `vim <file>` - Vim editor
- `nano <file>` - Nano editor
- `gcc <file>` - C compiler

### System Commands
- `ps` - Process status
- `top` - Process monitor
- `htop` - Interactive process viewer
- `free` - Memory usage
- `df` - Disk space
- `uname` - System information
- `whoami` - Current user
- `hostname` - System hostname
- `date` - Current date/time
- `uptime` - System uptime
- `env` - Environment variables
- `export VAR=value` - Set environment variable
- `clear` - Clear screen
- `history` - Command history

### Termux-Specific
- `termux-setup-storage` - Setup storage access
- `pkg install termux-api` - Install Termux API

### File Operations
- `chmod <file>` - Change permissions
- `chown <file>` - Change owner
- `ln <src> <dest>` - Create link
- `tar` - Archive files
- `zip` - Compress files
- `unzip` - Extract files

### Text Processing
- `sort` - Sort lines
- `uniq` - Unique lines
- `diff <file1> <file2>` - Compare files
- `sed` - Stream editor
- `awk` - Text processing

### Utilities
- `man <command>` - Manual page
- `which <command>` - Locate command
- `file <file>` - File type
- `alias` - Command aliases
- `tmux` - Terminal multiplexer
- `screen` - Screen session

## Virtual File System

The emulator includes a virtual file system:

```
/
├── home/
│   ├── README.txt
│   └── storage/
│       ├── shared/
│       ├── downloads/
│       ├── dcim/
│       ├── music/
│       └── movies/
├── bin/
├── usr/
│   └── bin/
├── tmp/
└── etc/
```

## Examples

### Navigate and explore
```bash
$ termux
termux@kiro:/home$ ls
README.txt  storage
termux@kiro:/home$ pwd
/home
termux@kiro:/home$ cd storage
termux@kiro:/home/storage$ ls
shared  downloads  dcim  music  movies
```

### Create files and directories
```bash
termux@kiro:/home$ mkdir projects
termux@kiro:/home$ cd projects
termux@kiro:/home/projects$ touch app.js
termux@kiro:/home/projects$ ls -l
-rwxr-xr-x 1 termux termux 0 Nov 27 12:00 app.js
```

### Package management
```bash
termux@kiro:/home$ pkg search python
Searching for python...
python/stable 3.11.0 aarch64
  Python programming language

termux@kiro:/home$ pkg install python
Installing python...
Reading package lists... Done
```

### Network operations
```bash
termux@kiro:/home$ ping google.com
PING google.com (142.250.185.46): 56 data bytes
64 bytes from google.com: icmp_seq=0 ttl=64 time=12.3 ms

termux@kiro:/home$ curl https://api.github.com
Fetching https://api.github.com...
[Simulated HTTP response]
Status: 200 OK
```

### System information
```bash
termux@kiro:/home$ uname
Linux kiro-termux 5.10.0 aarch64 Android

termux@kiro:/home$ free
              total        used        free
Mem:          4096        2457        1639
Swap:            0           0           0

termux@kiro:/home$ ifconfig
wlan0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.1.100  netmask 255.255.255.0
```

## Features

- **Virtual File System**: Create, read, and manage files
- **Persistent State**: File system persists during session
- **Realistic Output**: Commands produce authentic-looking output
- **Network Simulation**: Simulated network commands
- **Package Management**: Full pkg/apt simulation
- **Development Tools**: Python, Node.js, Git simulation
- **System Info**: Real browser/device information where possible

## Notes

- This is a browser-based emulation, not a real Linux environment
- File system is virtual and stored in memory
- Network commands are simulated
- Some commands show simulated output for demonstration
- Perfect for learning Termux commands safely!

## Switching Modes

- Type `termux` in KIRO mode to enter Termux emulation
- Type `chat` in KIRO mode to talk with AI
- Type `exit` in any mode to return to KIRO mode
- Type `help` for available commands in current mode

---

**Enjoy your full Termux experience in the browser!**
