import { OPENAI_API_KEY } from '$env/static/private';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

interface Message {
	role: 'system' | 'user' | 'assistant';
	content: string;
}

interface ChatRequest {
	messages: Message[];
	deepSearch?: boolean;
}

interface ChatResponse {
	content: string;
	citations?: Array<{ title: string; url: string }>;
	searchSteps?: Array<{
		step: string;
		queries: string[];
		citations: Array<{ title: string; url: string }>;
	}>;
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		if (!OPENAI_API_KEY) {
			throw new Error('OPENAI_API_KEY is not set');
		}

		const { messages, deepSearch = false }: ChatRequest = await request.json();

		// Ensure messages array exists and has content
		if (!Array.isArray(messages) || messages.length === 0) {
			return json({ error: 'Invalid messages format' }, { status: 400 });
		}

		// Add system message if not present
		if (messages[0].role !== 'system') {
			messages.unshift({
				role: 'system',
				content: 'You are a helpful AI assistant. Keep responses concise and informative.'
			});
		}

		// If deep search is enabled, modify the system message
		if (deepSearch) {
			messages[0].content +=
				' Perform deep analysis and provide detailed search steps and citations.';
		}

		const response = await fetch('https://api.openai.com/v1/chat/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${OPENAI_API_KEY}`
			},
			body: JSON.stringify({
				model: 'gpt-4',
				messages,
				temperature: 0.7,
				stream: false,
				// Add function calling if deep search is enabled
				...(deepSearch && {
					functions: [
						{
							name: 'provide_analysis',
							description: 'Provide analysis with search steps and citations',
							parameters: {
								type: 'object',
								properties: {
									content: {
										type: 'string',
										description: 'The main response content'
									},
									searchSteps: {
										type: 'array',
										items: {
											type: 'object',
											properties: {
												step: { type: 'string' },
												queries: {
													type: 'array',
													items: { type: 'string' }
												},
												citations: {
													type: 'array',
													items: {
														type: 'object',
														properties: {
															title: { type: 'string' },
															url: { type: 'string' }
														}
													}
												}
											}
										}
									},
									citations: {
										type: 'array',
										items: {
											type: 'object',
											properties: {
												title: { type: 'string' },
												url: { type: 'string' }
											}
										}
									}
								},
								required: ['content']
							}
						}
					],
					function_call: { name: 'provide_analysis' }
				})
			})
		});

		if (!response.ok) {
			const errorData = await response.json();
			console.error('OpenAI API error:', errorData);
			throw new Error(`OpenAI API error: ${response.statusText}`);
		}

		const data = await response.json();

		// Process the response based on whether it's a function call or regular message
		let chatResponse: ChatResponse;

		if (data.choices[0].finish_reason === 'function_call') {
			const functionResponse = JSON.parse(data.choices[0].message.function_call.arguments);
			chatResponse = {
				content: functionResponse.content,
				citations: functionResponse.citations,
				searchSteps: functionResponse.searchSteps
			};
		} else {
			chatResponse = {
				content: data.choices[0].message.content
			};
		}

		return json(chatResponse);
	} catch (error) {
		console.error('Error:', error);
		return json({ error: 'Internal server error' }, { status: 500 });
	}
};
