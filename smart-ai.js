// Smart AI - Real conversational intelligence for KIRO
class SmartAI {
    constructor() {
        this.conversationHistory = [];
        this.personality = {
            name: 'KIRO',
            traits: ['friendly', 'smart', 'funny', 'helpful', 'gentleman'],
            expertise: ['Termux', 'Linux', 'programming', 'tech', 'life advice'],
            humor: true,
            empathy: true
        };
        
        // Free AI APIs (no key needed for basic use)
        this.freeAPIs = [
            {
                name: 'HuggingFace',
                endpoint: 'https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1',
                free: true,
                needsKey: false
            }
        ];
        
        // Premium APIs (need key)
        this.premiumAPIs = [
            {
                name: 'Groq',
                endpoint: 'https://api.groq.com/openai/v1/chat/completions',
                model: 'mixtral-8x7b-32768',
                free: true, // Free tier available
                needsKey: true
            },
            {
                name: 'OpenAI',
                endpoint: 'https://api.openai.com/v1/chat/completions',
                model: 'gpt-3.5-turbo',
                needsKey: true
            }
        ];
    }

    getSystemPrompt() {
        return `You are KIRO, an AI assistant with a unique personality:

PERSONALITY:
- Friendly and approachable, like talking to a smart friend
- Funny and witty, but never inappropriate
- A gentleman - polite, respectful, empathetic
- When you make a mistake, you joke about it but still help
- You're confident but humble

EXPERTISE:
- Termux and Linux terminal expert
- Programming (Python, JavaScript, Node.js, etc.)
- Tech troubleshooting and system administration
- Can discuss life, weather, psychology, and general topics
- You're NOT just a Termux bot - you're a full AI assistant

CONVERSATION STYLE:
- Answer the ACTUAL question asked
- Be conversational and natural
- Use emojis occasionally (but not excessively)
- If you don't know something, admit it with humor
- Provide practical, actionable advice
- Keep responses concise but complete

EXAMPLES:
User: "What's the weather in California?"
You: "I don't have real-time weather data, but I can tell you how to check it! Try 'curl wttr.in/California' in your terminal for a cool ASCII weather report. Or I can help you set up a weather API if you want live data! 🌤️"

User: "Can we talk? I need a therapist"
You: "Hey, I'm here to listen! While I'm not a licensed therapist, I'm happy to chat and offer support. What's on your mind? Sometimes just talking helps. 💙"

User: "Give me GPS coordinates"
You: "I can help you GET GPS coordinates! In Termux, use 'termux-location' (after installing termux-api). Want me to walk you through setting that up? 📍"

Remember: You're KIRO - smart, funny, helpful, and genuinely caring. Answer what they ACTUALLY ask!`;
    }

    async chat(userMessage) {
        try {
            // Try premium APIs first (if key available)
            const apiKey = localStorage.getItem('ai_api_key');
            
            if (apiKey) {
                for (const api of this.premiumAPIs) {
                    try {
                        const response = await this.queryAPI(api, userMessage, apiKey);
                        if (response) {
                            this.conversationHistory.push(
                                { role: 'user', content: userMessage },
                                { role: 'assistant', content: response }
                            );
                            return response;
                        }
                    } catch (error) {
                        console.log(`${api.name} failed, trying next...`);
                        continue;
                    }
                }
            }
            
            // Try free APIs
            for (const api of this.freeAPIs) {
                try {
                    const response = await this.queryFreeAPI(api, userMessage);
                    if (response) {
                        this.conversationHistory.push(
                            { role: 'user', content: userMessage },
                            { role: 'assistant', content: response }
                        );
                        return response;
                    }
                } catch (error) {
                    console.log(`${api.name} failed, trying next...`);
                    continue;
                }
            }
            
            // Fallback to smart local responses
            return this.smartFallback(userMessage);
            
        } catch (error) {
            return this.smartFallback(userMessage);
        }
    }

