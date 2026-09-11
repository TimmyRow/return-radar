import test from 'node:test';
import assert from 'node:assert/strict';
import { dateFrom, reminderIcs, status, summarize } from '../src/engine.js';

test('calculates return due date', () => assert.equal(dateFrom('2026-09-01', 30), '2026-10-01'));
test('marks near deadlines urgent', () => assert.equal(status({ purchaseDate:'2026-09-01', returnDays:3 }, '2026-09-01').kind, 'urgent'));
test('summarizes open value and warranties', () => { const result = summarize([{ purchaseDate:'2026-09-01', returnDays:30, price:100, warrantyMonths:12 }, { purchaseDate:'2026-01-01', returnDays:3, price:50, warrantyMonths:0 }], '2026-09-01'); assert.deepEqual(result, { atRisk:0, open:1, value:150, warranties:1 }); });
test('builds a calendar reminder before the return due date', () => { const reminder = reminderIcs({ id:'desk-lamp', name:'Desk, lamp', purchaseDate:'2026-09-01', returnDays:30 }); assert.match(reminder, /DTSTART;VALUE=DATE:20260928/); assert.match(reminder, /DTEND;VALUE=DATE:20261002/); assert.match(reminder, /SUMMARY:Return deadline: Desk\\, lamp/); });
