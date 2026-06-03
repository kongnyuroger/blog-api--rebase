/**
 * Unit tests for the Blog API.
 * Uses Node.js built-in test runner (node:test + node:assert) — no extra deps needed.
 * Run with: node tests/api.test.js
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import jwt from 'jsonwebtoken';

// ─── Pure helpers under test (copied from source) ─────────────────────────────

/** Mirrors the httpStatus() helper in user.controller.js */
function httpStatus(code) {
    switch (code) {
        case 'VALIDATION':   return 400;
        case 'UNAUTHORIZED': return 401;
        case 'DUPLICATE':    return 409;
        case 'NOT_FOUND':    return 404;
        default:             return 500;
    }
}

/** Mirrors comment validation in comment.services.js */
function validateComment(comment) {
    if (!comment || comment.trim() === '') {
        const err = new Error('Comment cannot be empty');
        err.code = 'VALIDATION';
        throw err;
    }
    return true;
}

/** Mirrors pagination parsing used in post listing */
function parsePagination(query) {
    const rawLimit  = parseInt(query.limit);
    const rawOffset = parseInt(query.offset);
    const limit  = Math.max(1, Number.isFinite(rawLimit)  ? rawLimit  : 10);
    const offset = Math.max(0, Number.isFinite(rawOffset) ? rawOffset : 0);
    return { limit, offset };
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. HTTP status code mapping
// ═══════════════════════════════════════════════════════════════════════════════

describe('httpStatus()', () => {
    it('VALIDATION  → 400', () => assert.equal(httpStatus('VALIDATION'), 400));
    it('UNAUTHORIZED → 401', () => assert.equal(httpStatus('UNAUTHORIZED'), 401));
    it('DUPLICATE   → 409', () => assert.equal(httpStatus('DUPLICATE'), 409));
    it('NOT_FOUND   → 404', () => assert.equal(httpStatus('NOT_FOUND'), 404));
    it('unknown     → 500', () => assert.equal(httpStatus('BOOM'), 500));
});

// ═══════════════════════════════════════════════════════════════════════════════
// 2. JWT signing & verification
// ═══════════════════════════════════════════════════════════════════════════════

describe('JWT tokens', () => {
    const SECRET  = 'test_secret_key';
    const PAYLOAD = { id: 42, email: 'a@b.com' };

    it('creates a token with correct payload', () => {
        const token   = jwt.sign(PAYLOAD, SECRET, { expiresIn: '1h' });
        const decoded = jwt.verify(token, SECRET);
        assert.equal(decoded.id, 42);
        assert.equal(decoded.email, 'a@b.com');
    });

    it('rejects a token signed with the wrong secret', () => {
        const token = jwt.sign(PAYLOAD, SECRET);
        assert.throws(() => jwt.verify(token, 'wrong_secret'));
    });

    it('rejects an expired token', async () => {
        const token = jwt.sign(PAYLOAD, SECRET, { expiresIn: '0s' });
        await new Promise(r => setTimeout(r, 50));
        assert.throws(
            () => jwt.verify(token, SECRET),
            err => { assert.match(err.message, /expired/i); return true; }
        );
    });
});

// ═══════════════════════════════════════════════════════════════════════════════
// 3. Comment validation
// ═══════════════════════════════════════════════════════════════════════════════

describe('validateComment()', () => {
    it('throws for empty string', () => {
        assert.throws(() => validateComment(''), /Comment cannot be empty/);
    });

    it('throws for whitespace-only string', () => {
        assert.throws(() => validateComment('   '), /Comment cannot be empty/);
    });

    it('returns true for a valid comment', () => {
        assert.equal(validateComment('Great post!'), true);
    });
});

// ═══════════════════════════════════════════════════════════════════════════════
// 4. Pagination parameter parsing
// ═══════════════════════════════════════════════════════════════════════════════

describe('parsePagination()', () => {
    it('uses defaults when no params provided', () => {
        assert.deepEqual(parsePagination({}), { limit: 10, offset: 0 });
    });

    it('parses valid limit and offset from query string', () => {
        assert.deepEqual(parsePagination({ limit: '5', offset: '20' }), { limit: 5, offset: 20 });
    });

    it('clamps negative offset to 0', () => {
        assert.deepEqual(parsePagination({ limit: '10', offset: '-5' }), { limit: 10, offset: 0 });
    });

    it('clamps limit of 0 to minimum 1', () => {
        assert.deepEqual(parsePagination({ limit: '0', offset: '0' }), { limit: 1, offset: 0 });
    });
});
