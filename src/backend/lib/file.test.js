import { dirExists } from './file.js'
import { describe, expect, it } from '@jest/globals';

const testDir = './src/backend/test_data/'

describe('file', () => {
	describe('dirExists', () => {
		it('returns false if dir does not exist', async () => {
			const result = await dirExists('./non-existent-folder');
			expect(result).toBe(false);
		});

		it('returns true if dir does exist', async () => {
			const result = await dirExists(testDir);
			expect(result).toBe(true);
		});

		it('returns false if there is no input', async () => {
			const result = await dirExists();
			expect(result).toBe(false);
		});
	});
});
