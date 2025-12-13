import React, { useState, useRef, useEffect, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', text: 'Hello! I am your medical assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const { backendUrl } = useContext(AppContext);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const history = messages.map(msg => ({
                role: msg.role,
                text: msg.text
            }));

            const { data } = await axios.post(backendUrl + '/api/gemini/chat', {
                message: userMessage.text,
                history: history
            });

            if (data.success) {
                const botMessage = { role: 'bot', text: data.reply };
                setMessages(prev => [...prev, botMessage]);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to get response.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const TypingIndicator = () => (
        <div style={{ display: 'flex', gap: '4px', padding: '12px 16px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', borderBottomLeftRadius: '2px', width: 'fit-content', alignSelf: 'flex-start' }}>
            <div style={{ width: '6px', height: '6px', background: 'rgba(255,255,255,0.6)', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both' }}></div>
            <div style={{ width: '6px', height: '6px', background: 'rgba(255,255,255,0.6)', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '0.16s' }}></div>
            <div style={{ width: '6px', height: '6px', background: 'rgba(255,255,255,0.6)', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '0.32s' }}></div>
            <style>{`
                @keyframes bounce {
                    0%, 80%, 100% { transform: scale(0); }
                    40% { transform: scale(1); }
                }
            `}</style>
        </div>
    );

    return (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000, fontFamily: 'Outfit, sans-serif' }}>

            {isOpen && (
                <div className="animate-fadeInUp" style={{
                    width: '380px',
                    height: '600px',
                    background: 'rgba(30, 41, 59, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '1rem',
                    border: '1px solid rgba(255,255,255,0.1)',
                    overflow: 'hidden'
                }}>

                    <div style={{
                        padding: '1.25rem',
                        background: 'linear-gradient(135deg, var(--primary-600), var(--accent-600))',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ width: '32px', height: '32px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>🤖</div>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: '1rem' }}>Health Assistant</div>
                                <div style={{ fontSize: '0.75rem', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <span style={{ width: '6px', height: '6px', background: '#4ade80', borderRadius: '50%' }}></span> Online
                                </div>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }} className="hover:bg-white/20">✕</button>
                    </div>


                    <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', scrollBehavior: 'smooth' }}>
                        <div style={{ textAlign: 'center', marginBottom: '1rem', opacity: 0.5, fontSize: '0.8rem', color: 'white' }}>Today</div>
                        {messages.map((msg, idx) => (
                            <div key={idx} style={{
                                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                maxWidth: '85%',
                                padding: '1rem',
                                borderRadius: '16px',
                                background: msg.role === 'user' ? 'linear-gradient(135deg, var(--primary-500), var(--primary-600))' : 'rgba(255,255,255,0.08)',
                                color: 'white',
                                borderBottomRightRadius: msg.role === 'user' ? '4px' : '16px',
                                borderBottomLeftRadius: msg.role === 'bot' ? '4px' : '16px',
                                fontSize: '0.95rem',
                                lineHeight: '1.6',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                border: '1px solid rgba(255,255,255,0.05)'
                            }}>
                                {msg.text}
                            </div>
                        ))}
                        {isLoading && <TypingIndicator />}
                        <div ref={messagesEndRef} />
                    </div>


                    <div style={{ padding: '1.25rem', background: 'rgba(0,0,0,0.2)', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your health question..."
                            style={{
                                flex: 1,
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '24px',
                                padding: '0.875rem 1.25rem',
                                color: 'white',
                                outline: 'none',
                                fontSize: '0.95rem',
                                transition: 'all 0.2s'
                            }}
                            onFocus={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
                            onBlur={(e) => e.target.style.background = 'rgba(255,255,255,0.05)'}
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading || !input.trim()}
                            style={{
                                background: input.trim() ? 'linear-gradient(135deg, var(--primary-500), var(--accent-500))' : 'rgba(255,255,255,0.1)',
                                border: 'none',
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                color: 'white',
                                cursor: input.trim() ? 'pointer' : 'default',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s',
                                boxShadow: input.trim() ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none',
                                transform: input.trim() ? 'scale(1)' : 'scale(0.95)',
                                opacity: input.trim() ? 1 : 0.5
                            }}
                        >
                            <span style={{ fontSize: '1.2rem', marginLeft: '2px' }}>➤</span>
                        </button>
                    </div>
                </div>
            )}


            <button
                onClick={() => setIsOpen(!isOpen)}
                className="hover-lift"
                style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--primary-500), var(--accent-500))',
                    border: 'none',
                    boxShadow: '0 8px 30px rgba(59, 130, 246, 0.4)',
                    color: 'white',
                    fontSize: '1.75rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
            >
                {isOpen ? '✕' : '💬'}
            </button>
        </div>
    );
};

export default Chatbot;
