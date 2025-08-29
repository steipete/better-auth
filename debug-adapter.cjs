#!/usr/bin/env node

// Debug script to understand the adapter structure
const { kyselyAdapter } = require('./packages/better-auth/dist/adapters/kysely-adapter/index.cjs');

// Mock Kysely database instance 
const mockDb = {};

console.log('Debugging adapter structure...');

try {
    const adapter = kyselyAdapter(mockDb, {
        type: "postgres",
        supportsDates: false,
    });
    
    console.log('Adapter function created:', typeof adapter);
    
    // Try to call the adapter with minimal config
    try {
        const result = adapter({
            database: { db: mockDb, type: "postgres" },
            user: { fields: {} },
            advanced: {},
        });
        
        console.log('Adapter result keys:', Object.keys(result));
        console.log('Config object:', result.config);
        console.log('supportsDates:', result.config ? result.config.supportsDates : 'undefined');
    } catch (error) {
        console.error('Error calling adapter:', error.message);
        console.error('Stack:', error.stack);
    }
    
} catch (error) {
    console.error('Error creating adapter:', error.message);
    console.error('Stack:', error.stack);
}