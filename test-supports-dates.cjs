#!/usr/bin/env node

// Simple test script to verify that the supportsDates configuration option works correctly
const { kyselyAdapter } = require('./packages/better-auth/dist/adapters/kysely-adapter/index.cjs');

// Mock Kysely database instance 
const mockDb = {};

console.log('Testing supportsDates configuration...');

// Test 1: Postgres with explicit supportsDates: false
try {
    const postgresAdapter = kyselyAdapter(mockDb, {
        type: "postgres",
        supportsDates: false,  // Override default (which would be true for postgres)
    });
    
    const postgresInstance = postgresAdapter({
        database: { db: mockDb, type: "postgres" },
        user: { fields: {} },
        advanced: {},
    });
    
    const actualSupportsDatesPG = postgresInstance.options.adapterConfig.supportsDates;
    const expectedSupportsDatesPG = false;
    
    console.log(`✅ Test 1 passed: Postgres with explicit supportsDates: false = ${actualSupportsDatesPG} (expected: ${expectedSupportsDatesPG})`);
    
    if (actualSupportsDatesPG !== expectedSupportsDatesPG) {
        throw new Error(`Expected ${expectedSupportsDatesPG}, got ${actualSupportsDatesPG}`);
    }
} catch (error) {
    console.error('❌ Test 1 failed:', error.message);
    process.exit(1);
}

// Test 2: SQLite with explicit supportsDates: true
try {
    const sqliteAdapter = kyselyAdapter(mockDb, {
        type: "sqlite",
        supportsDates: true,  // Override default (which would be false for sqlite)
    });
    
    const sqliteInstance = sqliteAdapter({
        database: { db: mockDb, type: "sqlite" },
        user: { fields: {} },
        advanced: {},
    });
    
    const actualSupportsDatesSQLite = sqliteInstance.options.adapterConfig.supportsDates;
    const expectedSupportsDatesSQLite = true;
    
    console.log(`✅ Test 2 passed: SQLite with explicit supportsDates: true = ${actualSupportsDatesSQLite} (expected: ${expectedSupportsDatesSQLite})`);
    
    if (actualSupportsDatesSQLite !== expectedSupportsDatesSQLite) {
        throw new Error(`Expected ${expectedSupportsDatesSQLite}, got ${actualSupportsDatesSQLite}`);
    }
} catch (error) {
    console.error('❌ Test 2 failed:', error.message);
    process.exit(1);
}

// Test 3: Postgres with default behavior (should be true)
try {
    const postgresDefaultAdapter = kyselyAdapter(mockDb, {
        type: "postgres",
        // No explicit supportsDates - should use default
    });
    
    const postgresDefaultInstance = postgresDefaultAdapter({
        database: { db: mockDb, type: "postgres" },
        user: { fields: {} },
        advanced: {},
    });
    
    const actualSupportsDatesPGDefault = postgresDefaultInstance.options.adapterConfig.supportsDates;
    const expectedSupportsDatesPGDefault = true;
    
    console.log(`✅ Test 3 passed: Postgres default behavior = ${actualSupportsDatesPGDefault} (expected: ${expectedSupportsDatesPGDefault})`);
    
    if (actualSupportsDatesPGDefault !== expectedSupportsDatesPGDefault) {
        throw new Error(`Expected ${expectedSupportsDatesPGDefault}, got ${actualSupportsDatesPGDefault}`);
    }
} catch (error) {
    console.error('❌ Test 3 failed:', error.message);
    process.exit(1);
}

// Test 4: SQLite with default behavior (should be false)
try {
    const sqliteDefaultAdapter = kyselyAdapter(mockDb, {
        type: "sqlite",
        // No explicit supportsDates - should use default
    });
    
    const sqliteDefaultInstance = sqliteDefaultAdapter({
        database: { db: mockDb, type: "sqlite" },
        user: { fields: {} },
        advanced: {},
    });
    
    const actualSupportsDatesSQLiteDefault = sqliteDefaultInstance.options.adapterConfig.supportsDates;
    const expectedSupportsDatesSQLiteDefault = false;
    
    console.log(`✅ Test 4 passed: SQLite default behavior = ${actualSupportsDatesSQLiteDefault} (expected: ${expectedSupportsDatesSQLiteDefault})`);
    
    if (actualSupportsDatesSQLiteDefault !== expectedSupportsDatesSQLiteDefault) {
        throw new Error(`Expected ${expectedSupportsDatesSQLiteDefault}, got ${actualSupportsDatesSQLiteDefault}`);
    }
} catch (error) {
    console.error('❌ Test 4 failed:', error.message);
    process.exit(1);
}

console.log('\n🎉 All tests passed! The supportsDates configuration option is working correctly.');
console.log('📖 Usage example for fixing Neon date handling:');
console.log(`
const adapter = kyselyAdapter(db, {
    type: "postgres",
    supportsDates: false,  // Use this to fix date handling issues with certain drivers
});
`);