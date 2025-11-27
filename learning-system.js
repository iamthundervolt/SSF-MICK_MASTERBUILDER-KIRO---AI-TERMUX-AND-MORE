// Self-Learning AI System - Intent Recognition & Goal Prediction
class LearningSystem {
    constructor() {
        this.userPatterns = [];
        this.goalHistory = [];
        this.commandSequences = [];
        this.corrections = [];
        this.sessionGoal = null;
        this.learningData = this.loadLearningData();
        this.commonGoals = this.buildGoalDatabase();
    }

    loadLearningData() {
        const saved = localStorage.getItem('kiro_learning_data');
        return saved ? JSON.parse(saved) : {
            userPreferences: {},
            successfulSequences: [],
            failedAttempts: [],
            learnedPatterns: []
        };
    }

    saveLearningData() {
        localStorage.setItem('kiro_learning_data', JSON.stringify(this.learningData));
    }

    buildGoalDatabase() {
        return {
            'run_debian': {
                keywords: ['debian', 'linux', 'distro', 'iso', 'utm', 'virtual', 'vm', 'container'],
                steps: [
                    { cmd: 'container create mydebian debian', desc: 'Create a Debian container' },
                    { cmd: 'container start mydebian', desc: 'Start the container (opens in new window)' },
                    { desc: 'Use the Debian terminal in the new window!' }
                ],
                explanation: 'To run Debian like UTM/ISO, use the container system. It creates a virtual Debian environment in a new window.'
            },
            'install_python': {
                keywords: ['python', 'pip', 'install python', 'setup python'],
                steps: [
                    { cmd: 'termux', desc: 'Enter Termux mode' },
                    { cmd: 'pkg install python', desc: 'Install Python' },
                    { cmd: 'python --version', desc: 'Verify installation' }
                ],
                explanation: 'To install Python, use Termux mode and the pkg package manager.'
            },
            'setup_ssh': {
                keywords: ['ssh', 'remote', 'connect', 'server', 'openssh'],
                steps: [
                    { cmd: 'termux', desc: 'Enter Termux mode' },
                    { cmd: 'pkg install openssh', desc: 'Install SSH' },
                    { cmd: 'passwd', desc: 'Set password' },
                    { cmd: 'sshd', desc: 'Start SSH server' }
                ],
                explanation: 'To set up SSH, install openssh in Termux mode, set a password, and start the server.'
            },
            'create_project': {
                keywords: ['project', 'folder', 'directory', 'workspace', 'build'],
                steps: [
                    { cmd: 'termux', desc: 'Enter Termux mode' },
                    { cmd: 'mkdir myproject', desc: 'Create project directory' },
                    { cmd: 'cd myproject', desc: 'Enter the directory' },
                    { cmd: 'ls -la', desc: 'List contents' }
                ],
                explanation: 'To create a project workspace, use Termux mode and standard Linux commands.'
            },
            'web_server': {
                keywords: ['web', 'server', 'nginx', 'apache', 'http', 'website'],
                steps: [
                    { cmd: 'container create webserver debian', desc: 'Create container for web server' },
                    { cmd: 'container start webserver', desc: 'Start container' },
                    { desc: 'In container: apt install nginx' },
                    { desc: 'In container: systemctl start nginx' }
                ],
                explanation: 'For a web server, create a Debian container and install nginx or apache inside it.'
            }
        };
    }

    analyzeCommand(cmd, context = {}) {
        // Record the command
        this.commandSequences.push({
            command: cmd,
            timestamp: Date.now(),
            context: context
        });

        // Keep only last 10 commands
        if (this.commandSequences.length > 10) {
            this.commandSequences.shift();
        }

        // Detect goal from command
        const detectedGoal = this.detectGoal(cmd);
        if (detectedGoal) {
            this.sessionGoal = detectedGoal;
        }

        // Check if user is struggling
        const struggling = this.detectStruggling();
        if (struggling) {
            return this.offerHelp(struggling);
        }

        // Check for common mistakes
        const mistake = this.detectMistake(cmd);
        if (mistake) {
            return this.correctMistake(mistake);
        }

        return null;
    }

    detectGoal(cmd) {
        const lowerCmd = cmd.toLowerCase();
        
        for (const [goalId, goal] of Object.entries(this.commonGoals)) {
            for (const keyword of goal.keywords) {
                if (lowerCmd.includes(keyword)) {
                    return { id: goalId, goal: goal, confidence: 0.8 };
                }
            }
        }

        return null;
    }

    detectStruggling() {
        // User tried same thing multiple times?
        const recent = this.commandSequences.slice(-5);
        const similar = recent.filter(c => 
            recent.some(r => r !== c && this.areSimilar(c.command, r.command))
        );

        if (similar.length >= 3) {
            return {
                type: 'repetition',
                commands: similar.map(s => s.command),
                suggestion: 'You seem to be trying different variations. Let me help!'
            };
        }

        // User getting "command not found" errors?
        const errors = recent.filter(c => c.context.error);
        if (errors.length >= 2) {
            return {
                type: 'errors',
                suggestion: 'Getting errors? Let me guide you through this step by step.'
            };
        }

        return null;
    }

