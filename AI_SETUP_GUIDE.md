# KIRO AI Chat Agent - Setup Guide

## Overview
Your terminal now has an intelligent AI chat agent built in! You can have conversations, get help with Termux, troubleshoot tech issues, and more.

## Quick Start

1. Open the terminal tab
2. Type `chat` to enter chat mode
3. Start talking with KIRO!
4. Type `exit` to return to terminal mode

## AI Connection Options

### Option 1: Free Fallback Mode (No Setup Required)
The terminal includes intelligent fallback responses for common questions, especially Termux-related queries. This works out of the box with no configuration!

### Option 2: OpenAI API (Best Quality)
1. Get an API key from https://platform.openai.com/api-keys
2. Open browser console (F12)
3. Run: `localStorage.setItem('ai_api_key', 'sk-your-key-here')`
4. Refresh the page

### Option 3: Hugging Face (Free Tier Available)
1. Sign up at https://huggingface.co
2. Get your API token from Settings > Access Tokens
3. In browser console:
```javascript
localStorage.setItem('ai_api_key', 'hf_your-token-here');
localStorage.setItem('ai_endpoint', 'https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2');
localStorage.setItem('ai_model', 'mistralai/Mistral-7B-Instruct-v0.2');
```

### Option 4: Local LLM (Ollama, LM Studio)
If you're running a local LLM server:
```javascript
localStorage.setItem('ai_endpoint', 'http://localhost:11434/v1/chat/completions');
localStorage.setItem('ai_model', 'llama2');
localStorage.setItem('ai_api_key', 'not-needed');
```

### Option 5: Free AI APIs
Several free AI APIs are available:

**Together AI** (Free tier):
```javascript
localStorage.setItem('ai_api_key', 'your-together-key');
localStorage.setItem('ai_endpoint', 'https://api.together.xyz/v1/chat/completions');
localStorage.setItem('ai_model', 'mistralai/Mixtral-8x7B-Instruct-v0.1');
```

**Groq** (Fast & Free):
```javascript
localStorage.setItem('ai_api_key', 'your-groq-key');
localStorage.setItem('ai_endpoint', 'https://api.groq.com/openai/v1/chat/completions');
localStorage.setItem('ai_model', 'mixtral-8x7b-32768');
```

## Terminal Commands

- `help` - Show all available commands
- `chat` - Enter AI chat mode
- `setup` - Show AI configuration guide
- `termux [topic]` - Get Termux-specific help
- `about` - Learn about KIRO
- `config` - Show current AI configuration
- `clear` - Clear terminal screen
- `system` - Display system information

## Termux Expertise

KIRO specializes in Termux! Ask about:
- Package installation (`pkg install`)
- Storage access (`termux-setup-storage`)
- Python, Node.js, Git setup
- SSH configuration
- File operations
- And much more!

## Tips

1. **No API Key?** No problem! The fallback mode is smart enough for basic help
2. **Privacy**: All API keys are stored locally in your browser
3. **Conversation**: KIRO remembers context during chat sessions
4. **Termux Focus**: Optimized for Termux and Linux terminal help
5. **iPad Optimized**: Touch-friendly and responsive

## Example Conversations

```
$ chat
> Hi KIRO, how do I install Python in Termux?
KIRO: Install Python: pkg install python...

> Can you help me set up SSH?
KIRO: Sure! First install openssh: pkg install openssh...

> What's the weather like?
KIRO: I can help with tech stuff! For weather, try a weather API...
```

## Troubleshooting

**"API Error"**: Check your API key and endpoint configuration
**"Rate Limited"**: You've hit API limits, wait a bit or use fallback mode
**Slow Responses**: Normal for free APIs, consider upgrading or using local LLM

## Future Enhancements

Coming soon:
- Voice input/output
- Code execution in terminal
- File system integration
- Plugin system for custom commands

---

Rock on and enjoy chatting with KIRO's little brother!
