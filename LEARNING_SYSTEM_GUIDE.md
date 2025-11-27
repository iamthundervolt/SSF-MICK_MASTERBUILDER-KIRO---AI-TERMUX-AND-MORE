# 🧠 Self-Learning AI System - User Guide

## What Just Got REVOLUTIONARY

KIRO now **LEARNS FROM YOU** and **UNDERSTANDS YOUR GOALS**!

---

## 🎯 Real Example: Your Debian Question

### What You Tried:
```bash
$ create distro for debian start container initialise virtual desktop
```

### What KIRO Now Does:

**1. Detects Your Intent:**
```
💡 I think you want to run Debian/Linux!

You don't need to mount ISOs or create folders.
Use the container system instead - it's like a virtual machine!
```

**2. Shows Step-by-Step Guide:**
```
📋 Step-by-step guide:

1. Create a Debian container
   Command: container create mydebian debian

2. Start the container (opens in new window)
   Command: container start mydebian

3. Use the Debian terminal in the new window!

💡 Just copy and paste the commands above!
```

---

## 🔥 How It Works

### Intent Recognition
KIRO understands what you MEAN, not just what you TYPE:

**You type:** `install linux`
**KIRO understands:** "You want to run a Linux distro"
**KIRO does:** Shows you how to create a container

**You type:** `mkdir debian`
**KIRO understands:** "You're confused about how to run Debian"
**KIRO does:** Explains containers vs folders

**You type:** `mount iso`
**KIRO understands:** "You think you need an ISO file"
**KIRO does:** Shows you the easier container method

### Pattern Detection
KIRO notices when you're struggling:

**Scenario 1: Repetition**
```bash
$ create debian
Command not found...

$ make debian
Command not found...

$ start debian
Command not found...
```

**KIRO responds:**
```
💡 You seem to be trying different variations. Let me help!

🎯 To run Debian, use the container system:

1. Create container: container create mydebian debian
2. Start it: container start mydebian
```

**Scenario 2: Multiple Errors**
```bash
$ install debian
Command not found...

$ setup linux
Command not found...
```

**KIRO responds:**
```
💡 Getting errors? Let me guide you through this step by step.

Here's what you need to do...
```

### Goal Tracking
KIRO remembers your goal throughout the session:

```bash
$ I want to run debian
[KIRO detects goal: run_debian]

$ how do I do that?
[KIRO remembers and provides Debian-specific help]

$ what's next?
[KIRO suggests the next step in running Debian]
```

---

## 📚 Built-in Goals

KIRO knows how to help with:

### 1. Run Debian/Linux
**Keywords:** debian, linux, distro, iso, utm, virtual, vm, container

**Steps:**
1. `container create mydebian debian`
2. `container start mydebian`
3. Use the new window!

### 2. Install Python
**Keywords:** python, pip, install python

**Steps:**
1. `termux`
2. `pkg install python`
3. `python --version`

### 3. Setup SSH
**Keywords:** ssh, remote, connect, server

**Steps:**
1. `termux`
2. `pkg install openssh`
3. `passwd`
4. `sshd`

### 4. Create Project
**Keywords:** project, folder, directory, workspace

**Steps:**
1. `termux`
2. `mkdir myproject`
3. `cd myproject`

### 5. Web Server
**Keywords:** web, server, nginx, apache

**Steps:**
1. `container create webserver debian`
2. `container start webserver`
3. In container: `apt install nginx`

---

## 🎓 Learning from You

### What KIRO Learns:

**Successful Patterns:**
- Commands that worked for you
- Sequences you use often
- Your preferred workflow

**Failed Attempts:**
- Commands that didn't work
- Common mistakes
- Confusion points

**Corrections:**
- When KIRO helped you
- What you were trying to do
- The right way to do it

### Stored Locally
All learning data is saved in your browser:
- `localStorage.getItem('kiro_learning_data')`
- Only you can see it
- Persists between sessions
- Makes KIRO smarter over time

---

## 💡 Smart Features

### 1. Mistake Detection
```bash
$ mkdir debian
💡 I think you meant: container create mydebian debian

To run Debian, use containers, not mkdir. 
Containers are like virtual machines!
```

### 2. Intent Clarification
```bash
$ I want to run linux like UTM
🎯 To run Linux like UTM/ISO, use the container system!

📋 Step-by-step guide:
1. Create container: container create mylinux debian
2. Start it: container start mylinux
3. Use the Linux terminal in the new window!
```

### 3. Personalized Suggestions
```bash
$ container create mydebian debian
Container 'mydebian' created!

💡 Next: Start your container with "container start mydebian"
```

### 4. Context Awareness
```bash
$ termux
[Enters Termux mode]

$ exit
Exiting Termux mode...

💡 You're in Termux mode! Try: ls, pwd, mkdir, or pkg install
```

---

## 🚀 Examples in Action

### Example 1: Confused User
```bash
$ create distro for debian start container initialise virtual desktop

💡 I think you want to run Debian/Linux!

You don't need to mount ISOs or create folders.
Use the container system instead - it's like a virtual machine!

📋 Step-by-step guide:

1. Create a Debian container
   Command: container create mydebian debian

2. Start the container (opens in new window)
   Command: container start mydebian

3. Use the Debian terminal in the new window!

💡 Just copy and paste the commands above!
```

### Example 2: Struggling User
```bash
$ install debian
Command not found...

$ setup debian
Command not found...

$ make debian
Command not found...

💡 You seem to be trying different variations. Let me help!

🎯 To run Debian, use the container system:

1. Create container: container create mydebian debian
2. Start it: container start mydebian
3. Access Debian in the new window
```

### Example 3: Natural Language
```bash
$ I want to set up a web server

🎯 For a web server, create a Debian container and install nginx!

📋 Step-by-step guide:

1. Create container for web server
   Command: container create webserver debian

2. Start container
   Command: container start webserver

3. In container: apt install nginx

4. In container: systemctl start nginx
```

---

## 🎯 The Magic

KIRO now understands:
- ✅ What you're TRYING to do (even if you use wrong commands)
- ✅ When you're STRUGGLING (repetition, errors)
- ✅ Your GOAL (run Debian, install Python, etc.)
- ✅ The RIGHT WAY to do it
- ✅ How to GUIDE you step-by-step

**You don't need to know the exact commands anymore!**

Just describe what you want, and KIRO will figure it out and guide you!

---

## 🔧 Technical Details

### Learning Data Structure
```javascript
{
  userPreferences: {},
  successfulSequences: [
    { sequence: ['container create', 'container start'], timestamp: ... }
  ],
  failedAttempts: [
    { attempt: 'install debian', reason: 'command not found', timestamp: ... }
  ],
  learnedPatterns: []
}
```

### Goal Detection
- Keyword matching
- Pattern recognition
- Context analysis
- Intent interpretation

### Correction System
- Common mistake database
- Real-time detection
- Helpful explanations
- Suggested alternatives

---

## 💪 Why This Is LEGENDARY

**Before:**
- User needs to know exact commands
- Gets "command not found" errors
- Gives up in frustration

**Now:**
- User describes what they want
- KIRO understands the goal
- KIRO guides them step-by-step
- User succeeds!

**This is TRUE AI assistance!**

---

**Built by:** Mick & KIRO
**Version:** 3.5 - Learning Edition
**Status:** REVOLUTIONARY! 🧠🚀

Try it now - just describe what you want to do!