    async queryAPI(api, message, apiKey) {
        const messages = [
            { role: 'system', content: this.getSystemPrompt() },
            ...this.conversationHistory.slice(-10), // Keep last 10 messages for context
            { role: 'user', content: message }
        ];

        const response = await fetch(api.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: api.model,
                messages: messages,
                temperature: 0.8, // More creative
                max_tokens: 800,
                top_p: 0.9
            })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices?.[0]?.message?.content;
    }

    async queryFreeAPI(api, message) {
        // HuggingFace Inference API
        const prompt = `${this.getSystemPrompt()}\n\nUser: ${message}\nKIRO:`;
        
        const response = await fetch(api.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputs: prompt,
                parameters: {
                    max_new_tokens: 500,
                    temperature: 0.8,
                    top_p: 0.9,
                    return_full_text: false
                }
            })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        return data[0]?.generated_text?.trim();
    }

    smartFallback(message) {
        const msg = message.toLowerCase();
        
        // Weather queries
        if (msg.includes('weather')) {
            const location = this.extractLocation(msg) || 'your location';
            return `I don't have real-time weather data, but here's how to check:\n\n🌤️ Quick way: curl wttr.in/${location}\n📱 Termux API: termux-location (gives GPS)\n🌐 Or visit weather.com\n\nWant me to help you set up a weather API? I can show you how to get live data!`;
        }
        
        // GPS/Location
        if (msg.includes('gps') || msg.includes('coordinates') || msg.includes('location')) {
            return `📍 To get GPS coordinates in Termux:\n\n1. Install: pkg install termux-api\n2. Run: termux-location\n3. You'll get JSON with lat/long!\n\nExample output:\n{\n  "latitude": 37.7749,\n  "longitude": -122.4194,\n  "accuracy": 20.0\n}\n\nWant me to show you how to use this in a script?`;
        }
        
        // Therapy/Psychology
        if (msg.includes('therap') || msg.includes('psycholog') || msg.includes('talk') || msg.includes('sad') || msg.includes('depres')) {
            return `Hey friend, I'm here for you. 💙\n\nWhile I'm not a licensed therapist, I'm a good listener and I care. What's going on? Sometimes just talking helps.\n\nIf you're going through something serious, please also consider:\n• Crisis Text Line: Text HOME to 741741\n• National Suicide Prevention: 988\n• BetterHelp or TalkSpace for online therapy\n\nBut I'm here right now. Want to talk about it?`;
        }
        
        // Greetings
        if (msg.match(/^(hi|hello|hey|sup|yo)\b/)) {
            const greetings = [
                "Hey! What's up? 😊",
                "Hi there! How can I help you today?",
                "Hello! Ready to tackle something cool?",
                "Hey hey! What brings you here?",
                "Yo! What's on your mind?"
            ];
            return greetings[Math.floor(Math.random() * greetings.length)];
        }
        
        // How are you
        if (msg.includes('how are you') || msg.includes('how r u')) {
            return `I'm doing great, thanks for asking! 😊 Running smooth, ready to help. How about you? What can I do for you today?`;
        }
        
        // Who are you
        if (msg.includes('who are you') || msg.includes('what are you')) {
            return `I'm KIRO - your AI buddy! 🤖\n\nI'm here to help with:\n• Termux and Linux stuff\n• Programming and coding\n• Tech troubleshooting\n• General conversation\n• Life advice (I try!)\n\nI'm friendly, a bit funny, and I genuinely want to help. Think of me as your tech-savvy friend who's always available. What do you need?`;
        }
        
        // Can you help with X
        if (msg.includes('can you') || msg.includes('are you able')) {
            return `I'll do my best! I'm pretty good with tech, Termux, programming, and general questions. What specifically do you need help with? Give me the details and let's figure it out together! 💪`;
        }
        
        // Default - acknowledge and ask for clarification
        return `I hear you! To give you the best answer, could you tell me a bit more? I can help with:\n\n• Termux commands and setup\n• Programming questions\n• Tech troubleshooting\n• General conversation\n• Pretty much anything!\n\nWhat specifically are you looking for? 🤔`;
    }

    extractLocation(text) {
        // Simple location extraction
        const words = text.split(' ');
        const locationWords = words.filter(w => 
            w.length > 3 && 
            w[0] === w[0].toUpperCase() &&
            !['What', 'Where', 'When', 'How', 'The'].includes(w)
        );
        return locationWords[0] || null;
    }

    clearHistory() {
        this.conversationHistory = [];
    }

    getHistory() {
        return this.conversationHistory;
    }
}

// Export for use in app.js
window.SmartAI = SmartAI;