    areSimilar(cmd1, cmd2) {
        const words1 = cmd1.toLowerCase().split(/\s+/);
        const words2 = cmd2.toLowerCase().split(/\s+/);
        const common = words1.filter(w => words2.includes(w));
        return common.length >= Math.min(words1.length, words2.length) * 0.5;
    }

    detectMistake(cmd) {
        const mistakes = {
            'create distro': {
                correct: 'container create mydebian debian',
                explanation: 'To create a distro, use: container create <name> <distro>'
            },
            'start container': {
                correct: 'container start <name>',
                explanation: 'You need to specify which container to start'
            },
            'install linux': {
                correct: 'container create mylinux debian',
                explanation: 'Linux runs in containers. Create one with: container create'
            },
            'virtual desktop': {
                correct: 'container start <name>',
                explanation: 'Containers open in new windows. Start one to see the desktop-like interface'
            },
            'mkdir debian': {
                correct: 'container create mydebian debian',
                explanation: 'To run Debian, use containers, not mkdir. Containers are like virtual machines!'
            }
        };

        const lowerCmd = cmd.toLowerCase();
        for (const [mistake, correction] of Object.entries(mistakes)) {
            if (lowerCmd.includes(mistake)) {
                return correction;
            }
        }

        return null;
    }

    correctMistake(mistake) {
        this.corrections.push({
            timestamp: Date.now(),
            mistake: mistake
        });

        return {
            type: 'correction',
            message: `💡 I think you meant: ${mistake.correct}\n\n${mistake.explanation}`,
            suggestedCommand: mistake.correct
        };
    }

    offerHelp(struggling) {
        if (this.sessionGoal) {
            const goal = this.sessionGoal.goal;
            return {
                type: 'guided_help',
                message: `🎯 I see you're trying to: ${goal.explanation}\n\nHere's the step-by-step process:`,
                steps: goal.steps
            };
        }

        return {
            type: 'general_help',
            message: `💡 I notice you're trying different approaches. What's your goal?\n\nCommon tasks:\n• Run Debian: "container create mydebian debian"\n• Install packages: "termux" then "pkg install <package>"\n• Create project: "termux" then "mkdir myproject"`
        };
    }

    getGuidedSteps(goalId) {
        const goal = this.commonGoals[goalId];
        if (!goal) return null;

        return {
            goal: goalId,
            explanation: goal.explanation,
            steps: goal.steps,
            currentStep: 0
        };
    }

    interpretIntent(userInput) {
        const input = userInput.toLowerCase();
        
        // Detect "I want to..." patterns
        const wantPatterns = [
            { pattern: /want.*run.*debian/i, goal: 'run_debian' },
            { pattern: /want.*linux/i, goal: 'run_debian' },
            { pattern: /want.*virtual.*machine/i, goal: 'run_debian' },
            { pattern: /want.*container/i, goal: 'run_debian' },
            { pattern: /want.*python/i, goal: 'install_python' },
            { pattern: /want.*ssh/i, goal: 'setup_ssh' },
            { pattern: /want.*server/i, goal: 'web_server' },
            { pattern: /want.*project/i, goal: 'create_project' }
        ];

        for (const { pattern, goal } of wantPatterns) {
            if (pattern.test(input)) {
                return this.getGuidedSteps(goal);
            }
        }

        // Detect confused commands
        const confusedPatterns = [
            { pattern: /create.*distro|install.*linux|mount.*iso/i, goal: 'run_debian' },
            { pattern: /mkdir.*debian|mkdir.*linux/i, goal: 'run_debian' }
        ];

        for (const { pattern, goal } of confusedPatterns) {
            if (pattern.test(input)) {
                return {
                    type: 'clarification',
                    message: `💡 I think you want to run Debian/Linux!\n\nYou don't need to mount ISOs or create folders.\nUse the container system instead - it's like a virtual machine!`,
                    guidance: this.getGuidedSteps(goal)
                };
            }
        }

        return null;
    }

    learnFromSuccess(sequence) {
        this.learningData.successfulSequences.push({
            sequence: sequence,
            timestamp: Date.now()
        });
        this.saveLearningData();
    }

    learnFromFailure(attempt, reason) {
        this.learningData.failedAttempts.push({
            attempt: attempt,
            reason: reason,
            timestamp: Date.now()
        });
        this.saveLearningData();
    }

    getPersonalizedSuggestion() {
        // Based on user's history, suggest next logical step
        const recent = this.commandSequences.slice(-3);
        
        if (recent.some(c => c.command.includes('container create'))) {
            return '💡 Next: Start your container with "container start <name>"';
        }

        if (recent.some(c => c.command.includes('termux'))) {
            return '💡 You\'re in Termux mode! Try: ls, pwd, mkdir, or pkg install';
        }

        return null;
    }
}
