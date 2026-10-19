import test from 'node:test';
import assert from 'node:assert/strict';
import { parseCommand } from './commandParser.ts';

test('parseCommand handles help command', () => {
  const result = parseCommand('help');
  assert.ok(result.output.includes('Supported Windows 7 Command Prompt utilities'));
  assert.ok(result.output.includes('WHOAMI'));
  assert.ok(result.output.includes('PROJECTS'));
});

test('parseCommand handles whoami', () => {
  const result = parseCommand('whoami');
  assert.ok(result.output.includes('Administrator'));
  assert.ok(result.output.includes('Vedant Borude'));
});

test('parseCommand handles projects listing', () => {
  const result = parseCommand('projects');
  assert.ok(result.output.includes('TETHER'));
  assert.ok(result.output.includes('CHATIFY'));
  assert.ok(result.output.includes('SWIFTRIDE'));
});

test('parseCommand handles skills', () => {
  const result = parseCommand('skills');
  assert.ok(result.output.includes('7.9'));
  assert.ok(result.output.includes('Spring Boot'));
  assert.ok(result.output.includes('Apache Kafka'));
});

test('parseCommand handles color switching', () => {
  const matrixResult = parseCommand('color 0a');
  assert.equal(matrixResult.newColor, '#00ff66');

  const defaultResult = parseCommand('color 07');
  assert.equal(defaultResult.newColor, '#cccccc');
});

test('parseCommand handles cls/clear', () => {
  const result = parseCommand('cls');
  assert.equal(result.clear, true);
});

test('parseCommand handles file reading (type)', () => {
  const result = parseCommand('type "About Me.txt"');
  assert.ok(result.output.includes('VEDANT BORUDE'));
  assert.ok(result.output.toLowerCase().includes('full stack developer'));
});

test('parseCommand handles unknown command', () => {
  const result = parseCommand('foobar123');
  assert.ok(result.output.includes('is not recognized as an internal or external command'));
});
